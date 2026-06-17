'use strict';

// ════════════════════════════════════════════════════
// MUSCLEOS — FATIGUE ENGINE v2.2
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
// v2.1 : paramètre hlScale dans applyDoses.
//   • Permet aux activités cardio/endurance de déclarer leurs
//     propres vitesses de récupération (fibres type I >> muscu).
//   • ACTIVITY_FATIGUE profiles ajoutent recovery_scale (0.0–1.0).
//   • hlScale = 1.0 par défaut → rétrocompatibilité totale.
//
// v2.2 : adaptation progressive (CTL — Chronic Training Load).
//   • CTL par muscle : accumulation pondérée sur 42j (demi-vie 42j).
//   • Multiplicateur d'adaptation [0.6–1.4] appliqué aux doses :
//       - Débutant / longue pause → ×1.4 (plus de fatigue)
//       - Entraîné régulier      → ×1.0 (référence)
//       - Athlète consistant     → ×0.6 (adaptation structurelle)
//   • CTL_REF par muscle : calibré sur dose 2×/semaine en régime
//     permanent (facteur géométrique 12.5 × dose_référence).
//   • seedCTL() : injection d'un historique virtuel depuis
//     USER_PROFILE.training_level + familiarité par exercice.
//   • Stockage séparé localStorage 'muscleos_ctl'.
//
//   ⚠️ Calibration à revoir après 6-8 semaines de données
//      réelles (voir SKILL.md §14 TODOs).
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

  // ════════════════════════════════════════════════════
  // FACTEUR DYNAMIQUE DE RÉCUPÉRATION (sommeil récent)
  //
  // Multiplie le multiplicateur de profil UNIQUEMENT à la lecture
  // (get/getAll/getFutureAt/getHoursToRecover/debugDump).
  // applyDoses() conserve le multiplicateur statique → l'historique
  // n'est pas réécrit. Borné et > 0 → pas de risque d'overflow.
  //   > 1.0 : récupération ralentie (sommeil récent < norme)
  //   < 1.0 : récupération accélérée (sommeil récent > norme)
  // Piloté par l'app via setSleepRecovery().
  // ════════════════════════════════════════════════════
  let _dynamicRecovery = 1.0;
  function setSleepRecovery(factor) {
    _dynamicRecovery = (typeof factor === 'number' && factor > 0 && Number.isFinite(factor))
      ? factor : 1.0;
  }
  function _readMultiplier() { return _profileMultiplier() * _dynamicRecovery; }

  function _goalFactor() {
    if (typeof USER_PROFILE !== 'undefined') return USER_PROFILE.getGoalFactor();
    return 1.0;
  }

  // ════════════════════════════════════════════════════
  // DEMI-VIES DE RÉCUPÉRATION (heures)
  //
  // Modèle exponentiel : t½ = temps pour récupérer 50 %
  // de la fatigue accumulée à un instant t.
  //
  // Références :
  //   Zatsiorsky & Kraemer (2006) Science and Practice
  //   of Strength Training, 2e éd., Human Kinetics.
  //   Helms, E. et al. (2017). Evidence-Based Resistance
  //   Training Recommendations. Strength & Cond. J.
  //   MacDougall & Sale (2014). Physiology of Sport
  //   and Exercise (Wilmore, Costill & Kenney).
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
  // CTL — CHRONIC TRAINING LOAD
  //
  // Modèle inspiré de Banister (1975) et du PMC cyclisme.
  //
  // Principe :
  //   Le même volume génère moins de fatigue quand le muscle
  //   est entraîné régulièrement (adaptation structurelle,
  //   résilience des fibres, efficacité neuromusculaire).
  //
  // Implémentation :
  //   CTL = charge chronique par muscle, demi-vie 42 jours.
  //   Multiplicateur d'adaptation = f(CTL / CTL_ref) ∈ [0.6, 1.4].
  //
  //   Formule : adaptation = max(0.6, 0.6 + 0.8 × e^(−ln2 × CTL/CTL_ref))
  //     CTL = 0        → ×1.4 (débutant / pause longue)
  //     CTL = CTL_ref  → ×1.0 (entraîné 2×/sem, régime permanent)
  //     CTL = 2×CTLref → ×0.8
  //     CTL → ∞        → ×0.6 (plancher)
  //
  // CTL_ref par muscle :
  //   Valeur de référence = CTL en régime permanent à 2 séances/semaine.
  //   Calculé sur la taille du muscle (proxy = demi-vie) :
  //     hl ≥ 70h  → grands muscles composés → ref 700
  //     hl 50-69h → muscles larges           → ref 600
  //     hl 40-49h → muscles moyens           → ref 450
  //     hl < 40h  → petits / isolation       → ref 300
  //
  //   ⚠️ À recalibrer après 6-8 semaines de données réelles.
  // ════════════════════════════════════════════════════
  const CTL_KEY           = 'muscleos_ctl';
  const CTL_HALF_LIFE_H   = 1008; // 42 jours × 24h

  const CTL_REF = {
    // ── Grands muscles composés (hl ≥ 70h) → ref 700
    LUMBAR:             700,
    MULTIFIDUS:         700,
    GLUTE_MAX:          700,
    QUAD_RECT:          700,
    QUAD_VAST_MED:      700,
    QUAD_VAST_LAT:      700,
    HAMSTRING_BF_LONG:  700,
    HAMSTRING_ST:       700,
    HAMSTRING_SM:       700,

    // ── Muscles larges (hl 50-69h) → ref 600
    LAT:                600,
    PECT_MAJ_STER:      600,
    PECT_MAJ_CLAV:      600,
    GLUTE_MED:          600,
    HAMSTRING_BF_COURT: 600,
    ADDUCTOR:           600,
    QUAD_VAST_INT:      600,

    // ── Muscles moyens (hl 40-54h) → ref 450
    TERES_MAJ:          450,
    GLUTE_MIN:          450,
    CORE_RECT_SUP:      450,
    CORE_RECT_INF:      450,
    CORE_OBL_EXT:       450,
    CORE_OBL_INT:       450,
    HIP_FLEX:           450,
    TRAP_MED:           450,
    TRAP_INF:           450,
    RHOMBOID:           450,
    PECT_MIN:           450,
    DELT_ANT:           450,
    DELT_MED:           450,
    DELT_POST:          450,
    INFRA:              450,
    SUPRASPIN:          450,
    SUBSCAP:            450,
    TERES_MIN:          450,
    TRAP_SUP:           450,
    SERR_ANT:           450,
    BICEP_LONG:         450,
    BICEP_COURT:        450,
    TRICEP_LONG:        450,
    TRICEP_LAT:         450,
    TRICEP_MED:         450,
    GASTRO_MED:         450,
    GASTRO_LAT:         450,
    PERONEAL:           450,
    CORE_TRANS:         450,

    // ── Petits muscles / isolation (hl ≤ 40h) → ref 300
    BRACHIAL:           300,
    BRACHIORAD:         300,
    SOLEUS:             300,
    FOREARM_EXT:        300,
    FOREARM_FLEX_SUP:   300,
    TIB_ANT:            300,
  };
  const DEFAULT_CTL_REF = 450;

  // ─── STOCKAGE CTL ─────────────────────────────────
  function _loadCTL() {
    try { return JSON.parse(localStorage.getItem(CTL_KEY) || '{}'); }
    catch { return {}; }
  }
  function _saveCTL(state) { localStorage.setItem(CTL_KEY, JSON.stringify(state)); }

  function resetCTL() { localStorage.removeItem(CTL_KEY); }

  // ─── LECTURE CTL ──────────────────────────────────

  /**
   * CTL actuel d'un muscle (avec décroissance depuis dernier update).
   */
  function getCTL(muscleId) {
    const rec = _loadCTL()[muscleId];
    if (!rec || rec.ctl <= 0) return 0;
    return Math.round(decay(rec.ctl, Date.now() - rec.ts, CTL_HALF_LIFE_H) * 10) / 10;
  }

  /**
   * Tous les CTL actuels { MUSCLE_ID: valeur }.
   */
  function getAllCTL() {
    const state = _loadCTL();
    const now   = Date.now();
    const out   = {};
    for (const [id, rec] of Object.entries(state)) {
      out[id] = rec?.ctl > 0
        ? Math.round(decay(rec.ctl, now - rec.ts, CTL_HALF_LIFE_H) * 10) / 10
        : 0;
    }
    return out;
  }

  /**
   * Multiplicateur d'adaptation pour un muscle [0.6 – 1.4].
   * 1.4 = aucun historique / longue pause
   * 1.0 = CTL = CTL_ref (entraîné 2×/semaine en régime permanent)
   * 0.6 = très entraîné (plancher)
   */
  function getAdaptationMultiplier(muscleId) {
    const ctl = getCTL(muscleId);
    const ref = CTL_REF[muscleId] ?? DEFAULT_CTL_REF;
    return Math.max(0.6, 0.6 + 0.8 * Math.exp(-Math.LN2 * ctl / ref));
  }

  /**
   * Injecte un CTL virtuel pour amorcer l'historique d'un muscle.
   * Utilisé par rebuildFatigue() pour le profil + la familiarité.
   *
   * @param {string}  muscleId
   * @param {number}  seedFactor — multiple de CTL_ref :
   *    0.0 = débutant (pas de boost)
   *    0.5 = intermédiaire
   *    1.0 = avancé (CTL = CTL_ref → mult 1.0)
   *    2.0 = élite    (mult ≈ 0.8)
   * @param {number}  atTime — timestamp (injection dans le passé)
   */
  function seedCTL(muscleId, seedFactor, atTime) {
    if (!seedFactor || seedFactor <= 0) return;
    const ts  = atTime ?? Date.now();
    const ref = CTL_REF[muscleId] ?? DEFAULT_CTL_REF;
    const state = _loadCTL();
    const existing = state[muscleId]
      ? decay(state[muscleId].ctl, ts - state[muscleId].ts, CTL_HALF_LIFE_H)
      : 0;
    const seeded = Math.max(existing, ref * seedFactor);
    state[muscleId] = { ctl: Math.round(seeded * 10) / 10, ts };
    _saveCTL(state);
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
    if (!(base > 0)) return 0;                       // gère 0, négatif, NaN
    // ⚠ Garde anti-amplification : un temps écoulé NÉGATIF (dose appliquée
    // dans le désordre, ts antérieur à l'état stocké) produirait exp(+λh)
    // → explosion exponentielle. On borne à 0 : la fatigue ne « remonte »
    // jamais dans le temps. (Bug QUAD_RECT 4.7e24 — rejeu anti-chronologique.)
    const h = Math.max(0, elapsedMs) / 3_600_000;
    const v = base * Math.exp(-(Math.LN2 / halfLifeH) * h);
    return Number.isFinite(v) ? v : 0;               // garde-fou Infinity/NaN
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
  // ════════════════════════════════════════════════════
  // APPLICATION DES DOSES (accumulation sans plafond)
  //
  // Pour chaque muscle :
  //   1. Décroissance CTL depuis dernier update → mult adaptation
  //   2. Décroissance fatigue depuis dernier update
  //   3. dose_effective = dose_brute × adaptation_mult
  //   4. Stocker fatigue += dose_effective
  //   5. Stocker CTL    += dose_brute  (le travail effectué, pas la fatigue)
  //
  // hlScale (optionnel, défaut 1.0) :
  //   Réduit les demi-vies pour les activités aérobies.
  //   Voir ACTIVITY_FATIGUE[actType].recovery_scale.
  //
  // applyAdaptation (optionnel, défaut true) :
  //   false → dose appliquée sans réduction (calibration, debug).
  // ════════════════════════════════════════════════════
  function applyDoses(doses, atTime, hlScale = 1.0, applyAdaptation = true) {
    const ts     = atTime ?? Date.now();
    const state  = _load();
    const ctlSt  = _loadCTL();
    const pm     = _profileMultiplier();
    const scale  = (typeof hlScale === 'number' && hlScale > 0) ? hlScale : 1.0;

    for (const [id, rawDose] of Object.entries(doses)) {
      if (rawDose <= 0) continue;

      // ── CTL : décroissance + multiplicateur d'adaptation ──
      const ref     = CTL_REF[id] ?? DEFAULT_CTL_REF;
      const ctlRec  = ctlSt[id];
      const prevCtl = ctlRec
        ? decay(ctlRec.ctl, ts - ctlRec.ts, CTL_HALF_LIFE_H)
        : 0;
      const adaptMult = applyAdaptation
        ? Math.max(0.6, 0.6 + 0.8 * Math.exp(-Math.LN2 * prevCtl / ref))
        : 1.0;

      // ── Dose effective (fatigue perçue, modulée par adaptation) ──
      const dose = rawDose * adaptMult;

      // ── Mise à jour CTL (dose BRUTE — mesure le travail, pas la fatigue) ──
      ctlSt[id] = { ctl: Math.round((prevCtl + rawDose) * 10) / 10, ts };

      // ── Mise à jour fatigue ──
      const hl = (HALF_LIVES[id] ?? DEFAULT_HALF_LIFE) * pm * scale;
      let current = 0;
      if (state[id]) current = decay(state[id].base, ts - state[id].ts, hl);
      state[id] = { base: Math.round((current + dose) * 10) / 10, ts };
    }

    _save(state);
    _saveCTL(ctlSt);
  }

  // ─── LECTURE ──────────────────────────────────────

  function get(muscleId) {
    const state = _load();
    const rec = state[muscleId];
    if (!rec || rec.base <= 0) return 0;
    const hl = (HALF_LIVES[muscleId] ?? DEFAULT_HALF_LIFE) * _readMultiplier();
    return Math.round(decay(rec.base, Date.now() - rec.ts, hl) * 10) / 10;
  }

  function getAll() {
    const state = _load();
    const now = Date.now();
    const pm = _readMultiplier();
    const result = {};
    for (const [id, rec] of Object.entries(state)) {
      if (!rec || rec.base <= 0) { result[id] = 0; continue; }
      const hl = (HALF_LIVES[id] ?? DEFAULT_HALF_LIFE) * pm;
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
    const hl = (HALF_LIVES[muscleId] ?? DEFAULT_HALF_LIFE) * _readMultiplier();
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
    const hl = (HALF_LIVES[muscleId] ?? DEFAULT_HALF_LIFE) * _readMultiplier();
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
    const pm = _readMultiplier();
    return Object.entries(state).map(([id, rec]) => {
      const hl = (HALF_LIVES[id] ?? DEFAULT_HALF_LIFE) * pm;
      const current = rec ? Math.round(decay(rec.base, now - rec.ts, hl)) : 0;
      const { level, label } = classify(current);
      const hoursTo20 = getHoursToRecover(id, 20);
      return { id, base: rec?.base, current, level, label, hoursTo20, hl_effective: Math.round(hl * 10) / 10 };
    }).sort((a, b) => b.current - a.current);
  }

  // ─── API PUBLIQUE ──────────────────────────────────
  return {
    HALF_LIVES, ROLE_FACTORS, BASE_DOSE, THRESHOLDS,
    CTL_REF, CTL_HALF_LIFE_H,
    decay, calcVolumeFactor, calcDoses,
    get, getAll, getFutureAt, getHoursToRecover, classify,
    applyDoses, reset, debugDump, setSleepRecovery,
    // CTL — adaptation progressive
    getCTL, getAllCTL, getAdaptationMultiplier, seedCTL,
    resetCTL,
  };

})();
