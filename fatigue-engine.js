'use strict';

// ════════════════════════════════════════════════════
// MUSCLEOS — FATIGUE ENGINE v2.1
// Algo : fatigue pondérée + récupération exponentielle
// Pas de plafond interne — la fatigue peut dépasser 100
// (overreaching réel). L'affichage plafonne à "Saturé".
//
// v2.0 : intègre USER_PROFILE pour personnalisation.
//   • Les demi-vies sont scalées par USER_PROFILE.getMultiplier()
//   • BASE_DOSE est scalée par USER_PROFILE.getGoalFactor()
//   • Si USER_PROFILE absent (script non chargé), comportement
//     identique à v1.1 (multiplicateurs = 1.0).
//
// v2.1 : multiplicateurs différenciés par groupe musculaire.
//   • Remplace le scalaire global uniforme par une sensibilité
//     par groupe : hl = HALF_LIVES[id] × blend(pm, SENSITIVITY[id])
//   • Le scalaire global du profil (pm) reste, mais son effet est
//     modulé par RECOVERY_SENSITIVITY — certains groupes y sont
//     plus réactifs que d'autres (données littérature).
//   • Formule : blendedPm = 1 + (pm − 1) × SENSITIVITY[id]
//     Interprétation :
//       SENSITIVITY = 1.0 → effet identique à l'ancien scalaire global
//       SENSITIVITY > 1.0 → groupe amplifie l'effet personnel (sleep++/-- = gros impact)
//       SENSITIVITY < 1.0 → groupe peu sensible aux facteurs systémiques
//
// Rétrocompatibilité : clé localStorage inchangée.
//
// Dépendance : user-profile.js doit être chargé AVANT
// fatigue-engine.js dans le HTML.
// ════════════════════════════════════════════════════

const FATIGUE_ENGINE = (() => {

  const STORAGE_KEY = 'muscleos_v2_fatigue';

  // ════════════════════════════════════════════════════
  // ACCÈS AU PROFIL UTILISATEUR
  //
  // USER_PROFILE est chargé dans un script séparé.
  // Si absent, multiplicateurs = 1.0 → rétrocompatibilité v1.1.
  // ════════════════════════════════════════════════════
  function _profileMultiplier() {
    if (typeof USER_PROFILE !== 'undefined') return USER_PROFILE.getMultiplier();
    return 1.0;
  }
  function _goalFactor() {
    if (typeof USER_PROFILE !== 'undefined') return USER_PROFILE.getGoalFactor();
    return 1.0;
  }

  // ════════════════════════════════════════════════════
  // DEMI-VIES DE RÉCUPÉRATION (heures) — BASE
  //
  // Modèle exponentiel : t½ = temps pour récupérer 50 %
  // de la fatigue accumulée à un instant t.
  // Ces valeurs sont les demi-vies MÉDIANES (population adulte
  // active, 26-35 ans, sommeil adéquat, protéines suffisantes).
  //
  // Références :
  //   Zatsiorsky & Kraemer (2006). Science and Practice
  //     of Strength Training, 2e éd., Human Kinetics.
  //   Helms, E. et al. (2017). Evidence-Based Resistance
  //     Training Recommendations. Strength & Cond. J.
  //   MacDougall & Sale (2014). Physiology of Sport
  //     and Exercise (Wilmore, Costill & Kenney).
  //   Paulsen, G. et al. (2012). Muscle damage induced by
  //     strength training in humans. J Physiol, 590(20), 5091-5116.
  //
  // Convention :
  //   < 44 h → petit muscle isolation / fibres lentes
  //   44-54 h → muscle moyen ou endurance
  //   54-72 h → grand muscle composé
  //   > 72 h → muscle axial profond / chaîne post. lourde
  // ════════════════════════════════════════════════════
  const HALF_LIVES = {
    // ── Poitrine
    PECT_MAJ_CLAV : 60,   // Grand pectoral — chef claviculaire
    PECT_MAJ_STER : 60,   // Grand pectoral — chef sternal
    PECT_MIN      : 48,   // Petit pectoral
    SERR_ANT      : 44,   // Dentelé antérieur

    // ── Épaules
    DELT_ANT      : 48,   // Deltoïde antérieur
    DELT_MED      : 44,   // Deltoïde médial
    DELT_POST     : 44,   // Deltoïde postérieur
    INFRA         : 44,   // Infra-épineux (coiffe)
    SUPRASPIN     : 44,   // Sus-épineux (coiffe)
    SUBSCAP       : 44,   // Subscapulaire (coiffe)
    TERES_MIN     : 44,   // Petit rond (coiffe)

    // ── Dos
    LAT           : 60,   // Grand dorsal
    TRAP_SUP      : 44,   // Trapèze supérieur
    TRAP_MED      : 48,   // Trapèze moyen
    TRAP_INF      : 48,   // Trapèze inférieur
    RHOMBOID      : 48,   // Rhomboïdes
    TERES_MAJ     : 54,   // Grand rond
    LUMBAR        : 84,   // Érecteurs lombaires — le plus lent
    MULTIFIDUS    : 72,   // Multifidus

    // ── Bras
    BICEP_LONG    : 44,
    BICEP_COURT   : 44,
    BRACHIAL      : 40,
    BRACHIORAD    : 40,
    TRICEP_LONG   : 44,
    TRICEP_LAT    : 44,
    TRICEP_MED    : 44,
    FOREARM_EXT       : 40,   // Extenseurs avant-bras
    FOREARM_FLEX_SUP  : 40,   // Fléchisseurs/supinateurs avant-bras

    // ── Jambes
    GLUTE_MAX          : 72,
    GLUTE_MED          : 60,
    GLUTE_MIN          : 54,
    QUAD_RECT          : 72,
    QUAD_VAST_MED      : 72,
    QUAD_VAST_LAT      : 72,
    QUAD_VAST_INT      : 68,
    HAMSTRING_BF_LONG  : 72,
    HAMSTRING_BF_COURT : 60,
    HAMSTRING_ST       : 72,
    HAMSTRING_SM       : 72,
    ADDUCTOR           : 60,
    HIP_FLEX           : 54,
    GASTRO_MED         : 44,
    GASTRO_LAT         : 44,
    SOLEUS             : 40,
    PERONEAL           : 44,  // Péroniers — stabilisateurs latéraux

    // ── Core
    CORE_RECT_SUP : 54,
    CORE_RECT_INF : 54,
    CORE_OBL_EXT  : 52,
    CORE_OBL_INT  : 52,
    CORE_TRANS    : 44,
  };

  const DEFAULT_HALF_LIFE = 54;

  // ════════════════════════════════════════════════════
  // SENSIBILITÉ DE RÉCUPÉRATION PAR GROUPE MUSCULAIRE
  //
  // Valeur [0.60 – 1.40] indiquant à quel point un groupe
  // est sensible aux facteurs systémiques du profil utilisateur
  // (sommeil, âge, stress, nutrition).
  //
  // Formule d'application :
  //   blendedPm = 1 + (personalPm − 1) × SENSITIVITY
  //
  // Interprétation :
  //   1.0  → sensibilité standard (ancien comportement)
  //   >1.0 → amplification : un mauvais sommeil/âge impacte
  //           davantage ce groupe ; une bonne récupération
  //           le bénéficie aussi davantage.
  //   <1.0 → atténuation : groupe peu dépendant de l'état
  //           systémique — récupère à peu près au même rythme
  //           quelle que soit la condition du profil.
  //
  // ── Bases scientifiques ──────────────────────────────
  //
  // [A] GRANDS MUSCLES MEMBRES INFÉRIEURS — sensibilité élevée
  //   • Paulsen, G. et al. (2012). Muscle damage induced by
  //     strength training in humans. J Physiol, 590(20), 5091–5116.
  //     → Dommages post-exercice 2–3× plus marqués dans les grands
  //       muscles des MI; récupération disproportionnellement plus
  //       longue lorsque la GH nocturne est réduite.
  //   • Dattilo, M. et al. (2011). Sleep and muscle recovery.
  //     Med Hypotheses, 77(2), 220–226.
  //     → La GH et l'IGF-1 (sécrétés la nuit) agissent
  //       préférentiellement sur les larges masses musculaires.
  //       Impact sur petits muscles (biceps, coiffe) : mineur.
  //   Valeur retenue : 1.35 (quadriceps, ischio-jambiers, grand fessier)
  //
  // [B] MUSCLES SPINAUX PROFONDS — sensibilité intermédiaire-haute
  //   • Hides, J.A. et al. (2001). Long-term effects of specific
  //     stabilizing exercises for first-episode low back pain.
  //     Spine, 26(11), E243–248.
  //     → Récupération des multifidus et érecteurs spinaux dominée
  //       par composante neuromusculaire — très sensible au cortisol.
  //   • Sapolsky, R.M. (2004). Why Zebras Don't Get Ulcers.
  //     Henry Holt. (ref générale cortisol/catabolisme)
  //   Valeur retenue : 1.20
  //
  // [C] GRANDS MUSCLES MEMBRES SUPÉRIEURS — référence (1.00)
  //   Pectoraux majeurs, grand dorsal : référence standard de la
  //   littérature sur la récupération. Sensibilité systémique
  //   intermédiaire — ni amplifiée ni atténuée.
  //
  // [D] PETITS MUSCLES DES BRAS — faible sensibilité
  //   • Clarkson, P.M. & Hubal, M.J. (2002). Exercise-induced
  //     muscle damage in humans. Am J Phys Med Rehabil,
  //     81(11 Suppl), S52–S69.
  //     → Après exercice excentrique sévère, les fléchisseurs
  //       du coude récupèrent à un rythme peu modifié par les
  //       conditions systémiques (sommeil, nutrition).
  //       Récupération rapide même en sous-optimal.
  //   Valeur retenue : 0.80 (biceps, triceps, brachial)
  //
  // [E] COIFFE DES ROTATEURS — très faible sensibilité
  //   • Nardone, A. & Schieppati, M. (1988). Shift of activity
  //     from slow to fast muscle during voluntary lengthening
  //     contractions. J Physiol, 395, 363–381.
  //     → Stabilisateurs de coiffe = majoritairement fibres type-I
  //       (lentes), très résistantes aux facteurs systémiques.
  //       Fatigue principalement neuro-locale, pas hormonale.
  //   Valeur retenue : 0.65
  //
  // [F] MUSCLES DE LA JAMBE (soléaire, gastrocnémiens, péroniers)
  //   • Même référence Nardone & Schieppati (1988).
  //     Soléaire = ~80% fibres type-I, très résistant.
  //   • Burke, R.E. (1981). Motor unit properties and selective
  //     involvement in movement. Exerc Sport Sci Rev, 9, 31–81.
  //   Valeur retenue : 0.70
  //
  // [G] DELTOÏDES — légèrement sous la référence
  //   Muscle à forte proportion type-I (posture), mais sollicitation
  //   type-II importante en musculation. Compromis entre [C] et [D].
  //   Valeur retenue : 0.85
  //
  // [H] CORE / ABDOMINAUX — faible sensibilité
  //   • McGill, S.M. (2007). Low Back Disorders. Human Kinetics.
  //     → Muscles abdominaux = endurance-dominant, récupèrent vite
  //       (rôle postural continu). Peu affectés par état systémique.
  //   Valeur retenue : 0.80
  //
  // [I] FESSIER MOYEN/PETIT, ADDUCTEURS, FLÉCHISSEURS DE HANCHE
  //   Intermédiaires entre grand fessier (1.35) et core (0.80).
  //   Rôle mixte postural/dynamique, taille intermédiaire.
  //   Valeur retenue : 1.10
  //
  // ════════════════════════════════════════════════════
  const RECOVERY_SENSITIVITY = {
    // ── Poitrine — référence [C]
    PECT_MAJ_CLAV : 1.00,
    PECT_MAJ_STER : 1.00,
    PECT_MIN      : 0.85,   // petit muscle, moins sensible
    SERR_ANT      : 0.85,

    // ── Épaules
    DELT_ANT      : 0.85,   // [G]
    DELT_MED      : 0.85,
    DELT_POST     : 0.85,
    INFRA         : 0.65,   // [E] coiffe
    SUPRASPIN     : 0.65,
    SUBSCAP       : 0.65,
    TERES_MIN     : 0.65,

    // ── Dos
    LAT           : 1.00,   // [C] référence
    TRAP_SUP      : 0.80,   // postural, fibres lentes
    TRAP_MED      : 0.90,   // mixte
    TRAP_INF      : 0.90,
    RHOMBOID      : 0.90,
    TERES_MAJ     : 1.00,
    LUMBAR        : 1.20,   // [B] spinaux profonds
    MULTIFIDUS    : 1.20,

    // ── Bras — [D]
    BICEP_LONG    : 0.80,
    BICEP_COURT   : 0.80,
    BRACHIAL      : 0.80,
    BRACHIORAD    : 0.75,
    TRICEP_LONG   : 0.80,
    TRICEP_LAT    : 0.80,
    TRICEP_MED    : 0.80,
    FOREARM_EXT      : 0.70,   // [F] comparable aux muscles distaux
    FOREARM_FLEX_SUP : 0.70,

    // ── Jambes
    GLUTE_MAX          : 1.35,  // [A] grand masse type-II
    GLUTE_MED          : 1.10,  // [I]
    GLUTE_MIN          : 1.10,
    QUAD_RECT          : 1.35,  // [A]
    QUAD_VAST_MED      : 1.35,
    QUAD_VAST_LAT      : 1.35,
    QUAD_VAST_INT      : 1.30,
    HAMSTRING_BF_LONG  : 1.35,  // [A]
    HAMSTRING_BF_COURT : 1.20,  // moins grande masse
    HAMSTRING_ST       : 1.30,
    HAMSTRING_SM       : 1.30,
    ADDUCTOR           : 1.10,  // [I]
    HIP_FLEX           : 1.10,
    GASTRO_MED         : 0.70,  // [F]
    GASTRO_LAT         : 0.70,
    SOLEUS             : 0.65,  // très type-I
    PERONEAL           : 0.70,

    // ── Core — [H]
    CORE_RECT_SUP : 0.80,
    CORE_RECT_INF : 0.80,
    CORE_OBL_EXT  : 0.80,
    CORE_OBL_INT  : 0.80,
    CORE_TRANS    : 0.75,  // stabilisateur profond, très peu sensible
  };

  const DEFAULT_SENSITIVITY = 1.0;

  // ════════════════════════════════════════════════════
  // CALCUL DE LA DEMI-VIE EFFECTIVE
  //
  // Intègre la sensibilité par groupe + le facteur personnel.
  //
  //   blendedPm = 1 + (personalPm − 1) × sensitivity
  //   halfLifeEffective = HALF_LIVES[id] × blendedPm
  //
  // Exemples avec sommeil insuffisant (pm = 1.30) :
  //   QUAD_RECT  (t½=72h, sens=1.35) → blend=1.405 → hl=101h  (vs 93.6h uniforme)
  //   BICEP_LONG (t½=44h, sens=0.80) → blend=1.240 → hl=54.6h (vs 57.2h uniforme)
  //   SOLEUS     (t½=40h, sens=0.65) → blend=1.195 → hl=47.8h (vs 52h uniforme)
  //
  // Exemples avec bon sommeil (pm = 0.90) :
  //   QUAD_RECT  (t½=72h, sens=1.35) → blend=0.865 → hl=62.3h (bénéfice amplifié)
  //   BICEP_LONG (t½=44h, sens=0.80) → blend=0.920 → hl=40.5h (bénéfice modéré)
  //
  // Plancher de sécurité à 0.40 pour éviter des demi-vies
  // absurdement courtes en cas de profil extrêmement favorable.
  // ════════════════════════════════════════════════════
  function _effectiveHalfLife(muscleId, personalPm) {
    const base    = HALF_LIVES[muscleId] ?? DEFAULT_HALF_LIFE;
    const sens    = RECOVERY_SENSITIVITY[muscleId] ?? DEFAULT_SENSITIVITY;
    const blended = 1 + (personalPm - 1) * sens;
    return base * Math.max(0.40, blended);
  }

  // ════════════════════════════════════════════════════
  // FACTEURS PAR RÔLE
  //
  // Clés courtes dans FATIGUE_DATA : 'p' | 's' | 't'
  //   p = primary    → dose pleine
  //   s = secondary  → ~45 % de la dose
  //   t = stabilizer → ~18 % (contraction isométrique)
  //
  // Accepte aussi les noms complets pour compatibilité.
  // ════════════════════════════════════════════════════
  const ROLE_FACTORS = {
    p: 1.00, primary:    1.00,
    s: 0.45, secondary:  0.45,
    t: 0.18, stabilizer: 0.18,
  };

  // ════════════════════════════════════════════════════
  // DOSE DE BASE (points)
  //
  // Référence : muscle PRIMARY à 100 % d'activation,
  // volume standard = 3 séries × 10 reps.
  // Calibration :
  //   PECT_MAJ_STER en développé couché prise large, 3×8
  //   → 0.85 × 1.0 × 0.80 × 80 = 54 pts → état "modéré"
  //   Séance complète poitrine (4 exos) → ~180–220 pts
  //   → récup 4–5 jours réaliste
  // ════════════════════════════════════════════════════
  const BASE_DOSE = 80;

  // ════════════════════════════════════════════════════
  // CLASSIFICATION (affichage uniquement)
  // La fatigue interne peut dépasser 100 (overreaching).
  // L'affichage est plafonné visuellement à "Saturé".
  // ════════════════════════════════════════════════════
  const THRESHOLDS = [
    { max:  15, level: 'fresh',    label: 'Frais',   color: '#3dffa0' },
    { max:  35, level: 'light',    label: 'Léger',   color: '#a8ff78' },
    { max:  55, level: 'moderate', label: 'Modéré',  color: '#ffd166' },
    { max:  75, level: 'heavy',    label: 'Chargé',  color: '#ffaa3d' },
    { max: Infinity, level: 'critical', label: 'Saturé', color: '#ff5252' },
  ];

  // ─── STOCKAGE ─────────────────────────────────────
  // Format : { MUSCLE_ID: { base: Number, ts: Number } }
  // base = fatigue au moment de ts. Valeur courante = decay(base, now-ts, t½)
  // Pas de plafond sur base — peut dépasser 100.

  function _load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch { return {}; }
  }
  function _save(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // ════════════════════════════════════════════════════
  // DÉCROISSANCE EXPONENTIELLE
  //
  //   f(t) = base × e^(−λ × t_heures)
  //   λ = ln(2) / t½
  //
  // Propriétés :
  //   f(t½)   = base / 2        (demi-vie)
  //   f(2×t½) ≈ base / 4
  //   f → 0 asymptotiquement
  //   Fonctionne pour base > 100 (overreaching)
  // ════════════════════════════════════════════════════
  function decay(base, elapsedMs, halfLifeH) {
    if (base <= 0) return 0;
    const h = elapsedMs / 3_600_000;
    return base * Math.exp(-(Math.LN2 / halfLifeH) * h);
  }

  // ════════════════════════════════════════════════════
  // FACTEUR VOLUME
  //
  // Référence = 3 × 10 reps (factor = 1.0)
  // Plage : 0.3 (séance très légère) → ∞ (aucune limite)
  //
  // Bonus intensité : si RIR renseigné et avgRIR ≤ 2 → +15%
  //
  // Exemples réels :
  //   3×8          → 0.80
  //   3×10         → 1.00
  //   5×5          → 0.83
  //   4×8  RIR 1   → 1.23
  //   4×12 RIR 0   → 1.84
  //   6×10         → 2.00  ← séance volumineuse
  // ════════════════════════════════════════════════════
  function calcVolumeFactor(sets) {
    if (!sets || sets.length === 0) return 0;
    const n = sets.length;
    const avgReps = sets.reduce((s, x) => s + (x.reps || 0), 0) / n;
    const raw = (n * avgReps) / 30;
    const rirsRecorded = sets.filter(x => x.rir != null);
    const intensityBonus = (rirsRecorded.length > 0 &&
      rirsRecorded.reduce((s, x) => s + x.rir, 0) / rirsRecorded.length <= 2)
      ? 1.15 : 1.0;
    return Math.max(0.3, raw * intensityBonus);
    // Pas de plafond supérieur — 4 exos de 4×12 → factor élevé → fatigue élevée → récup longue
  }

  // ════════════════════════════════════════════════════
  // CALCUL DES DOSES
  //
  //   dose = (percent / 100) × role_factor × vol_factor × BASE_DOSE
  //
  // Note : percent peut être > 100 (ex. LAT tractions = 125%)
  // C'est normal en EMG dynamique — le muscle peut dépasser
  // sa contraction isométrique maximale via les synergies.
  // On conserve la valeur réelle sans clamper.
  // ════════════════════════════════════════════════════
  function calcDoses(activation, sets) {
    const vf = calcVolumeFactor(sets);
    const gf = _goalFactor();
    const doses = {};
    for (const [id, data] of Object.entries(activation)) {
      const rf = ROLE_FACTORS[data.r ?? data.role] ?? ROLE_FACTORS.t;
      const dose = (data.p ?? data.percent) / 100 * rf * vf * BASE_DOSE * gf;
      doses[id] = Math.round(dose * 10) / 10;
    }
    return doses;
  }

  // ════════════════════════════════════════════════════
  // APPLICATION DES DOSES (accumulation sans plafond)
  //
  // Pour chaque muscle :
  //   1. Lire base + ts → calculer fatigue courante via decay()
  //   2. Additionner la dose
  //   3. Stocker { base: current + dose, ts }
  //
  // v2.1 : utilise _effectiveHalfLife() pour la sensibilité
  //        différenciée par groupe musculaire.
  // ════════════════════════════════════════════════════
  function applyDoses(doses, atTime) {
    const ts  = atTime ?? Date.now();
    const state = _load();
    const pm  = _profileMultiplier();
    for (const [id, dose] of Object.entries(doses)) {
      if (dose <= 0) continue;
      const hl = _effectiveHalfLife(id, pm);
      let current = 0;
      if (state[id]) current = decay(state[id].base, ts - state[id].ts, hl);
      state[id] = { base: Math.round((current + dose) * 10) / 10, ts };
    }
    _save(state);
  }

  // ─── LECTURE ──────────────────────────────────────

  function get(muscleId) {
    const state = _load();
    const rec = state[muscleId];
    if (!rec || rec.base <= 0) return 0;
    const hl = _effectiveHalfLife(muscleId, _profileMultiplier());
    return Math.round(decay(rec.base, Date.now() - rec.ts, hl) * 10) / 10;
  }

  function getAll() {
    const state = _load();
    const now = Date.now();
    const pm  = _profileMultiplier();
    const result = {};
    for (const [id, rec] of Object.entries(state)) {
      if (!rec || rec.base <= 0) { result[id] = 0; continue; }
      const hl = _effectiveHalfLife(id, pm);
      result[id] = Math.round(decay(rec.base, now - rec.ts, hl) * 10) / 10;
    }
    return result;
  }

  /**
   * Fatigue estimée dans X heures (pour afficher "récupéré à X% dans Yh")
   */
  function getFutureAt(muscleId, inHours) {
    const current = get(muscleId);
    if (current <= 0) return 0;
    const hl = _effectiveHalfLife(muscleId, _profileMultiplier());
    return Math.round(decay(current, inHours * 3_600_000, hl) * 10) / 10;
  }

  /**
   * Heures restantes pour passer sous un seuil cible.
   * Retourne null si déjà en dessous du seuil.
   * Formule inverse : t = −t½ / ln(2) × ln(target / current)
   */
  function getHoursToRecover(muscleId, targetFatigue = 20) {
    const current = get(muscleId);
    if (current <= targetFatigue) return null;
    const hl = _effectiveHalfLife(muscleId, _profileMultiplier());
    return Math.round((-hl / Math.LN2) * Math.log(targetFatigue / current) * 10) / 10;
  }

  // ─── CLASSIFICATION ───────────────────────────────

  function classify(f) {
    return THRESHOLDS.find(t => f < t.max) ?? THRESHOLDS.at(-1);
  }

  // ─── UTILITAIRES ──────────────────────────────────

  function reset() { localStorage.removeItem(STORAGE_KEY); }

  function debugDump() {
    const state = _load();
    const now = Date.now();
    const pm  = _profileMultiplier();
    return Object.entries(state).map(([id, rec]) => {
      const hl      = _effectiveHalfLife(id, pm);
      const current = rec ? Math.round(decay(rec.base, now - rec.ts, hl)) : 0;
      const { level, label } = classify(current);
      const hoursTo20 = getHoursToRecover(id, 20);
      const sens = RECOVERY_SENSITIVITY[id] ?? DEFAULT_SENSITIVITY;
      const blended = Math.round((1 + (pm - 1) * sens) * 1000) / 1000;
      return {
        id,
        base: rec?.base,
        current,
        level,
        label,
        hoursTo20,
        sensitivity: sens,
        blended_pm: blended,
        hl_base: HALF_LIVES[id] ?? DEFAULT_HALF_LIFE,
        hl_effective: Math.round(hl * 10) / 10,
      };
    }).sort((a, b) => b.current - a.current);
  }

  // ─── API PUBLIQUE ──────────────────────────────────
  return {
    HALF_LIVES, RECOVERY_SENSITIVITY, ROLE_FACTORS, BASE_DOSE, THRESHOLDS,
    decay, calcVolumeFactor, calcDoses,
    get, getAll, getFutureAt, getHoursToRecover, classify,
    applyDoses, reset, debugDump,
    // Exposé pour tests et UI
    effectiveHalfLife: _effectiveHalfLife,
  };

})();
