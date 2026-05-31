# MuscleOS — Module IA · Patch d'intégration

**Version cible :** muscleos.html v3.5 → v3.6  
**Ce fichier contient 4 blocs à coller dans muscleos.html.**

---

## BLOC 1 — CSS
Coller **juste avant** la balise fermante `</style>` (ligne ~815)

```css
/* ════════════════════════════════════════════════════
   MODULE IA — Bouton header + Panel modal
   ════════════════════════════════════════════════════ */

/* Bouton header */
.ai-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 7px 11px;
  border: 1px solid rgba(61,255,160,.25);
  border-radius: var(--r);
  background: rgba(61,255,160,.06);
  color: var(--accent); font-size: 12px; font-weight: 500;
  cursor: pointer; font-family: var(--sans);
  transition: background .15s, border-color .15s;
  letter-spacing: .01em;
}
.ai-btn:hover { background: rgba(61,255,160,.12); border-color: rgba(61,255,160,.45); }
.ai-btn-icon { font-size: 14px; line-height: 1; }

/* Overlay panel IA */
.ai-overlay {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(4,6,10,.75);
  backdrop-filter: blur(6px);
  display: flex; align-items: flex-end; justify-content: center;
  opacity: 0; pointer-events: none;
  transition: opacity .2s;
}
.ai-overlay.visible { opacity: 1; pointer-events: all; }

.ai-panel {
  width: 100%; max-width: 640px;
  background: var(--s1);
  border: 1px solid var(--b2);
  border-radius: 18px 18px 0 0;
  padding: 20px 18px 32px;
  display: flex; flex-direction: column; gap: 16px;
  max-height: 88dvh; overflow-y: auto;
  transform: translateY(24px);
  transition: transform .25s cubic-bezier(.22,1,.36,1);
}
.ai-overlay.visible .ai-panel { transform: translateY(0); }

/* En-tête du panel */
.ai-panel-hdr {
  display: flex; align-items: center; justify-content: space-between;
}
.ai-panel-title {
  font-family: var(--mono); font-size: 13px; font-weight: 600;
  color: var(--accent); letter-spacing: .04em;
  display: flex; align-items: center; gap: 8px;
}
.ai-panel-title::before {
  content: ''; display: inline-block;
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px rgba(61,255,160,.6);
}
.ai-close-btn {
  background: none; border: none;
  color: var(--t3); font-size: 18px; cursor: pointer; line-height: 1;
  padding: 4px 6px; border-radius: 6px;
  transition: color .15s, background .15s;
}
.ai-close-btn:hover { color: var(--t1); background: var(--s3); }

/* Section équipement */
.ai-equip-section { display: flex; flex-direction: column; gap: 10px; }
.ai-equip-label {
  font-family: var(--mono); font-size: 10px; font-weight: 600;
  letter-spacing: .12em; text-transform: uppercase; color: var(--t3);
}
.ai-equip-chips { display: flex; flex-wrap: wrap; gap: 7px; }
.ai-equip-chip {
  padding: 6px 12px;
  border: 1px solid var(--b2);
  border-radius: 20px;
  background: var(--s2);
  color: var(--t2); font-size: 13px;
  cursor: pointer;
  transition: all .12s;
  user-select: none;
}
.ai-equip-chip.on {
  border-color: var(--accent);
  background: rgba(61,255,160,.1);
  color: var(--accent);
}

/* Bouton "Générer" */
.ai-generate-btn {
  width: 100%; padding: 13px;
  background: var(--accent); color: #060c09;
  border: none; border-radius: var(--r);
  font-family: var(--sans); font-size: 14px; font-weight: 600;
  cursor: pointer;
  transition: opacity .15s, transform .1s;
}
.ai-generate-btn:hover { opacity: .9; }
.ai-generate-btn:active { transform: scale(.98); }
.ai-generate-btn:disabled { opacity: .4; cursor: not-allowed; transform: none; }

/* Zone de réponse */
.ai-response { display: flex; flex-direction: column; gap: 14px; }

/* Loader pulsant */
.ai-loader {
  display: flex; align-items: center; gap: 10px;
  color: var(--t3); font-size: 13px;
}
.ai-loader-dots { display: flex; gap: 5px; }
.ai-loader-dots span {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent); opacity: .3;
  animation: ai-pulse 1.2s ease-in-out infinite;
}
.ai-loader-dots span:nth-child(2) { animation-delay: .2s; }
.ai-loader-dots span:nth-child(3) { animation-delay: .4s; }
@keyframes ai-pulse {
  0%, 80%, 100% { opacity: .3; transform: scale(.8); }
  40% { opacity: 1; transform: scale(1); }
}

/* Texte de la réponse */
.ai-text {
  font-size: 14px; line-height: 1.65;
  color: var(--t1);
  background: var(--s2); border: 1px solid var(--b1);
  border-radius: var(--r); padding: 14px 16px;
  white-space: pre-wrap;
}

/* Chips exercices */
.ai-chips-section { display: flex; flex-direction: column; gap: 10px; }
.ai-chips-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.ai-ex-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 13px;
  border: 1px solid var(--b2);
  border-radius: var(--r);
  background: var(--s2);
  cursor: pointer;
  transition: all .15s;
  color: var(--t1); font-size: 13px;
  max-width: 100%;
}
.ai-ex-chip:hover { border-color: var(--b3); background: var(--s3); }
.ai-ex-chip-cat {
  width: 8px; height: 8px; border-radius: 50%;
  flex-shrink: 0;
}
.ai-ex-chip-label { font-weight: 500; }
.ai-ex-chip-var { color: var(--t3); font-size: 11px; font-family: var(--mono); }
.ai-ex-chip-added {
  border-color: var(--accent) !important;
  background: rgba(61,255,160,.08) !important;
}
.ai-ex-chip-added .ai-ex-chip-label { color: var(--accent); }

/* Erreur */
.ai-error {
  color: var(--red); font-size: 13px;
  background: rgba(255,82,82,.08);
  border: 1px solid rgba(255,82,82,.2);
  border-radius: var(--r); padding: 12px 14px;
}

/* Contexte résumé (info pill) */
.ai-context-pill {
  display: flex; align-items: center; gap: 7px;
  font-size: 11px; color: var(--t3);
  font-family: var(--mono);
}
.ai-context-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--b3); }
```

---

## BLOC 2 — HTML header
Remplacer la ligne du bouton `#btn-profile` existant dans `<header>` par ce bloc (on ajoute juste le bouton IA à gauche du bouton Profil) :

```html
<div style="display:flex;align-items:center;gap:8px">
  <div id="hdr-date"></div>
  <button class="ai-btn" id="btn-ai" title="Conseil IA — quelle séance faire aujourd'hui ?">
    <span class="ai-btn-icon">✦</span>IA
  </button>
  <button class="profile-btn" id="btn-profile" title="Mon profil de récupération">
    <span class="pb-dot"></span>Profil
  </button>
</div>
```

---

## BLOC 3 — HTML panel IA (modal)
Coller **juste après** `<div id="pr-toast"></div>` (ligne ~860) :

```html
<!-- ════ PANEL IA ════ -->
<div id="ai-overlay" class="ai-overlay">
  <div class="ai-panel" id="ai-panel">

    <div class="ai-panel-hdr">
      <div class="ai-panel-title">Conseil IA</div>
      <button class="ai-close-btn" id="ai-close">✕</button>
    </div>

    <!-- Équipement disponible -->
    <div class="ai-equip-section" id="ai-equip-section">
      <div class="ai-equip-label">Équipement disponible aujourd'hui</div>
      <div class="ai-equip-chips" id="ai-equip-chips">
        <button class="ai-equip-chip on" data-equip="barre">Barre</button>
        <button class="ai-equip-chip on" data-equip="haltères">Haltères</button>
        <button class="ai-equip-chip on" data-equip="machine">Machine</button>
        <button class="ai-equip-chip on" data-equip="câble">Câble</button>
        <button class="ai-equip-chip on" data-equip="poulie">Poulie</button>
        <button class="ai-equip-chip" data-equip="bande élastique">Élastique</button>
        <button class="ai-equip-chip" data-equip="aucun">Poids du corps</button>
      </div>
    </div>

    <!-- Bouton générer -->
    <button class="ai-generate-btn" id="ai-generate-btn">
      Analyser ma fatigue et suggérer une séance →
    </button>

    <!-- Zone de réponse (cachée jusqu'à génération) -->
    <div class="ai-response" id="ai-response" style="display:none"></div>

  </div>
</div>
```

---

## BLOC 4 — JS module IA
Coller **juste avant** `// ════ INIT ════` (avant la fonction `init()`, ligne ~3211) :

```javascript
// ════════════════════════════════════════════════════
// MODULE IA — Suggestions de séance via Claude API
// ════════════════════════════════════════════════════

const AI_MODULE = (() => {

  // ── Helpers de contexte ──────────────────────────

  function _buildFatigueContext() {
    if (typeof FATIGUE_ENGINE === 'undefined') return 'Données de fatigue non disponibles.';
    const all = FATIGUE_ENGINE.getAll();
    const lines = [];
    for (const [id, val] of Object.entries(all)) {
      if (val < 5) continue;
      const label = (typeof MUSCLE_LABELS !== 'undefined' && MUSCLE_LABELS[id]) || id;
      const { label: state } = FATIGUE_ENGINE.classify(val);
      const recup = FATIGUE_ENGINE.getHoursToRecover(id, 20);
      const recupStr = recup != null
        ? (recup >= 48 ? `${(recup / 24).toFixed(1)}j` : `${Math.round(recup)}h`)
        : '?';
      lines.push(`  ${label} : ${Math.round(val)} pts (${state}, récup ~${recupStr})`);
    }
    return lines.length > 0
      ? lines.join('\n')
      : 'Tous les muscles sont frais (aucune fatigue enregistrée).';
  }

  function _buildRecentSessions() {
    const sessions = DB.load();
    const cutoff = Date.now() - 7 * 24 * 3600 * 1000;
    const recent = sessions
      .filter(s => new Date(s.id).getTime() >= cutoff)
      .sort((a, b) => b.id.localeCompare(a.id))
      .slice(0, 7);

    if (recent.length === 0) return 'Aucune séance ces 7 derniers jours.';

    return recent.map(s => {
      const entries = (s.entries || []).map(e => {
        if (e.type === 'activity') return `    Activité : ${e.activityType || 'sport'}`;
        const cat = (typeof CATALOG !== 'undefined' && CATALOG[e.category]?.label) || e.category;
        const exLabel_ = (typeof exLabel === 'function') ? exLabel(e.category, e.exerciseId) : e.exerciseId;
        const varLabel_ = (typeof varLabel === 'function') ? varLabel(e.category, e.exerciseId, e.variantId) : '';
        const totalSets = (e.sets || []).length;
        const maxW = Math.max(0, ...(e.sets || []).map(x => x.weight || 0));
        return `    [${cat}] ${exLabel_} — ${varLabel_} · ${totalSets} séries${maxW > 0 ? ` · ${maxW}kg max` : ''}`;
      }).join('\n');
      return `${s.id}:\n${entries || '    (vide)'}`;
    }).join('\n\n');
  }

  function _buildProfileContext() {
    if (typeof USER_PROFILE === 'undefined') return 'Profil non configuré.';
    const p = USER_PROFILE.load();
    const m = USER_PROFILE.getMultiplier();
    const parts = [];
    if (p.age)            parts.push(`Âge : ${p.age}`);
    if (p.training_level) parts.push(`Niveau : ${p.training_level}`);
    if (p.sleep)          parts.push(`Sommeil : ${p.sleep}`);
    if (p.protein)        parts.push(`Protéines : ${p.protein}`);
    if (p.stress)         parts.push(`Stress : ${p.stress}`);
    if (p.goal)           parts.push(`Objectif : ${p.goal}`);
    parts.push(`Multiplicateur récupération : ×${m.toFixed(2)}`);
    return parts.join(' | ');
  }

  function _getEquipment() {
    const chips = document.querySelectorAll('#ai-equip-chips .ai-equip-chip.on');
    return [...chips].map(c => c.dataset.equip).filter(Boolean);
  }

  // ── Mapping exercice → catégorie (pour les chips) ──

  function _findExercise(name) {
    if (typeof CATALOG === 'undefined') return null;
    const nameLower = name.toLowerCase().trim();
    for (const [cat, catData] of Object.entries(CATALOG)) {
      for (const [exId, exData] of Object.entries(catData.exercises || {})) {
        const label = (exData.label || exId).toLowerCase();
        // Match exact ou partiel
        if (label === nameLower || label.includes(nameLower) || nameLower.includes(label.slice(0, 8))) {
          // Prend la première variante
          const variants = Object.entries(exData.variants || {});
          const [varId, varLabel_] = variants.length > 0 ? variants[0] : [null, null];
          return { cat, exId, label: exData.label || exId, varId, varLabel: varLabel_ || '' };
        }
      }
    }
    return null;
  }

  // ── Parser la réponse JSON structurée ──

  function _parseAiResponse(text) {
    // Cherche un bloc JSON dans la réponse
    const jsonMatch = text.match(/```json\s*([\s\S]*?)```/) ||
                      text.match(/\{[\s\S]*"exercises"[\s\S]*\}/);
    let parsed = null;
    try {
      const raw = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
      parsed = JSON.parse(raw.trim());
    } catch (_) { return null; }
    return parsed;
  }

  // ── Appel API ──────────────────────────────────────

  async function _callApi(equipment) {
    const fatigueCtx   = _buildFatigueContext();
    const sessionsCtx  = _buildRecentSessions();
    const profileCtx   = _buildProfileContext();
    const today        = DB.todayId();

    const systemPrompt = `Tu es un coach sportif expert en musculation et biomécanique. 
Tu analyses les données de fatigue musculaire et l'historique d'entraînement d'un athlète 
pour proposer une séance optimale tenant compte de la récupération réelle.

Tu réponds TOUJOURS en deux parties distinctes :
1. Un texte court (3-6 phrases max) expliquant ton raisonnement : quels muscles sont frais, 
   quels muscles doivent être épargnés, et pourquoi tu proposes cette séance aujourd'hui.
2. Un bloc JSON structuré (entre balises \`\`\`json et \`\`\`) contenant la liste des exercices suggérés.

Format JSON OBLIGATOIRE :
\`\`\`json
{
  "exercises": [
    { "name": "Nom exact de l'exercice", "sets": 3, "reps": "8-12", "note": "conseil court" },
    ...
  ]
}
\`\`\`

Règles :
- 4 à 7 exercices maximum
- Utilise UNIQUEMENT du matériel disponible : ${equipment.join(', ') || 'poids du corps uniquement'}
- Ne propose JAMAIS un exercice ciblant un muscle à fatigue ≥ 60 pts
- Priorise les muscles frais ou partiellement récupérés
- Les noms d'exercices doivent correspondre à des exercices réels de musculation en français
- Sois direct et utile`;

    const userPrompt = `Date : ${today}

FATIGUE ACTUELLE PAR MUSCLE :
${fatigueCtx}

PROFIL UTILISATEUR :
${profileCtx}

SÉANCES DES 7 DERNIERS JOURS :
${sessionsCtx}

Sur la base de ces données, propose-moi la séance la plus intelligente à faire aujourd'hui.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Erreur API (${response.status})`);
    }

    const data = await response.json();
    return data.content?.map(b => b.text || '').join('') || '';
  }

  // ── Rendu des chips d'exercices ───────────────────

  function _renderChips(exercises) {
    if (!exercises || exercises.length === 0) return '';

    const chips = exercises.map(ex => {
      const found = _findExercise(ex.name);
      const color = found ? `var(--c-${found.cat})` : 'var(--b3)';
      const chipId = 'ai-chip-' + Math.random().toString(36).slice(2, 7);
      const dataAttrs = found
        ? `data-cat="${found.cat}" data-exid="${found.exId}" data-varid="${found.varId || ''}"`
        : '';
      const noteHtml = ex.note ? `<span class="ai-ex-chip-var"> · ${ex.note}</span>` : '';
      const setsHtml = ex.sets ? `<span class="ai-ex-chip-var">${ex.sets}×${ex.reps || '?'}</span>` : '';
      return `
        <button class="ai-ex-chip" id="${chipId}" ${dataAttrs} data-exname="${ex.name}">
          <span class="ai-ex-chip-cat" style="background:${color}"></span>
          <span class="ai-ex-chip-label">${ex.name}</span>
          ${setsHtml}
          ${noteHtml}
        </button>`;
    }).join('');

    return `
      <div class="ai-chips-section">
        <div class="ai-equip-label">Exercices suggérés — cliquer pour ajouter</div>
        <div class="ai-chips-grid">${chips}</div>
      </div>`;
  }

  // ── Bind chips → drawer ───────────────────────────

  function _bindChips() {
    document.querySelectorAll('.ai-ex-chip[data-cat]').forEach(chip => {
      chip.addEventListener('click', () => {
        if (chip.classList.contains('ai-ex-chip-added')) return;
        const { cat, exid: exId, varid: varId } = chip.dataset;
        if (!cat || !exId) return;

        // Ouvre le drawer pré-rempli si possible, sinon ajoute directement
        if (typeof openDrawer === 'function') {
          // Ferme le panel IA et ouvre le drawer en mode ajout rapide
          _close();
          // Petit délai pour l'animation
          setTimeout(() => {
            // Sélection directe si on a cat + exId + varId
            if (varId && typeof S !== 'undefined') {
              S.drawer = { open: true, step: 3, cat, ex: exId, actType: null, actBoosts: {} };
              document.getElementById('overlay')?.classList.add('on');
              document.getElementById('drawer')?.classList.add('on');
              if (typeof renderDrawer === 'function') renderDrawer();
            } else {
              openDrawer();
            }
          }, 250);
        }

        chip.classList.add('ai-ex-chip-added');
        chip.querySelector('.ai-ex-chip-label').textContent += ' ✓';
      });
    });
  }

  // ── Génération ────────────────────────────────────

  async function _generate() {
    const equipment = _getEquipment();
    const responseZone = document.getElementById('ai-response');
    const btn = document.getElementById('ai-generate-btn');
    const equipSection = document.getElementById('ai-equip-section');

    if (!responseZone || !btn) return;

    // État chargement
    btn.disabled = true;
    btn.textContent = 'Analyse en cours…';
    responseZone.style.display = 'flex';
    equipSection.style.display = 'none';
    responseZone.innerHTML = `
      <div class="ai-loader">
        <div class="ai-loader-dots">
          <span></span><span></span><span></span>
        </div>
        <span>Analyse de ta fatigue musculaire…</span>
      </div>`;

    try {
      const raw = await _callApi(equipment);

      // Séparer texte explicatif et JSON
      const jsonBlockMatch = raw.match(/```json[\s\S]*?```/);
      const jsonStr = jsonBlockMatch ? jsonBlockMatch[0] : '';
      const textPart = raw.replace(/```json[\s\S]*?```/, '').trim();

      let chipsHtml = '';
      if (jsonStr) {
        const parsed = _parseAiResponse(jsonStr);
        if (parsed?.exercises) {
          chipsHtml = _renderChips(parsed.exercises);
        }
      }

      responseZone.innerHTML = `
        <div class="ai-context-pill">
          <span class="ai-context-dot"></span>
          <span>Analyse du ${DB.todayId()} · ${equipment.length} équipements</span>
        </div>
        ${textPart ? `<div class="ai-text">${textPart}</div>` : ''}
        ${chipsHtml}`;

      _bindChips();

      // Remplace le bouton générer par un bouton "Regénérer"
      btn.disabled = false;
      btn.textContent = '↻ Nouvelle suggestion';
      btn.style.background = 'var(--s2)';
      btn.style.color = 'var(--t2)';
      btn.style.border = '1px solid var(--b2)';

    } catch (err) {
      responseZone.innerHTML = `
        <div class="ai-error">
          Erreur lors de la génération : ${err.message}<br>
          <span style="font-size:11px;color:var(--t3)">Vérifie ta connexion et réessaie.</span>
        </div>`;
      btn.disabled = false;
      btn.textContent = '↻ Réessayer';
    }
  }

  // ── Open / Close ──────────────────────────────────

  function _open() {
    document.getElementById('ai-overlay')?.classList.add('visible');
  }

  function _close() {
    document.getElementById('ai-overlay')?.classList.remove('visible');
  }

  // ── Init événements ───────────────────────────────

  function init() {
    document.getElementById('btn-ai')?.addEventListener('click', _open);
    document.getElementById('ai-close')?.addEventListener('click', _close);

    // Fermer en cliquant sur l'overlay (hors panel)
    document.getElementById('ai-overlay')?.addEventListener('click', e => {
      if (e.target === document.getElementById('ai-overlay')) _close();
    });

    // Toggle chips équipement
    document.querySelectorAll('#ai-equip-chips .ai-equip-chip').forEach(chip => {
      chip.addEventListener('click', () => chip.classList.toggle('on'));
    });

    // Bouton générer
    document.getElementById('ai-generate-btn')?.addEventListener('click', _generate);
  }

  return { init };
})();
```

---

## BLOC 5 — Appel init dans `init()`
Dans la fonction `init()`, ajouter **en dernière ligne** (juste avant la fermeture `}`) :

```javascript
  AI_MODULE.init();
```

---

## Résumé des modifications

| Fichier | Action |
|---|---|
| `muscleos.html` | +CSS bouton IA + panel (Bloc 1) |
| `muscleos.html` | Header : ajout bouton ✦ IA (Bloc 2) |
| `muscleos.html` | +HTML panel modal IA (Bloc 3) |
| `muscleos.html` | +JS module AI_MODULE (Bloc 4) |
| `muscleos.html` | init() : appel AI_MODULE.init() (Bloc 5) |

**Version après patch : v3.6**
