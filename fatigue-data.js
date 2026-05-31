'use strict';

// MUSCLEOS — FATIGUE_DATA
// Généré automatiquement depuis les JSON d'exercices
// Structure : FATIGUE_DATA[category][exerciseId][variantId] = { MUSCLE_ID: ratio }
// ratio = activation (0.0 à 1.0) — ex: 0.85 = 85% d'activation EMG

const FATIGUE_DATA = {
  "chest": {
    "developpe_couche_plat": {
      "prise_large": {
        "PECT_MAJ_STER": 0.85,
        "PECT_MAJ_CLAV": 0.6,
        "DELT_ANT": 0.55,
        "TRICEP_LAT": 0.6,
        "TRICEP_MED": 0.55,
        "TRICEP_LONG": 0.45,
        "SERR_ANT": 0.35
      },
      "prise_serree": {
        "PECT_MAJ_CLAV": 0.75,
        "PECT_MAJ_STER": 0.65,
        "TRICEP_LAT": 0.8,
        "TRICEP_MED": 0.75,
        "TRICEP_LONG": 0.65,
        "DELT_ANT": 0.5
      }
    },
    "developpe_couche_incline": {
      "standard_30": {
        "PECT_MAJ_CLAV": 0.9,
        "PECT_MAJ_STER": 0.55,
        "DELT_ANT": 0.7,
        "TRICEP_LAT": 0.58,
        "TRICEP_MED": 0.55
      }
    },
    "developpe_couche_decline": {
      "decline_15": {
        "PECT_MAJ_STER": 0.92,
        "PECT_MAJ_CLAV": 0.4,
        "TRICEP_LONG": 0.7,
        "TRICEP_LAT": 0.58,
        "DELT_ANT": 0.35
      }
    },
    "ecarte_halteres": {
      "plat": {
        "PECT_MAJ_STER": 0.75,
        "PECT_MAJ_CLAV": 0.5,
        "DELT_ANT": 0.4,
        "BICEP_LONG": 0.2
      },
      "incline": {
        "PECT_MAJ_CLAV": 0.8,
        "PECT_MAJ_STER": 0.5,
        "DELT_ANT": 0.55
      },
      "elastique": {
        "PECT_MAJ_STER": 0.68,
        "PECT_MAJ_CLAV": 0.52,
        "DELT_ANT": 0.38,
        "BICEP_LONG": 0.22,
        "SERR_ANT": 0.28
      }
    },
    "croise_poulie": {
      "haut_vers_bas": {
        "PECT_MAJ_STER": 0.8,
        "PECT_MAJ_CLAV": 0.45,
        "DELT_ANT": 0.35
      },
      "bas_vers_haut": {
        "PECT_MAJ_CLAV": 0.82,
        "PECT_MAJ_STER": 0.55,
        "DELT_ANT": 0.5
      },
      "elastique_haut_vers_bas": {
        "PECT_MAJ_STER": 0.72,
        "PECT_MAJ_CLAV": 0.48,
        "DELT_ANT": 0.42,
        "SERR_ANT": 0.3
      }
    },
    "pompes": {
      "classiques": {
        "PECT_MAJ_STER": 0.8,
        "PECT_MAJ_CLAV": 0.6,
        "DELT_ANT": 0.55,
        "TRICEP_LAT": 0.55,
        "TRICEP_MED": 0.5,
        "CORE_TRANS": 0.3,
        "SERR_ANT": 0.4
      },
      "serrees": {
        "TRICEP_LAT": 0.78,
        "TRICEP_MED": 0.72,
        "TRICEP_LONG": 0.6,
        "PECT_MAJ_CLAV": 0.7,
        "PECT_MAJ_STER": 0.55,
        "DELT_ANT": 0.48
      },
      "piquees": {
        "PECT_MAJ_CLAV": 0.85,
        "PECT_MAJ_STER": 0.55,
        "DELT_ANT": 0.68,
        "TRICEP_LAT": 0.55,
        "SERR_ANT": 0.45
      }
    },
    "dips": {
      "tronc_vertical": {
        "TRICEP_LAT": 0.88,
        "TRICEP_MED": 0.82,
        "TRICEP_LONG": 0.75,
        "PECT_MAJ_STER": 0.6,
        "DELT_ANT": 0.45
      },
      "tronc_incline": {
        "PECT_MAJ_STER": 0.82,
        "PECT_MAJ_CLAV": 0.55,
        "TRICEP_LAT": 0.7,
        "TRICEP_MED": 0.65,
        "DELT_ANT": 0.5
      }
    },
    "developpe_couche": {
      "prise_large": {
        "PECT_MAJ_STER": 0.85,
        "PECT_MAJ_CLAV": 0.6,
        "DELT_ANT": 0.55,
        "TRICEP_LAT": 0.6,
        "TRICEP_MED": 0.55,
        "TRICEP_LONG": 0.45,
        "SERR_ANT": 0.35
      },
      "prise_serree": {
        "PECT_MAJ_CLAV": 0.75,
        "PECT_MAJ_STER": 0.65,
        "TRICEP_LAT": 0.8,
        "TRICEP_MED": 0.75,
        "TRICEP_LONG": 0.65,
        "DELT_ANT": 0.5
      },
      "halteres": {
        "PECT_MAJ_STER": 0.88,
        "PECT_MAJ_CLAV": 0.62,
        "DELT_ANT": 0.52,
        "TRICEP_LAT": 0.55,
        "TRICEP_MED": 0.5,
        "SERR_ANT": 0.4
      },
      "incline_30": {
        "PECT_MAJ_CLAV": 0.9,
        "PECT_MAJ_STER": 0.55,
        "DELT_ANT": 0.7,
        "TRICEP_LAT": 0.58,
        "TRICEP_MED": 0.55
      },
      "decline_15": {
        "PECT_MAJ_STER": 0.92,
        "PECT_MAJ_CLAV": 0.4,
        "TRICEP_LONG": 0.7,
        "TRICEP_LAT": 0.58,
        "DELT_ANT": 0.35
      }
    },
    "machine_pec_deck": {
      "standard": {
        "PECT_MAJ_STER": 0.85,
        "PECT_MAJ_CLAV": 0.65,
        "PECT_MIN": 0.4,
        "DELT_ANT": 0.25,
        "BICEP_LONG": 0.18
      }
    },
    "pullover_haltere": {
      "coudes_flechis": {
        "PECT_MAJ_STER": 0.72,
        "LAT": 0.68,
        "TERES_MAJ": 0.55,
        "PECT_MIN": 0.45,
        "TRICEP_LONG": 0.38,
        "SERR_ANT": 0.35
      },
      "coudes_tendus": {
        "LAT": 0.82,
        "TERES_MAJ": 0.65,
        "PECT_MAJ_STER": 0.58,
        "TRICEP_LONG": 0.5,
        "DELT_POST": 0.32,
        "SERR_ANT": 0.3
      }
    }
  },
  "back": {
    "tractions": {
      "pronation_large": {
        "LAT": 1.25,
        "BICEP_LONG": 0.8,
        "BICEP_COURT": 0.75,
        "BRACHIAL": 0.6,
        "INFRA": 0.75,
        "TRAP_INF": 0.55,
        "TRAP_MED": 0.48,
        "PECT_MAJ_STER": 0.44,
        "CORE_OBL_EXT": 0.33,
        "LUMBAR": 0.4
      },
      "supination": {
        "LAT": 1.17,
        "BICEP_LONG": 0.96,
        "BICEP_COURT": 0.88,
        "BRACHIAL": 0.55,
        "INFRA": 0.71,
        "TRAP_INF": 0.45,
        "TRAP_MED": 0.32,
        "PECT_MAJ_CLAV": 0.52,
        "PECT_MAJ_STER": 0.57,
        "CORE_OBL_EXT": 0.31,
        "LUMBAR": 0.39
      },
      "neutre": {
        "LAT": 1.2,
        "BICEP_LONG": 0.82,
        "BICEP_COURT": 0.78,
        "BRACHIAL": 0.7,
        "BRACHIORAD": 0.65,
        "TRAP_MED": 0.27,
        "TRAP_INF": 0.48,
        "INFRA": 0.68,
        "PECT_MAJ_STER": 0.4,
        "LUMBAR": 0.38
      }
    },
    "tirage_vertical": {
      "pronation_large": {
        "LAT": 0.8,
        "TRAP_INF": 0.48,
        "BICEP_LONG": 0.65,
        "BRACHIAL": 0.52,
        "DELT_POST": 0.42
      },
      "supination": {
        "LAT": 0.78,
        "BICEP_LONG": 0.78,
        "BICEP_COURT": 0.7,
        "PECT_MAJ_CLAV": 0.42,
        "TRAP_INF": 0.38
      }
    },
    "rowing_barre": {
      "pronation": {
        "LAT": 0.8,
        "TRAP_MED": 0.7,
        "TRAP_INF": 0.55,
        "RHOMBOID": 0.65,
        "DELT_POST": 0.55,
        "BICEP_LONG": 0.65,
        "BRACHIAL": 0.55,
        "LUMBAR": 0.8
      },
      "supination": {
        "LAT": 0.82,
        "BICEP_LONG": 0.8,
        "BICEP_COURT": 0.72,
        "TRAP_MED": 0.62,
        "DELT_POST": 0.45,
        "LUMBAR": 0.78
      }
    },
    "rowing_halteres": {
      "standard": {
        "LAT": 0.85,
        "TRAP_MED": 0.65,
        "DELT_POST": 0.58,
        "RHOMBOID": 0.6,
        "BICEP_LONG": 0.68,
        "BRACHIAL": 0.55
      }
    },
    "rowing_cable": {
      "prise_serree_neutre": {
        "LAT": 0.7,
        "TRAP_MED": 0.72,
        "RHOMBOID": 0.6,
        "DELT_POST": 0.55,
        "BICEP_LONG": 0.6,
        "BRACHIAL": 0.5,
        "LUMBAR": 0.4
      },
      "prise_large_pronation": {
        "TRAP_MED": 0.8,
        "TRAP_INF": 0.6,
        "LAT": 0.62,
        "DELT_POST": 0.65,
        "RHOMBOID": 0.68,
        "BICEP_LONG": 0.45
      }
    },
    "rowing_machine": {
      "standard": {
        "LAT": 0.78,
        "TRAP_MED": 0.82,
        "RHOMBOID": 0.72,
        "TRAP_INF": 0.58,
        "DELT_POST": 0.6,
        "BICEP_LONG": 0.58,
        "BRACHIAL": 0.48,
        "LUMBAR": 0.15
      }
    },
    "tirage_poulie_basse": {
      "standard": {
        "LAT": 0.92,
        "TERES_MAJ": 0.7,
        "PECT_MAJ_STER": 0.45,
        "DELT_POST": 0.38,
        "TRAP_INF": 0.35,
        "TRICEP_LONG": 0.28,
        "CORE_TRANS": 0.25
      }
    },
    "shrug": {
      "barre": {
        "TRAP_SUP": 0.95,
        "TRAP_MED": 0.35,
        "LEVATOR_SCAP": 0.65,
        "RHOMBOID": 0.25,
        "FOREARM_FLEX_SUP": 0.4
      },
      "halteres": {
        "TRAP_SUP": 0.9,
        "TRAP_MED": 0.38,
        "LEVATOR_SCAP": 0.6,
        "RHOMBOID": 0.28,
        "FOREARM_FLEX_SUP": 0.35
      }
    },
    "good_morning": {
      "standard": {
        "LUMBAR": 0.88,
        "MULTIFIDUS": 0.72,
        "HAMSTRING_BF_LONG": 0.75,
        "HAMSTRING_ST": 0.7,
        "HAMSTRING_SM": 0.68,
        "GLUTE_MAX": 0.55,
        "QUAD_RECT": 0.25,
        "TRAP_MED": 0.3
      }
    },
    "tirage_horizontal_elastique": {
      "bras_tendus": {
        "LAT": 0.68,
        "TERES_MAJ": 0.55,
        "TRAP_MED": 0.6,
        "RHOMBOID": 0.55,
        "DELT_POST": 0.5,
        "BICEP_LONG": 0.45,
        "CORE_TRANS": 0.28
      },
      "prise_serree": {
        "LAT": 0.72,
        "TRAP_MED": 0.68,
        "RHOMBOID": 0.62,
        "DELT_POST": 0.52,
        "BICEP_LONG": 0.55,
        "BRACHIAL": 0.42,
        "LUMBAR": 0.3
      }
    },
    "traction_elastique": {
      "pronation_large": {
        "LAT": 1.05,
        "BICEP_LONG": 0.68,
        "BICEP_COURT": 0.64,
        "BRACHIAL": 0.5,
        "INFRA": 0.64,
        "TRAP_INF": 0.47,
        "TRAP_MED": 0.41,
        "CORE_OBL_EXT": 0.28,
        "LUMBAR": 0.34
      },
      "supination": {
        "LAT": 0.99,
        "BICEP_LONG": 0.82,
        "BICEP_COURT": 0.75,
        "BRACHIAL": 0.47,
        "INFRA": 0.6,
        "TRAP_INF": 0.38,
        "PECT_MAJ_CLAV": 0.44
      }
    },
    "seal_row": {
      "barre": {
        "LAT": 0.82,
        "TRAP_MED": 0.85,
        "RHOMBOID": 0.78,
        "TRAP_INF": 0.62,
        "DELT_POST": 0.65,
        "TERES_MAJ": 0.55,
        "BICEP_LONG": 0.62,
        "BRACHIAL": 0.52,
        "LUMBAR": 0.08
      },
      "halteres": {
        "LAT": 0.8,
        "TRAP_MED": 0.82,
        "RHOMBOID": 0.75,
        "TRAP_INF": 0.6,
        "DELT_POST": 0.62,
        "BICEP_LONG": 0.6,
        "BRACHIAL": 0.5
      }
    }
  },
  "shoulders": {
    "developpe_militaire": {
      "barre_devant": {
        "DELT_ANT": 0.65,
        "DELT_MED": 0.45,
        "TRICEP_LAT": 0.62,
        "TRICEP_MED": 0.58,
        "TRICEP_LONG": 0.5,
        "TRAP_SUP": 0.4,
        "PECT_MAJ_CLAV": 0.35
      },
      "halteres": {
        "DELT_ANT": 0.7,
        "DELT_MED": 0.48,
        "TRICEP_LAT": 0.6,
        "TRICEP_MED": 0.55,
        "TRAP_SUP": 0.42,
        "SERR_ANT": 0.38
      }
    },
    "elevation_laterale": {
      "neutre": {
        "DELT_MED": 0.72,
        "TRAP_SUP": 0.45,
        "DELT_ANT": 0.3,
        "DELT_POST": 0.28,
        "INFRA": 0.25
      },
      "rotation_interne": {
        "TRAP_SUP": 0.68,
        "DELT_MED": 0.55,
        "DELT_POST": 0.6,
        "TRICEP_LONG": 0.35
      },
      "elastique": {
        "DELT_MED": 0.62,
        "TRAP_SUP": 0.42,
        "DELT_ANT": 0.3,
        "INFRA": 0.25,
        "SERR_ANT": 0.2
      }
    },
    "elevation_frontale": {
      "halteres": {
        "DELT_ANT": 0.75,
        "PECT_MAJ_CLAV": 0.5,
        "DELT_MED": 0.3,
        "TRAP_SUP": 0.28
      }
    },
    "face_pull": {
      "corde": {
        "DELT_POST": 0.65,
        "INFRA": 0.55,
        "TERES_MIN": 0.5,
        "TRAP_MED": 0.45,
        "TRAP_INF": 0.4,
        "RHOMBOID": 0.42,
        "BICEP_LONG": 0.3
      },
      "elastique": {
        "DELT_POST": 0.6,
        "INFRA": 0.5,
        "TERES_MIN": 0.45,
        "TRAP_MED": 0.4,
        "RHOMBOID": 0.35
      }
    },
    "upright_row": {
      "prise_large": {
        "DELT_MED": 0.75,
        "TRAP_SUP": 0.7,
        "DELT_ANT": 0.45,
        "DELT_POST": 0.4,
        "BICEP_LONG": 0.35,
        "INFRA": 0.28
      },
      "prise_serree": {
        "BICEP_LONG": 0.65,
        "BICEP_COURT": 0.58,
        "DELT_MED": 0.55,
        "TRAP_SUP": 0.55,
        "DELT_ANT": 0.38
      }
    },
    "reverse_flyes": {
      "incline_neutre": {
        "DELT_POST": 0.75,
        "INFRA": 0.6,
        "TERES_MIN": 0.52,
        "TRAP_MED": 0.48,
        "RHOMBOID": 0.42,
        "DELT_MED": 0.3
      },
      "machine": {
        "DELT_POST": 0.82,
        "INFRA": 0.55,
        "TRAP_MED": 0.52,
        "DELT_MED": 0.38,
        "RHOMBOID": 0.4
      }
    },
    "arnold_press": {
      "standard": {
        "DELT_ANT": 0.72,
        "DELT_MED": 0.52,
        "DELT_POST": 0.35,
        "TRICEP_LAT": 0.58,
        "TRICEP_MED": 0.52,
        "TRAP_SUP": 0.38,
        "SERR_ANT": 0.42
      }
    },
    "rowing_debout": {
      "prise_large": {
        "DELT_MED": 0.72,
        "DELT_ANT": 0.55,
        "TRAP_SUP": 0.55,
        "SUPRASPINATUS": 0.45,
        "BICEP_LONG": 0.48,
        "BRACHIAL": 0.38,
        "TRAP_MED": 0.3
      },
      "prise_serree": {
        "TRAP_SUP": 0.78,
        "DELT_MED": 0.58,
        "DELT_ANT": 0.5,
        "BICEP_LONG": 0.58,
        "BRACHIORAD": 0.42,
        "TRAP_MED": 0.35
      }
    },
    "tirage_nuque": {
      "cable": {
        "LAT": 1.12,
        "TRAP_MED": 0.72,
        "TRAP_INF": 0.68,
        "RHOMBOID": 0.62,
        "BICEP_LONG": 0.75,
        "BICEP_COURT": 0.7,
        "INFRA": 0.58,
        "DELT_POST": 0.45
      },
      "traction": {
        "LAT": 1.18,
        "TRAP_MED": 0.78,
        "TRAP_INF": 0.72,
        "RHOMBOID": 0.65,
        "BICEP_LONG": 0.78,
        "INFRA": 0.62,
        "DELT_POST": 0.48
      }
    },
    "rotation_externe": {
      "couche": {
        "INFRA": 0.88,
        "TERES_MIN": 0.75,
        "DELT_POST": 0.42,
        "SUPRASPIN": 0.28
      },
      "cable_bas": {
        "INFRA": 0.82,
        "TERES_MIN": 0.7,
        "DELT_POST": 0.48,
        "SUPRASPIN": 0.32,
        "SUBSCAP": 0.2
      }
    },
    "cuban_press": {
      "halteres": {
        "INFRA": 0.72,
        "TERES_MIN": 0.65,
        "DELT_MED": 0.68,
        "DELT_ANT": 0.55,
        "TRAP_SUP": 0.5,
        "TRAP_MED": 0.4,
        "BICEP_LONG": 0.35,
        "TRICEP_LONG": 0.3
      }
    }
  },
  "arms": {
    "curl_biceps": {
      "supination": {
        "BICEP_LONG": 0.7,
        "BICEP_COURT": 0.6,
        "BRACHIAL": 0.45,
        "BRACHIORAD": 0.2
      },
      "marteau": {
        "BICEP_LONG": 0.45,
        "BICEP_COURT": 0.5,
        "BRACHIAL": 0.65,
        "BRACHIORAD": 0.8
      },
      "pronation": {
        "BICEP_LONG": 0.2,
        "BICEP_COURT": 0.3,
        "BRACHIAL": 0.75,
        "BRACHIORAD": 0.9,
        "FOREARM_EXT": 0.35
      },
      "elastique": {
        "BICEP_LONG": 0.72,
        "BICEP_COURT": 0.68,
        "BRACHIAL": 0.52,
        "BRACHIORAD": 0.35
      }
    },
    "extension_triceps": {
      "poulie_haute": {
        "TRICEP_LAT": 0.85,
        "TRICEP_MED": 0.8,
        "TRICEP_LONG": 0.55
      },
      "overhead": {
        "TRICEP_LONG": 0.88,
        "TRICEP_LAT": 0.65,
        "TRICEP_MED": 0.6
      },
      "elastique_pushdown": {
        "TRICEP_LAT": 0.7,
        "TRICEP_MED": 0.65,
        "TRICEP_LONG": 0.48,
        "ANCONEUS": 0.38
      }
    },
    "curl_barre_ez": {
      "prise_semi_supination": {
        "BICEP_LONG": 0.55,
        "BICEP_COURT": 0.58,
        "BRACHIAL": 0.55,
        "BRACHIORAD": 0.5
      }
    },
    "curl_concentre": {
      "standard": {
        "BICEP_LONG": 0.8,
        "BICEP_COURT": 0.65,
        "BRACHIAL": 0.48
      }
    },
    "skull_crusher": {
      "barre_ez": {
        "TRICEP_LONG": 0.88,
        "TRICEP_LAT": 0.72,
        "TRICEP_MED": 0.65
      }
    },
    "dips_chaise": {
      "jambes_tendues": {
        "TRICEP_LAT": 0.78,
        "TRICEP_MED": 0.72,
        "TRICEP_LONG": 0.6,
        "DELT_ANT": 0.35,
        "PECT_MAJ_STER": 0.25
      }
    },
    "extension_triceps_cable": {
      "poulie_haute": {
        "TRICEP_LAT": 0.85,
        "TRICEP_MED": 0.78,
        "TRICEP_LONG": 0.55,
        "FOREARM_EXT": 0.22
      },
      "overhead": {
        "TRICEP_LONG": 0.92,
        "TRICEP_LAT": 0.68,
        "TRICEP_MED": 0.62,
        "DELT_ANT": 0.2
      }
    },
    "curl_incline": {
      "standard": {
        "BICEP_LONG": 0.95,
        "BICEP_COURT": 0.72,
        "BRACHIAL": 0.58,
        "BRACHIORAD": 0.35
      }
    },
    "preacher_curl": {
      "barre_ez": {
        "BICEP_LONG": 0.88,
        "BICEP_COURT": 0.82,
        "BRACHIAL": 0.7,
        "BRACHIORAD": 0.38
      },
      "haltere": {
        "BICEP_LONG": 0.92,
        "BICEP_COURT": 0.78,
        "BRACHIAL": 0.72,
        "BRACHIORAD": 0.32
      }
    },
    "overhead_ext_haltere": {
      "bimanuel": {
        "TRICEP_LONG": 0.95,
        "TRICEP_LAT": 0.65,
        "TRICEP_MED": 0.6,
        "DELT_ANT": 0.22
      },
      "unilateral": {
        "TRICEP_LONG": 0.92,
        "TRICEP_LAT": 0.62,
        "TRICEP_MED": 0.58,
        "CORE_OBL_EXT": 0.2
      }
    },
    "kickback": {
      "haltere": {
        "TRICEP_LAT": 0.88,
        "TRICEP_MED": 0.82,
        "TRICEP_LONG": 0.48,
        "DELT_POST": 0.18
      }
    },
    "zottman_curl": {
      "standard": {
        "BICEP_LONG": 0.8,
        "BICEP_COURT": 0.75,
        "BRACHIORAD": 0.78,
        "BRACHIAL": 0.6,
        "FOREARM_FLEX_SUP": 0.35,
        "FOREARM_EXT": 0.28
      }
    }
  },
  "legs": {
    "squat_barre": {
      "high_bar": {
        "QUAD_VAST_LAT": 0.85,
        "QUAD_VAST_MED": 0.82,
        "QUAD_RECT": 0.6,
        "GLUTE_MAX": 0.65,
        "HAMSTRING_BF_LONG": 0.35,
        "HAMSTRING_ST": 0.3,
        "SOLEUS": 0.4,
        "LUMBAR": 0.55,
        "CORE_TRANS": 0.35
      },
      "low_bar": {
        "GLUTE_MAX": 0.8,
        "QUAD_VAST_LAT": 0.75,
        "QUAD_VAST_MED": 0.72,
        "HAMSTRING_BF_LONG": 0.5,
        "HAMSTRING_ST": 0.45,
        "LUMBAR": 0.7
      },
      "sumo": {
        "ADDUCTOR": 0.7,
        "GLUTE_MAX": 0.78,
        "GLUTE_MED": 0.65,
        "QUAD_VAST_MED": 0.72,
        "QUAD_VAST_LAT": 0.68
      }
    },
    "squat_bulgare": {
      "standard": {
        "QUAD_VAST_MED": 0.85,
        "QUAD_VAST_LAT": 0.68,
        "QUAD_RECT": 0.55,
        "GLUTE_MAX": 0.78,
        "HIP_FLEX": 0.45,
        "GLUTE_MED": 0.55
      }
    },
    "souleve_de_terre": {
      "conventionnel": {
        "LUMBAR": 0.9,
        "GLUTE_MAX": 0.7,
        "HAMSTRING_BF_LONG": 0.8,
        "HAMSTRING_ST": 0.75,
        "HAMSTRING_SM": 0.7,
        "QUAD_VAST_LAT": 0.65,
        "QUAD_VAST_MED": 0.6,
        "TRAP_SUP": 0.55,
        "FOREARM_FLEX_SUP": 0.5,
        "CORE_TRANS": 0.45
      },
      "roumain": {
        "HAMSTRING_BF_LONG": 0.9,
        "HAMSTRING_SM": 0.82,
        "HAMSTRING_ST": 0.78,
        "GLUTE_MAX": 0.75,
        "LUMBAR": 0.72,
        "GASTRO_MED": 0.35,
        "SOLEUS": 0.3
      }
    },
    "hip_thrust": {
      "barre": {
        "GLUTE_MAX": 1.5,
        "GLUTE_MED": 0.8,
        "HAMSTRING_BF_LONG": 0.55,
        "HAMSTRING_ST": 0.48,
        "QUAD_RECT": 0.3,
        "CORE_TRANS": 0.4
      }
    },
    "leg_press": {
      "pieds_bas": {
        "QUAD_VAST_LAT": 0.8,
        "QUAD_VAST_MED": 0.78,
        "QUAD_RECT": 0.55,
        "GLUTE_MAX": 0.45,
        "HAMSTRING_BF_LONG": 0.28
      },
      "pieds_hauts": {
        "GLUTE_MAX": 0.7,
        "HAMSTRING_BF_LONG": 0.55,
        "QUAD_VAST_LAT": 0.65,
        "QUAD_VAST_MED": 0.62
      }
    },
    "elevation_mollets": {
      "debout": {
        "GASTRO_MED": 0.85,
        "GASTRO_LAT": 0.8,
        "SOLEUS": 0.6,
        "PERONEAL": 0.35
      },
      "assis": {
        "SOLEUS": 0.88,
        "GASTRO_MED": 0.3,
        "GASTRO_LAT": 0.28
      }
    },
    "leg_curl": {
      "couche": {
        "HAMSTRING_BF_LONG": 0.82,
        "HAMSTRING_ST": 0.78,
        "HAMSTRING_SM": 0.75,
        "GASTRO_MED": 0.45
      },
      "assis": {
        "HAMSTRING_BF_LONG": 0.88,
        "HAMSTRING_ST": 0.85,
        "HAMSTRING_SM": 0.8,
        "GASTRO_MED": 0.35
      }
    },
    "fente": {
      "avant": {
        "QUAD_VAST_MED": 0.72,
        "QUAD_VAST_LAT": 0.68,
        "QUAD_RECT": 0.42,
        "GLUTE_MAX": 0.55,
        "HAMSTRING_BF_LONG": 0.35,
        "GLUTE_MED": 0.4,
        "GASTRO_MED": 0.28
      },
      "arriere": {
        "GLUTE_MAX": 0.68,
        "QUAD_VAST_MED": 0.62,
        "QUAD_VAST_LAT": 0.58,
        "HAMSTRING_BF_LONG": 0.45,
        "HAMSTRING_ST": 0.38,
        "GLUTE_MED": 0.45
      },
      "laterale": {
        "ADDUCTOR": 0.72,
        "GLUTE_MED": 0.65,
        "QUAD_VAST_MED": 0.6,
        "GLUTE_MAX": 0.5,
        "QUAD_VAST_LAT": 0.45
      }
    },
    "leg_extension": {
      "standard": {
        "QUAD_VAST_LAT": 0.88,
        "QUAD_VAST_MED": 0.85,
        "QUAD_RECT": 0.78,
        "QUAD_VAST_INT": 0.82
      }
    },
    "goblet_squat": {
      "standard": {
        "QUAD_VAST_MED": 0.8,
        "QUAD_VAST_LAT": 0.78,
        "GLUTE_MAX": 0.68,
        "CORE_TRANS": 0.4,
        "ADDUCTOR": 0.45,
        "LUMBAR": 0.35
      }
    },
    "sumo_sdt": {
      "standard": {
        "GLUTE_MAX": 0.72,
        "ADDUCTOR": 0.78,
        "QUAD_VAST_MED": 0.68,
        "QUAD_VAST_LAT": 0.65,
        "HAMSTRING_BF_LONG": 0.58,
        "LUMBAR": 0.72,
        "GLUTE_MED": 0.45,
        "TRAP_SUP": 0.35
      }
    },
    "hip_abduction": {
      "machine": {
        "GLUTE_MED": 0.82,
        "GLUTE_MIN": 0.65,
        "TFL": 0.55,
        "GLUTE_MAX": 0.22
      },
      "cable": {
        "GLUTE_MED": 0.78,
        "GLUTE_MIN": 0.6,
        "TFL": 0.5,
        "GLUTE_MAX": 0.28,
        "CORE_OBL_EXT": 0.35
      }
    },
    "adduction_hanche": {
      "machine": {
        "ADDUCTOR": 0.85,
        "GRACILIS": 0.68,
        "PECTINEUS": 0.55,
        "HIP_FLEX": 0.25
      },
      "cable": {
        "ADDUCTOR": 0.8,
        "GRACILIS": 0.62,
        "GLUTE_MED": 0.38,
        "CORE_OBL_EXT": 0.32
      }
    },
    "nordic_curl": {
      "standard": {
        "HAMSTRING_BF_LONG": 1.18,
        "HAMSTRING_ST": 1.08,
        "HAMSTRING_SM": 1.02,
        "GLUTE_MAX": 0.45,
        "GASTRO_MED": 0.38,
        "LUMBAR": 0.3
      }
    },
    "step_up": {
      "standard": {
        "GLUTE_MAX": 0.75,
        "QUAD_VAST_MED": 0.68,
        "QUAD_VAST_LAT": 0.62,
        "HAMSTRING_BF_LONG": 0.42,
        "GLUTE_MED": 0.48,
        "GASTRO_MED": 0.3
      }
    },
    "pont_fessier": {
      "bilateral": {
        "GLUTE_MAX": 0.82,
        "HAMSTRING_BF_LONG": 0.55,
        "HAMSTRING_ST": 0.48,
        "GLUTE_MED": 0.4,
        "LUMBAR": 0.28,
        "CORE_TRANS": 0.22
      },
      "unilateral": {
        "GLUTE_MAX": 0.98,
        "HAMSTRING_BF_LONG": 0.68,
        "GLUTE_MED": 0.58,
        "HAMSTRING_ST": 0.55,
        "CORE_OBL_EXT": 0.3,
        "LUMBAR": 0.25
      }
    },
    "fente_marchee": {
      "standard": {
        "QUAD_VAST_MED": 0.72,
        "QUAD_VAST_LAT": 0.68,
        "GLUTE_MAX": 0.62,
        "HAMSTRING_BF_LONG": 0.4,
        "GLUTE_MED": 0.45,
        "GASTRO_MED": 0.32,
        "CORE_TRANS": 0.28
      }
    },
    "hip_thrust_unilateral": {
      "standard": {
        "GLUTE_MAX": 1.5,
        "HAMSTRING_BF_LONG": 0.82,
        "HAMSTRING_ST": 0.72,
        "GLUTE_MED": 0.65,
        "CORE_OBL_EXT": 0.38,
        "LUMBAR": 0.22
      }
    },
    "squat_bodyweight": {
      "standard": {
        "QUAD_VAST_MED": 0.62,
        "QUAD_VAST_LAT": 0.58,
        "GLUTE_MAX": 0.52,
        "QUAD_RECT": 0.38,
        "HAMSTRING_BF_LONG": 0.32,
        "GLUTE_MED": 0.28,
        "GASTRO_MED": 0.22,
        "CORE_TRANS": 0.2
      },
      "profond": {
        "QUAD_VAST_MED": 0.72,
        "GLUTE_MAX": 0.68,
        "QUAD_VAST_LAT": 0.65,
        "HAMSTRING_BF_LONG": 0.42,
        "GLUTE_MED": 0.35,
        "GASTRO_MED": 0.28
      }
    }
  },
  "core": {
    "planche": {
      "frontale": {
        "CORE_TRANS": 0.24,
        "CORE_RECT_INF": 0.2,
        "CORE_OBL_EXT": 0.32,
        "CORE_OBL_INT": 0.28,
        "LUMBAR": 0.35,
        "GLUTE_MAX": 0.2,
        "QUAD_RECT": 0.18
      },
      "laterale": {
        "CORE_OBL_EXT": 0.46,
        "CORE_OBL_INT": 0.42,
        "CORE_TRANS": 0.3,
        "GLUTE_MED": 0.38,
        "LUMBAR": 0.28
      },
      "dynamique": {
        "CORE_TRANS": 0.38,
        "CORE_RECT_INF": 0.32,
        "CORE_OBL_EXT": 0.42,
        "CORE_OBL_INT": 0.38,
        "LUMBAR": 0.3,
        "GLUTE_MAX": 0.22,
        "SERR_ANT": 0.28
      }
    },
    "crunch": {
      "classique": {
        "CORE_RECT_SUP": 0.65,
        "CORE_RECT_INF": 0.45,
        "CORE_OBL_EXT": 0.38,
        "HIP_FLEX": 0.25
      },
      "inverse": {
        "CORE_RECT_INF": 0.78,
        "CORE_TRANS": 0.4,
        "CORE_OBL_INT": 0.35,
        "HIP_FLEX": 0.55
      }
    },
    "russian_twist": {
      "standard": {
        "CORE_OBL_EXT": 0.62,
        "CORE_OBL_INT": 0.58,
        "CORE_RECT_SUP": 0.4,
        "HIP_FLEX": 0.35,
        "LUMBAR": 0.25
      }
    },
    "releve_jambes_suspendu": {
      "jambes_tendues": {
        "CORE_RECT_INF": 0.78,
        "HIP_FLEX": 0.85,
        "CORE_RECT_SUP": 0.55,
        "CORE_TRANS": 0.38,
        "CORE_OBL_EXT": 0.35
      },
      "jambes_flechies": {
        "CORE_RECT_INF": 0.62,
        "HIP_FLEX": 0.7,
        "CORE_TRANS": 0.32,
        "CORE_OBL_EXT": 0.28
      }
    },
    "dead_bug": {
      "standard": {
        "CORE_TRANS": 0.35,
        "CORE_RECT_INF": 0.42,
        "CORE_OBL_EXT": 0.38,
        "CORE_OBL_INT": 0.32,
        "HIP_FLEX": 0.4,
        "MULTIFIDUS": 0.28
      }
    },
    "bird_dog": {
      "standard": {
        "MULTIFIDUS": 0.35,
        "LUMBAR": 0.28,
        "GLUTE_MAX": 0.4,
        "GLUTE_MED": 0.35,
        "CORE_TRANS": 0.3,
        "DELT_ANT": 0.22
      }
    },
    "cable_woodchop": {
      "haut_vers_bas": {
        "CORE_OBL_EXT": 0.65,
        "CORE_OBL_INT": 0.58,
        "CORE_TRANS": 0.42,
        "CORE_RECT_SUP": 0.35,
        "GLUTE_MED": 0.3,
        "LUMBAR": 0.28
      },
      "bas_vers_haut": {
        "CORE_OBL_EXT": 0.7,
        "CORE_OBL_INT": 0.62,
        "CORE_TRANS": 0.4,
        "GLUTE_MAX": 0.35,
        "LUMBAR": 0.32
      }
    },
    "ab_wheel": {
      "standard": {
        "CORE_RECT_INF": 0.88,
        "CORE_TRANS": 0.72,
        "CORE_OBL_EXT": 0.65,
        "CORE_OBL_INT": 0.58,
        "CORE_RECT_SUP": 0.7,
        "LUMBAR": 0.42,
        "DELT_ANT": 0.35,
        "LAT": 0.3
      },
      "debout": {
        "CORE_RECT_INF": 1.05,
        "CORE_TRANS": 0.9,
        "CORE_OBL_EXT": 0.82,
        "CORE_RECT_SUP": 0.88,
        "LUMBAR": 0.58,
        "LAT": 0.45,
        "HIP_FLEX": 0.4
      }
    },
    "knee_raise": {
      "standard": {
        "HIP_FLEX": 0.7,
        "CORE_RECT_INF": 0.62,
        "CORE_TRANS": 0.32,
        "CORE_OBL_EXT": 0.28,
        "CORE_RECT_SUP": 0.45,
        "LAT": 0.25,
        "FOREARM_FLEX_SUP": 0.4
      }
    },
    "pallof_press": {
      "debout": {
        "CORE_TRANS": 0.58,
        "CORE_OBL_EXT": 0.62,
        "CORE_OBL_INT": 0.55,
        "CORE_RECT_SUP": 0.35,
        "GLUTE_MED": 0.38,
        "LUMBAR": 0.28
      },
      "agenouille": {
        "CORE_TRANS": 0.65,
        "CORE_OBL_EXT": 0.68,
        "CORE_OBL_INT": 0.6,
        "CORE_RECT_SUP": 0.38,
        "LUMBAR": 0.32
      },
      "elastique": {
        "CORE_OBL_EXT": 0.62,
        "CORE_OBL_INT": 0.55,
        "CORE_TRANS": 0.4,
        "CORE_RECT_INF": 0.25,
        "LUMBAR": 0.28,
        "GLUTE_MED": 0.22
      }
    },
    "gainage_lateral_dynamique": {
      "standard": {
        "CORE_OBL_EXT": 0.68,
        "CORE_OBL_INT": 0.6,
        "GLUTE_MED": 0.72,
        "CORE_TRANS": 0.42,
        "DELT_MED": 0.35,
        "LUMBAR": 0.3
      }
    },
    "mountain_climber": {
      "standard": {
        "HIP_FLEX": 0.72,
        "CORE_RECT_INF": 0.65,
        "CORE_TRANS": 0.55,
        "CORE_OBL_EXT": 0.48,
        "DELT_ANT": 0.35,
        "QUAD_RECT": 0.38,
        "SERR_ANT": 0.28
      },
      "crosse": {
        "CORE_OBL_EXT": 0.72,
        "CORE_OBL_INT": 0.65,
        "HIP_FLEX": 0.68,
        "CORE_RECT_INF": 0.6,
        "CORE_TRANS": 0.5,
        "DELT_ANT": 0.32
      }
    },
    "hollow_body": {
      "standard": {
        "CORE_TRANS": 0.78,
        "CORE_RECT_INF": 0.82,
        "CORE_RECT_SUP": 0.7,
        "CORE_OBL_EXT": 0.55,
        "HIP_FLEX": 0.6,
        "CORE_OBL_INT": 0.48
      },
      "rock": {
        "CORE_TRANS": 0.82,
        "CORE_RECT_INF": 0.88,
        "CORE_RECT_SUP": 0.75,
        "HIP_FLEX": 0.65,
        "CORE_OBL_EXT": 0.58,
        "LUMBAR": 0.2
      }
    }
  }
};
