'use strict';
// ════════════════════════════════════════════════════
// BODY_MAP v2.0 — Carte anatomique SVG interactive
// Deux figures : face antérieure + face postérieure
// 56 zones musculaires canoniques (IDs alignés sur MUSCLE_GROUPS, catalog.js)
//
// Géométrie : <path> générés par un générateur organique paramétrique
// (fuseau lissé via interpolation Catmull-Rom → bézier cubique), positions
// et échelles ancrées sur la carte v1.0 (ellipses, déjà validée en prod).
// 100% original — aucune image ni SVG sous licence externe tracé ou
// réutilisé (pas d'accès à une source type BodyParts3D/Anatomography dans
// cet environnement). Compatible avec la licence projet CC BY-NC 4.0.
//
// Symétrie gauche/droite : le côté droit n'est jamais recalculé à la main,
// il duplique le même "d" avec un transform SVG (translate + scale(-1,1))
// autour de l'axe central de chaque figure — symétrie garantie par le
// moteur SVG, pas de dérive possible entre les deux moitiés.
//
// API publique (inchangée depuis v1.0) :
//   BODY_MAP.render(containerId, onMuscleClick)
//   BODY_MAP.updateFatigue(containerId, data)       — { MUSCLE_ID: 0–160 }
//   BODY_MAP.updateProgression(containerId, cats)   — Set de catégories actives
//   BODY_MAP.highlight(containerId, muscleId)
//   BODY_MAP.MUSCLE_TO_CAT                          — mapping id → catégorie
// ════════════════════════════════════════════════════

const BODY_MAP = (() => {

  const FCX = 120;  // centre figure antérieure
  const BCX = 360;  // centre figure postérieure

  // ── Muscle → catégorie CATALOG ────────────────────
  const MUSCLE_TO_CAT = {
    PECT_MAJ_CLAV:'chest',   PECT_MAJ_STER:'chest',   PECT_MIN:'chest',      SERR_ANT:'chest',
    DELT_ANT:'shoulders',    DELT_MED:'shoulders',    DELT_POST:'shoulders',
    INFRA:'shoulders',       SUPRASPIN:'shoulders',   SUBSCAP:'shoulders',   TERES_MIN:'shoulders',
    LAT:'back',              TRAP_SUP:'back',          TRAP_MED:'back',       TRAP_INF:'back',
    RHOMBOID:'back',         TERES_MAJ:'back',         LUMBAR:'back',         MULTIFIDUS:'back',
    QL:'back',
    BICEP_LONG:'arms',       BICEP_COURT:'arms',       BRACHIAL:'arms',       BRACHIORAD:'arms',
    CORACO_BRACH:'arms',
    FOREARM_EXT:'arms',      FOREARM_FLEX_SUP:'arms',
    TRICEP_LONG:'arms',      TRICEP_LAT:'arms',        TRICEP_MED:'arms',
    GLUTE_MAX:'legs',        GLUTE_MED:'legs',         GLUTE_MIN:'legs',      PIRIFORMIS:'legs',
    QUAD_RECT:'legs',        QUAD_VAST_MED:'legs',     QUAD_VAST_LAT:'legs',  QUAD_VAST_INT:'legs',
    HAMSTRING_BF_LONG:'legs',HAMSTRING_BF_COURT:'legs',HAMSTRING_ST:'legs',   HAMSTRING_SM:'legs',
    ADDUCTOR_LONG:'legs',    ADDUCTOR_BREV:'legs',     ADDUCTOR_MAG:'legs',   HIP_FLEX:'legs',
    GASTRO_MED:'legs',       GASTRO_LAT:'legs',        SOLEUS:'legs',
    PERONEAL:'legs',         TIB_ANT:'legs',
    CORE_RECT_SUP:'core',    CORE_RECT_INF:'core',    CORE_OBL_EXT:'core',
    CORE_OBL_INT:'core',     CORE_TRANS:'core',
  };

  // ── Définitions des zones ─────────────────────────
  // view : 'front' | 'back' | 'both'
  // sym  : true  → zone bilatérale (_L gauche fig. + _R miroir auto via transform)
  //        false → zone unique (midline ou non-bilatérale)
  // deep : true  → muscle profond (tiret pointillé, peint sous les zones de surface)
  // f/b  : { cx, cy, rx, ry } — position/échelle ancrées côté gauche de la figure (L),
  //        converties en tracé bézier organique par _shapeD() (voir plus bas).
  //   Front  R : cx_R = 2*FCX − cx_L = 240 − cx_L
  //   Back   R : cx_R = 2*BCX − cx_L = 720 − cx_L
  const ZONES = [

    // ══════════ VUE ANTÉRIEURE ══════════

    { id:'TRAP_SUP',       view:'both',  sym:false,
      f:{ cx:FCX, cy:104, rx:42, ry:10 },
      b:{ cx:BCX, cy:108, rx:46, ry:13 } },

    { id:'DELT_ANT',       view:'front', sym:true,
      f:{ cx:72, cy:116, rx:11, ry:24 } },
    { id:'DELT_MED',       view:'both',  sym:true,
      f:{ cx:60, cy:114, rx:8,  ry:20 },
      b:{ cx:308, cy:114, rx:8, ry:20 } },

    { id:'PECT_MAJ_CLAV',  view:'front', sym:true,
      f:{ cx:105, cy:120, rx:17, ry:17 } },
    { id:'PECT_MAJ_STER',  view:'front', sym:true,
      f:{ cx:104, cy:163, rx:20, ry:31 } },
    { id:'PECT_MIN',       view:'front', sym:true, deep:true,
      f:{ cx:104, cy:140, rx:11, ry:13 } },

    { id:'SERR_ANT',       view:'front', sym:true,
      f:{ cx:84, cy:190, rx:10, ry:38 } },

    { id:'CORACO_BRACH',   view:'front', sym:true, deep:true,
      f:{ cx:64, cy:158, rx:5, ry:14 } },

    { id:'BICEP_LONG',     view:'front', sym:true,
      f:{ cx:57, cy:182, rx:6, ry:32 } },
    { id:'BICEP_COURT',    view:'front', sym:true,
      f:{ cx:67, cy:182, rx:6, ry:32 } },

    { id:'BRACHIAL',       view:'front', sym:true,
      f:{ cx:62, cy:226, rx:10, ry:13 } },
    { id:'BRACHIORAD',     view:'front', sym:true,
      f:{ cx:55, cy:285, rx:7, ry:26 } },
    { id:'FOREARM_FLEX_SUP',view:'front',sym:true,
      f:{ cx:67, cy:285, rx:7, ry:28 } },

    { id:'CORE_RECT_SUP',  view:'front', sym:true,
      f:{ cx:110, cy:218, rx:11, ry:14 } },
    { id:'CORE_RECT_INF',  view:'front', sym:true,
      f:{ cx:110, cy:248, rx:11, ry:14 } },

    { id:'CORE_OBL_EXT',   view:'front', sym:true,
      f:{ cx:90, cy:233, rx:10, ry:38 } },
    { id:'CORE_OBL_INT',   view:'front', sym:true, deep:true,
      f:{ cx:94, cy:239, rx:8, ry:30 } },

    { id:'CORE_TRANS',     view:'front', sym:false, deep:true,
      f:{ cx:FCX, cy:262, rx:28, ry:8 } },

    { id:'HIP_FLEX',       view:'front', sym:true,
      f:{ cx:107, cy:284, rx:9, ry:14 } },

    // Quadriceps (4 zones face antérieure)
    { id:'QUAD_VAST_LAT',  view:'front', sym:true,
      f:{ cx:87, cy:348, rx:9, ry:62 } },
    { id:'QUAD_RECT',      view:'front', sym:true,
      f:{ cx:99, cy:348, rx:8, ry:62 } },
    { id:'QUAD_VAST_INT',  view:'front', sym:true, deep:true,
      f:{ cx:100, cy:374, rx:6, ry:26 } },
    { id:'QUAD_VAST_MED',  view:'front', sym:true,
      f:{ cx:110, cy:386, rx:9, ry:20 } },

    // Adducteurs (face interne cuisse, 3 zones — long superficiel proximal,
    // court profond, grand adducteur superficiel distal/volumineux)
    { id:'ADDUCTOR_LONG',  view:'front', sym:true,
      f:{ cx:114, cy:315, rx:6, ry:28 } },
    { id:'ADDUCTOR_BREV',  view:'front', sym:true, deep:true,
      f:{ cx:118, cy:330, rx:5, ry:22 } },
    { id:'ADDUCTOR_MAG',   view:'front', sym:true,
      f:{ cx:116, cy:372, rx:8, ry:42 } },

    { id:'TIB_ANT',        view:'front', sym:true,
      f:{ cx:91, cy:430, rx:7, ry:33 } },
    { id:'PERONEAL',       view:'front', sym:true,
      f:{ cx:88, cy:432, rx:5, ry:28 } },

    { id:'GASTRO_LAT',     view:'both',  sym:true,
      f:{ cx:88, cy:436, rx:6, ry:28 },
      b:{ cx:328, cy:434, rx:9, ry:36 } },
    { id:'GASTRO_MED',     view:'both',  sym:true,
      f:{ cx:107, cy:437, rx:6, ry:30 },
      b:{ cx:352, cy:437, rx:9, ry:38 } },
    { id:'SOLEUS',         view:'both',  sym:true,
      f:{ cx:98, cy:463, rx:7, ry:14 },
      b:{ cx:340, cy:466, rx:13, ry:20 } },

    // ══════════ VUE POSTÉRIEURE ══════════

    { id:'TRAP_MED',       view:'back',  sym:false,
      b:{ cx:BCX, cy:132, rx:40, ry:10 } },
    { id:'TRAP_INF',       view:'back',  sym:false,
      b:{ cx:BCX, cy:172, rx:30, ry:28 } },

    { id:'RHOMBOID',       view:'back',  sym:false,
      b:{ cx:BCX, cy:145, rx:18, ry:22 } },

    // Coiffe des rotateurs (zones scapulaires)
    { id:'DELT_POST',      view:'back',  sym:true,
      b:{ cx:312, cy:116, rx:11, ry:24 } },
    { id:'SUPRASPIN',      view:'back',  sym:true,
      b:{ cx:318, cy:122, rx:12, ry:10 } },
    { id:'INFRA',          view:'back',  sym:true,
      b:{ cx:320, cy:150, rx:14, ry:22 } },
    { id:'TERES_MIN',      view:'back',  sym:true,
      b:{ cx:318, cy:178, rx:9, ry:12 } },
    { id:'TERES_MAJ',      view:'back',  sym:true,
      b:{ cx:314, cy:200, rx:10, ry:18 } },
    { id:'SUBSCAP',        view:'back',  sym:true, deep:true,
      b:{ cx:325, cy:152, rx:11, ry:16 } },

    { id:'LAT',            view:'back',  sym:true,
      b:{ cx:320, cy:220, rx:18, ry:58 } },

    { id:'LUMBAR',         view:'back',  sym:false,
      b:{ cx:BCX, cy:250, rx:15, ry:26 } },
    { id:'MULTIFIDUS',     view:'back',  sym:true,
      b:{ cx:348, cy:248, rx:7, ry:22 } },
    { id:'QL',             view:'back',  sym:false, deep:true,
      b:{ cx:BCX, cy:236, rx:20, ry:14 } },

    // Triceps (3 chefs face postérieure du bras)
    { id:'TRICEP_LAT',     view:'back',  sym:true,
      b:{ cx:297, cy:186, rx:7, ry:38 } },
    { id:'TRICEP_LONG',    view:'back',  sym:true,
      b:{ cx:300, cy:196, rx:7, ry:42 } },
    { id:'TRICEP_MED',     view:'back',  sym:true,
      b:{ cx:308, cy:220, rx:6, ry:18 } },

    { id:'FOREARM_EXT',    view:'back',  sym:true,
      b:{ cx:298, cy:312, rx:8, ry:28 } },

    // Fessiers (3 zones)
    { id:'GLUTE_MED',      view:'back',  sym:true,
      b:{ cx:328, cy:278, rx:16, ry:24 } },
    { id:'GLUTE_MIN',      view:'back',  sym:true, deep:true,
      b:{ cx:332, cy:284, rx:10, ry:15 } },
    { id:'GLUTE_MAX',      view:'back',  sym:true,
      b:{ cx:344, cy:308, rx:22, ry:46 } },
    { id:'PIRIFORMIS',     view:'back',  sym:true, deep:true,
      b:{ cx:336, cy:296, rx:8, ry:10 } },

    // Ischio-jambiers (4 chefs, de latéral à médial)
    { id:'HAMSTRING_BF_LONG',  view:'back', sym:true,
      b:{ cx:330, cy:350, rx:9, ry:55 } },
    { id:'HAMSTRING_BF_COURT', view:'back', sym:true,
      b:{ cx:328, cy:392, rx:8, ry:20 } },
    { id:'HAMSTRING_ST',       view:'back', sym:true,
      b:{ cx:347, cy:350, rx:7, ry:52 } },
    { id:'HAMSTRING_SM',       view:'back', sym:true, deep:true,
      b:{ cx:353, cy:350, rx:6, ry:48 } },

  ];

  // ── Interpolation Catmull-Rom → bézier cubique (courbe fermée lissée) ──
  function _smoothPath(pts) {
    const n = pts.length;
    const get = i => pts[((i % n) + n) % n];
    const d = [`M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`];
    for (let i = 0; i < n; i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d.push(`C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`);
    }
    d.push('Z');
    return d.join(' ');
  }

  // ── 8 points d'un fuseau organique (lissé ensuite par Catmull-Rom) ────
  // Construit sur un octogone d'ellipse (angle régulier tous les 45°), pour
  // rester une forme pleinement arrondie à taper=0. Le taper ne fait que
  // resserrer les points proches des pointes (haut/bas) vers l'axe central —
  // les pointes elles-mêmes restent à largeur nulle par construction (cos 90°),
  // donc plus le taper est élevé, plus la courbe s'y engouffre en fuseau ;
  // à taper=0 la courbe reste pleine jusqu'aux pointes (rendu quasi ovale).
  // halfLen : demi-longueur (axe pointe-à-pointe) — halfWid : demi-largeur au ventre
  // angleDeg : rotation — taper : 0 = ovale plein, ~0.4-0.6 = fuseau (tendons)
  function _organicPts(cx, cy, halfLen, halfWid, angleDeg, taper) {
    const rad = angleDeg * Math.PI / 180, cos = Math.cos(rad), sin = Math.sin(rad);
    const local = [];
    for (let i = 0; i < 8; i++) {
      const t = i * Math.PI / 4;              // 0, 45°, 90°, … 315°
      const ux = Math.cos(t), uy = -Math.sin(t);
      const w = halfWid * (1 - taper * Math.abs(uy));
      local.push([ux * w, uy * halfLen]);
    }
    return local.map(([x, y]) => [cx + x * cos - y * sin, cy + x * sin + y * cos]);
  }

  // ── Ellipse (cx,cy,rx,ry) → tracé bézier organique ────────────────────
  function _shapeD(cx, cy, rx, ry, deep) {
    const halfLen = Math.max(rx, ry);
    const halfWid = Math.min(rx, ry) || 1;
    const angle   = rx > ry ? 90 : 0;
    const ratio   = halfLen / halfWid;
    const taper   = deep ? 0.1 : (ratio >= 1.8 ? 0.4 : 0.18);
    return _smoothPath(_organicPts(cx, cy, halfLen, halfWid, angle, taper));
  }

  // ── Silhouette (fond non-interactif) ──────────────
  function _silhouette(cx) {
    const seg = (cx0, cy, rx, ry) => `<path class="bm-sil" d="${_shapeD(cx0, cy, rx, ry, false)}"/>`;
    return [
      seg(cx,     52,  26, 26),
      seg(cx,     90,  12, 15),
      seg(cx-50,  112, 22, 21),
      seg(cx+50,  112, 22, 21),
      seg(cx,     190, 46, 88),
      seg(cx,     278, 44, 25),
      seg(cx-58,  193, 12, 78),
      seg(cx+58,  193, 12, 78),
      seg(cx-58,  312, 11, 58),
      seg(cx+58,  312, 11, 58),
      seg(cx-20,  364, 20, 70),
      seg(cx+20,  364, 20, 70),
      seg(cx-22,  454, 15, 46),
      seg(cx+22,  454, 15, 46),
    ].join('');
  }

  // ── Construction d'une zone (path + duplicata miroir si sym) ──────────
  function _zone(z, side) {
    const c     = side === 'front' ? z.f : z.b;
    const cx0   = side === 'front' ? FCX : BCX;
    const mir   = 2 * cx0;
    const cls   = 'bm-zone' + (z.deep ? ' bm-deep' : '');
    const lbl   = (typeof MUSCLE_LABELS !== 'undefined' && MUSCLE_LABELS[z.id])
                  ? MUSCLE_LABELS[z.id] : z.id;
    const sfx   = side === 'front' ? 'F' : 'B';
    const d     = _shapeD(c.cx, c.cy, c.rx, c.ry, z.deep);

    const path = (id, extraAttr) =>
      `<path id="${id}" class="${cls}" data-id="${z.id}" d="${d}"${extraAttr ? ' ' + extraAttr : ''}>` +
      `<title>${lbl}</title></path>`;

    return z.sym
      ? path(`bm_${z.id}_L${sfx}`) + path(`bm_${z.id}_R${sfx}`, `transform="translate(${mir},0) scale(-1,1)"`)
      : path(`bm_${z.id}_${sfx}`);
  }

  // ── Génération du SVG complet ──────────────────────
  function _buildSVG() {
    let fDeep = '', fSurf = '', bDeep = '', bSurf = '';
    for (const z of ZONES) {
      if ((z.view === 'front' || z.view === 'both') && z.f) {
        if (z.deep) fDeep += _zone(z, 'front'); else fSurf += _zone(z, 'front');
      }
      if ((z.view === 'back' || z.view === 'both') && z.b) {
        if (z.deep) bDeep += _zone(z, 'back'); else bSurf += _zone(z, 'back');
      }
    }
    return `<svg viewBox="0 0 480 510" class="bm-svg" xmlns="http://www.w3.org/2000/svg">
<defs><style>
  .bm-sil{fill:var(--s2);stroke:var(--b2);stroke-width:.6}
  .bm-zone{fill:var(--s3);stroke:var(--b1);stroke-width:.8;cursor:pointer;
           transition:fill .18s,stroke .1s,stroke-width .1s}
  .bm-zone:hover{stroke:var(--accent);stroke-width:1.3;fill-opacity:.92}
  .bm-zone.bm-deep{stroke-dasharray:3 2;opacity:.82}
  .bm-zone.bm-sel{stroke:var(--accent);stroke-width:1.6;filter:drop-shadow(0 0 3px var(--accent))}
  .bm-lbl{fill:var(--t3);font:600 8px var(--mono);letter-spacing:.1em;text-anchor:middle;pointer-events:none}
</style></defs>
<text class="bm-lbl" x="${FCX}" y="11">VUE ANT.</text>
<text class="bm-lbl" x="${BCX}" y="11">VUE POST.</text>
<g id="bm-front">
  <g class="bm-silhouette">${_silhouette(FCX)}</g>
  <g class="bm-zones-deep">${fDeep}</g>
  <g class="bm-zones-surface">${fSurf}</g>
</g>
<g id="bm-back">
  <g class="bm-silhouette">${_silhouette(BCX)}</g>
  <g class="bm-zones-deep">${bDeep}</g>
  <g class="bm-zones-surface">${bSurf}</g>
</g>
</svg>`;
  }

  // ── Couleur de fatigue (niveau → CSS custom property, jamais de hex) ──
  const LEVEL_COLOR = {
    fresh: 'var(--accent)', light: 'var(--accent)',
    moderate: 'var(--c-core)', heavy: 'var(--orange)', critical: 'var(--red)',
  };
  function _fatColor(val) {
    if (typeof FATIGUE_ENGINE !== 'undefined') {
      const { level } = FATIGUE_ENGINE.classify(val);
      return LEVEL_COLOR[level] || 'var(--t3)';
    }
    return 'var(--t3)';
  }

  // ── Binding clics ──────────────────────────────────
  function _bind(svgEl, cb) {
    svgEl.querySelectorAll('.bm-zone').forEach(el => {
      el.addEventListener('click', () => {
        svgEl.querySelectorAll('.bm-zone.bm-sel').forEach(z => z.classList.remove('bm-sel'));
        svgEl.querySelectorAll(`[data-id="${el.dataset.id}"]`).forEach(z => z.classList.add('bm-sel'));
        if (cb) cb(el.dataset.id, MUSCLE_TO_CAT[el.dataset.id] || null);
      });
    });
  }

  // ════════════════════════════════════════════════════
  // API publique
  // ════════════════════════════════════════════════════

  /**
   * Insère le SVG dans le container et bind les clics.
   * @param {string}   containerId  — id du div conteneur
   * @param {Function} onMuscleClick(muscleId, category)
   */
  function render(containerId, onMuscleClick) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = _buildSVG();
    const svg = el.querySelector('.bm-svg');
    if (svg) _bind(svg, onMuscleClick);
  }

  /**
   * Colorise les zones selon les données de fatigue.
   * @param {string} containerId
   * @param {Object} data — { MUSCLE_ID: 0–160 }
   */
  function updateFatigue(containerId, data) {
    const svg = document.querySelector(`#${containerId} .bm-svg`);
    if (!svg) return;
    svg.querySelectorAll('.bm-zone').forEach(el => {
      el.style.fill = '';
      el.style.fillOpacity = '';
    });
    for (const [id, val] of Object.entries(data)) {
      if (val < 5) continue;
      const opacity = Math.min(0.92, 0.22 + val / 115);
      svg.querySelectorAll(`[data-id="${id}"]`).forEach(el => {
        el.style.fill = _fatColor(val);
        el.style.fillOpacity = String(opacity);
      });
    }
  }

  /**
   * Met en évidence les muscles dont des exercices ont été enregistrés.
   * @param {string}      containerId
   * @param {Set|Array}   exercisedCats — catégories ayant des séances (ex. Set{'chest','legs'})
   */
  function updateProgression(containerId, exercisedCats) {
    const svg = document.querySelector(`#${containerId} .bm-svg`);
    if (!svg) return;
    const cats = new Set(exercisedCats);
    svg.querySelectorAll('.bm-zone').forEach(el => {
      const cat = MUSCLE_TO_CAT[el.dataset.id];
      if (cat && cats.has(cat)) {
        el.style.fill = 'var(--accent)';
        el.style.fillOpacity = '0.28';
      } else {
        el.style.fill = '';
        el.style.fillOpacity = '';
      }
    });
  }

  /**
   * Sélectionne visuellement un muscle (annule la sélection précédente).
   * @param {string}  containerId
   * @param {string}  muscleId — null pour tout désélectionner
   */
  function highlight(containerId, muscleId) {
    const svg = document.querySelector(`#${containerId} .bm-svg`);
    if (!svg) return;
    svg.querySelectorAll('.bm-zone.bm-sel').forEach(z => z.classList.remove('bm-sel'));
    if (muscleId) {
      svg.querySelectorAll(`[data-id="${muscleId}"]`).forEach(z => z.classList.add('bm-sel'));
    }
  }

  return { render, updateFatigue, updateProgression, highlight, MUSCLE_TO_CAT };

})();
