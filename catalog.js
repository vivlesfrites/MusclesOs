// ════════════════════════════════════════════════════
// CATALOG — Données exercices (version compacte)
// Les données EMG complètes sont dans les fichiers JSON séparés
// ════════════════════════════════════════════════════
const CATALOG = {
  chest: {
    label: 'Poitrine', icon: '◈',
    exercises: {
      developpe_couche_plat: {
        label: 'Développé couché plat', equipment: ['barre', 'haltères', 'machine'],
        variants: {
          prise_large:  'Prise large (>150% biacromial)',
          prise_serree: 'Prise serrée (<100% biacromial)',
          halteres:     'Haltères (ROM élargi)'
        }
      },
      developpe_couche_incline: {
        label: 'Développé couché incliné (30°)', equipment: ['barre', 'haltères', 'machine'],
        variants: {
          standard_30: 'Incliné 30° (optimal chef claviculaire)'
        }
      },
      developpe_couche_decline: {
        label: 'Développé couché décliné', equipment: ['barre', 'haltères'],
        variants: {
          decline_15: 'Décliné -15°'
        }
      },
      ecarte_halteres: {
        label: 'Écarté haltères', equipment: ['haltères'],
        angleAdaptable: true,
        angleDefault: 0,
        variants: { standard: 'Standard' }
      },
      croise_poulie: {
        label: 'Croisé poulie (crossover)', equipment: ['câble'],
        variants: {
          haut_vers_bas: 'Haut → bas (sternal inf.)',
          bas_vers_haut: 'Bas → haut (claviculaire)'
        }
      },
      pompes: {
        label: 'Pompes', equipment: ['aucun'],
        variants: {
          classiques:           'Classiques (prise neutre, largeur épaules)',
          larges:               'Prise large (>150% épaules — pectoraux)',
          serrees:              'Prise serrée / diamant (triceps)',
          piquees:              'Piquées — pieds surélevés (claviculaire)',
          declinees:            'Déclinées — mains surélevées (sternal inf.)',
          archer:               'Archer — transfert latéral (unilatéral)',
          typewriter:           'Typewriter — translation horizontale',
          spiderman:            'Spiderman — rotation hanche (obliques)',
          rotation:             'Avec rotation (T-push up)',
          plyometriques:        'Plyométriques / clapping (explosif)',
          pike:                 'Pike push up — épaules dominants',
          pseudo_planche:       'Pseudo-planche — poignets avancés',
          genoux_classiques:    'Sur genoux — classiques',
          genoux_larges:        'Sur genoux — prise large',
          genoux_serrees:       'Sur genoux — prise serrée',
          genoux_piquees:       'Sur genoux — pieds surélevés',
          genoux_declinees:     'Sur genoux — mains surélevées',
          genoux_archer:        'Sur genoux — archer',
          genoux_typewriter:    'Sur genoux — typewriter',
          genoux_spiderman:     'Sur genoux — Spiderman',
          genoux_rotation:      'Sur genoux — avec rotation',
          genoux_plyometriques: 'Sur genoux — plyométriques',
          genoux_pike:          'Sur genoux — pike push up',
        }
      },
      dips: {
        label: 'Dips', equipment: ['barres parallèles'],
        variants: {
          tronc_vertical: 'Tronc droit (triceps dominant)',
          tronc_incline:  'Tronc incliné (pectoral dominant)'
        }
      },
      pullover_haltere: {
        label: 'Pullover haltère', equipment: ['haltères'],
        variants: {
          coudes_flechis: 'Coudes fléchis (pectoral dominant)',
          coudes_tendus:  'Coudes tendus (grand dorsal dominant)'
        }
      },
      machine_pec_deck: {
        label: 'Machine pec deck (butterfly)', equipment: ['machine'],
        variants: { standard: 'Standard' }
      }
    }
  },
  back: {
    label: 'Dos', icon: '◇',
    exercises: {
      tractions: {
        label: 'Tractions', equipment: ['barre de traction'],
        variants: {
          pronation_large: 'Pronation prise large',
          supination: 'Supination (chin-up)',
          neutre: 'Prise neutre'
        }
      },
      tirage_vertical: {
        label: 'Tirage vertical (lat pulldown)', equipment: ['câble'],
        variants: {
          pronation_large: 'Pronation prise large',
          supination: 'Supination (sous-main)'
        }
      },
      rowing_barre: {
        label: 'Rowing barre (bent-over)', equipment: ['barre'],
        variants: {
          pronation: 'Pronation (overhand)',
          supination: 'Supination (underhand)'
        }
      },
      rowing_halteres: {
        label: 'Rowing haltères unilatéral', equipment: ['haltères'],
        variants: { standard: 'Standard — appui sur banc' }
      },
      rowing_cable: {
        label: 'Rowing câble assis', equipment: ['câble'],
        variants: {
          prise_serree_neutre: 'Prise serrée neutre',
          prise_large_pronation: 'Prise large pronation'
        }
      },
      rowing_machine: {
        label: 'Rowing machine (chest-supported)', equipment: ['machine'],
        variants: { standard: 'Standard — poitrine appuyée' }
      },
      tirage_poulie_basse: {
        label: 'Tirage poulie basse (straight arm)', equipment: ['câble'],
        variants: { standard: 'Bras tendus — grand dorsal isolé' }
      },
      shrug: {
        label: 'Shrug (haussement d\'épaules)', equipment: ['barre', 'haltères'],
        variants: {
          barre: 'Barre (trapèze supérieur)',
          halteres: 'Haltères'
        }
      },
      good_morning: {
        label: 'Good morning', equipment: ['barre'],
        variants: { standard: 'Standard — ischio + lombaires' }
      },
      tirage_horizontal_elastique: {
        label: 'Tirage horizontal élastique', equipment: ['élastique'],
        variants: {
          bras_tendus:  'Bras tendus (straight arm)',
          prise_serree: 'Prise serrée neutre (rowing)'
        }
      },
      traction_elastique: {
        label: 'Traction assistée élastique', equipment: ['barre_fixe', 'élastique'],
        variants: {
          pronation_large: 'Pronation large assistée',
          supination:      'Supination assistée (chin-up)'
        }
      },
      seal_row: {
        label: 'Seal row (poitrine appuyée)', equipment: ['barre', 'haltères', 'banc'],
        variants: {
          barre:    'Barre — banc surélevé',
          halteres: 'Haltères — bilatéral ou unilatéral'
        }
      }
    }
  },
  shoulders: {
    label: 'Épaules', icon: '◉',
    exercises: {
      developpe_militaire: {
        label: 'Développé militaire (OHP)', equipment: ['barre', 'haltères'],
        variants: {
          barre_devant: 'Barre devant (strict press)',
          halteres: 'Haltères assis'
        }
      },
      elevation_laterale: {
        label: 'Élévation latérale', equipment: ['haltères', 'câble', 'élastique'],
        variants: {
          neutre:           'Neutre — max deltoïde médial',
          rotation_interne: 'Rotation interne (thumb down)',
          elastique:        'Élastique — version home'
        }
      },
      elevation_frontale: {
        label: 'Élévation frontale', equipment: ['haltères'],
        variants: { halteres: 'Haltères alternés' }
      },
      face_pull: {
        label: 'Face pull', equipment: ['câble'],
        variants: { corde: 'Corde haute — rotation externe' }
      },
      rowing_debout: {
        label: 'Rowing debout (upright row)', equipment: ['barre', 'câble'],
        variants: {
          prise_large: 'Prise large — max deltoïde',
          prise_serree: 'Prise serrée — max trapèze'
        }
      },
      reverse_flyes: {
        label: 'Reverse flyes (oiseau)', equipment: ['haltères', 'machine'],
        variants: {
          incline_neutre: 'Penché neutre',
          machine: 'Machine peck-deck inversée'
        }
      },
      arnold_press: {
        label: 'Arnold press', equipment: ['haltères'],
        variants: { standard: 'Standard — rotation complète' }
      },
      tirage_nuque: {
        label: 'Tirage nuque (derrière la tête)', equipment: ['câble', 'barre de traction'],
        variants: {
          cable: 'Câble — lat pulldown derrière',
          traction: 'Traction derrière tête (⚠ mobilité requise)'
        }
      },
      rotation_externe: {
        label: 'Rotation externe coiffe', equipment: ['haltères', 'câble', 'élastique'],
        variants: {
          couche:    'Couché sur le côté',
          cable_bas: 'Câble bas debout'
        }
      },
      cuban_press: {
        label: 'Cuban press', equipment: ['haltères'],
        variants: { standard: 'Standard — rotation externe + press' }
      }
    }
  },
  arms: {
    label: 'Bras', icon: '◎',
    exercises: {
      curl_biceps: {
        label: 'Curl biceps', equipment: ['haltères', 'câble', 'élastique'],
        variants: {
          supination: 'Supination (curl classique)',
          marteau:    'Marteau (prise neutre)',
          pronation:  'Pronation (reverse curl)',
          elastique:  'Élastique — version home'
        }
      },
      extension_triceps_cable: {
        label: 'Extension triceps câble', equipment: ['câble', 'élastique'],
        variants: {
          poulie_haute: 'Poulie haute (pushdown)',
          overhead:     'Overhead (poulie basse)',
          elastique:    'Élastique — version home'
        }
      },
      curl_barre_ez: {
        label: 'Curl barre EZ', equipment: ['barre EZ'],
        variants: { prise_semi_supination: 'Prise semi-supination' }
      },
      curl_concentre: {
        label: 'Curl concentré', equipment: ['haltères'],
        variants: { standard: 'Assis — coude sur cuisse' }
      },
      skull_crusher: {
        label: 'Skull crusher', equipment: ['barre EZ'],
        variants: { barre_ez: 'Barre EZ allongé' }
      },
      dips_chaise: {
        label: 'Dips chaise', equipment: ['chaise'],
        variants: { jambes_tendues: 'Jambes tendues' }
      },
      curl_incline: {
        label: 'Curl incliné haltères', equipment: ['haltères'],
        variants: { standard: 'Allongé incliné 45° — étirement max biceps' }
      },
      preacher_curl: {
        label: 'Preacher curl (pupitre)', equipment: ['barre EZ', 'haltères'],
        variants: {
          barre_ez: 'Barre EZ',
          haltere: 'Haltère unilatéral'
        }
      },
      overhead_ext_haltere: {
        label: 'Extension overhead haltère', equipment: ['haltères'],
        variants: {
          bimanuel: 'Bimanuel (longue portion étirée)',
          unilateral: 'Unilatéral'
        }
      },
      kickback: {
        label: 'Kickback triceps', equipment: ['haltères', 'câble', 'élastique'],
        variants: { haltere: 'Haltère — appui banc' }
      },
      zottman_curl: {
        label: 'Zottman curl', equipment: ['haltères'],
        variants: { standard: 'Supination montée — pronation descente' }
      }
    }
  },
  legs: {
    label: 'Jambes', icon: '◑',
    exercises: {
      squat_barre: {
        label: 'Squat barre', equipment: ['barre'],
        variants: {
          high_bar: 'High bar (olympique)',
          low_bar: 'Low bar (powerlifting)',
          sumo: 'Sumo'
        }
      },
      squat_bulgare: {
        label: 'Squat bulgare', equipment: ['haltères', 'barre'],
        variants: { standard: 'Standard — pied arrière surélevé' }
      },
      souleve_de_terre: {
        label: 'Soulevé de terre', equipment: ['barre'],
        variants: {
          conventionnel: 'Conventionnel',
          roumain: 'Roumain (RDL)'
        }
      },
      hip_thrust: {
        label: 'Hip thrust', equipment: ['barre', 'machine'],
        variants: {
          barre:       'Barre — appui sur banc',
          unilateral:  'Unilatéral — fessier maximal'
        }
      },
      leg_press: {
        label: 'Leg press', equipment: ['machine'],
        variants: {
          pieds_bas: 'Pieds bas — quadriceps',
          pieds_hauts: 'Pieds hauts — fessiers/ischio'
        }
      },
      elevation_mollets: {
        label: 'Élévation des mollets', equipment: ['machine', 'aucun'],
        variants: {
          debout: 'Debout (gastrocnémien)',
          assis: 'Assis (soléaire)'
        }
      },
      leg_curl: {
        label: 'Leg curl', equipment: ['machine'],
        variants: { couche: 'Couché', assis: 'Assis' }
      },
      fente: {
        label: 'Fente', equipment: ['aucun', 'haltères'],
        variants: {
          avant:    'Fente avant',
          arriere:  'Fente arrière',
          laterale: 'Fente latérale',
          marchee:  'Fentes marchées'
        }
      },
      leg_extension: {
        label: 'Leg extension', equipment: ['machine'],
        variants: { standard: 'Standard' }
      },
      goblet_squat: {
        label: 'Goblet squat', equipment: ['haltères', 'kettlebell'],
        variants: { standard: 'Standard' }
      },
      sumo_sdt: {
        label: 'Soulevé de terre sumo', equipment: ['barre'],
        variants: { standard: 'Sumo — adducteurs et fessiers accentués' }
      },
      hip_abduction: {
        label: 'Abduction hanche', equipment: ['machine', 'câble'],
        variants: {
          machine: 'Machine abducteurs assis',
          cable: 'Câble debout (moyen fessier)'
        }
      },
      nordic_curl: {
        label: 'Nordic curl', equipment: ['aucun'],
        variants: { standard: 'Standard — ischio en excentrique' }
      },
      step_up: {
        label: 'Step up', equipment: ['haltères', 'aucun'],
        variants: { standard: 'Montée sur banc unilatérale' }
      },
      squat_bodyweight: {
        label: 'Squat bodyweight', equipment: ['aucun'],
        variants: {
          standard: 'Standard',
          profond:  'Profond (ATG — ass to grass)'
        }
      },
      pont_fessier: {
        label: 'Pont fessier (glute bridge)', equipment: ['aucun', 'élastique'],
        variants: {
          bilateral:   'Bilatéral — bodyweight',
          unilateral:  'Unilatéral — single leg'
        }
      },
      adduction_hanche: {
        label: 'Adduction hanche', equipment: ['machine', 'câble', 'élastique'],
        variants: {
          machine: 'Machine adducteurs assis',
          cable:   'Câble debout'
        }
      },
      pistol_squat: {
        label: 'Pistol squat', equipment: ['aucun'],
        variants: {
          standard: 'Standard',
          assiste:  'Assisté (appui/contrepoids)'
        }
      },
      shrimp_squat: {
        label: 'Shrimp squat', equipment: ['aucun'],
        variants: { standard: 'Standard' }
      }
    }
  },
  core: {
    label: 'Core', icon: '◐',
    exercises: {
      planche: {
        label: 'Planche', equipment: ['aucun'],
        variants: {
          frontale: { label: 'Frontale',  hold: true },
          laterale: { label: 'Latérale',  hold: true }
        }
      },
      crunch: {
        label: 'Crunch', equipment: ['aucun'],
        variants: {
          classique: 'Classique',
          inverse: "Inversé (jambes en l'air)"
        }
      },
      russian_twist: {
        label: 'Russian twist', equipment: ['aucun', 'disque'],
        variants: { standard: 'Standard' }
      },
      releve_jambes: {
        label: 'Relevé de jambes suspendu', equipment: ['barre de traction'],
        variants: {
          jambes_tendues: 'Jambes tendues',
          jambes_flechies: 'Jambes fléchies'
        }
      },
      dead_bug: {
        label: 'Dead bug', equipment: ['aucun'],
        variants: { standard: 'Standard' }
      },
      bird_dog: {
        label: 'Bird dog', equipment: ['aucun'],
        variants: { standard: 'Standard (quadrupédie)' }
      },
      cable_woodchop: {
        label: 'Bûcheron au câble', equipment: ['câble'],
        variants: {
          haut_vers_bas: 'Haut → bas',
          bas_vers_haut: 'Bas → haut'
        }
      },
      ab_wheel: {
        label: 'Roue abdominale (ab wheel)', equipment: ['roue'],
        variants: {
          standard: 'Standard — genoux au sol',
          debout:   'Debout — progression avancée'
        }
      },
      knee_raise: {
        label: 'Relevé de genoux suspendu', equipment: ['barre de traction'],
        variants: { standard: 'Genoux vers poitrine' }
      },
      pallof_press: {
        label: 'Pallof press', equipment: ['câble', 'élastique'],
        variants: {
          debout:    'Debout — anti-rotation',
          agenouille: 'À genoux'
        }
      },
      gainage_lateral_dynamique: {
        label: 'Gainage latéral dynamique (star plank)', equipment: ['aucun'],
        variants: { standard: 'Standard' }
      },
      mountain_climber: {
        label: 'Mountain climber', equipment: ['aucun'],
        variants: {
          standard: 'Alterné — rythme modéré',
          crosse:   'Croisé (coude → genou opposé)'
        }
      },
      hollow_body: {
        label: 'Hollow body (position creuse)', equipment: ['aucun'],
        variants: {
          standard: { label: 'Statique — tension maximale', hold: true },
          rock:     'Hollow rock — dynamique'
        }
      }
    }
  },
  callisthenie: {
    label: 'Callisthénie', icon: '◒',
    exercises: {
      muscle_up: {
        label: 'Muscle-up', equipment: ['barre de traction', 'anneaux'],
        variants: {
          barre:   { label: 'Barre', equipment: 'barre de traction' },
          anneaux: { label: 'Anneaux', equipment: 'anneaux' }
        }
      },
      front_lever: {
        label: 'Front lever', equipment: ['barre de traction', 'anneaux'],
        variants: {
          tuck:          { label: 'Tuck — genoux repliés', hold: true },
          advanced_tuck: { label: 'Advanced tuck — hanches ouvertes', hold: true },
          straddle:      { label: 'Straddle — jambes écartées', hold: true },
          full:          { label: 'Full — jambes tendues jointes', hold: true }
        }
      },
      back_lever: {
        label: 'Back lever', equipment: ['barre de traction', 'anneaux'],
        variants: {
          tuck:     { label: 'Tuck — genoux repliés', hold: true },
          straddle: { label: 'Straddle — jambes écartées', hold: true },
          full:     { label: 'Full — jambes tendues jointes', hold: true }
        }
      },
      planche_gymnique: {
        label: 'Planche (skill gymnique)', equipment: ['parallettes', 'aucun'],
        variants: {
          frog:          { label: 'Frog stance', hold: true },
          tuck:          { label: 'Tuck — genoux repliés', hold: true },
          advanced_tuck: { label: 'Advanced tuck — hanches ouvertes', hold: true },
          straddle:      { label: 'Straddle — jambes écartées', hold: true },
          full:          { label: 'Full — jambes tendues jointes', hold: true }
        }
      },
      l_sit: {
        label: 'L-sit', equipment: ['parallettes', 'aucun', 'barres parallèles'],
        variants: {
          tuck:    { label: 'Tuck — genoux repliés', hold: true },
          one_leg: { label: 'Une jambe tendue', hold: true },
          full:    { label: 'Full — jambes tendues', hold: true }
        }
      },
      dragon_flag: {
        label: 'Dragon flag', equipment: ['banc', 'aucun'],
        variants: { standard: 'Standard — excentrique lent' }
      },
      handstand_pushup: {
        label: 'Handstand push-up', equipment: ['mur', 'aucun'],
        variants: {
          mur_pike:    { label: 'Mur (pike, dos au mur)', equipment: 'mur' },
          freestanding: 'Freestanding — sans appui'
        }
      },
      handstand_hold: {
        label: 'Handstand (équilibre)', equipment: ['mur', 'aucun'],
        variants: {
          mur:          { label: 'Contre le mur', hold: true, equipment: 'mur' },
          freestanding: { label: 'Freestanding — sans appui', hold: true }
        }
      },
      human_flag: {
        label: 'Human flag', equipment: ['barre verticale'],
        variants: {
          tuck:     { label: 'Tuck — genoux repliés', hold: true },
          straddle: { label: 'Straddle — jambes écartées', hold: true },
          full:     { label: 'Full — jambes tendues jointes', hold: true }
        }
      },
      australian_pullup: {
        label: 'Row australien', equipment: ['barre basse', 'anneaux'],
        variants: {
          standard: 'Standard',
          pieds_surleves: 'Pieds surélevés'
        }
      }
    }
  }
};

const CAT_COLORS = {
  chest: '#ff6b6b', back: '#5ba3ff', shoulders: '#ffaa3d',
  arms: '#c084fc', legs: '#3dffa0', core: '#ffd166',
  callisthenie: '#5bd8d0'
};

// ════════════════════════════════════════════════════
// MUSCLE LABELS + GROUPS (pour l'onglet Fatigue)
// ════════════════════════════════════════════════════
const MUSCLE_LABELS = {
  PECT_MAJ_STER:'Pectoral sternal', PECT_MAJ_CLAV:'Pectoral claviculaire',
  PECT_MIN:'Petit pectoral', SERR_ANT:'Dentelé antérieur',
  CORACO_BRACH:'Coracobrachial',
  DELT_ANT:'Deltoïde antérieur', DELT_MED:'Deltoïde médial', DELT_POST:'Deltoïde postérieur',
  INFRA:'Infra-épineux', SUPRASPIN:'Sus-épineux', SUBSCAP:'Subscapulaire', TERES_MIN:'Petit rond',
  LAT:'Grand dorsal', TRAP_SUP:'Trapèze supérieur', TRAP_MED:'Trapèze moyen',
  TRAP_INF:'Trapèze inférieur', RHOMBOID:'Rhomboïdes', TERES_MAJ:'Grand rond',
  LUMBAR:'Érecteurs lombaires', MULTIFIDUS:'Multifidus', QL:'Carré des lombes',
  BICEP_LONG:'Biceps chef long', BICEP_COURT:'Biceps chef court',
  BRACHIAL:'Brachial', BRACHIORAD:'Brachio-radial',
  TRICEP_LONG:'Triceps chef long', TRICEP_LAT:'Triceps chef latéral', TRICEP_MED:'Triceps chef médial',
  FOREARM_EXT:'Extenseurs avant-bras', FOREARM_FLEX_SUP:'Fléchisseurs avant-bras',
  GLUTE_MAX:'Grand fessier', GLUTE_MED:'Moyen fessier', GLUTE_MIN:'Petit fessier',
  QUAD_VAST_LAT:'Vaste latéral', QUAD_VAST_MED:'Vaste médial',
  QUAD_VAST_INT:'Vaste intermédiaire', QUAD_RECT:'Droit fémoral',
  HAMSTRING_BF_LONG:'Biceps fémoral long', HAMSTRING_BF_COURT:'Biceps fémoral court',
  HAMSTRING_ST:'Semi-tendineux', HAMSTRING_SM:'Semi-membraneux',
  ADDUCTOR:'Adducteurs', ADDUCTOR_LONG:'Adducteur long',
  ADDUCTOR_BREV:'Adducteur court', ADDUCTOR_MAG:'Grand adducteur',
  HIP_FLEX:'Fléchisseurs de hanche', PIRIFORMIS:'Piriforme',
  GASTRO_MED:'Gastrocnémien médial', GASTRO_LAT:'Gastrocnémien latéral',
  SOLEUS:'Soléaire', PERONEAL:'Péroniers',
  TIB_ANT:'Tibial antérieur',
  CORE_RECT_SUP:'Grand droit supérieur', CORE_RECT_INF:'Grand droit inférieur',
  CORE_OBL_EXT:'Oblique externe', CORE_OBL_INT:'Oblique interne', CORE_TRANS:'Transverse',
};

const MUSCLE_GROUPS = {
  'Poitrine' : ['PECT_MAJ_STER','PECT_MAJ_CLAV','PECT_MIN','SERR_ANT'],
  'Dos'      : ['LAT','TERES_MAJ','RHOMBOID','TRAP_INF','TRAP_MED','TRAP_SUP','LUMBAR','MULTIFIDUS','QL'],
  'Épaules'  : ['DELT_ANT','DELT_MED','DELT_POST','INFRA','SUPRASPIN','SUBSCAP','TERES_MIN'],
  'Bras'     : ['BICEP_LONG','BICEP_COURT','BRACHIAL','BRACHIORAD','CORACO_BRACH',
                'TRICEP_LONG','TRICEP_LAT','TRICEP_MED','FOREARM_EXT','FOREARM_FLEX_SUP'],
  'Jambes'   : ['GLUTE_MAX','GLUTE_MED','GLUTE_MIN','QUAD_VAST_LAT','QUAD_VAST_MED',
                'QUAD_VAST_INT','QUAD_RECT','HAMSTRING_BF_LONG','HAMSTRING_BF_COURT',
                'HAMSTRING_ST','HAMSTRING_SM','ADDUCTOR_LONG','ADDUCTOR_BREV','ADDUCTOR_MAG',
                'HIP_FLEX','PIRIFORMIS','GASTRO_MED','GASTRO_LAT','SOLEUS','PERONEAL','TIB_ANT'],
  'Core'     : ['CORE_RECT_SUP','CORE_RECT_INF','CORE_OBL_EXT','CORE_OBL_INT','CORE_TRANS'],
};
