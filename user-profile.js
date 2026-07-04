'use strict';

// ════════════════════════════════════════════════════
// MUSCLEOS — USER_PROFILE v1.2
//
// Stocke le profil de l'utilisateur et calcule un
// recovery_multiplier global utilisé par FATIGUE_ENGINE
// pour ajuster les demi-vies de récupération.
//
// Architecture v1.1 :
//   recovery_multiplier = produit de tous les facteurs
//   plafonné dans [MULTIPLIER_MIN, MULTIPLIER_MAX]
//
//   Ce multiplicateur est un SCALAIRE GLOBAL (personnel).
//   FATIGUE_ENGINE v2.1 le module muscle par muscle via
//   RECOVERY_SENSITIVITY — certains groupes y sont plus
//   sensibles que d'autres (voir fatigue-engine.js §RECOVERY_SENSITIVITY).
//
//   Formule finale dans FATIGUE_ENGINE :
//     hl_eff = HALF_LIVES[id] × (1 + (pm − 1) × SENSITIVITY[id])
//
//   Où pm = recovery_multiplier calculé ici.
//
// Rétrocompatibilité :
//   Clé localStorage inchangée. Profils existants migrés
//   automatiquement (les champs manquants sont ignorés).
//
// Références :
//   Walker, M. (2017). Why We Sleep. Scribner.
//   Dattilo, M. et al. (2011). Sleep and muscle recovery.
//     Medical Hypotheses, 77(2), 220–226.
//   Kraemer, W.J. & Ratamess, N.A. (2004). Fundamentals
//     of Resistance Training. Med Sci Sports Exerc, 36(4).
//   Paulsen, G. et al. (2012). Muscle damage from eccentric
//     exercise. J Physiol, 590(20), 5091–5116.
//   Damas, F. et al. (2016). Resistance training-induced
//     changes in integrated myofibrillar protein synthesis.
//     J Physiol, 594(18), 5209–5222.
//   Stupka, N. et al. (2001). Cellular adaptations to
//     repeated eccentric exercise. J Appl Physiol, 91(4).
// ════════════════════════════════════════════════════

const USER_PROFILE = (() => {

  const STORAGE_KEY = 'muscleos_v2_profile';

  // ════════════════════════════════════════════════════
  // PLAFONDS DU MULTIPLICATEUR GLOBAL PERSONNEL
  //
  // Ces bornes s'appliquent au scalaire GLOBAL avant que
  // FATIGUE_ENGINE le module par sensibilité musculaire.
  //
  // Justification :
  //   0.65 → athlète d'élite bien nourri, sommeil optimal.
  //           Après modulation par sensibilité (min ~0.65),
  //           certains groupes (coiffe, soléaire) auraient
  //           des demi-vies extrêmement courtes. Plancher réaliste.
  //   1.75 → correspond à une dégradation systémique sévère
  //           (manque de sommeil chronique + stress élevé + âge +
  //           protéines insuffisantes). Après sensibilité × 1.35
  //           (quads), donne hl × ~2.3 → ~165h pour QUAD_RECT.
  //           Au-delà, on sort du domaine modélisable.
  // ════════════════════════════════════════════════════
  const MULTIPLIER_MIN = 0.65;
  const MULTIPLIER_MAX = 1.75;

  // ════════════════════════════════════════════════════
  // FACTEURS PAR QUESTION
  //
  // Chaque clé correspond à une réponse possible.
  // La valeur est un multiplicateur sur la demi-vie :
  //   < 1.0 → récupère plus vite que la moyenne
  //   > 1.0 → récupère plus lentement
  //   = 1.0 → dans la moyenne
  //
  // Source des valeurs :
  //   Âge   : Wroblewski et al. (2011), The Physician and
  //           Sportsmedicine. Déclin ~1% par an après 35.
  //   Niveau : Paulsen (2012), Damas (2016). Athlètes avancés
  //           = moins de dommages musculaires, pas forcément
  //           moins de temps structurel → facteur conservateur.
  //   Sommeil : Walker (2017), Dattilo (2011). Sommeil = levier
  //           #1 de récupération. <6h = +30% conservateur.
  //   Protéines : Phillips & Van Loon (2011). Apport adéquat
  //           réduit le temps de reconstruction myofibrillaire.
  //   Stress : Sapolsky (2004). Cortisol chronique ralentit
  //           la synthèse protéique et augmente catabolisme.
  // ════════════════════════════════════════════════════
  const FACTORS = {

    age: {
      '18-25': 0.90,   // Pic anabolique, GH élevée, récupération rapide
      '26-35': 1.00,   // Référence population adulte active
      '36-45': 1.15,   // Légère baisse GH et testostérone, +15%
      '46+':   1.30,   // Déclin hormonal plus marqué, +30%
    },

    training_level: {
      beginner:     1.15,  // Dommages musculaires plus importants, moins d'adaptations
      intermediate: 1.00,  // Référence
      advanced:     0.90,  // Moins de DOMS, adaptations neuromusculaires — conservateur vs 0.82
                           // (voir note header : effet surtout sur DOMS, pas récup structurelle)
    },

    sleep: {
      under6: 1.30,   // <6h : GH nocturne tronquée, synthèse protéique réduite
      '6to7': 1.10,   // 6-7h : légèrement insuffisant
      '7to8': 1.00,   // Référence (recommandation sportive : 7-9h)
      over8:  0.90,   // >8h : optimal, GH et IGF-1 maximisés
    },

    protein: {
      low:      1.15,  // <1.4g/kg : substrat insuffisant pour réparation myofibrillaire
      adequate: 1.00,  // 1.4-2.0g/kg : zone recommandée ISSN (Stoppani et al.)
      high:     0.90,  // >2.0g/kg : surplus substrat, léger avantage récupération
    },

    stress: {
      low:      0.95,  // Cortisol bas → environnement anabolique favorable
      moderate: 1.00,  // Référence
      high:     1.18,  // Cortisol chronique → catabolisme, synthèse protéique ralentie
    },
  };

  // ════════════════════════════════════════════════════
  // FACTEURS OBJECTIF → BASE_DOSE
  //
  // L'objectif dominant influence le volume de dommages
  // par série, pas la vitesse de récupération.
  // Ces facteurs multiplient BASE_DOSE dans FATIGUE_ENGINE.
  //
  // Force (3-5×1-5, charges >85% 1RM) :
  //   Dommages mécaniques plus importants par rep,
  //   mais volume total souvent moindre. Bilan : +20%.
  // Hypertrophie (3-4×6-12, 65-80% 1RM) : référence.
  // Endurance musculaire (>15 reps, <60% 1RM) :
  //   Moins de tension mécanique, fibres lentes
  //   plus résistantes → -25%.
  // ════════════════════════════════════════════════════
  const GOAL_BASE_DOSE_FACTORS = {
    strength:    1.20,
    hypertrophy: 1.00,
    endurance:   0.75,
  };

  // ─── STRUCTURE PAR DÉFAUT ─────────────────────────
  function _defaultProfile() {
    return {
      age:            '26-35',
      sexe:           null,
      training_level: 'intermediate',
      sleep:          '7to8',
      protein:        'adequate',
      stress:         'moderate',
      goal:           'hypertrophy',
      // Calculé à la sauvegarde, mis en cache
      recovery_multiplier: 1.00,
      goal_base_dose_factor: 1.00,
      // Métadonnées
      onboarding_done: false,
      created_at: null,
      updated_at: null,
    };
  }

  // ─── CALCUL DU MULTIPLICATEUR ─────────────────────

  /**
   * Calcule le recovery_multiplier à partir des réponses.
   * Produit de tous les facteurs, plafonné dans [MIN, MAX].
   * @param {Object} answers — clés : age, training_level, sleep, protein, stress
   * @returns {number}
   */
  function calcMultiplier(answers) {
    let m = 1.0;
    for (const [key, options] of Object.entries(FACTORS)) {
      const val = answers[key];
      if (val && options[val] !== undefined) {
        m *= options[val];
      }
    }
    return Math.round(
      Math.min(MULTIPLIER_MAX, Math.max(MULTIPLIER_MIN, m)) * 1000
    ) / 1000;
  }

  /**
   * Retourne le facteur BASE_DOSE selon l'objectif.
   * @param {string} goal
   * @returns {number}
   */
  function calcGoalFactor(goal) {
    return GOAL_BASE_DOSE_FACTORS[goal] ?? 1.00;
  }

  // ─── STOCKAGE ─────────────────────────────────────

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return _defaultProfile();
      return { ..._defaultProfile(), ...JSON.parse(raw) };
    } catch {
      return _defaultProfile();
    }
  }

  /**
   * Sauvegarde le profil, recalcule les facteurs automatiquement.
   * @param {Object} profile
   */
  function save(profile) {
    const now = Date.now();
    profile.recovery_multiplier = calcMultiplier(profile);
    profile.goal_base_dose_factor = calcGoalFactor(profile.goal);
    if (!profile.created_at) profile.created_at = now;
    profile.updated_at = now;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }

  /**
   * Met à jour une ou plusieurs clés du profil.
   * @param {Object} patch — ex: { sleep: 'under6' }
   */
  function update(patch) {
    const profile = load();
    Object.assign(profile, patch);
    save(profile);
  }

  /**
   * Marque l'onboarding comme terminé.
   */
  function completeOnboarding() {
    update({ onboarding_done: true });
  }

  // ─── GETTERS PRATIQUES ────────────────────────────

  /**
   * Retourne le recovery_multiplier actuel (scalaire global).
   * Appelé par FATIGUE_ENGINE, qui le module ensuite par
   * RECOVERY_SENSITIVITY pour chaque muscle.
   */
  function getMultiplier() {
    return load().recovery_multiplier;
  }

  /**
   * Retourne le facteur BASE_DOSE actuel.
   * Appelé par FATIGUE_ENGINE.calcDoses().
   */
  function getGoalFactor() {
    return load().goal_base_dose_factor;
  }

  /**
   * Retourne le multiplicateur effectif pour un muscle donné,
   * en tenant compte de RECOVERY_SENSITIVITY de FATIGUE_ENGINE.
   *
   * Utile pour l'UI (ex: "Votre récupération pour les quadriceps
   * est ×1.41 plus lente que la normale").
   *
   * Prérequis : FATIGUE_ENGINE doit être chargé.
   * @param {string} muscleId — ID canonique (ex: 'QUAD_RECT')
   * @returns {number} multiplicateur effectif arrondi
   */
  function getGroupMultiplier(muscleId) {
    const pm = getMultiplier();
    if (typeof FATIGUE_ENGINE !== 'undefined' && FATIGUE_ENGINE.RECOVERY_SENSITIVITY) {
      const sens = FATIGUE_ENGINE.RECOVERY_SENSITIVITY[muscleId] ?? 1.0;
      const blended = 1 + (pm - 1) * sens;
      return Math.round(Math.max(0.40, blended) * 1000) / 1000;
    }
    return pm; // fallback si FATIGUE_ENGINE non chargé
  }

  /**
   * Retourne le facteur de seed CTL selon le niveau d'entraînement déclaré.
   * Utilisé par rebuildFatigue() pour amorcer le CTL de tous les muscles
   * avant de rejouer l'historique réel.
   *
   *   beginner     → 0.0  (CTL = 0 → mult 1.40 — le muscle "découvre" l'effort)
   *   intermediate → 0.5  (CTL = 0.5 × CTL_ref → mult ≈ 1.15)
   *   advanced     → 1.0  (CTL = CTL_ref → mult 1.00 — référence)
   *   elite        → 2.0  (CTL = 2 × CTL_ref → mult ≈ 0.80)
   *
   * Ce seed est injecté 42 jours avant la première session enregistrée,
   * ou 42 jours avant aujourd'hui si aucune session n'existe.
   * Il décroit naturellement sur 42j ; l'historique réel le remplace
   * au fil des semaines.
   */
  function getSeedFactor() {
    const level = load().training_level;
    return { beginner: 0.0, intermediate: 0.5, advanced: 1.0, elite: 2.0 }[level] ?? 0.5;
  }

  /**
   * Vrai si l'onboarding n'a pas encore été complété.
   */
  function needsOnboarding() {
    return !load().onboarding_done;
  }

  /**
   * Debug : affiche le profil, les facteurs, et des exemples
   * de demi-vies effectives avec la modulation v2.1.
   */
  function debugDump() {
    const p   = load();
    const pm  = p.recovery_multiplier;
    const details = {};
    for (const [key, options] of Object.entries(FACTORS)) {
      const val = p[key];
      details[key] = { value: val, factor: val ? (options[val] ?? '?') : '?' };
    }

    // Exemples de demi-vies effectives si FATIGUE_ENGINE disponible
    let examples = null;
    if (typeof FATIGUE_ENGINE !== 'undefined') {
      const eff = FATIGUE_ENGINE.effectiveHalfLife;
      examples = {
        QUAD_RECT:     `${72}h base → ${Math.round(eff('QUAD_RECT', pm) * 10) / 10}h effective (sens×1.35)`,
        HAMSTRING_BF_LONG: `${72}h base → ${Math.round(eff('HAMSTRING_BF_LONG', pm) * 10) / 10}h effective (sens×1.35)`,
        PECT_MAJ_STER: `${60}h base → ${Math.round(eff('PECT_MAJ_STER', pm) * 10) / 10}h effective (sens×1.00)`,
        LUMBAR:        `${84}h base → ${Math.round(eff('LUMBAR', pm) * 10) / 10}h effective (sens×1.20)`,
        BICEP_LONG:    `${44}h base → ${Math.round(eff('BICEP_LONG', pm) * 10) / 10}h effective (sens×0.80)`,
        SOLEUS:        `${40}h base → ${Math.round(eff('SOLEUS', pm) * 10) / 10}h effective (sens×0.65)`,
        INFRA:         `${44}h base → ${Math.round(eff('INFRA', pm) * 10) / 10}h effective (sens×0.65)`,
        CORE_TRANS:    `${44}h base → ${Math.round(eff('CORE_TRANS', pm) * 10) / 10}h effective (sens×0.75)`,
      };
    }

    return {
      profile: p,
      factors: details,
      recovery_multiplier: pm,
      goal_base_dose_factor: p.goal_base_dose_factor,
      effective_half_lives: examples ?? '(FATIGUE_ENGINE non chargé)',
    };
  }

  // ─── API PUBLIQUE ──────────────────────────────────
  return {
    FACTORS,
    GOAL_BASE_DOSE_FACTORS,
    MULTIPLIER_MIN,
    MULTIPLIER_MAX,
    load, save, update,
    completeOnboarding,
    calcMultiplier, calcGoalFactor,
    getMultiplier, getGoalFactor,
    getGroupMultiplier, getSeedFactor,
    needsOnboarding,
    debugDump,
  };

})();
