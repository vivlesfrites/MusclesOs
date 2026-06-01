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
// v2.1 : facteur d'intensité relative (%1RM).
//   • calcIntensityFactor(weight, best1RM) → multiplicateur
//     basé sur la charge relative (Schoenfeld et al., 2017).
//   • calcDoses() accepte un 3e paramètre optionnel intensityFactor.
//   • Séries d'échauffement : intensityFactor = 0.25 (appelé depuis HTML).
//   • Sans données 1RM → intensityFactor = 1.0 (rétrocompatibilité).
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
  // FACTEUR D'INTENSITÉ RELATIVE (%1RM)
  //
  // Modèle : factor = clamp(0.3, (rel / 0.75)^1.2, 1.8)
  //   rel = weight / best1RM
  //   Référence calibrée à 75% du 1RM → factor = 1.0
  //
  // Exemples :
  //   40% 1RM → ~0.47  (échauffement léger)
  //   60% 1RM → ~0.76  (endurance / volume)
  //   75% 1RM → 1.00   (référence)
  //   85% 1RM → ~1.16  (hypertrophie lourde)
  //   90% 1RM → ~1.24  (force)
  //  100% 1RM → ~1.41  (charge maximale)
  //
  // Cas dégénérés :
  //   weight = 0 (poids du corps) → 1.0 (pas de référence charge)
  //   best1RM manquant ou nul     → 1.0 (rétrocompatibilité)
  //
  // Référence :
  //   Schoenfeld, B.J. et al. (2017). Dose-response relationship
  //   between weekly resistance training volume and increases in
  //   muscle mass. J Strength Cond Res, 31(12), 3508–3523.
  // ════════════════════════════════════════════════════
  function calcIntensityFactor(weight, best1RM) {
    if (!best1RM || best1RM <= 0 || !weight || weight <= 0) return 1.0;
    const rel = weight / best1RM;
    return Math.min(1.8, Math.max(0.3, Math.pow(rel / 0.75, 1.2)));
  }

  // ════════════════════════════════════════════════════
  // CALCUL DES DOSES
  //
  //   dose = (percent / 100) × role_factor × vol_factor
  //          × intensity_factor × BASE_DOSE × goal_factor
  //
  // intensityFactor (optionnel, défaut 1.0) :
  //   → calculé via calcIntensityFactor() depuis muscleos.html
  //   → 0.25 pour les séries d'échauffement (warmup=true)
  //
  // Note : percent peut être > 100 (ex. LAT tractions = 125%)
  // C'est normal en EMG dynamique — le muscle peut dépasser
  // sa contraction isométrique maximale via les synergies.
  // On conserve la valeur réelle sans clamper.
  // ════════════════════════════════════════════════════
  function calcDoses(activation, sets, intensityFactor = 1.0) {
    const vf = calcVolumeFactor(sets);
    const gf = _goalFactor();
    const doses = {};
    for (const [id, data] of Object.entries(activation)) {
      const rf = ROLE_FACTORS[data.r ?? data.role] ?? ROLE_FACTORS.t;
      const dose = (data.p ?? data.percent) / 100 * rf * vf * intensityFactor * BASE_DOSE * gf;
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
  // Pas de min(100, ...) — 4 exos de poitrine → ~180–220 pts
  // pour PECT_MAJ_STER. La récup sera proportionnellement
  // plus longue, ce qui est physiologiquement correct.
  // ════════════════════════════════════════════════════
  function applyDoses(doses, atTime) {
    const ts = atTime ?? Date.now();
    const state = _load();
    const pm = _profileMultiplier();
    for (const [id, dose] of Object.entries(doses)) {
      if (dose <= 0) continue;
      const hl = (HALF_LIVES[id] ?? DEFAULT_HALF_LIFE) * pm;
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
    const hl = (HALF_LIVES[muscleId] ?? DEFAULT_HALF_LIFE) * _profileMultiplier();
    return Math.round(decay(rec.base, Date.now() - rec.ts, hl) * 10) / 10;
  }

  function getAll() {
    const state = _load();
    const now = Date.now();
    const pm = _profileMultiplier();
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
    const hl = (HALF_LIVES[muscleId] ?? DEFAULT_HALF_LIFE) * _profileMultiplier();
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
    const hl = (HALF_LIVES[muscleId] ?? DEFAULT_HALF_LIFE) * _profileMultiplier();
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
    const pm = _profileMultiplier();
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
    decay, calcVolumeFactor, calcIntensityFactor, calcDoses,
    get, getAll, getFutureAt, getHoursToRecover, classify,
    applyDoses, reset, debugDump,
  };

})();
