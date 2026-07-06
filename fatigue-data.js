'use strict';

// ════════════════════════════════════════════════════
// MUSCLEOS — FATIGUE_DATA v2.0
// Généré depuis les JSON d'exercices (chest/back/shoulders/arms/legs/core)
//
// Structure :
//   FATIGUE_DATA[category][exerciseId][variantId] = {
//     MUSCLE_ID: { p: Number, r: 'p'|'s'|'t' }
//   }
//
//   p = activation EMG (0-100, source PubMed/EMG)
//   r = rôle musculaire :
//       'p' primary    → facteur 1.00 dans calcDoses
//       's' secondary  → facteur 0.45
//       't' stabilizer → facteur 0.18
//
// 138 variantes — 6 groupes musculaires
// Régénérer depuis les JSON avec le script tools/gen-fatigue-data.js
// ════════════════════════════════════════════════════

const FATIGUE_DATA = {
  "chest": {
    "ecarte_halteres": {
      "plat": {
        "PECT_MAJ_STER": {
          "p": 75,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 50,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 40,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 20,
          "r": "t"
        }
      },
      "incline": {
        "PECT_MAJ_CLAV": {
          "p": 80,
          "r": "p"
        },
        "PECT_MAJ_STER": {
          "p": 50,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 55,
          "r": "s"
        }
      },
      "elastique": {
        "PECT_MAJ_STER": {
          "p": 68,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 52,
          "r": "p"
        },
        "DELT_ANT": {
          "p": 38,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 22,
          "r": "t"
        },
        "SERR_ANT": {
          "p": 28,
          "r": "t"
        }
      },
      "standard": {
        "PECT_MAJ_STER": {
          "p": 75,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 50,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 40,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 20,
          "r": "t"
        }
      }
    },
    "croise_poulie": {
      "haut_vers_bas": {
        "PECT_MAJ_STER": {
          "p": 80,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 45,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 35,
          "r": "s"
        }
      },
      "bas_vers_haut": {
        "PECT_MAJ_CLAV": {
          "p": 82,
          "r": "p"
        },
        "PECT_MAJ_STER": {
          "p": 55,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 50,
          "r": "s"
        }
      },
      "elastique_haut_vers_bas": {
        "PECT_MAJ_STER": {
          "p": 72,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 48,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 42,
          "r": "s"
        },
        "SERR_ANT": {
          "p": 30,
          "r": "t"
        }
      }
    },
    "pompes": {
      "classiques": {
        "PECT_MAJ_STER": {
          "p": 80,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 60,
          "r": "p"
        },
        "DELT_ANT": {
          "p": 55,
          "r": "s"
        },
        "TRICEP_LAT": {
          "p": 55,
          "r": "s"
        },
        "TRICEP_MED": {
          "p": 50,
          "r": "s"
        },
        "CORE_TRANS": {
          "p": 30,
          "r": "t"
        },
        "SERR_ANT": {
          "p": 40,
          "r": "t"
        }
      },
      "serrees": {
        "TRICEP_LAT": {
          "p": 78,
          "r": "p"
        },
        "TRICEP_MED": {
          "p": 72,
          "r": "p"
        },
        "TRICEP_LONG": {
          "p": 60,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 70,
          "r": "p"
        },
        "PECT_MAJ_STER": {
          "p": 55,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 48,
          "r": "s"
        }
      },
      "piquees": {
        "PECT_MAJ_CLAV": {
          "p": 85,
          "r": "p"
        },
        "PECT_MAJ_STER": {
          "p": 55,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 68,
          "r": "s"
        },
        "TRICEP_LAT": {
          "p": 55,
          "r": "s"
        },
        "SERR_ANT": {
          "p": 45,
          "r": "t"
        }
      }
    },
    "dips": {
      "tronc_vertical": {
        "TRICEP_LAT": {
          "p": 88,
          "r": "p"
        },
        "TRICEP_MED": {
          "p": 82,
          "r": "p"
        },
        "TRICEP_LONG": {
          "p": 75,
          "r": "p"
        },
        "PECT_MAJ_STER": {
          "p": 60,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 45,
          "r": "s"
        }
      },
      "tronc_incline": {
        "PECT_MAJ_STER": {
          "p": 82,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 55,
          "r": "s"
        },
        "TRICEP_LAT": {
          "p": 70,
          "r": "s"
        },
        "TRICEP_MED": {
          "p": 65,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 50,
          "r": "s"
        }
      },
      "barre_fixe": {
        "TRICEP_LAT": {
          "p": 92,
          "r": "p"
        },
        "TRICEP_MED": {
          "p": 86,
          "r": "p"
        },
        "TRICEP_LONG": {
          "p": 79,
          "r": "p"
        },
        "PECT_MAJ_STER": {
          "p": 52,
          "r": "s"
        },
        "PECT_MAJ_CLAV": {
          "p": 40,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 48,
          "r": "s"
        }
      }
    },
    "developpe_couche_plat": {
      "prise_large": {
        "PECT_MAJ_STER": {
          "p": 85,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 60,
          "r": "p"
        },
        "DELT_ANT": {
          "p": 55,
          "r": "s"
        },
        "TRICEP_LAT": {
          "p": 60,
          "r": "s"
        },
        "TRICEP_MED": {
          "p": 55,
          "r": "s"
        },
        "TRICEP_LONG": {
          "p": 45,
          "r": "s"
        },
        "SERR_ANT": {
          "p": 35,
          "r": "t"
        }
      },
      "prise_serree": {
        "PECT_MAJ_CLAV": {
          "p": 75,
          "r": "p"
        },
        "PECT_MAJ_STER": {
          "p": 65,
          "r": "p"
        },
        "TRICEP_LAT": {
          "p": 80,
          "r": "p"
        },
        "TRICEP_MED": {
          "p": 75,
          "r": "p"
        },
        "TRICEP_LONG": {
          "p": 65,
          "r": "p"
        },
        "DELT_ANT": {
          "p": 50,
          "r": "s"
        }
      },
      "halteres": {
        "PECT_MAJ_STER": {
          "p": 88,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 62,
          "r": "p"
        },
        "DELT_ANT": {
          "p": 52,
          "r": "s"
        },
        "TRICEP_LAT": {
          "p": 55,
          "r": "s"
        },
        "TRICEP_MED": {
          "p": 50,
          "r": "s"
        },
        "SERR_ANT": {
          "p": 40,
          "r": "t"
        }
      }
    },
    "developpe_couche_incline": {
      "standard_30": {
        "PECT_MAJ_CLAV": {
          "p": 90,
          "r": "p"
        },
        "PECT_MAJ_STER": {
          "p": 55,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 70,
          "r": "s"
        },
        "TRICEP_LAT": {
          "p": 58,
          "r": "s"
        },
        "TRICEP_MED": {
          "p": 55,
          "r": "s"
        }
      }
    },
    "developpe_couche_decline": {
      "decline_15": {
        "PECT_MAJ_STER": {
          "p": 92,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 40,
          "r": "s"
        },
        "TRICEP_LONG": {
          "p": 70,
          "r": "s"
        },
        "TRICEP_LAT": {
          "p": 58,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 35,
          "r": "t"
        }
      }
    },
    "machine_pec_deck": {
      "standard": {
        "PECT_MAJ_STER": {
          "p": 85,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 65,
          "r": "p"
        },
        "PECT_MIN": {
          "p": 40,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 25,
          "r": "t"
        },
        "BICEP_LONG": {
          "p": 18,
          "r": "t"
        }
      }
    },
    "pullover_haltere": {
      "coudes_flechis": {
        "PECT_MAJ_STER": {
          "p": 72,
          "r": "p"
        },
        "LAT": {
          "p": 68,
          "r": "p"
        },
        "TERES_MAJ": {
          "p": 55,
          "r": "s"
        },
        "PECT_MIN": {
          "p": 45,
          "r": "s"
        },
        "TRICEP_LONG": {
          "p": 38,
          "r": "s"
        },
        "SERR_ANT": {
          "p": 35,
          "r": "t"
        }
      },
      "coudes_tendus": {
        "LAT": {
          "p": 82,
          "r": "p"
        },
        "TERES_MAJ": {
          "p": 65,
          "r": "p"
        },
        "PECT_MAJ_STER": {
          "p": 58,
          "r": "s"
        },
        "TRICEP_LONG": {
          "p": 50,
          "r": "s"
        },
        "DELT_POST": {
          "p": 32,
          "r": "t"
        },
        "SERR_ANT": {
          "p": 30,
          "r": "t"
        }
      }
    }
  },
  "back": {
    "tractions": {
      "pronation_large": {
        "LAT": {
          "p": 125,
          "r": "p"
        },
        "BICEP_LONG": {
          "p": 80,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 75,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 60,
          "r": "s"
        },
        "INFRA": {
          "p": 75,
          "r": "s"
        },
        "TRAP_INF": {
          "p": 55,
          "r": "s"
        },
        "TRAP_MED": {
          "p": 48,
          "r": "s"
        },
        "PECT_MAJ_STER": {
          "p": 44,
          "r": "t"
        },
        "CORE_OBL_EXT": {
          "p": 33,
          "r": "t"
        },
        "LUMBAR": {
          "p": 40,
          "r": "t"
        }
      },
      "pronation": {
        "LAT": {
          "p": 118,
          "r": "p"
        },
        "BICEP_LONG": {
          "p": 84,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 79,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 63,
          "r": "s"
        },
        "INFRA": {
          "p": 75,
          "r": "s"
        },
        "TRAP_INF": {
          "p": 55,
          "r": "s"
        },
        "TRAP_MED": {
          "p": 48,
          "r": "s"
        },
        "PECT_MAJ_STER": {
          "p": 44,
          "r": "t"
        },
        "CORE_OBL_EXT": {
          "p": 33,
          "r": "t"
        },
        "LUMBAR": {
          "p": 40,
          "r": "t"
        }
      },
      "supination": {
        "LAT": {
          "p": 117,
          "r": "p"
        },
        "BICEP_LONG": {
          "p": 96,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 88,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 55,
          "r": "s"
        },
        "INFRA": {
          "p": 71,
          "r": "s"
        },
        "TRAP_INF": {
          "p": 45,
          "r": "s"
        },
        "TRAP_MED": {
          "p": 32,
          "r": "s"
        },
        "PECT_MAJ_CLAV": {
          "p": 52,
          "r": "s"
        },
        "PECT_MAJ_STER": {
          "p": 57,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 31,
          "r": "t"
        },
        "LUMBAR": {
          "p": 39,
          "r": "t"
        }
      },
      "neutre": {
        "LAT": {
          "p": 120,
          "r": "p"
        },
        "BICEP_LONG": {
          "p": 82,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 78,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 70,
          "r": "p"
        },
        "BRACHIORAD": {
          "p": 65,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 27,
          "r": "s"
        },
        "TRAP_INF": {
          "p": 48,
          "r": "s"
        },
        "INFRA": {
          "p": 68,
          "r": "s"
        },
        "PECT_MAJ_STER": {
          "p": 40,
          "r": "t"
        },
        "LUMBAR": {
          "p": 38,
          "r": "t"
        }
      }
    },
    "tirage_vertical": {
      "pronation_large": {
        "LAT": {
          "p": 80,
          "r": "p"
        },
        "TRAP_INF": {
          "p": 48,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 65,
          "r": "s"
        },
        "BRACHIAL": {
          "p": 52,
          "r": "s"
        },
        "DELT_POST": {
          "p": 42,
          "r": "s"
        }
      },
      "supination": {
        "LAT": {
          "p": 78,
          "r": "p"
        },
        "BICEP_LONG": {
          "p": 78,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 70,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 42,
          "r": "s"
        },
        "TRAP_INF": {
          "p": 38,
          "r": "s"
        }
      }
    },
    "rowing_barre": {
      "pronation": {
        "LAT": {
          "p": 80,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 70,
          "r": "p"
        },
        "TRAP_INF": {
          "p": 55,
          "r": "s"
        },
        "RHOMBOID": {
          "p": 65,
          "r": "s"
        },
        "DELT_POST": {
          "p": 55,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 65,
          "r": "s"
        },
        "BRACHIAL": {
          "p": 55,
          "r": "s"
        },
        "LUMBAR": {
          "p": 80,
          "r": "t"
        }
      },
      "supination": {
        "LAT": {
          "p": 82,
          "r": "p"
        },
        "BICEP_LONG": {
          "p": 80,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 72,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 62,
          "r": "s"
        },
        "DELT_POST": {
          "p": 45,
          "r": "s"
        },
        "LUMBAR": {
          "p": 78,
          "r": "t"
        }
      }
    },
    "rowing_halteres": {
      "standard": {
        "LAT": {
          "p": 85,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 65,
          "r": "s"
        },
        "DELT_POST": {
          "p": 58,
          "r": "s"
        },
        "RHOMBOID": {
          "p": 60,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 68,
          "r": "s"
        },
        "BRACHIAL": {
          "p": 55,
          "r": "s"
        }
      }
    },
    "rowing_cable": {
      "prise_serree_neutre": {
        "LAT": {
          "p": 70,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 72,
          "r": "p"
        },
        "RHOMBOID": {
          "p": 60,
          "r": "s"
        },
        "DELT_POST": {
          "p": 55,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 60,
          "r": "s"
        },
        "BRACHIAL": {
          "p": 50,
          "r": "s"
        },
        "LUMBAR": {
          "p": 40,
          "r": "t"
        }
      },
      "prise_large_pronation": {
        "TRAP_MED": {
          "p": 80,
          "r": "p"
        },
        "TRAP_INF": {
          "p": 60,
          "r": "p"
        },
        "LAT": {
          "p": 62,
          "r": "p"
        },
        "DELT_POST": {
          "p": 65,
          "r": "s"
        },
        "RHOMBOID": {
          "p": 68,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 45,
          "r": "s"
        }
      }
    },
    "rowing_machine": {
      "standard": {
        "LAT": {
          "p": 78,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 82,
          "r": "p"
        },
        "RHOMBOID": {
          "p": 72,
          "r": "p"
        },
        "TRAP_INF": {
          "p": 58,
          "r": "s"
        },
        "DELT_POST": {
          "p": 60,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 58,
          "r": "s"
        },
        "BRACHIAL": {
          "p": 48,
          "r": "s"
        },
        "LUMBAR": {
          "p": 15,
          "r": "t"
        }
      }
    },
    "tirage_poulie_basse": {
      "standard": {
        "LAT": {
          "p": 92,
          "r": "p"
        },
        "TERES_MAJ": {
          "p": 70,
          "r": "p"
        },
        "PECT_MAJ_STER": {
          "p": 45,
          "r": "s"
        },
        "DELT_POST": {
          "p": 38,
          "r": "s"
        },
        "TRAP_INF": {
          "p": 35,
          "r": "s"
        },
        "TRICEP_LONG": {
          "p": 28,
          "r": "t"
        },
        "CORE_TRANS": {
          "p": 25,
          "r": "t"
        }
      }
    },
    "shrug": {
      "barre": {
        "TRAP_SUP": {
          "p": 95,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 35,
          "r": "s"
        },
        "LEVATOR_SCAP": {
          "p": 65,
          "r": "p"
        },
        "RHOMBOID": {
          "p": 25,
          "r": "t"
        },
        "FOREARM_FLEX_SUP": {
          "p": 40,
          "r": "t"
        }
      },
      "halteres": {
        "TRAP_SUP": {
          "p": 90,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 38,
          "r": "s"
        },
        "LEVATOR_SCAP": {
          "p": 60,
          "r": "p"
        },
        "RHOMBOID": {
          "p": 28,
          "r": "t"
        },
        "FOREARM_FLEX_SUP": {
          "p": 35,
          "r": "t"
        }
      }
    },
    "good_morning": {
      "standard": {
        "LUMBAR": {
          "p": 88,
          "r": "p"
        },
        "MULTIFIDUS": {
          "p": 72,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 75,
          "r": "p"
        },
        "HAMSTRING_ST": {
          "p": 70,
          "r": "p"
        },
        "HAMSTRING_SM": {
          "p": 68,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 55,
          "r": "s"
        },
        "QUAD_RECT": {
          "p": 25,
          "r": "t"
        },
        "TRAP_MED": {
          "p": 30,
          "r": "t"
        }
      }
    },
    "tirage_horizontal_elastique": {
      "bras_tendus": {
        "LAT": {
          "p": 68,
          "r": "p"
        },
        "TERES_MAJ": {
          "p": 55,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 60,
          "r": "p"
        },
        "RHOMBOID": {
          "p": 55,
          "r": "s"
        },
        "DELT_POST": {
          "p": 50,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 45,
          "r": "s"
        },
        "CORE_TRANS": {
          "p": 28,
          "r": "t"
        }
      },
      "prise_serree": {
        "LAT": {
          "p": 72,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 68,
          "r": "p"
        },
        "RHOMBOID": {
          "p": 62,
          "r": "p"
        },
        "DELT_POST": {
          "p": 52,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 55,
          "r": "s"
        },
        "BRACHIAL": {
          "p": 42,
          "r": "s"
        },
        "LUMBAR": {
          "p": 30,
          "r": "t"
        }
      }
    },
    "traction_elastique": {
      "pronation_large": {
        "LAT": {
          "p": 105,
          "r": "p"
        },
        "BICEP_LONG": {
          "p": 68,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 64,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 50,
          "r": "s"
        },
        "INFRA": {
          "p": 64,
          "r": "s"
        },
        "TRAP_INF": {
          "p": 47,
          "r": "s"
        },
        "TRAP_MED": {
          "p": 41,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 28,
          "r": "t"
        },
        "LUMBAR": {
          "p": 34,
          "r": "t"
        }
      },
      "supination": {
        "LAT": {
          "p": 99,
          "r": "p"
        },
        "BICEP_LONG": {
          "p": 82,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 75,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 47,
          "r": "s"
        },
        "INFRA": {
          "p": 60,
          "r": "s"
        },
        "TRAP_INF": {
          "p": 38,
          "r": "s"
        },
        "PECT_MAJ_CLAV": {
          "p": 44,
          "r": "t"
        }
      }
    },
    "seal_row": {
      "barre": {
        "LAT": {
          "p": 82,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 85,
          "r": "p"
        },
        "RHOMBOID": {
          "p": 78,
          "r": "p"
        },
        "TRAP_INF": {
          "p": 62,
          "r": "s"
        },
        "DELT_POST": {
          "p": 65,
          "r": "s"
        },
        "TERES_MAJ": {
          "p": 55,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 62,
          "r": "s"
        },
        "BRACHIAL": {
          "p": 52,
          "r": "s"
        },
        "LUMBAR": {
          "p": 8,
          "r": "t"
        }
      },
      "halteres": {
        "LAT": {
          "p": 80,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 82,
          "r": "p"
        },
        "RHOMBOID": {
          "p": 75,
          "r": "p"
        },
        "TRAP_INF": {
          "p": 60,
          "r": "s"
        },
        "DELT_POST": {
          "p": 62,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 60,
          "r": "s"
        },
        "BRACHIAL": {
          "p": 50,
          "r": "s"
        }
      }
    }
  },
  "shoulders": {
    "developpe_militaire": {
      "barre_devant": {
        "DELT_ANT": {
          "p": 65,
          "r": "p"
        },
        "DELT_MED": {
          "p": 45,
          "r": "p"
        },
        "TRICEP_LAT": {
          "p": 62,
          "r": "s"
        },
        "TRICEP_MED": {
          "p": 58,
          "r": "s"
        },
        "TRICEP_LONG": {
          "p": 50,
          "r": "s"
        },
        "TRAP_SUP": {
          "p": 40,
          "r": "s"
        },
        "PECT_MAJ_CLAV": {
          "p": 35,
          "r": "t"
        }
      },
      "halteres": {
        "DELT_ANT": {
          "p": 70,
          "r": "p"
        },
        "DELT_MED": {
          "p": 48,
          "r": "p"
        },
        "TRICEP_LAT": {
          "p": 60,
          "r": "s"
        },
        "TRICEP_MED": {
          "p": 55,
          "r": "s"
        },
        "TRAP_SUP": {
          "p": 42,
          "r": "s"
        },
        "SERR_ANT": {
          "p": 38,
          "r": "t"
        }
      }
    },
    "elevation_laterale": {
      "neutre": {
        "DELT_MED": {
          "p": 72,
          "r": "p"
        },
        "TRAP_SUP": {
          "p": 45,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 30,
          "r": "s"
        },
        "DELT_POST": {
          "p": 28,
          "r": "s"
        },
        "INFRA": {
          "p": 25,
          "r": "t"
        }
      },
      "rotation_interne": {
        "TRAP_SUP": {
          "p": 68,
          "r": "p"
        },
        "DELT_MED": {
          "p": 55,
          "r": "p"
        },
        "DELT_POST": {
          "p": 60,
          "r": "s"
        },
        "TRICEP_LONG": {
          "p": 35,
          "r": "s"
        }
      },
      "elastique": {
        "DELT_MED": {
          "p": 62,
          "r": "p"
        },
        "TRAP_SUP": {
          "p": 42,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 30,
          "r": "s"
        },
        "INFRA": {
          "p": 25,
          "r": "t"
        },
        "SERR_ANT": {
          "p": 20,
          "r": "t"
        }
      }
    },
    "elevation_frontale": {
      "halteres": {
        "DELT_ANT": {
          "p": 75,
          "r": "p"
        },
        "PECT_MAJ_CLAV": {
          "p": 50,
          "r": "s"
        },
        "DELT_MED": {
          "p": 30,
          "r": "s"
        },
        "TRAP_SUP": {
          "p": 28,
          "r": "t"
        }
      }
    },
    "face_pull": {
      "corde": {
        "DELT_POST": {
          "p": 65,
          "r": "p"
        },
        "INFRA": {
          "p": 55,
          "r": "p"
        },
        "TERES_MIN": {
          "p": 50,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 45,
          "r": "s"
        },
        "TRAP_INF": {
          "p": 40,
          "r": "s"
        },
        "RHOMBOID": {
          "p": 42,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 30,
          "r": "t"
        }
      },
      "elastique": {
        "DELT_POST": {
          "p": 60,
          "r": "p"
        },
        "INFRA": {
          "p": 50,
          "r": "p"
        },
        "TERES_MIN": {
          "p": 45,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 40,
          "r": "s"
        },
        "RHOMBOID": {
          "p": 35,
          "r": "s"
        }
      }
    },
    "upright_row": {
      "prise_large": {
        "DELT_MED": {
          "p": 75,
          "r": "p"
        },
        "TRAP_SUP": {
          "p": 70,
          "r": "p"
        },
        "DELT_ANT": {
          "p": 45,
          "r": "s"
        },
        "DELT_POST": {
          "p": 40,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 35,
          "r": "s"
        },
        "INFRA": {
          "p": 28,
          "r": "t"
        }
      },
      "prise_serree": {
        "BICEP_LONG": {
          "p": 65,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 58,
          "r": "p"
        },
        "DELT_MED": {
          "p": 55,
          "r": "p"
        },
        "TRAP_SUP": {
          "p": 55,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 38,
          "r": "s"
        }
      }
    },
    "reverse_flyes": {
      "incline_neutre": {
        "DELT_POST": {
          "p": 75,
          "r": "p"
        },
        "INFRA": {
          "p": 60,
          "r": "p"
        },
        "TERES_MIN": {
          "p": 52,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 48,
          "r": "s"
        },
        "RHOMBOID": {
          "p": 42,
          "r": "s"
        },
        "DELT_MED": {
          "p": 30,
          "r": "s"
        }
      },
      "machine": {
        "DELT_POST": {
          "p": 82,
          "r": "p"
        },
        "INFRA": {
          "p": 55,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 52,
          "r": "s"
        },
        "DELT_MED": {
          "p": 38,
          "r": "s"
        },
        "RHOMBOID": {
          "p": 40,
          "r": "s"
        }
      }
    },
    "arnold_press": {
      "standard": {
        "DELT_ANT": {
          "p": 72,
          "r": "p"
        },
        "DELT_MED": {
          "p": 52,
          "r": "p"
        },
        "DELT_POST": {
          "p": 35,
          "r": "s"
        },
        "TRICEP_LAT": {
          "p": 58,
          "r": "s"
        },
        "TRICEP_MED": {
          "p": 52,
          "r": "s"
        },
        "TRAP_SUP": {
          "p": 38,
          "r": "s"
        },
        "SERR_ANT": {
          "p": 42,
          "r": "t"
        }
      }
    },
    "rowing_debout": {
      "prise_large": {
        "DELT_MED": {
          "p": 72,
          "r": "p"
        },
        "DELT_ANT": {
          "p": 55,
          "r": "p"
        },
        "TRAP_SUP": {
          "p": 55,
          "r": "s"
        },
        "SUPRASPINATUS": {
          "p": 45,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 48,
          "r": "s"
        },
        "BRACHIAL": {
          "p": 38,
          "r": "s"
        },
        "TRAP_MED": {
          "p": 30,
          "r": "t"
        }
      },
      "prise_serree": {
        "TRAP_SUP": {
          "p": 78,
          "r": "p"
        },
        "DELT_MED": {
          "p": 58,
          "r": "p"
        },
        "DELT_ANT": {
          "p": 50,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 58,
          "r": "s"
        },
        "BRACHIORAD": {
          "p": 42,
          "r": "s"
        },
        "TRAP_MED": {
          "p": 35,
          "r": "t"
        }
      }
    },
    "tirage_nuque": {
      "cable": {
        "LAT": {
          "p": 112,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 72,
          "r": "p"
        },
        "TRAP_INF": {
          "p": 68,
          "r": "p"
        },
        "RHOMBOID": {
          "p": 62,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 75,
          "r": "s"
        },
        "BICEP_COURT": {
          "p": 70,
          "r": "s"
        },
        "INFRA": {
          "p": 58,
          "r": "s"
        },
        "DELT_POST": {
          "p": 45,
          "r": "t"
        }
      },
      "traction": {
        "LAT": {
          "p": 118,
          "r": "p"
        },
        "TRAP_MED": {
          "p": 78,
          "r": "p"
        },
        "TRAP_INF": {
          "p": 72,
          "r": "p"
        },
        "RHOMBOID": {
          "p": 65,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 78,
          "r": "s"
        },
        "INFRA": {
          "p": 62,
          "r": "s"
        },
        "DELT_POST": {
          "p": 48,
          "r": "t"
        }
      }
    },
    "rotation_externe": {
      "couche": {
        "INFRA": {
          "p": 88,
          "r": "p"
        },
        "TERES_MIN": {
          "p": 75,
          "r": "p"
        },
        "DELT_POST": {
          "p": 42,
          "r": "s"
        },
        "SUPRASPIN": {
          "p": 28,
          "r": "t"
        }
      },
      "cable_bas": {
        "INFRA": {
          "p": 82,
          "r": "p"
        },
        "TERES_MIN": {
          "p": 70,
          "r": "p"
        },
        "DELT_POST": {
          "p": 48,
          "r": "s"
        },
        "SUPRASPIN": {
          "p": 32,
          "r": "t"
        },
        "SUBSCAP": {
          "p": 20,
          "r": "t"
        }
      }
    },
    "cuban_press": {
      "halteres": {
        "INFRA": {
          "p": 72,
          "r": "p"
        },
        "TERES_MIN": {
          "p": 65,
          "r": "p"
        },
        "DELT_MED": {
          "p": 68,
          "r": "p"
        },
        "DELT_ANT": {
          "p": 55,
          "r": "p"
        },
        "TRAP_SUP": {
          "p": 50,
          "r": "s"
        },
        "TRAP_MED": {
          "p": 40,
          "r": "s"
        },
        "BICEP_LONG": {
          "p": 35,
          "r": "s"
        },
        "TRICEP_LONG": {
          "p": 30,
          "r": "t"
        }
      }
    }
  },
  "arms": {
    "curl_biceps": {
      "supination": {
        "BICEP_LONG": {
          "p": 70,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 60,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 45,
          "r": "s"
        },
        "BRACHIORAD": {
          "p": 20,
          "r": "s"
        }
      },
      "marteau": {
        "BICEP_LONG": {
          "p": 45,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 50,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 65,
          "r": "p"
        },
        "BRACHIORAD": {
          "p": 80,
          "r": "p"
        }
      },
      "pronation": {
        "BICEP_LONG": {
          "p": 20,
          "r": "s"
        },
        "BICEP_COURT": {
          "p": 30,
          "r": "s"
        },
        "BRACHIAL": {
          "p": 75,
          "r": "p"
        },
        "BRACHIORAD": {
          "p": 90,
          "r": "p"
        },
        "FOREARM_EXT": {
          "p": 35,
          "r": "t"
        }
      },
      "elastique": {
        "BICEP_LONG": {
          "p": 72,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 68,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 52,
          "r": "s"
        },
        "BRACHIORAD": {
          "p": 35,
          "r": "s"
        }
      }
    },
    "curl_barre_ez": {
      "prise_semi_supination": {
        "BICEP_LONG": {
          "p": 55,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 58,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 55,
          "r": "p"
        },
        "BRACHIORAD": {
          "p": 50,
          "r": "s"
        }
      }
    },
    "curl_concentre": {
      "standard": {
        "BICEP_LONG": {
          "p": 80,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 65,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 48,
          "r": "s"
        }
      }
    },
    "skull_crusher": {
      "barre_ez": {
        "TRICEP_LONG": {
          "p": 88,
          "r": "p"
        },
        "TRICEP_LAT": {
          "p": 72,
          "r": "p"
        },
        "TRICEP_MED": {
          "p": 65,
          "r": "s"
        }
      }
    },
    "dips_chaise": {
      "jambes_tendues": {
        "TRICEP_LAT": {
          "p": 78,
          "r": "p"
        },
        "TRICEP_MED": {
          "p": 72,
          "r": "p"
        },
        "TRICEP_LONG": {
          "p": 60,
          "r": "p"
        },
        "DELT_ANT": {
          "p": 35,
          "r": "s"
        },
        "PECT_MAJ_STER": {
          "p": 25,
          "r": "t"
        }
      }
    },
    "extension_triceps_cable": {
      "poulie_haute": {
        "TRICEP_LAT": {
          "p": 85,
          "r": "p"
        },
        "TRICEP_MED": {
          "p": 78,
          "r": "p"
        },
        "TRICEP_LONG": {
          "p": 55,
          "r": "s"
        },
        "FOREARM_EXT": {
          "p": 22,
          "r": "t"
        }
      },
      "overhead": {
        "TRICEP_LONG": {
          "p": 92,
          "r": "p"
        },
        "TRICEP_LAT": {
          "p": 68,
          "r": "s"
        },
        "TRICEP_MED": {
          "p": 62,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 20,
          "r": "t"
        }
      },
      "elastique": {
        "TRICEP_LAT": {
          "p": 65,
          "r": "p"
        },
        "TRICEP_MED": {
          "p": 60,
          "r": "p"
        },
        "TRICEP_LONG": {
          "p": 42,
          "r": "s"
        },
        "FOREARM_EXT": {
          "p": 18,
          "r": "t"
        }
      }
    },
    "curl_incline": {
      "standard": {
        "BICEP_LONG": {
          "p": 95,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 72,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 58,
          "r": "s"
        },
        "BRACHIORAD": {
          "p": 35,
          "r": "s"
        }
      }
    },
    "preacher_curl": {
      "barre_ez": {
        "BICEP_LONG": {
          "p": 88,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 82,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 70,
          "r": "p"
        },
        "BRACHIORAD": {
          "p": 38,
          "r": "s"
        }
      },
      "haltere": {
        "BICEP_LONG": {
          "p": 92,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 78,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 72,
          "r": "p"
        },
        "BRACHIORAD": {
          "p": 32,
          "r": "s"
        }
      }
    },
    "overhead_ext_haltere": {
      "bimanuel": {
        "TRICEP_LONG": {
          "p": 95,
          "r": "p"
        },
        "TRICEP_LAT": {
          "p": 65,
          "r": "s"
        },
        "TRICEP_MED": {
          "p": 60,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 22,
          "r": "t"
        }
      },
      "unilateral": {
        "TRICEP_LONG": {
          "p": 92,
          "r": "p"
        },
        "TRICEP_LAT": {
          "p": 62,
          "r": "s"
        },
        "TRICEP_MED": {
          "p": 58,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 20,
          "r": "t"
        }
      }
    },
    "kickback": {
      "haltere": {
        "TRICEP_LAT": {
          "p": 88,
          "r": "p"
        },
        "TRICEP_MED": {
          "p": 82,
          "r": "p"
        },
        "TRICEP_LONG": {
          "p": 48,
          "r": "s"
        },
        "DELT_POST": {
          "p": 18,
          "r": "t"
        }
      }
    },
    "zottman_curl": {
      "standard": {
        "BICEP_LONG": {
          "p": 80,
          "r": "p"
        },
        "BICEP_COURT": {
          "p": 75,
          "r": "p"
        },
        "BRACHIORAD": {
          "p": 78,
          "r": "p"
        },
        "BRACHIAL": {
          "p": 60,
          "r": "s"
        },
        "FOREARM_FLEX_SUP": {
          "p": 35,
          "r": "s"
        },
        "FOREARM_EXT": {
          "p": 28,
          "r": "t"
        }
      }
    }
  },
  "legs": {
    "squat_barre": {
      "high_bar": {
        "QUAD_VAST_LAT": {
          "p": 85,
          "r": "p"
        },
        "QUAD_VAST_MED": {
          "p": 82,
          "r": "p"
        },
        "QUAD_RECT": {
          "p": 60,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 65,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 35,
          "r": "s"
        },
        "HAMSTRING_ST": {
          "p": 30,
          "r": "s"
        },
        "SOLEUS": {
          "p": 40,
          "r": "t"
        },
        "LUMBAR": {
          "p": 55,
          "r": "t"
        },
        "CORE_TRANS": {
          "p": 35,
          "r": "t"
        }
      },
      "low_bar": {
        "GLUTE_MAX": {
          "p": 80,
          "r": "p"
        },
        "QUAD_VAST_LAT": {
          "p": 75,
          "r": "p"
        },
        "QUAD_VAST_MED": {
          "p": 72,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 50,
          "r": "s"
        },
        "HAMSTRING_ST": {
          "p": 45,
          "r": "s"
        },
        "LUMBAR": {
          "p": 70,
          "r": "t"
        }
      },
      "sumo": {
        "ADDUCTOR": {
          "p": 70,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 78,
          "r": "p"
        },
        "GLUTE_MED": {
          "p": 65,
          "r": "s"
        },
        "QUAD_VAST_MED": {
          "p": 72,
          "r": "p"
        },
        "QUAD_VAST_LAT": {
          "p": 68,
          "r": "p"
        }
      }
    },
    "squat_bulgare": {
      "standard": {
        "QUAD_VAST_MED": {
          "p": 85,
          "r": "p"
        },
        "QUAD_VAST_LAT": {
          "p": 68,
          "r": "p"
        },
        "QUAD_RECT": {
          "p": 55,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 78,
          "r": "p"
        },
        "HIP_FLEX": {
          "p": 45,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 55,
          "r": "t"
        }
      }
    },
    "souleve_de_terre": {
      "conventionnel": {
        "LUMBAR": {
          "p": 90,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 70,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 80,
          "r": "p"
        },
        "HAMSTRING_ST": {
          "p": 75,
          "r": "p"
        },
        "HAMSTRING_SM": {
          "p": 70,
          "r": "p"
        },
        "QUAD_VAST_LAT": {
          "p": 65,
          "r": "s"
        },
        "QUAD_VAST_MED": {
          "p": 60,
          "r": "s"
        },
        "TRAP_SUP": {
          "p": 55,
          "r": "s"
        },
        "FOREARM_FLEX_SUP": {
          "p": 50,
          "r": "t"
        },
        "CORE_TRANS": {
          "p": 45,
          "r": "t"
        }
      },
      "roumain": {
        "HAMSTRING_BF_LONG": {
          "p": 90,
          "r": "p"
        },
        "HAMSTRING_SM": {
          "p": 82,
          "r": "p"
        },
        "HAMSTRING_ST": {
          "p": 78,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 75,
          "r": "p"
        },
        "LUMBAR": {
          "p": 72,
          "r": "s"
        },
        "GASTRO_MED": {
          "p": 35,
          "r": "t"
        },
        "SOLEUS": {
          "p": 30,
          "r": "t"
        }
      }
    },
    "hip_thrust": {
      "barre": {
        "GLUTE_MAX": {
          "p": 150,
          "r": "p"
        },
        "GLUTE_MED": {
          "p": 80,
          "r": "s"
        },
        "HAMSTRING_BF_LONG": {
          "p": 55,
          "r": "s"
        },
        "HAMSTRING_ST": {
          "p": 48,
          "r": "s"
        },
        "QUAD_RECT": {
          "p": 30,
          "r": "t"
        },
        "CORE_TRANS": {
          "p": 40,
          "r": "t"
        }
      }
    },
    "leg_press": {
      "pieds_bas": {
        "QUAD_VAST_LAT": {
          "p": 80,
          "r": "p"
        },
        "QUAD_VAST_MED": {
          "p": 78,
          "r": "p"
        },
        "QUAD_RECT": {
          "p": 55,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 45,
          "r": "s"
        },
        "HAMSTRING_BF_LONG": {
          "p": 28,
          "r": "s"
        }
      },
      "pieds_hauts": {
        "GLUTE_MAX": {
          "p": 70,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 55,
          "r": "s"
        },
        "QUAD_VAST_LAT": {
          "p": 65,
          "r": "s"
        },
        "QUAD_VAST_MED": {
          "p": 62,
          "r": "s"
        }
      }
    },
    "elevation_mollets": {
      "debout": {
        "GASTRO_MED": {
          "p": 85,
          "r": "p"
        },
        "GASTRO_LAT": {
          "p": 80,
          "r": "p"
        },
        "SOLEUS": {
          "p": 60,
          "r": "s"
        },
        "PERONEAL": {
          "p": 35,
          "r": "t"
        }
      },
      "assis": {
        "SOLEUS": {
          "p": 88,
          "r": "p"
        },
        "GASTRO_MED": {
          "p": 30,
          "r": "s"
        },
        "GASTRO_LAT": {
          "p": 28,
          "r": "s"
        }
      }
    },
    "leg_curl": {
      "couche": {
        "HAMSTRING_BF_LONG": {
          "p": 82,
          "r": "p"
        },
        "HAMSTRING_ST": {
          "p": 78,
          "r": "p"
        },
        "HAMSTRING_SM": {
          "p": 75,
          "r": "p"
        },
        "GASTRO_MED": {
          "p": 45,
          "r": "s"
        }
      },
      "assis": {
        "HAMSTRING_BF_LONG": {
          "p": 88,
          "r": "p"
        },
        "HAMSTRING_ST": {
          "p": 85,
          "r": "p"
        },
        "HAMSTRING_SM": {
          "p": 80,
          "r": "p"
        },
        "GASTRO_MED": {
          "p": 35,
          "r": "s"
        }
      }
    },
    "fente": {
      "avant": {
        "QUAD_VAST_MED": {
          "p": 72,
          "r": "p"
        },
        "QUAD_VAST_LAT": {
          "p": 68,
          "r": "p"
        },
        "QUAD_RECT": {
          "p": 42,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 55,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 35,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 40,
          "r": "t"
        },
        "GASTRO_MED": {
          "p": 28,
          "r": "t"
        }
      },
      "arriere": {
        "GLUTE_MAX": {
          "p": 68,
          "r": "p"
        },
        "QUAD_VAST_MED": {
          "p": 62,
          "r": "p"
        },
        "QUAD_VAST_LAT": {
          "p": 58,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 45,
          "r": "s"
        },
        "HAMSTRING_ST": {
          "p": 38,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 45,
          "r": "t"
        }
      },
      "laterale": {
        "ADDUCTOR": {
          "p": 72,
          "r": "p"
        },
        "GLUTE_MED": {
          "p": 65,
          "r": "p"
        },
        "QUAD_VAST_MED": {
          "p": 60,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 50,
          "r": "s"
        },
        "QUAD_VAST_LAT": {
          "p": 45,
          "r": "s"
        }
      }
    },
    "leg_extension": {
      "standard": {
        "QUAD_VAST_LAT": {
          "p": 88,
          "r": "p"
        },
        "QUAD_VAST_MED": {
          "p": 85,
          "r": "p"
        },
        "QUAD_RECT": {
          "p": 78,
          "r": "p"
        },
        "QUAD_VAST_INT": {
          "p": 82,
          "r": "p"
        }
      }
    },
    "goblet_squat": {
      "standard": {
        "QUAD_VAST_MED": {
          "p": 80,
          "r": "p"
        },
        "QUAD_VAST_LAT": {
          "p": 78,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 68,
          "r": "p"
        },
        "CORE_TRANS": {
          "p": 40,
          "r": "s"
        },
        "ADDUCTOR": {
          "p": 45,
          "r": "s"
        },
        "LUMBAR": {
          "p": 35,
          "r": "t"
        }
      }
    },
    "sumo_sdt": {
      "standard": {
        "GLUTE_MAX": {
          "p": 72,
          "r": "p"
        },
        "ADDUCTOR": {
          "p": 78,
          "r": "p"
        },
        "QUAD_VAST_MED": {
          "p": 68,
          "r": "p"
        },
        "QUAD_VAST_LAT": {
          "p": 65,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 58,
          "r": "s"
        },
        "LUMBAR": {
          "p": 72,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 45,
          "r": "s"
        },
        "TRAP_SUP": {
          "p": 35,
          "r": "t"
        }
      }
    },
    "hip_abduction": {
      "machine": {
        "GLUTE_MED": {
          "p": 82,
          "r": "p"
        },
        "GLUTE_MIN": {
          "p": 65,
          "r": "p"
        },
        "TFL": {
          "p": 55,
          "r": "s"
        },
        "GLUTE_MAX": {
          "p": 22,
          "r": "t"
        }
      },
      "cable": {
        "GLUTE_MED": {
          "p": 78,
          "r": "p"
        },
        "GLUTE_MIN": {
          "p": 60,
          "r": "p"
        },
        "TFL": {
          "p": 50,
          "r": "s"
        },
        "GLUTE_MAX": {
          "p": 28,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 35,
          "r": "t"
        }
      }
    },
    "adduction_hanche": {
      "machine": {
        "ADDUCTOR": {
          "p": 85,
          "r": "p"
        },
        "GRACILIS": {
          "p": 68,
          "r": "p"
        },
        "PECTINEUS": {
          "p": 55,
          "r": "s"
        },
        "HIP_FLEX": {
          "p": 25,
          "r": "t"
        }
      },
      "cable": {
        "ADDUCTOR": {
          "p": 80,
          "r": "p"
        },
        "GRACILIS": {
          "p": 62,
          "r": "p"
        },
        "GLUTE_MED": {
          "p": 38,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 32,
          "r": "t"
        }
      }
    },
    "nordic_curl": {
      "standard": {
        "HAMSTRING_BF_LONG": {
          "p": 118,
          "r": "p"
        },
        "HAMSTRING_ST": {
          "p": 108,
          "r": "p"
        },
        "HAMSTRING_SM": {
          "p": 102,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 45,
          "r": "s"
        },
        "GASTRO_MED": {
          "p": 38,
          "r": "s"
        },
        "LUMBAR": {
          "p": 30,
          "r": "t"
        }
      }
    },
    "step_up": {
      "standard": {
        "GLUTE_MAX": {
          "p": 75,
          "r": "p"
        },
        "QUAD_VAST_MED": {
          "p": 68,
          "r": "p"
        },
        "QUAD_VAST_LAT": {
          "p": 62,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 42,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 48,
          "r": "s"
        },
        "GASTRO_MED": {
          "p": 30,
          "r": "t"
        }
      }
    },
    "pont_fessier": {
      "bilateral": {
        "GLUTE_MAX": {
          "p": 82,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 55,
          "r": "p"
        },
        "HAMSTRING_ST": {
          "p": 48,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 40,
          "r": "s"
        },
        "LUMBAR": {
          "p": 28,
          "r": "t"
        },
        "CORE_TRANS": {
          "p": 22,
          "r": "t"
        }
      },
      "unilateral": {
        "GLUTE_MAX": {
          "p": 98,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 68,
          "r": "p"
        },
        "GLUTE_MED": {
          "p": 58,
          "r": "s"
        },
        "HAMSTRING_ST": {
          "p": 55,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 30,
          "r": "t"
        },
        "LUMBAR": {
          "p": 25,
          "r": "t"
        }
      }
    },
    "fente_marchee": {
      "standard": {
        "QUAD_VAST_MED": {
          "p": 72,
          "r": "p"
        },
        "QUAD_VAST_LAT": {
          "p": 68,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 62,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 40,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 45,
          "r": "s"
        },
        "GASTRO_MED": {
          "p": 32,
          "r": "t"
        },
        "CORE_TRANS": {
          "p": 28,
          "r": "t"
        }
      }
    },
    "hip_thrust_unilateral": {
      "standard": {
        "GLUTE_MAX": {
          "p": 150,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 82,
          "r": "p"
        },
        "HAMSTRING_ST": {
          "p": 72,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 65,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 38,
          "r": "t"
        },
        "LUMBAR": {
          "p": 22,
          "r": "t"
        }
      }
    },
    "squat_bodyweight": {
      "standard": {
        "QUAD_VAST_MED": {
          "p": 62,
          "r": "p"
        },
        "QUAD_VAST_LAT": {
          "p": 58,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 52,
          "r": "p"
        },
        "QUAD_RECT": {
          "p": 38,
          "r": "s"
        },
        "HAMSTRING_BF_LONG": {
          "p": 32,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 28,
          "r": "t"
        },
        "GASTRO_MED": {
          "p": 22,
          "r": "t"
        },
        "CORE_TRANS": {
          "p": 20,
          "r": "t"
        }
      },
      "profond": {
        "QUAD_VAST_MED": {
          "p": 72,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 68,
          "r": "p"
        },
        "QUAD_VAST_LAT": {
          "p": 65,
          "r": "p"
        },
        "HAMSTRING_BF_LONG": {
          "p": 42,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 35,
          "r": "t"
        },
        "GASTRO_MED": {
          "p": 28,
          "r": "t"
        }
      }
    },
    "pistol_squat": {
      "standard": {
        "QUAD_VAST_MED": { "p": 85, "r": "p" },
        "QUAD_VAST_LAT": { "p": 80, "r": "p" },
        "GLUTE_MAX": { "p": 72, "r": "p" },
        "QUAD_RECT": { "p": 55, "r": "s" },
        "HAMSTRING_BF_LONG": { "p": 45, "r": "s" },
        "GLUTE_MED": { "p": 65, "r": "s" },
        "GASTRO_MED": { "p": 35, "r": "t" },
        "CORE_TRANS": { "p": 40, "r": "t" }
      },
      "assiste": {
        "QUAD_VAST_MED": { "p": 68, "r": "p" },
        "QUAD_VAST_LAT": { "p": 64, "r": "p" },
        "GLUTE_MAX": { "p": 58, "r": "p" },
        "QUAD_RECT": { "p": 45, "r": "s" },
        "HAMSTRING_BF_LONG": { "p": 36, "r": "s" },
        "GLUTE_MED": { "p": 48, "r": "s" },
        "GASTRO_MED": { "p": 28, "r": "t" },
        "CORE_TRANS": { "p": 30, "r": "t" }
      }
    },
    "shrimp_squat": {
      "standard": {
        "QUAD_VAST_MED": { "p": 82, "r": "p" },
        "QUAD_VAST_LAT": { "p": 78, "r": "p" },
        "QUAD_RECT": { "p": 62, "r": "s" },
        "GLUTE_MAX": { "p": 58, "r": "s" },
        "GLUTE_MED": { "p": 60, "r": "s" },
        "HIP_FLEX": { "p": 35, "r": "t" }
      }
    }
  },
  "core": {
    "planche": {
      "frontale": {
        "CORE_TRANS": {
          "p": 24,
          "r": "p"
        },
        "CORE_RECT_INF": {
          "p": 20,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 32,
          "r": "s"
        },
        "CORE_OBL_INT": {
          "p": 28,
          "r": "s"
        },
        "LUMBAR": {
          "p": 35,
          "r": "t"
        },
        "GLUTE_MAX": {
          "p": 20,
          "r": "t"
        },
        "QUAD_RECT": {
          "p": 18,
          "r": "t"
        }
      },
      "laterale": {
        "CORE_OBL_EXT": {
          "p": 46,
          "r": "p"
        },
        "CORE_OBL_INT": {
          "p": 42,
          "r": "p"
        },
        "CORE_TRANS": {
          "p": 30,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 38,
          "r": "s"
        },
        "LUMBAR": {
          "p": 28,
          "r": "t"
        }
      },
      "dynamique": {
        "CORE_TRANS": {
          "p": 38,
          "r": "p"
        },
        "CORE_RECT_INF": {
          "p": 32,
          "r": "p"
        },
        "CORE_OBL_EXT": {
          "p": 42,
          "r": "p"
        },
        "CORE_OBL_INT": {
          "p": 38,
          "r": "s"
        },
        "LUMBAR": {
          "p": 30,
          "r": "s"
        },
        "GLUTE_MAX": {
          "p": 22,
          "r": "t"
        },
        "SERR_ANT": {
          "p": 28,
          "r": "t"
        }
      }
    },
    "crunch": {
      "classique": {
        "CORE_RECT_SUP": {
          "p": 65,
          "r": "p"
        },
        "CORE_RECT_INF": {
          "p": 45,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 38,
          "r": "s"
        },
        "HIP_FLEX": {
          "p": 25,
          "r": "t"
        }
      },
      "inverse": {
        "CORE_RECT_INF": {
          "p": 78,
          "r": "p"
        },
        "CORE_TRANS": {
          "p": 40,
          "r": "s"
        },
        "CORE_OBL_INT": {
          "p": 35,
          "r": "s"
        },
        "HIP_FLEX": {
          "p": 55,
          "r": "s"
        }
      }
    },
    "russian_twist": {
      "standard": {
        "CORE_OBL_EXT": {
          "p": 62,
          "r": "p"
        },
        "CORE_OBL_INT": {
          "p": 58,
          "r": "p"
        },
        "CORE_RECT_SUP": {
          "p": 40,
          "r": "s"
        },
        "HIP_FLEX": {
          "p": 35,
          "r": "t"
        },
        "LUMBAR": {
          "p": 25,
          "r": "t"
        }
      }
    },
    "releve_jambes": {
      "jambes_tendues": {
        "CORE_RECT_INF": {
          "p": 78,
          "r": "p"
        },
        "HIP_FLEX": {
          "p": 85,
          "r": "p"
        },
        "CORE_RECT_SUP": {
          "p": 55,
          "r": "s"
        },
        "CORE_TRANS": {
          "p": 38,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 35,
          "r": "t"
        }
      },
      "jambes_flechies": {
        "CORE_RECT_INF": {
          "p": 62,
          "r": "p"
        },
        "HIP_FLEX": {
          "p": 70,
          "r": "p"
        },
        "CORE_TRANS": {
          "p": 32,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 28,
          "r": "t"
        }
      }
    },
    "dead_bug": {
      "standard": {
        "CORE_TRANS": {
          "p": 35,
          "r": "p"
        },
        "CORE_RECT_INF": {
          "p": 42,
          "r": "p"
        },
        "CORE_OBL_EXT": {
          "p": 38,
          "r": "s"
        },
        "CORE_OBL_INT": {
          "p": 32,
          "r": "s"
        },
        "HIP_FLEX": {
          "p": 40,
          "r": "s"
        },
        "MULTIFIDUS": {
          "p": 28,
          "r": "t"
        }
      }
    },
    "bird_dog": {
      "standard": {
        "MULTIFIDUS": {
          "p": 35,
          "r": "p"
        },
        "LUMBAR": {
          "p": 28,
          "r": "p"
        },
        "GLUTE_MAX": {
          "p": 40,
          "r": "p"
        },
        "GLUTE_MED": {
          "p": 35,
          "r": "s"
        },
        "CORE_TRANS": {
          "p": 30,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 22,
          "r": "t"
        }
      }
    },
    "cable_woodchop": {
      "haut_vers_bas": {
        "CORE_OBL_EXT": {
          "p": 65,
          "r": "p"
        },
        "CORE_OBL_INT": {
          "p": 58,
          "r": "p"
        },
        "CORE_TRANS": {
          "p": 42,
          "r": "s"
        },
        "CORE_RECT_SUP": {
          "p": 35,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 30,
          "r": "t"
        },
        "LUMBAR": {
          "p": 28,
          "r": "t"
        }
      },
      "bas_vers_haut": {
        "CORE_OBL_EXT": {
          "p": 70,
          "r": "p"
        },
        "CORE_OBL_INT": {
          "p": 62,
          "r": "p"
        },
        "CORE_TRANS": {
          "p": 40,
          "r": "s"
        },
        "GLUTE_MAX": {
          "p": 35,
          "r": "s"
        },
        "LUMBAR": {
          "p": 32,
          "r": "t"
        }
      }
    },
    "ab_wheel": {
      "standard": {
        "CORE_RECT_INF": {
          "p": 88,
          "r": "p"
        },
        "CORE_TRANS": {
          "p": 72,
          "r": "p"
        },
        "CORE_OBL_EXT": {
          "p": 65,
          "r": "p"
        },
        "CORE_OBL_INT": {
          "p": 58,
          "r": "s"
        },
        "CORE_RECT_SUP": {
          "p": 70,
          "r": "p"
        },
        "LUMBAR": {
          "p": 42,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 35,
          "r": "t"
        },
        "LAT": {
          "p": 30,
          "r": "t"
        }
      },
      "debout": {
        "CORE_RECT_INF": {
          "p": 105,
          "r": "p"
        },
        "CORE_TRANS": {
          "p": 90,
          "r": "p"
        },
        "CORE_OBL_EXT": {
          "p": 82,
          "r": "p"
        },
        "CORE_RECT_SUP": {
          "p": 88,
          "r": "p"
        },
        "LUMBAR": {
          "p": 58,
          "r": "s"
        },
        "LAT": {
          "p": 45,
          "r": "t"
        },
        "HIP_FLEX": {
          "p": 40,
          "r": "t"
        }
      }
    },
    "knee_raise": {
      "standard": {
        "HIP_FLEX": {
          "p": 70,
          "r": "p"
        },
        "CORE_RECT_INF": {
          "p": 62,
          "r": "p"
        },
        "CORE_TRANS": {
          "p": 32,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 28,
          "r": "s"
        },
        "CORE_RECT_SUP": {
          "p": 45,
          "r": "s"
        },
        "LAT": {
          "p": 25,
          "r": "t"
        },
        "FOREARM_FLEX_SUP": {
          "p": 40,
          "r": "t"
        }
      }
    },
    "pallof_press": {
      "debout": {
        "CORE_TRANS": {
          "p": 58,
          "r": "p"
        },
        "CORE_OBL_EXT": {
          "p": 62,
          "r": "p"
        },
        "CORE_OBL_INT": {
          "p": 55,
          "r": "p"
        },
        "CORE_RECT_SUP": {
          "p": 35,
          "r": "s"
        },
        "GLUTE_MED": {
          "p": 38,
          "r": "t"
        },
        "LUMBAR": {
          "p": 28,
          "r": "t"
        }
      },
      "agenouille": {
        "CORE_TRANS": {
          "p": 65,
          "r": "p"
        },
        "CORE_OBL_EXT": {
          "p": 68,
          "r": "p"
        },
        "CORE_OBL_INT": {
          "p": 60,
          "r": "p"
        },
        "CORE_RECT_SUP": {
          "p": 38,
          "r": "s"
        },
        "LUMBAR": {
          "p": 32,
          "r": "t"
        }
      },
      "elastique": {
        "CORE_OBL_EXT": {
          "p": 62,
          "r": "p"
        },
        "CORE_OBL_INT": {
          "p": 55,
          "r": "p"
        },
        "CORE_TRANS": {
          "p": 40,
          "r": "s"
        },
        "CORE_RECT_INF": {
          "p": 25,
          "r": "s"
        },
        "LUMBAR": {
          "p": 28,
          "r": "t"
        },
        "GLUTE_MED": {
          "p": 22,
          "r": "t"
        }
      }
    },
    "gainage_lateral_dynamique": {
      "standard": {
        "CORE_OBL_EXT": {
          "p": 68,
          "r": "p"
        },
        "CORE_OBL_INT": {
          "p": 60,
          "r": "p"
        },
        "GLUTE_MED": {
          "p": 72,
          "r": "p"
        },
        "CORE_TRANS": {
          "p": 42,
          "r": "s"
        },
        "DELT_MED": {
          "p": 35,
          "r": "s"
        },
        "LUMBAR": {
          "p": 30,
          "r": "t"
        }
      }
    },
    "mountain_climber": {
      "standard": {
        "HIP_FLEX": {
          "p": 72,
          "r": "p"
        },
        "CORE_RECT_INF": {
          "p": 65,
          "r": "p"
        },
        "CORE_TRANS": {
          "p": 55,
          "r": "p"
        },
        "CORE_OBL_EXT": {
          "p": 48,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 35,
          "r": "t"
        },
        "QUAD_RECT": {
          "p": 38,
          "r": "s"
        },
        "SERR_ANT": {
          "p": 28,
          "r": "t"
        }
      },
      "crosse": {
        "CORE_OBL_EXT": {
          "p": 72,
          "r": "p"
        },
        "CORE_OBL_INT": {
          "p": 65,
          "r": "p"
        },
        "HIP_FLEX": {
          "p": 68,
          "r": "p"
        },
        "CORE_RECT_INF": {
          "p": 60,
          "r": "s"
        },
        "CORE_TRANS": {
          "p": 50,
          "r": "s"
        },
        "DELT_ANT": {
          "p": 32,
          "r": "t"
        }
      }
    },
    "hollow_body": {
      "standard": {
        "CORE_TRANS": {
          "p": 78,
          "r": "p"
        },
        "CORE_RECT_INF": {
          "p": 82,
          "r": "p"
        },
        "CORE_RECT_SUP": {
          "p": 70,
          "r": "p"
        },
        "CORE_OBL_EXT": {
          "p": 55,
          "r": "s"
        },
        "HIP_FLEX": {
          "p": 60,
          "r": "s"
        },
        "CORE_OBL_INT": {
          "p": 48,
          "r": "s"
        }
      },
      "rock": {
        "CORE_TRANS": {
          "p": 82,
          "r": "p"
        },
        "CORE_RECT_INF": {
          "p": 88,
          "r": "p"
        },
        "CORE_RECT_SUP": {
          "p": 75,
          "r": "p"
        },
        "HIP_FLEX": {
          "p": 65,
          "r": "s"
        },
        "CORE_OBL_EXT": {
          "p": 58,
          "r": "s"
        },
        "LUMBAR": {
          "p": 20,
          "r": "t"
        }
      }
    }
  },
  "callisthenie": {
    "muscle_up": {
      "barre": {
        "LAT": { "p": 85, "r": "p" },
        "TRICEP_LAT": { "p": 70, "r": "p" },
        "TRICEP_MED": { "p": 65, "r": "p" },
        "BICEP_LONG": { "p": 60, "r": "s" },
        "BICEP_COURT": { "p": 55, "r": "s" },
        "PECT_MAJ_STER": { "p": 55, "r": "s" },
        "DELT_ANT": { "p": 50, "r": "s" },
        "TRAP_MED": { "p": 40, "r": "t" },
        "CORE_RECT_SUP": { "p": 35, "r": "t" }
      },
      "anneaux": {
        "LAT": { "p": 82, "r": "p" },
        "TRICEP_LAT": { "p": 68, "r": "p" },
        "TRICEP_MED": { "p": 62, "r": "p" },
        "BICEP_LONG": { "p": 58, "r": "s" },
        "BICEP_COURT": { "p": 55, "r": "s" },
        "PECT_MAJ_STER": { "p": 52, "r": "s" },
        "DELT_ANT": { "p": 50, "r": "s" },
        "DELT_MED": { "p": 45, "r": "t" },
        "TRAP_MED": { "p": 42, "r": "t" },
        "CORE_RECT_SUP": { "p": 38, "r": "t" }
      }
    },
    "front_lever": {
      "tuck": {
        "LAT": { "p": 55, "r": "p" },
        "TERES_MAJ": { "p": 45, "r": "p" },
        "RHOMBOID": { "p": 40, "r": "p" },
        "TRAP_INF": { "p": 35, "r": "s" },
        "BICEP_LONG": { "p": 40, "r": "s" },
        "BICEP_COURT": { "p": 38, "r": "s" },
        "CORE_RECT_SUP": { "p": 45, "r": "s" },
        "CORE_RECT_INF": { "p": 35, "r": "t" }
      },
      "advanced_tuck": {
        "LAT": { "p": 65, "r": "p" },
        "TERES_MAJ": { "p": 52, "r": "p" },
        "RHOMBOID": { "p": 46, "r": "p" },
        "TRAP_INF": { "p": 40, "r": "s" },
        "BICEP_LONG": { "p": 45, "r": "s" },
        "BICEP_COURT": { "p": 42, "r": "s" },
        "CORE_RECT_SUP": { "p": 55, "r": "s" },
        "CORE_RECT_INF": { "p": 42, "r": "t" }
      },
      "straddle": {
        "LAT": { "p": 78, "r": "p" },
        "TERES_MAJ": { "p": 62, "r": "p" },
        "RHOMBOID": { "p": 55, "r": "p" },
        "TRAP_INF": { "p": 48, "r": "s" },
        "BICEP_LONG": { "p": 52, "r": "s" },
        "BICEP_COURT": { "p": 48, "r": "s" },
        "CORE_RECT_SUP": { "p": 65, "r": "s" },
        "CORE_RECT_INF": { "p": 50, "r": "t" }
      },
      "full": {
        "LAT": { "p": 92, "r": "p" },
        "TERES_MAJ": { "p": 75, "r": "p" },
        "RHOMBOID": { "p": 65, "r": "p" },
        "TRAP_INF": { "p": 58, "r": "s" },
        "BICEP_LONG": { "p": 60, "r": "s" },
        "BICEP_COURT": { "p": 55, "r": "s" },
        "CORE_RECT_SUP": { "p": 78, "r": "s" },
        "CORE_RECT_INF": { "p": 60, "r": "t" }
      }
    },
    "back_lever": {
      "tuck": {
        "LAT": { "p": 50, "r": "p" },
        "TERES_MAJ": { "p": 45, "r": "p" },
        "PECT_MAJ_STER": { "p": 40, "r": "p" },
        "BICEP_LONG": { "p": 45, "r": "s" },
        "BICEP_COURT": { "p": 42, "r": "s" },
        "DELT_POST": { "p": 35, "r": "s" },
        "CORE_RECT_SUP": { "p": 40, "r": "t" }
      },
      "straddle": {
        "LAT": { "p": 68, "r": "p" },
        "TERES_MAJ": { "p": 60, "r": "p" },
        "PECT_MAJ_STER": { "p": 55, "r": "p" },
        "BICEP_LONG": { "p": 58, "r": "s" },
        "BICEP_COURT": { "p": 54, "r": "s" },
        "DELT_POST": { "p": 45, "r": "s" },
        "CORE_RECT_SUP": { "p": 52, "r": "t" }
      },
      "full": {
        "LAT": { "p": 85, "r": "p" },
        "TERES_MAJ": { "p": 75, "r": "p" },
        "PECT_MAJ_STER": { "p": 68, "r": "p" },
        "BICEP_LONG": { "p": 70, "r": "s" },
        "BICEP_COURT": { "p": 65, "r": "s" },
        "DELT_POST": { "p": 55, "r": "s" },
        "CORE_RECT_SUP": { "p": 65, "r": "t" }
      }
    },
    "planche_gymnique": {
      "frog": {
        "DELT_ANT": { "p": 45, "r": "p" },
        "SERR_ANT": { "p": 40, "r": "p" },
        "PECT_MIN": { "p": 35, "r": "p" },
        "PECT_MAJ_CLAV": { "p": 35, "r": "s" },
        "CORE_RECT_SUP": { "p": 40, "r": "s" },
        "FOREARM_FLEX_SUP": { "p": 30, "r": "t" }
      },
      "tuck": {
        "DELT_ANT": { "p": 55, "r": "p" },
        "SERR_ANT": { "p": 50, "r": "p" },
        "PECT_MIN": { "p": 42, "r": "p" },
        "PECT_MAJ_CLAV": { "p": 42, "r": "s" },
        "CORE_RECT_SUP": { "p": 50, "r": "s" },
        "FOREARM_FLEX_SUP": { "p": 35, "r": "t" }
      },
      "advanced_tuck": {
        "DELT_ANT": { "p": 65, "r": "p" },
        "SERR_ANT": { "p": 58, "r": "p" },
        "PECT_MIN": { "p": 50, "r": "p" },
        "PECT_MAJ_CLAV": { "p": 48, "r": "s" },
        "CORE_RECT_SUP": { "p": 60, "r": "s" },
        "FOREARM_FLEX_SUP": { "p": 40, "r": "t" }
      },
      "straddle": {
        "DELT_ANT": { "p": 78, "r": "p" },
        "SERR_ANT": { "p": 70, "r": "p" },
        "PECT_MIN": { "p": 60, "r": "p" },
        "PECT_MAJ_CLAV": { "p": 55, "r": "s" },
        "CORE_RECT_SUP": { "p": 72, "r": "s" },
        "FOREARM_FLEX_SUP": { "p": 48, "r": "t" }
      },
      "full": {
        "DELT_ANT": { "p": 92, "r": "p" },
        "SERR_ANT": { "p": 85, "r": "p" },
        "PECT_MIN": { "p": 72, "r": "p" },
        "PECT_MAJ_CLAV": { "p": 65, "r": "s" },
        "CORE_RECT_SUP": { "p": 85, "r": "s" },
        "FOREARM_FLEX_SUP": { "p": 55, "r": "t" }
      }
    },
    "l_sit": {
      "tuck": {
        "CORE_RECT_SUP": { "p": 55, "r": "p" },
        "HIP_FLEX": { "p": 50, "r": "p" },
        "CORE_RECT_INF": { "p": 45, "r": "s" },
        "TRICEP_LONG": { "p": 40, "r": "s" },
        "SERR_ANT": { "p": 35, "r": "t" }
      },
      "one_leg": {
        "CORE_RECT_SUP": { "p": 68, "r": "p" },
        "HIP_FLEX": { "p": 65, "r": "p" },
        "CORE_RECT_INF": { "p": 55, "r": "s" },
        "TRICEP_LONG": { "p": 48, "r": "s" },
        "SERR_ANT": { "p": 40, "r": "t" }
      },
      "full": {
        "CORE_RECT_SUP": { "p": 82, "r": "p" },
        "HIP_FLEX": { "p": 80, "r": "p" },
        "CORE_RECT_INF": { "p": 68, "r": "s" },
        "TRICEP_LONG": { "p": 58, "r": "s" },
        "SERR_ANT": { "p": 48, "r": "t" }
      }
    },
    "dragon_flag": {
      "standard": {
        "CORE_RECT_SUP": { "p": 88, "r": "p" },
        "CORE_RECT_INF": { "p": 75, "r": "p" },
        "HIP_FLEX": { "p": 60, "r": "s" },
        "LUMBAR": { "p": 35, "r": "t" }
      }
    },
    "handstand_pushup": {
      "mur_pike": {
        "DELT_ANT": { "p": 75, "r": "p" },
        "TRICEP_LAT": { "p": 65, "r": "p" },
        "TRICEP_MED": { "p": 60, "r": "p" },
        "TRICEP_LONG": { "p": 55, "r": "s" },
        "DELT_MED": { "p": 55, "r": "s" },
        "TRAP_SUP": { "p": 45, "r": "s" },
        "CORE_RECT_SUP": { "p": 40, "r": "t" }
      },
      "freestanding": {
        "DELT_ANT": { "p": 82, "r": "p" },
        "TRICEP_LAT": { "p": 70, "r": "p" },
        "TRICEP_MED": { "p": 65, "r": "p" },
        "TRICEP_LONG": { "p": 60, "r": "s" },
        "DELT_MED": { "p": 68, "r": "s" },
        "TRAP_SUP": { "p": 55, "r": "s" },
        "CORE_RECT_SUP": { "p": 58, "r": "t" },
        "FOREARM_EXT": { "p": 40, "r": "t" }
      }
    },
    "handstand_hold": {
      "mur": {
        "DELT_MED": { "p": 60, "r": "p" },
        "DELT_ANT": { "p": 50, "r": "p" },
        "TRAP_SUP": { "p": 45, "r": "s" },
        "CORE_TRANS": { "p": 40, "r": "s" },
        "FOREARM_EXT": { "p": 35, "r": "t" }
      },
      "freestanding": {
        "DELT_MED": { "p": 78, "r": "p" },
        "DELT_ANT": { "p": 65, "r": "p" },
        "TRAP_SUP": { "p": 58, "r": "s" },
        "CORE_TRANS": { "p": 60, "r": "s" },
        "FOREARM_EXT": { "p": 55, "r": "t" }
      }
    },
    "human_flag": {
      "tuck": {
        "CORE_OBL_EXT": { "p": 55, "r": "p" },
        "CORE_OBL_INT": { "p": 50, "r": "p" },
        "LAT": { "p": 45, "r": "s" },
        "DELT_MED": { "p": 40, "r": "s" },
        "FOREARM_FLEX_SUP": { "p": 35, "r": "t" }
      },
      "straddle": {
        "CORE_OBL_EXT": { "p": 72, "r": "p" },
        "CORE_OBL_INT": { "p": 65, "r": "p" },
        "LAT": { "p": 58, "r": "s" },
        "DELT_MED": { "p": 52, "r": "s" },
        "FOREARM_FLEX_SUP": { "p": 45, "r": "t" }
      },
      "full": {
        "CORE_OBL_EXT": { "p": 88, "r": "p" },
        "CORE_OBL_INT": { "p": 80, "r": "p" },
        "LAT": { "p": 72, "r": "s" },
        "DELT_MED": { "p": 65, "r": "s" },
        "FOREARM_FLEX_SUP": { "p": 55, "r": "t" }
      }
    },
    "australian_pullup": {
      "standard": {
        "LAT": { "p": 70, "r": "p" },
        "TRAP_MED": { "p": 60, "r": "p" },
        "RHOMBOID": { "p": 55, "r": "p" },
        "BICEP_LONG": { "p": 55, "r": "s" },
        "BICEP_COURT": { "p": 52, "r": "s" },
        "DELT_POST": { "p": 45, "r": "s" },
        "CORE_RECT_SUP": { "p": 35, "r": "t" }
      },
      "pieds_surleves": {
        "LAT": { "p": 80, "r": "p" },
        "TRAP_MED": { "p": 68, "r": "p" },
        "RHOMBOID": { "p": 62, "r": "p" },
        "BICEP_LONG": { "p": 62, "r": "s" },
        "BICEP_COURT": { "p": 58, "r": "s" },
        "DELT_POST": { "p": 52, "r": "s" },
        "CORE_RECT_SUP": { "p": 45, "r": "t" }
      }
    }
  }
};
