// ════════════════════════════════════════════════════
// ACTIVITÉS — Catalogue + profils de fatigue
// Sources : Lieberman (2020) Exercised ; Buchheit & Laursen
// (2013) High-Intensity Interval Training ; Stolen et al.
// (2005) Physiology of Soccer ; Mohr et al. (2003) Match
// performance of high-standard soccer players.
// ════════════════════════════════════════════════════
const ACTIVITY_CATALOG = {
  // ── Course à pied ──
  running:           { label: 'Sortie libre',        icon: '↗', color: '#5ba3ff', group: 'running' },
  running_recovery:  { label: 'Récupération active',icon: '↺', color: '#8892a4', group: 'running' },
  running_easy:      { label: 'Course facile',      icon: '↗', color: '#7bc5ff', group: 'running' },
  running_long:      { label: 'Sortie longue',      icon: '↗', color: '#3dffa0', group: 'running' },
  running_tempo:     { label: 'Tempo / Seuil',      icon: '↗', color: '#ffd166', group: 'running' },
  running_intervals: { label: 'Fractionné',         icon: '↯', color: '#ffaa3d', group: 'running' },
  running_race:      { label: 'Compétition',        icon: '★', color: '#ff5252', group: 'running' },
  // ── Autres activités ──
  velo:              { label: 'Vélo',               icon: '⊙', color: '#3dffa0', group: 'other', hasDistance: true },
  natation:          { label: 'Natation',           icon: '∿', color: '#5ba3ff', group: 'other', hasDistance: true },
  sport_collectif:   { label: 'Sport collectif',    icon: '⬡', color: '#ffaa3d', group: 'other' },
  yoga:              { label: 'Yoga / Mobilité',    icon: '◯', color: '#c084fc', group: 'other' },
  autre:             { label: 'Autre activité',     icon: '◈', color: '#8892a4', group: 'other' },
};

// Groupes d'affichage step 4
const ACTIVITY_GROUPS = [
  { label: 'Course à pied', keys: ['running','running_recovery','running_easy','running_long','running_tempo','running_intervals','running_race'] },
  { label: 'Autres activités', keys: ['velo','natation','sport_collectif','yoga','autre'] },
];

// Profils de fatigue musculaire par activité.
// base_dose = points de référence à 60 min, intensité 5/10.
// Dose réelle = base_dose × (activation/100) × role_factor × (duration/60) × (intensity/5)
// role_factors : p=1.0, s=0.45, t=0.18
const ACTIVITY_FATIGUE = {
  // ── Sortie libre (profil modéré, fallback) ──
  running: {
    base_dose: 35,
    recovery_scale: 0.40,   // Zone 2-3 mixte — fibres I dominantes
    muscles: {
      GASTRO_MED:        { p: 55, r: 'p' },
      GASTRO_LAT:        { p: 50, r: 'p' },
      SOLEUS:            { p: 60, r: 'p' },
      HAMSTRING_BF_LONG: { p: 45, r: 'p' },
      HAMSTRING_ST:      { p: 40, r: 's' },
      GLUTE_MED:         { p: 40, r: 'p' },
      GLUTE_MAX:         { p: 35, r: 's' },
      QUAD_VAST_LAT:     { p: 35, r: 's' },
      QUAD_VAST_MED:     { p: 35, r: 's' },
      QUAD_RECT:         { p: 30, r: 's' },
      HIP_FLEX:          { p: 30, r: 's' },
      PERONEAL:          { p: 35, r: 's' },
      CORE_TRANS:        { p: 20, r: 't' },
    }
  },
  // ── Récupération active (Zone 1 — ~55-65% FCmax) ──
  // Quasi nul, fibres lentes uniquement, flux sanguin
  running_recovery: {
    base_dose: 12,
    recovery_scale: 0.22,   // Zone 1 — fibres lentes uniquement, récup très rapide
    muscles: {
      SOLEUS:            { p: 40, r: 'p' },
      GASTRO_MED:        { p: 28, r: 'p' },
      GASTRO_LAT:        { p: 22, r: 'p' },
      GLUTE_MED:         { p: 20, r: 's' },
      HAMSTRING_BF_LONG: { p: 18, r: 's' },
      HIP_FLEX:          { p: 15, r: 's' },
      PERONEAL:          { p: 18, r: 's' },
    }
  },
  // ── Course facile / Endurance fondamentale (Zone 2 — ~65-75% FCmax) ──
  // Slow-twitch dominant, base aérobie
  running_easy: {
    base_dose: 22,
    recovery_scale: 0.32,   // Zone 2 — slow-twitch dominant, récup ~12-14h
    muscles: {
      SOLEUS:            { p: 55, r: 'p' },
      GASTRO_MED:        { p: 45, r: 'p' },
      GASTRO_LAT:        { p: 40, r: 'p' },
      GLUTE_MED:         { p: 35, r: 'p' },
      HAMSTRING_BF_LONG: { p: 35, r: 's' },
      HAMSTRING_ST:      { p: 28, r: 's' },
      GLUTE_MAX:         { p: 22, r: 's' },
      QUAD_VAST_LAT:     { p: 22, r: 's' },
      QUAD_VAST_MED:     { p: 22, r: 's' },
      HIP_FLEX:          { p: 25, r: 's' },
      PERONEAL:          { p: 28, r: 's' },
      CORE_TRANS:        { p: 15, r: 't' },
    }
  },
  // ── Sortie longue (Zone 2 prolongé — stress cumulatif tendino-ligamentaire) ──
  // Soleus+++ / Glute Med+++ (milliers de foulées) / Hip Flex cumulatif (psoas)
  running_long: {
    base_dose: 28,
    recovery_scale: 0.42,   // Zone 2 prolongé — stress mécanique cumulatif (tendons)
    muscles: {
      SOLEUS:            { p: 62, r: 'p' },
      GASTRO_MED:        { p: 50, r: 'p' },
      GASTRO_LAT:        { p: 45, r: 'p' },
      GLUTE_MED:         { p: 52, r: 'p' },
      HIP_FLEX:          { p: 45, r: 'p' },
      HAMSTRING_BF_LONG: { p: 45, r: 's' },
      HAMSTRING_ST:      { p: 35, r: 's' },
      GLUTE_MAX:         { p: 30, r: 's' },
      QUAD_VAST_LAT:     { p: 28, r: 's' },
      QUAD_VAST_MED:     { p: 28, r: 's' },
      QUAD_RECT:         { p: 25, r: 's' },
      PERONEAL:          { p: 35, r: 's' },
      CORE_TRANS:        { p: 20, r: 't' },
    }
  },
  // ── Tempo / Seuil (Zone 3-4 — ~75-88% FCmax) ──
  // Quad + Hip Flex élevés, effort soutenu au seuil lactique
  running_tempo: {
    base_dose: 45,
    recovery_scale: 0.55,   // Zone 3-4 — fibres IIa impliquées, récup ~24-30h
    muscles: {
      SOLEUS:            { p: 58, r: 'p' },
      GASTRO_MED:        { p: 55, r: 'p' },
      GASTRO_LAT:        { p: 50, r: 'p' },
      HAMSTRING_BF_LONG: { p: 50, r: 'p' },
      QUAD_VAST_LAT:     { p: 45, r: 'p' },
      QUAD_VAST_MED:     { p: 45, r: 'p' },
      GLUTE_MAX:         { p: 42, r: 's' },
      GLUTE_MED:         { p: 40, r: 's' },
      HIP_FLEX:          { p: 42, r: 's' },
      QUAD_RECT:         { p: 38, r: 's' },
      HAMSTRING_ST:      { p: 35, r: 's' },
      PERONEAL:          { p: 35, r: 's' },
      CORE_TRANS:        { p: 22, r: 't' },
    }
  },
  // ── Fractionné / Intervalles (Zone 5 — >90% FCmax) ──
  // Fibres rapides IIa/IIx, stress neuromusculaire maximal
  // Hamstring BF excentrique+++ (freinage à haute vitesse — clé biomécanique)
  running_intervals: {
    base_dose: 60,
    recovery_scale: 0.68,   // Zone 5 — fibres IIx + stress excentrique (hamstrings)
    muscles: {
      GASTRO_MED:        { p: 65, r: 'p' },
      GASTRO_LAT:        { p: 60, r: 'p' },
      SOLEUS:            { p: 58, r: 'p' },
      HAMSTRING_BF_LONG: { p: 62, r: 'p' },
      GLUTE_MAX:         { p: 58, r: 'p' },
      HIP_FLEX:          { p: 55, r: 'p' },
      QUAD_VAST_LAT:     { p: 52, r: 'p' },
      QUAD_VAST_MED:     { p: 52, r: 'p' },
      QUAD_RECT:         { p: 48, r: 's' },
      GLUTE_MED:         { p: 45, r: 's' },
      HAMSTRING_ST:      { p: 42, r: 's' },
      PERONEAL:          { p: 40, r: 's' },
      CORE_TRANS:        { p: 32, r: 's' },
      CORE_OBL_EXT:      { p: 22, r: 't' },
    }
  },
  // ── Compétition / Race — effort maximal soutenu ──
  running_race: {
    base_dose: 65,
    recovery_scale: 0.72,   // Race — effort maximal, plus proche du stress muscu excentrique
    muscles: {
      GASTRO_MED:        { p: 65, r: 'p' },
      GASTRO_LAT:        { p: 60, r: 'p' },
      SOLEUS:            { p: 62, r: 'p' },
      HAMSTRING_BF_LONG: { p: 62, r: 'p' },
      GLUTE_MAX:         { p: 58, r: 'p' },
      HIP_FLEX:          { p: 58, r: 'p' },
      QUAD_VAST_LAT:     { p: 55, r: 'p' },
      QUAD_VAST_MED:     { p: 55, r: 'p' },
      QUAD_RECT:         { p: 50, r: 's' },
      GLUTE_MED:         { p: 48, r: 's' },
      HAMSTRING_ST:      { p: 45, r: 's' },
      PERONEAL:          { p: 42, r: 's' },
      CORE_TRANS:        { p: 35, r: 's' },
      CORE_OBL_EXT:      { p: 25, r: 't' },
    }
  },
  velo: {
    base_dose: 40,
    recovery_scale: 0.35,   // Concentrique pur, pas d'excentrique → récup rapide
    muscles: {
      QUAD_VAST_LAT:     { p: 65, r: 'p' },
      QUAD_VAST_MED:     { p: 65, r: 'p' },
      QUAD_VAST_INT:     { p: 55, r: 'p' },
      QUAD_RECT:         { p: 60, r: 'p' },
      GLUTE_MAX:         { p: 50, r: 'p' },
      GLUTE_MED:         { p: 30, r: 's' },
      HAMSTRING_BF_LONG: { p: 35, r: 's' },
      HAMSTRING_ST:      { p: 30, r: 's' },
      GASTRO_MED:        { p: 40, r: 's' },
      GASTRO_LAT:        { p: 35, r: 's' },
      SOLEUS:            { p: 35, r: 's' },
      HIP_FLEX:          { p: 40, r: 's' },
    }
  },
  natation: {
    base_dose: 32,
    recovery_scale: 0.25,   // Concentrique + portance eau → peu d'excentrique, récup rapide
    muscles: {
      LAT:               { p: 70, r: 'p' },
      TRAP_MED:          { p: 50, r: 's' },
      TRAP_INF:          { p: 40, r: 's' },
      DELT_ANT:          { p: 50, r: 's' },
      DELT_MED:          { p: 40, r: 's' },
      TRICEP_LONG:       { p: 45, r: 's' },
      BICEP_LONG:        { p: 35, r: 's' },
      CORE_TRANS:        { p: 45, r: 'p' },
      CORE_OBL_EXT:      { p: 35, r: 's' },
      GLUTE_MAX:         { p: 35, r: 's' },
      HAMSTRING_BF_LONG: { p: 25, r: 's' },
      GASTRO_MED:        { p: 25, r: 's' },
      HIP_FLEX:          { p: 30, r: 's' },
    }
  },
  sport_collectif: {
    base_dose: 45,
    recovery_scale: 0.55,   // Mix sprints anaérobies + changements direction + contacts
    muscles: {
      GLUTE_MAX:         { p: 55, r: 'p' },
      GLUTE_MED:         { p: 50, r: 'p' },
      QUAD_VAST_LAT:     { p: 55, r: 'p' },
      QUAD_VAST_MED:     { p: 55, r: 'p' },
      QUAD_RECT:         { p: 50, r: 'p' },
      HAMSTRING_BF_LONG: { p: 55, r: 'p' },
      HAMSTRING_ST:      { p: 50, r: 's' },
      GASTRO_MED:        { p: 45, r: 's' },
      GASTRO_LAT:        { p: 40, r: 's' },
      SOLEUS:            { p: 35, r: 's' },
      ADDUCTOR:          { p: 40, r: 's' },
      CORE_OBL_EXT:      { p: 30, r: 's' },
      HIP_FLEX:          { p: 35, r: 's' },
      PERONEAL:          { p: 35, r: 's' },
      CORE_TRANS:        { p: 25, r: 't' },
    }
  },
  yoga: {
    base_dose: 20,
    recovery_scale: 0.30,   // Isométrique + étirements, récup très rapide
    muscles: {
      CORE_TRANS:        { p: 35, r: 'p' },
      CORE_OBL_INT:      { p: 30, r: 'p' },
      CORE_OBL_EXT:      { p: 25, r: 's' },
      GLUTE_MED:         { p: 20, r: 's' },
      GLUTE_MIN:         { p: 20, r: 's' },
      HIP_FLEX:          { p: 25, r: 's' },
      LUMBAR:            { p: 20, r: 't' },
      MULTIFIDUS:        { p: 25, r: 't' },
      HAMSTRING_BF_LONG: { p: 20, r: 't' },
    }
  },
  autre: {
    base_dose: 30,
    recovery_scale: 0.50,   // Générique — profil modéré
    muscles: {
      GLUTE_MAX:         { p: 30, r: 's' },
      GLUTE_MED:         { p: 30, r: 's' },
      QUAD_RECT:         { p: 30, r: 's' },
      HAMSTRING_BF_LONG: { p: 30, r: 's' },
      CORE_TRANS:        { p: 25, r: 't' },
    }
  }
};

// Muscles suggérés pour les boosts par activité
const ACTIVITY_BOOST_MUSCLES = {
  running:           ['GLUTE_MAX','GLUTE_MED','HAMSTRING_BF_LONG','GASTRO_MED','SOLEUS','HIP_FLEX','QUAD_RECT','PERONEAL'],
  running_recovery:  ['SOLEUS','GASTRO_MED','GLUTE_MED'],
  running_easy:      ['SOLEUS','GASTRO_MED','GLUTE_MED','HIP_FLEX','HAMSTRING_BF_LONG'],
  running_long:      ['SOLEUS','GLUTE_MED','HIP_FLEX','GASTRO_MED','HAMSTRING_BF_LONG','PERONEAL'],
  running_tempo:     ['GASTRO_MED','SOLEUS','QUAD_VAST_LAT','HIP_FLEX','HAMSTRING_BF_LONG','GLUTE_MAX'],
  running_intervals: ['GASTRO_MED','HAMSTRING_BF_LONG','GLUTE_MAX','HIP_FLEX','QUAD_VAST_LAT','CORE_TRANS'],
  running_race:      ['GASTRO_MED','HAMSTRING_BF_LONG','GLUTE_MAX','HIP_FLEX','QUAD_VAST_LAT','SOLEUS','CORE_TRANS'],
  velo:              ['QUAD_VAST_LAT','QUAD_VAST_MED','GLUTE_MAX','GASTRO_MED','HIP_FLEX','HAMSTRING_BF_LONG'],
  natation:          ['LAT','DELT_ANT','TRICEP_LONG','BICEP_LONG','CORE_TRANS','CORE_OBL_EXT','GLUTE_MAX'],
  sport_collectif:   ['GLUTE_MAX','GLUTE_MED','QUAD_RECT','HAMSTRING_BF_LONG','GASTRO_MED','ADDUCTOR','CORE_OBL_EXT','HIP_FLEX'],
  yoga:              ['CORE_TRANS','CORE_OBL_INT','GLUTE_MED','HIP_FLEX','HAMSTRING_BF_LONG','LUMBAR'],
  autre:             ['GLUTE_MAX','QUAD_RECT','HAMSTRING_BF_LONG','GASTRO_MED','CORE_TRANS'],
};

const BOOST_MULT = { moderate: 1.6, high: 2.2 };
