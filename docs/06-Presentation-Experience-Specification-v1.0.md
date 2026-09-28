# Static Mathematical Letter

## Presentation & Experience Specification

### Version 1.0 — Approved First-Implementation Specification

**Status:** `APPROVED FOR FIRST IMPLEMENTATION — VISUAL VALIDATION REQUIRED`  
**Product phase:** `Presentation & Experience — Core v1.0`  
**Last updated:** 2026-09-28

---

# 1. Purpose

This document defines the approved first implementation contract for the presentation and experience layer of **Static Mathematical Letter**.

It consolidates three design rounds into one implementation specification:

1. animation and interaction;
2. visual identity and UI system;
3. UX narrative and accessibility.

Its purpose is to make the two frozen mathematical models observable as an intimate, contemplative digital letter without modifying the mathematical core.

The keywords used throughout this specification are normative:

- **DEFINED:** already decided; implementation must follow it and it is not reopened by this phase.
- **PROPOSED V1:** approved for the first implementation and visual validation. It must be implemented as specified, then may be deliberately adjusted after reviewing the real page before presentation freeze.
- **FUTURE:** excluded from Core v1.0.

This revision is **approved for first implementation, not frozen**. UI color, typography, copy, spacing and timing details marked `PROPOSED V1` are intentionally implemented once and then reviewed on real mobile/desktop rendering before final acceptance.

---

# 2. Scope

This specification governs:

- animation correctness and direction;
- global page orchestration;
- graph and page interaction;
- visual identity and UI system;
- mobile-first and responsive behavior;
- narrative order and concise copy;
- mathematical disclosures;
- accessibility and reduced motion;
- presentation-layer architecture and testing.

It specifies a single static page with this required order:

```text
INTRO
  ↓
MODEL B — ASYMPTOTES
  ↓
EQUATIONS B
  ↓
TRANSITION
  ↓
MODEL A — HISTORY
  ↓
EQUATIONS A
  ↓
CLOSING
```

**DEFINED:** Model B is presented first. Model A is a second, more historical and structurally complex reading.

**FUTURE — OUT OF SCOPE:** audio, music, audiovisual synchronization, an `AudioController`, soundtrack licensing, beat mapping and audiovisual time warping belong exclusively to v1.1.

---

# 3. Authority

This document is subordinate to, in order:

1. `01-Mathematical-Models-Specification(1).md` — mathematical authority;
2. `02-Software-Implementation-Specification(1).md` — software architecture authority where it does not conflict with Document 01;
3. `BaselineParameterSet/05-Baseline-Parameter-Set-v1.1.md` — approved numerical calibration.

It becomes the authority for the presentation and experience concerns listed in Section 2.

The Development Execution Plan and Baseline Parameter Set v1.0 remain historical inputs, not permission to override the approved v1.1 baseline.

Conflict rules:

- mathematics always follows Document 01;
- the approved v1.1 parameter set always wins over earlier or superseded calibration candidates;
- this document may replace presentation behavior such as per-graph viewport autoplay, loops and path-length reveal because those are presentation concerns;
- this document may not change equations or approved mathematical values to solve a visual, UX or timing problem.

---

# 4. Frozen Core

**DEFINED — FROZEN:** Mathematical Core v1.0 and Baseline Parameter Set v1.1 (`CALIBRATED / APPROVED`).

The following must not be changed, reinterpreted or tuned during presentation implementation:

- Document 01 and its equations;
- domains;
- parameters;
- milestones;
- amplitudes;
- frequencies;
- phases;
- drift;
- perturbations;
- coupling;
- memory;
- events;
- Model A semantics;
- Model B semantics;
- Baseline Parameter Set v1.1 values;
- sampling counts, unless a separately documented technical defect proves a change necessary.

The current implementation uses:

- approved Model A parameters;
- approved Model B parameters;
- 900 samples for Model A;
- 700 samples for Model B;
- 30-second graph durations.

These are audit inputs, not invitations to recalibrate.

No undesirable UI, animation or composition result may be corrected by altering mathematics.

---

# 5. Experience principles

## 5.1 Nature of the experience

**DEFINED:** the page is an interactive digital letter and an artistic mathematical piece.

It must feel:

- intimate;
- contemplative;
- elegant;
- symbolic;
- precise;
- personal without becoming literal or overly romantic.

It must not resemble:

- a dashboard;
- a SaaS product;
- an enterprise application;
- a commercial landing page;
- a mathematical laboratory;
- pure technical documentation.

The interface supports the content and never competes with it.

## 5.2 Three influences

**DEFINED:** the visual identity combines:

- mathematics and systems engineering through sequence, modular structure and exact notation;
- civil engineering through proportion, measured lines, structural composition and restrained architectural geometry;
- Greek mythology through the shared golden thread and a sense of fate, without literal illustration.

The influence is felt rather than explained.

Explicitly excluded:

- Greek columns as decoration;
- excessive laurels;
- obvious blueprint backgrounds;
- source-code decoration;
- cyberpunk styling;
- industrial control panels;
- literal romantic motifs;
- engineering icons used as thematic props.

## 5.3 Editorial restraint

**DEFINED:** generous margins, vertical rhythm, serif typography, subtle material warmth and very limited handwritten detail may evoke a letter.

Legibility has priority over ornament.

The curves remain the principal visual work.

## 5.4 Mobile first

**DEFINED:** the primary journey is a link opened from Instagram or WhatsApp on a phone in portrait orientation.

Design begins at:

```text
320 px minimum
```

Primary optimization range:

```text
360–430 px
```

Desktop expands the editorial composition rather than becoming a different experience.

---

# 6. Animation correctness

## 6.1 Audited defect

The current renderer creates each complete SVG path and reveals it using:

```text
strokeDasharray
strokeDashoffset
```

This means equal normalized progress represents equal **arc-length percentage**, not equal mathematical time.

For curves of different geometric lengths, equal animation progress may expose endpoints corresponding to different values of \(t\).

That behavior violates the intended temporal contract and must be replaced.

## 6.2 Normative mapping

**DEFINED:**

\[
\boxed{
\text{animation progress}
\rightarrow
\text{mathematical temporal progress}
\rightarrow
t
\rightarrow
\text{visible trajectory}
}
\]

and never:

\[
\boxed{
\text{animation progress}
\rightarrow
\text{SVG path arc length}
}
\]

For a sampled series

\[
P=\{(t_i,y_i)\}_{i=0}^{N-1},
\]

domain

\[
[t_0,t_{N-1}],
\]

and local curve progress

\[
p\in[0,1],
\]

the visible mathematical time is:

\[
t_v=t_0+p(t_{N-1}-t_0).
\]

The visible path contains every sample satisfying:

\[
t_i\le t_v
\]

plus one interpolated endpoint between the two samples surrounding \(t_v\).

If:

\[
t_i\le t_v<t_{i+1},
\]

then:

\[
\lambda=
\frac{t_v-t_i}
{t_{i+1}-t_i}
\]

and:

\[
y_v=
y_i+\lambda(y_{i+1}-y_i).
\]

The interpolated point is then transformed through the existing common viewport.

**PROPOSED V1:** implement this as a pure temporal-prefix function returning visible screen points or path data.

Use:

- binary search for the bracketing sample;
- linear interpolation for the last segment;
- existing complete-series bounds.

Bounds must remain calculated from the full trajectory so the graph frame does not move during reveal.

## 6.3 Model A synchronization

**DEFINED:** Carlos, Fer and the shared/central trajectory must expose the same \(t_v\) at the same animation progress.

Their visible endpoints therefore share the same temporal/x coordinate even if their geometric path lengths differ.

## 6.4 Model B presentation offsets

**PROPOSED V1:** preserve the existing artistic timing:

| Curve | Start | End |
|---|---:|---:|
| Shared/limit trajectory | 0.00 | 0.92 |
| Carlos | 0.04 | 1.00 |
| Fer | 0.04 | 1.00 |

These offsets affect only when each curve begins and completes its presentation.

They do not change mathematics.

Once active, each curve maps its local progress linearly to its complete mathematical domain.

## 6.5 Duration and repetition

**DEFINED:**

```text
Model B = 30 s
Model A = 30 s
```

During the global cinematic experience, each graph plays exactly once.

**PROPOSED V1:** manual mode also has no automatic infinite loop.

Replay is initiated by the user.

Existing `loop` and `loopDelay` behavior must therefore be disabled or made orchestration-dependent.

---

# 7. Global autoplay

## 7.1 Default and ownership

**DEFINED:** global autoplay is ON by default.

A visible global control must allow:

```text
Autoplay ON / OFF
```

A new `ExperienceController`, separate from the per-graph `AnimationController`, owns the guided page journey.

When autoplay is ON:

```text
the whole page behaves as one cinematic sequence
```

When autoplay is OFF:

```text
navigation and graph playback are fully manual
```

## 7.2 Turning autoplay OFF

**DEFINED:** switching autoplay OFF during an active run must synchronously:

1. abort the active experience run;
2. cancel pending delays;
3. cancel controlled scrolling;
4. pause the active graph at its exact progress;
5. preserve the current viewport position;
6. preserve currently opened disclosures;
7. preserve already-rendered content;
8. transfer control to the user.

The page must not snap to another section.

No queued callback belonging to the cancelled run may later advance the experience.

**PROPOSED V1:** every cinematic run receives:

- one monotonically increasing run id;
- one `AbortController`.

Delay, scroll and state-transition helpers must reject or no-op after abort.

## 7.3 Turning autoplay ON

**DEFINED:** switching from OFF to ON never resumes halfway.

It must:

1. cancel any manual graph activity;
2. reset both graph controllers;
3. reset experience state;
4. reset disclosures to the defined starting state;
5. return to the top;
6. begin a completely new run from the intro.

## 7.4 Completion

**DEFINED:** after the closing, the experience:

1. returns to the top;
2. stops;
3. enters `COMPLETE / READY`.

It does not automatically start again.

The user may then:

- navigate manually;
- turn autoplay OFF;
- start another complete autoplay run.

## 7.5 User intervention

**PROPOSED V1:** only a **meaningful manual navigation or control action** cancels the cinematic run.

Valid manual intent includes:

- an actual mouse-wheel or trackpad scroll;
- a touch gesture that produces real page displacement;
- scroll/navigation keys that move the viewport;
- opening or closing an interactive disclosure;
- activating the autoplay control;
- activating Play, Pause or Replay;
- another interaction that deliberately changes navigation or playback state.

A bare:

```text
touchstart
pointerdown
```

or incidental contact does **not** cancel autoplay by itself.

Programmatic scroll generated by the active cinematic run must not self-cancel.

Cancellation should occur only when the observed user-driven input or page position materially diverges from the controlled trajectory.

## 7.6 Runtime autoplay state

**DEFINED FOR FIRST IMPLEMENTATION:** Core v1.0 uses no persistence storage for autoplay.

Do not use:

```text
sessionStorage
localStorage
IndexedDB
cookies
```

for autoplay state.

Each full page load begins with:

```text
Autoplay = ON
```

unless:

```text
prefers-reduced-motion: reduce
```

requires manual/reduced mode.

If the user turns autoplay OFF, that state remains only in runtime memory for the current loaded page.

Reloading the page restores autoplay ON, again subject to reduced-motion preference.

This keeps the letter deterministic and avoids introducing preference persistence unnecessary for Core v1.0.

---

# 8. Manual controls

Each graph exposes three separate controls:

```text
[ Reproducir ] [ Pausar ] [ Volver a ver ]
```

**DEFINED:**

### Play

Continues from the exact current progress.

It must not restart unless progress is zero.

### Pause

Freezes playback at the exact current progress.

### Replay

Resets the graph to:

\[
t=0
\]

and starts immediately.

## 8.1 AnimationController states

The `AnimationController` must support a true paused state instead of using `idle` ambiguously.

**PROPOSED V1:**

```ts
type AnimationState =
  | "idle"
  | "playing"
  | "paused"
  | "completed";
```

Suggested public contract:

```ts
play()
pause()
reset()
replay()
getProgress()
getState()
```

The controller may additionally expose a completion promise/event suitable for orchestration.

## 8.2 Manual action during autoplay

Controls may remain visible during autoplay.

**PROPOSED V1:** activating any graph control while the cinematic journey is active:

1. cancels the global run;
2. sets autoplay OFF in current runtime state;
3. preserves the viewport;
4. executes the requested graph action.

Manual intent always wins over global orchestration.

## 8.3 Disabled states

- Pause is disabled unless the graph is playing.
- Play is disabled while already playing.
- Play may also be disabled after completion if Replay is the intended restart action.
- Replay remains available after initialization.

Disabled states must remain visually understandable.

---

# 9. Cinematic timeline

## 9.1 Approved first-implementation timing

The first implementation targets approximately:

\[
\boxed{99.6\text{ seconds}}
\]

including both fixed 30-second graph animations.

The goal is to preserve a cinematic pace while reducing unnecessary idle time before audiovisual support exists.

| Segment | Duration | Cumulative | Required behavior |
|---|---:|---:|---|
| Intro reading hold | 5.0 s | 5.0 s | Page begins at top; no graph plays. |
| Scroll to B | 2.5 s | 7.5 s | Controlled eased scroll. |
| B composition settle | 0.8 s | 8.3 s | Graph centered and still. |
| Play Model B | 30.0 s | 38.3 s | One temporal reveal. |
| Hold completed B | 1.5 s | 39.8 s | Full geometry remains visible. |
| Open equations B | 0.5 s | 40.3 s | Restrained disclosure animation. |
| Read equations B | 5.0 s | 45.3 s | Remain in section. |
| B → A transition including movement and bridge copy | 4.0 s | 49.3 s | Transition visible long enough to read. |
| A composition settle | 0.8 s | 50.1 s | Graph centered and still. |
| Play Model A | 30.0 s | 80.1 s | One synchronized temporal reveal. |
| Hold completed A | 1.5 s | 81.6 s | Full geometry remains visible. |
| Open equations A | 0.5 s | 82.1 s | Restrained disclosure animation. |
| Read equations A | 7.0 s | 89.1 s | Longer because Model A is denser. |
| Scroll to closing | 2.5 s | 91.6 s | Controlled eased scroll. |
| Closing hold | 5.0 s | 96.6 s | Contemplative pause. |
| Return home | 3.0 s | 99.6 s | Controlled return; stop at top. |

## 9.2 Rationale

The two graph animations occupy:

\[
60\text{ seconds}
\]

leaving approximately:

\[
39.6\text{ seconds}
\]

for reading, orientation and travel.

B receives less equation-reading time because it is analytically smaller.

A receives more because its mathematical disclosure is denser.

The first implementation intentionally stays near 100 seconds so the silent v1.0 experience remains cinematic without becoming unnecessarily long.

All timeline values are presentation configuration, not mathematical parameters.

They remain subject to visual/device validation before presentation freeze.

## 9.3 Scroll mechanics

**PROPOSED V1:** implement controlled scrolling using `requestAnimationFrame` with:

- explicit start;
- explicit destination;
- explicit duration;
- easing;
- `AbortSignal`.

CSS:

```css
scroll-behavior: smooth;
```

is insufficient as the sole cinematic mechanism because it does not expose reliable duration or cancellation semantics.

The user is never scroll-locked.

Destinations should visually center the intended composition while respecting:

- fixed autoplay control;
- mobile safe areas;
- current viewport dimensions.

Cinematic scrolling must not steal keyboard focus.

---

# 10. Visual concept

**PROPOSED V1 — concept name:**

# Measured Correspondence / Correspondencia Medida

The page is a letter whose emotion is carried by precise trajectories.

Its structure should feel drawn and measured, like a restrained architectural sheet, while a muted golden line suggests a thread continuing through both mathematical readings.

Systems engineering appears through:

- sequence;
- state;
- modularity;
- mathematical structure.

Civil engineering appears through:

- proportion;
- fine structural lines;
- measured composition;
- architectural restraint.

Greek mythology appears primarily through:

- the golden shared thread;
- subtle ideas of trajectory and fate.

The mythology is symbolic rather than illustrated.

Material language:

```text
warm paper
dark ink
deep desaturated blue
soft baby/blush pink
antique gold
```

Possible micro-details:

- thin construction lines;
- small registration-like marks;
- quiet section numbering;
- almost imperceptible paper texture.

No element should look like a themed prop.

Visual hierarchy:

1. narrative headings and graph geometry;
2. brief prose and legend;
3. controls and mathematical disclosure;
4. technical micro-labels.

---

# 11. Color system

**PROPOSED V1 — FIRST IMPLEMENTATION:**

| Token | HEX | Role |
|---|---|---|
| `--color-paper` | `#F4EEE3` | Warm page background |
| `--color-surface` | `#FBF7F0` | Graph/disclosure surface |
| `--color-ink` | `#29241F` | Primary text |
| `--color-ink-soft` | `#625A51` | Secondary text and metadata |
| `--color-carlos` | `#315D78` | Carlos |
| `--color-fer` | `#B85F78` | Fer; accessible soft/blush pink |
| `--color-shared` | `#9B762E` | Shared antique-gold thread |
| `--color-control` | `#39322C` | Primary control text/border |
| `--color-border` | `#D5C8B7` | Hairlines and boundaries |
| `--color-focus` | `#0B6F8A` | High-visibility focus ring |
| `--color-muted` | `#918679` | Disabled/de-emphasized decoration only |

The paper/surface pair creates depth without card-heavy UI chrome.

Carlos's blue should feel:

- calm;
- deep;
- technical;
- non-neon.

Fer's pink should remain recognizably soft while being dark enough to retain visual identity on a warm background.

The gold should read as:

```text
aged metal / thread
```

not as a yellow highlight.

Gold is reserved primarily for:

- shared/central trajectories;
- very rare semantic accents.

Primary text, secondary text and controls must meet WCAG 2.2 AA contrast against their actual rendered surfaces.

`--color-muted` must not be used for essential text.

The first rendered implementation must be visually reviewed before these HEX values are frozen.

---

# 12. Typography

**PROPOSED V1 — FIRST IMPLEMENTATION:** use system-accessible font stacks as the initial implementation.

They remain subject to visual QA after the complete UI is mounted.

A typography adjustment is allowed before presentation freeze if it materially improves the letter aesthetic without introducing proprietary font files or unnecessary loading complexity.

| Role | Stack | Character |
|---|---|---|
| Display/titles | `"Iowan Old Style", "Palatino Linotype", Baskerville, Georgia, serif` | Editorial, elegant, quiet contrast |
| Body/letter | `Charter, "Bitstream Charter", Georgia, serif` | Long-form readability |
| UI/controls | `system-ui, -apple-system, "Segoe UI", sans-serif` | Clear compact state language |
| Math | `"Cambria Math", "STIX Two Math", "Times New Roman", serif` | Familiar mathematical forms |

An optional handwritten typeface is **not required** for the first implementation.

If tested later, it may only appear in a tiny, non-essential accent.

It must never be used for:

- paragraphs;
- controls;
- formulas;
- long narrative content.

Responsive type proposal:

```css
--text-display: clamp(2.65rem, 1.85rem + 4vw, 5.5rem);
--text-h2:      clamp(2.15rem, 1.65rem + 2.5vw, 4rem);
--text-h3:      clamp(1.35rem, 1.15rem + 1vw, 2rem);
--text-body:    clamp(1rem, 0.96rem + 0.22vw, 1.125rem);
--text-small:   clamp(0.8125rem, 0.78rem + 0.12vw, 0.875rem);
```

Suggested line heights:

```text
Display/headings: 0.98–1.08
Body:             1.55–1.70
UI:               1.20–1.40
```

Body measure:

```text
approximately 32–38 rem maximum
```

Desktop paragraphs must never stretch across the full page width.

---

# 13. Layout & spacing

**PROPOSED V1:** use a 4 px base rhythm.

```text
space-1   4 px
space-2   8 px
space-3  12 px
space-4  16 px
space-5  20 px
space-6  24 px
space-7  32 px
space-8  48 px
space-9  64 px
space-10 80 px
space-11 96 px
space-12 128 px
```

Layout rules:

```text
page gutter:
clamp(16px, 5vw, 64px)

editorial page maximum:
72rem

narrative text maximum:
38rem

graph maximum:
68rem

section block gap:
clamp(80px, 16vh, 160px)

copy-to-graph gap:
clamp(28px, 7vw, 64px)

graph-to-controls gap:
16–24px

disclosure gap:
24–32px

equation row gap:
20–28px

control gap:
8–12px
```

Spacing must preserve a readable letter rhythm at 320 px.

Do not reproduce large desktop whitespace blindly on mobile.

---

# 14. Graph presentation

## 14.1 Container

**PROPOSED V1:** each graph sits on a subtly lighter paper surface.

Initial treatment:

```text
1px hairline border
10–14px radius
no visible heavy shadow
generous internal spacing
```

If a shadow is used at all, it must be broad and almost imperceptible.

The graph should feel inset into the letter rather than mounted inside application chrome.

Do not display:

- traditional Cartesian axes;
- dense grids;
- numerical ticks;
- technical panels;
- invasive tooltips.

A few subtle structural hairlines may be visually tested, but they must not turn the graph into a conventional analytical chart.

## 14.2 Curves and legend

The legend contains only:

- Carlos;
- Fer;
- Trayectoria compartida.

**PROPOSED V1 — FIRST IMPLEMENTATION:**

### Carlos

```text
color: --color-carlos
stroke-width: approximately 2.75px
stroke: continuous
linecap: round
```

### Fer

```text
color: --color-fer
stroke-width: approximately 2.5px
stroke: continuous
linecap: round
```

### Shared trajectory

```text
color: --color-shared
stroke-width: approximately 2px
stroke: continuous
linecap: round
```

The first implementation does **not** use a dashed rhythm for Fer.

The first implementation does **not** use a halo around the golden shared path.

Accessibility redundancy is initially provided through:

- persistent labels;
- legend swatches;
- semantic accessible descriptions;
- slight stroke-width differences.

If later visual/accessibility QA demonstrates that another non-color cue is necessary, it may be proposed deliberately before freeze.

The gold line must read as a thread, not as highlighted chart data.

## 14.3 SVG semantics

Each SVG must expose one coherent accessible graph description.

Use:

```text
<title>
<desc>
aria-labelledby
```

Decorative child paths should not independently expose contradictory labels if the complete SVG already communicates the graph coherently.

Avoid combinations such as:

```text
role="presentation"
+
meaningful aria-label
```

on the same element.

## 14.4 Model A presentation

Milestones and events are not visibly annotated in the V1 graph.

The geometry speaks without technical callouts.

The central/shared trajectory remains visually subordinate to Carlos and Fer.

---

# 15. Controls

## 15.1 Global autoplay control

**PROPOSED V1:** a compact fixed global control remains available during the experience.

Conceptually:

```text
Autoplay [ ON ]
```

Mobile placement:

```text
lower inline-end corner
+
safe-area offset
```

It must not overlap:

- graph controls;
- graph endpoints;
- equation controls;
- critical text.

Use:

```css
env(safe-area-inset-bottom)
```

where appropriate.

Desktop placement may be visually validated between:

- upper/right editorial rail;
- lower/right edge.

The control must be a real interactive element with:

- at least 44 × 44 CSS px touch area;
- visible state;
- semantic accessible state;
- clear accessible name.

State must not be communicated only through color.

## 15.2 Graph controls

Each graph exposes:

```text
Reproducir
Pausar
Volver a ver
```

Requirements:

- real `<button>` elements;
- minimum 44 px height;
- at least 8 px separation;
- wrapping allowed.

At 320–359 px they may become:

- two rows;
- or three compact full-width buttons.

They must never shrink below touch-target requirements.

Visual style:

- quiet;
- transparent or paper-like;
- fine border;
- restrained radius;
- no glossy controls;
- no heavy iconography.

Text labels remain primary.

Small icons may supplement labels but not replace them.

## 15.3 Keyboard and status

Tab order follows visual order.

Space and Enter activate controls.

An unobtrusive:

```html
aria-live="polite"
```

region may announce meaningful state changes such as:

```text
Autoplay desactivado
Modelo A pausado
Experiencia completa
```

Frame-by-frame progress must never be announced.

---

# 16. Mobile-first responsive strategy

| Range | Proposed behavior |
|---|---|
| 320–359 px | Minimum 16 px gutter; one-column copy; graph uses full content width; controls wrap/full-width; equation labels stack; no page overflow. |
| 360–479 px | Primary target; effective 18–24 px gutter; legend may wrap; graph aspect around 4:3 or 5:4 after visual testing. |
| 480–767 px | More graph padding; controls may fit one row; equation header information may share a row. |
| 768–1199 px | Centered editorial layout; optional offset alignment; graph width capped. |
| 1200+ px | Maximum ~72 rem composition; whitespace expands rather than curves stretching indefinitely. |

Rules across all sizes:

- portrait is primary;
- landscape remains functional;
- SVG scales using its `viewBox`;
- mathematics never depends on CSS pixels;
- graph height uses bounded `clamp()` or `aspect-ratio`;
- graph geometry must not clip;
- page-level horizontal scrolling is prohibited;
- equation wrappers may scroll horizontally only when mathematically necessary;
- sticky/fixed controls respect viewport safe areas;
- page remains operable and readable at 200% zoom.

---

# 17. Narrative flow

All copy in this section is **PROVISIONAL FIRST-IMPLEMENTATION COPY**.

It must be mounted in the real UI and reviewed visually and tonally before literary copy is frozen.

## 17.1 Intro

**First implementation candidate:**

> Una carta construida con trayectorias.

Supporting line:

> Dos modelos para mirar una distancia, un recorrido y lo que permanece.

The intro remains brief.

It must not explain the entire project before the first graph appears.

## 17.2 Model B

Eyebrow:

```text
Modelo B
```

Title:

```text
Asíntotas
```

First implementation candidate:

> Dos trayectorias distintas se acercan a un mismo hilo, sin dejar de ser propias.

The graph appears before the complete mathematical disclosure.

Model B is the direct mathematical response to the asymptote metaphor.

## 17.3 Transition B → A

Primary first-implementation candidate:

> La asíntota nombra la idea. La historia guarda el recorrido.

Alternatives retained for later review:

> La asíntota dice hacia dónde. La historia recuerda cómo.

> Una curva explica la idea; la otra, el camino.

Only the primary candidate is implemented initially.

The alternatives remain documentation references for later copy review.

## 17.4 Model A

Eyebrow:

```text
Modelo A
```

Title:

```text
Historia
```

First implementation candidate:

> Aquí la distancia tiene etapas, cruces y memoria.

Model A should feel denser and more intimate than B.

Do not display visible milestone or event labels on the graph.

## 17.5 Symbolic continuation

Near the Model A mathematical disclosure, display a quiet note:

> Después del presente, la curva continúa como símbolo, no como predicción.

This communicates the meaning of:

\[
(t_{\text{present}},1].
\]

## 17.6 Closing

Primary first-implementation candidate:

> Las trayectorias quedan abiertas. También su lectura.

Alternatives retained for later visual/tonal review:

> La forma termina aquí; lo que significa, no.

> El dibujo se detiene. La interpretación sigue.

Only the primary candidate is implemented initially.

## 17.7 Signature

**DEFINED FOR FIRST IMPLEMENTATION:** do not render a signature.

Do not include:

```text
Carlos · 2026
```

in the first visual implementation.

A signature may only be reconsidered after reviewing the complete page and only if it contributes without turning the piece into a conventional dedication card.

---

# 18. Mathematical disclosure

Each model uses a semantic disclosure:

```text
details/summary
```

or an equivalent accessible button-controlled region.

In manual mode:

- user may open it freely;
- user may close it freely.

In autoplay:

- it opens automatically after the graph completes.

**PROPOSED V1:** once autoplay opens a disclosure, it remains open for the rest of that run unless the user manually closes it.

Leaving the section does not automatically collapse it.

The opening animation should use only restrained presentation:

- short vertical expansion;
- subtle fade;
- optional very light stagger.

No theatrical effect.

Each equation entry contains:

1. equation name;
2. exact formula;
3. very short descriptor.

The page must not become a textbook.

## 18.1 Model B — complete disclosure contract

### \(L_B(t)\)

\[
L_B(t)=mt+b
\]

**Trayectoria compartida**

### \(O_C(t)\)

\[
O_C(t)=A_Ce^{-\alpha_Ct}\sin(\omega_Ct+\phi_C)
\]

**Offset de Carlos**

### \(O_F(t)\)

\[
O_F(t)=A_Fe^{-\alpha_Ft}\sin(\omega_Ft+\phi_F)
\]

**Offset de Fer**

### \(C_B(t)\)

\[
C_B(t)=L_B(t)+O_C(t)
\]

**Carlos**

### \(F_B(t)\)

\[
F_B(t)=L_B(t)+O_F(t)
\]

**Fer**

### \(\delta_C(t)\)

\[
\delta_C(t)=|C_B(t)-L_B(t)|
\]

**Distancia al hilo**

### \(\delta_F(t)\)

\[
\delta_F(t)=|F_B(t)-L_B(t)|
\]

**Distancia al hilo**

### \(D_B(t)\)

\[
D_B(t)=|C_B(t)-F_B(t)|
\]

**Distancia compartida**

The disclosure also states compactly:

\[
C_B(t)-L_B(t)\rightarrow0
\]

\[
F_B(t)-L_B(t)\rightarrow0
\]

and:

\[
D_B(t)\rightarrow0
\]

as:

\[
t\rightarrow\infty.
\]

These are mathematical properties, not interpersonal predictions.

## 18.2 Model A — complete disclosure contract

### \(S(t;a,k)\)

\[
S(t;a,k)=\frac{1}{1+e^{-k(t-a)}}
\]

**Transición suave**

### \(L_A(t)\)

\[
L_A(t)=mt+b+\beta\sin(\nu t+\psi)
\]

**Trayectoria central**

### \(A(t)\)

\[
A(t)=
A_0
-
(A_0-A_{\min})S(t;t_p,k_p)
+
(A_f-A_{\min})S(t;t_d,k_d)
\]

**Amplitud**

### \(B(t)\)

\[
B(t)=
B_0[1-S(t;t_e,k_e)]
+
B_fS(t;t_d,k_d)
\]

**Separación estructural**

### \(d_A(t)\)

\[
d_A(t)=B(t)+A(t)\sin(\omega t+\phi)
\]

**Separación firmada**

### \(K(t)\)

\[
K(t)=
S(t;t_e,k_e)
[1-S(t;t_n,k_n)]
\]

**Compatibilidad**

### \(\eta_C(t)\)

\[
\eta_C(t)
=
\sum_{j=1}^{n}
a_{Cj}
\sin(f_{Cj}t+\varphi_{Cj})
\]

**Perturbación de Carlos**

### \(\eta_F(t)\)

\[
\eta_F(t)
=
\sum_{j=1}^{n}
a_{Fj}
\sin(f_{Fj}t+\varphi_{Fj})
\]

**Perturbación de Fer**

### \(\eta_C^*(t)\)

\[
\eta_C^*(t)
=
[1-K(t)]\eta_C(t)
\]

**Perturbación acoplada**

### \(\eta_F^*(t)\)

\[
\eta_F^*(t)
=
[1-K(t)]\eta_F(t)
\]

**Perturbación acoplada**

### \(C_A(t)\)

\[
C_A(t)
=
L_A(t)
+
\frac{d_A(t)}{2}
+
\eta_C^*(t)
\]

**Carlos**

### \(F_A(t)\)

\[
F_A(t)
=
L_A(t)
-
\frac{d_A(t)}{2}
+
\eta_F^*(t)
\]

**Fer**

### \(D_A(t)\)

\[
D_A(t)=|C_A(t)-F_A(t)|
\]

**Distancia observable**

### \(Q(t)\)

\[
Q(t)=
\begin{cases}
0, & t<t_e,\\[4pt]
\displaystyle
\int_{t_e}^{\min(t,t_n)}K(s)\,ds,
& t\ge t_e.
\end{cases}
\]

**Interacción acumulada**

### \(Q_n\)

\[
Q_n
=
Q(t_n)
=
\int_{t_e}^{t_n}K(s)\,ds
\]

**Interacción total**

### \(H(t)\)

\[
H(t)=
\begin{cases}
0,
& t<t_e,
\\[6pt]
\displaystyle
H_\infty\frac{Q(t)}{Q_n}
+
\int_{t_e}^{t}
K(s)e^{-\lambda(t-s)}\,ds,
& t_e\le t\le t_n,
\\[12pt]
\displaystyle
H_\infty
+
\int_{t_e}^{t_n}
K(s)e^{-\lambda(t-s)}\,ds,
& t>t_n.
\end{cases}
\]

**Memoria**

All production formulas must be transcribed and verified against Document 01 during implementation review.

This section is a presentation inventory, not a new mathematical authority.

No summary formula may replace the complete model disclosure.

---

# 19. Accessibility

Core v1.0 presentation must satisfy:

- semantic `<main>`;
- ordered `<section>` elements;
- exactly one `<h1>`;
- sequential heading hierarchy;
- real `<button>` controls;
- appropriate disclosure semantics;
- complete keyboard operability;
- logical focus order;
- visible `:focus-visible` treatment;
- no outline removal without accessible replacement;
- minimum 44 × 44 CSS px touch targets;
- visible autoplay state;
- programmatically exposed autoplay state;
- concise Spanish accessible names for graph controls;
- exposed disabled/current states;
- coherent SVG `<title>` and `<desc>`;
- no state communicated only by color;
- WCAG 2.2 AA target for text/control contrast;
- usability at 200% zoom;
- usability with text-spacing overrides;
- no continuous animation progress announcements;
- no focus theft during autoplay;
- disclosure state programmatically exposed;
- cancellation preserving focus and viewport stability.

Focus ring target:

```text
at least 2px
+
sufficient contrast
```

Equations should use semantic text and/or MathML where practical.

If styled HTML is used instead:

- reading order must remain meaningful;
- visual superscripts/subscripts must not corrupt accessible names;
- raw LaTeX source alone is not considered an accessible browser presentation.

---

# 20. Reduced motion

**DEFINED — REQUIRED:** when:

```css
prefers-reduced-motion: reduce
```

is active:

- global autoplay does not start;
- autoplay control initially communicates OFF due to motion preference;
- no cinematic scrolling occurs;
- all curves render complete immediately;
- graph loops are disabled;
- progressive reveals are disabled;
- navigation is manual;
- mathematical disclosures remain available;
- all content remains accessible;
- no essential information depends on animation.

Play/Pause may be disabled when progressive playback has no meaningful reduced-motion equivalent.

Replay may simply preserve the complete graph.

The motion preference is observed at startup.

**PROPOSED V1:** if reduced motion becomes active during an ongoing cinematic run:

1. cancel the run;
2. cancel controlled scroll;
3. show complete graph trajectories;
4. preserve current viewport;
5. enter manual reduced mode.

If the system preference is later disabled, autoplay does not automatically start.

The user must explicitly activate it.

---

# 21. Technical architecture proposal

The mathematical model and approved parameters remain untouched.

Presentation orchestration is added above existing graph controllers.

## 21.1 Proposed module structure

```text
src/
  experience/
    experience.controller.ts
    experience.config.ts
    experience.types.ts
    cancellable-delay.ts
    scroll.ts
    preferences.ts

  animation/
    animator.ts
    types.ts
    timeline.ts

  graph/
    temporal-reveal.ts
    path.ts

  presentation/
    controls.ts
    disclosures.ts
    status.ts

  sections/
    asymptote.section.ts
    history.section.ts
    shared.ts

  main.ts
```

### `experience.controller.ts`

Owns:

- state machine;
- sequence;
- page-level orchestration;
- run lifecycle;
- cancellation;
- restart.

### `experience.config.ts`

Owns:

- cinematic durations;
- section targets;
- reading holds;
- transition configuration.

### `experience.types.ts`

Owns:

- experience states;
- events;
- dependency interfaces.

### `cancellable-delay.ts`

Owns:

- `AbortSignal`-aware waits.

### `scroll.ts`

Owns:

- deterministic cinematic scrolling;
- easing;
- abort support;
- destination calculations.

### `preferences.ts`

Owns only:

- reduced-motion state;
- current runtime autoplay state.

It must not persist autoplay using browser storage.

### `animation/animator.ts`

Owns:

- per-graph clock;
- play;
- pause;
- reset;
- replay;
- progress;
- completion.

It does not know page order.

### `graph/temporal-reveal.ts`

Owns:

- temporal prefix extraction;
- bracketing samples;
- interpolation;
- visible endpoint generation.

### `presentation/controls.ts`

Owns:

- global autoplay control;
- graph controls;
- DOM state synchronization.

### `presentation/disclosures.ts`

Owns:

- opening/closing equation disclosures;
- accessible state.

### `presentation/status.ts`

Owns:

- restrained accessible status announcements.

### `main.ts`

Remains a composition root.

It may:

- initialize sections;
- initialize preferences;
- initialize controls;
- construct graph controllers;
- construct disclosures;
- inject dependencies into `ExperienceController`;
- start the experience if allowed.

It must not contain the state machine implementation itself.

## 21.2 Dependency design

`ExperienceController` should depend on small interfaces such as:

```ts
GraphPlayback
Disclosure
Scroller
Clock
```

This allows orchestration tests to use fakes rather than depending on real browser timing.

---

# 22. State machine

**PROPOSED V1 states:**

```text
IDLE
  ↓
INTRO
  ↓
SCROLLING_TO_B
  ↓
PLAYING_B
  ↓
READING_B_MATH
  ↓
TRANSITION
  ↓
SCROLLING_TO_A
  ↓
PLAYING_A
  ↓
READING_A_MATH
  ↓
CLOSING
  ↓
RETURNING_HOME
  ↓
COMPLETE
```

Additional manual/reduced states:

```text
MANUAL
MANUAL_REDUCED
```

`autoplayEnabled` is orthogonal runtime state controlling whether a cinematic run may exist.

Cancellation from any active cinematic state:

```text
abort active work
↓
pause active graph
↓
MANUAL
```

Reduced motion initializes directly into:

```text
MANUAL_REDUCED
```

`PAUSED` belongs to each individual `AnimationController`, not to the global narrative state machine.

## 22.1 Events

| Event | Valid source | Result |
|---|---|---|
| `START` | `IDLE`, `COMPLETE` | Reset all and enter `INTRO`. |
| `SEGMENT_COMPLETE` | Active sequential state | Advance exactly one declared state. |
| `AUTOPLAY_OFF` | Any active state | Abort run, pause graph, enter `MANUAL`. |
| `MANUAL_INTENT` | Any active state | Same cancellation contract as `AUTOPLAY_OFF`. |
| `AUTOPLAY_ON` | `MANUAL`, `COMPLETE` | Full reset, return home and begin `INTRO`. |
| `REDUCED_MOTION_ON` | Any state | Abort, show complete curves, enter `MANUAL_REDUCED`. |
| `ERROR` | Any active state | Abort safely, preserve content, enter `MANUAL`, report non-invasively. |

Transitions must be:

- serial;
- idempotent;
- abort-aware.

A state may not schedule its successor twice.

Completion events associated with an old/aborted run id must be ignored.

---

# 23. Testing requirements

The implementation must add or update tests for the following contracts.

## 23.1 Temporal reveal synchronization

Different geometric path lengths at the same normalized temporal progress produce the same visible \(t\)/x endpoint.

## 23.2 Interpolated endpoint

A progress value falling between two samples produces the mathematically correct linearly interpolated final point.

## 23.3 Pause

Progress and visible endpoint remain unchanged while paused.

## 23.4 Resume

Play after Pause continues from the paused progress instead of restarting.

## 23.5 Replay

Replay:

```text
progress → 0
state → playing
```

immediately.

## 23.6 Autoplay default/OFF

Autoplay OFF prevents global experience startup.

Legacy per-graph viewport observers must not bypass the global autoplay state.

## 23.7 Cancellation

Turning autoplay OFF:

- aborts waits;
- aborts controlled scrolling;
- pauses active graph;
- preserves viewport.

## 23.8 Restart

Turning autoplay ON after OFF:

- resets both graphs;
- resets disclosures;
- returns to top;
- begins at Intro.

## 23.9 Narrative order

The controller enforces:

```text
B
→ B equations
→ transition
→ A
→ A equations
→ closing
→ home
```

## 23.10 Single playback

Neither graph loops automatically during:

- cinematic mode;
- manual completion.

## 23.11 Reduced motion

Reduced-motion mode provides:

- no global autoplay;
- no cinematic scrolling;
- no progressive graph reveal;
- complete visible trajectories.

## 23.12 Independent graph controls

After global orchestration is cancelled, Play/Pause/Replay affect only the selected graph.

## 23.13 Accessible state

Autoplay and graph playback state update:

- visible state;
- ARIA state;
- button disabled state.

## 23.14 Runtime autoplay preference

Test that:

- a normal page initialization starts autoplay ON;
- OFF remains OFF during the current loaded page;
- no `sessionStorage` or `localStorage` dependency exists;
- a fresh application initialization returns to ON;
- reduced motion overrides ON.

## 23.15 Disclosures

Automatic opening occurs after each graph.

Opened disclosures remain open for the run unless manually changed.

## 23.16 Stale callbacks

An aborted or superseded run cannot advance the state machine when:

- timers resolve;
- graph-completion callbacks fire;
- old scroll promises resolve.

## 23.17 Responsive DOM contract

Responsive behavior must never replace controls with non-interactive elements.

Equation overflow must remain scoped to the equation wrapper.

## 23.18 Regression

All existing mathematical, graph and animation tests must continue to pass.

Existing animation tests may be deliberately updated only where this specification explicitly supersedes old looping or controller behavior.

## 23.19 Testing layers

Use:

- pure unit tests for temporal reveal;
- pure unit tests for state transitions;
- fake clocks for ExperienceController;
- jsdom integration tests for controls;
- jsdom integration tests for disclosures;
- jsdom tests for ARIA/state;
- browser/manual checks for real SVG geometry;
- browser/manual checks for cinematic scrolling;
- touch-device checks;
- safe-area checks;
- reduced-motion checks;
- typecheck;
- production build.

---

# 24. Implementation phases

## Phase 1 — Animation correctness

**Likely files:**

```text
src/graph/temporal-reveal.ts
src/graph/path.ts
src/sections/shared.ts
src/sections/asymptote.section.ts
src/sections/history.section.ts
tests/graph.test.ts
new temporal reveal tests
```

**Contract:**

Visible geometry is a time-indexed sample prefix with interpolation.

Bounds remain based on full series.

Model B presentation offsets remain presentation timing only.

**Tests:**

Requirements 23.1 and 23.2 plus existing graph tests.

**Acceptance:**

Equal temporal progress yields equal visible \(t\) regardless of path arc length.

No mathematical or sampling changes.

---

## Phase 2 — ExperienceController

**Likely files:**

```text
src/experience/*
src/main.ts
experience controller tests
```

**Contract:**

- explicit serial state machine;
- injected graph/disclosure/scroll dependencies;
- one abortable run at a time;
- deterministic completion;
- stale callbacks ignored.

**Tests:**

Requirements:

```text
23.7
23.8
23.9
23.10
23.16
```

**Acceptance:**

The complete narrative order runs once using fake clocks.

Cancellation leaves no active scheduled work.

`main.ts` remains only a composition root.

---

## Phase 3 — Controls & autoplay

**Likely files:**

```text
src/animation/animator.ts
src/animation/types.ts
src/presentation/controls.ts
src/experience/preferences.ts
index.html
animation/control tests
```

**Contract:**

- real pause;
- resume;
- replay;
- global ON/OFF;
- manual actions take priority;
- autoplay state is runtime-only;
- no persistence storage;
- no viewport observer bypass.

**Tests:**

Requirements:

```text
23.3
23.4
23.5
23.6
23.7
23.8
23.12
23.13
23.14
```

**Acceptance:**

Every control is keyboard/touch operable.

Every control communicates state.

Autoplay ON after OFF always restarts from zero.

---

## Phase 4 — UI visual system

**Likely files:**

```text
src/styles.css
index.html
section presentation markup
```

**Contract:**

Implement:

- color tokens;
- type system;
- spacing tokens;
- editorial layout;
- graph surfaces;
- legends;
- controls;
- mobile-first behavior.

The first implementation uses:

```text
Carlos → blue continuous curve
Fer → pink continuous curve
Shared → gold continuous curve
No shared halo
```

**Tests:**

- targeted DOM checks;
- contrast validation;
- responsive manual matrix.

**Acceptance:**

- usable at 320 px;
- no page overflow;
- graph capped on desktop;
- no dashboard-like chrome;
- visual identity clearly reads as letter/editorial piece.

---

## Phase 5 — Narrative composition

**Likely files:**

```text
index.html
presentation/disclosure modules
possibly a static copy module
```

**Contract:**

- required order;
- provisional first-implementation copy;
- complete exact equations;
- B before A;
- symbolic-continuation note;
- no signature.

**Tests:**

- heading hierarchy;
- DOM order;
- disclosure inventory;
- formula review against Document 01.

**Acceptance:**

All required formulas are present.

Explanation remains concise.

No visible Model A events/milestones.

Copy remains open to post-render visual/tonal QA.

---

## Phase 6 — Accessibility/mobile polish

**Likely files:**

```text
index.html
src/styles.css
src/graph/svg.ts
presentation controls
disclosures
preferences
accessibility tests
```

**Contract:**

Sections 16, 19 and 20 apply in full.

**Tests:**

- reduced motion;
- keyboard walkthrough;
- 200% zoom;
- accessible names/states;
- 320–430 px device matrix;
- landscape sanity check;
- touch targets;
- equation overflow.

**Acceptance:**

Reduced-motion users receive all information.

Focus and state remain visible.

Mobile interactions remain comfortable.

---

## Phase 7 — Verification / freeze preparation

**Likely files:**

- tests;
- documentation status;
- presentation fixes discovered during visual QA.

**Contract:**

No scope expansion.

The first implementation is reviewed visually before presentation freeze.

**Verification:**

```bash
npm test
npm run typecheck
npm run build
git diff --check
```

Also perform:

- real mobile visual QA;
- desktop visual QA;
- responsive matrix;
- cinematic timeline review;
- accessibility walkthrough.

**Acceptance:**

All Section 25 criteria pass.

Mathematical Core and Baseline v1.1 remain unchanged.

After visual validation and accepted adjustments, document status may move from:

```text
APPROVED FOR FIRST IMPLEMENTATION — VISUAL VALIDATION REQUIRED
```

to:

```text
VALIDATED / FROZEN
```

---

# 25. Acceptance criteria

Presentation & Experience Core v1.0 is acceptable when:

- Model B precedes Model A;
- complete narrative order is preserved;
- both graphs use approved samples;
- both graphs use approved models;
- both graphs use Baseline v1.1 values;
- reveal is driven by mathematical time rather than SVG arc length;
- simultaneous Model A paths show the same visible \(t\);
- B runs once for 30 seconds per cinematic journey;
- A runs once for 30 seconds per cinematic journey;
- global autoplay defaults ON in normal motion mode;
- autoplay can be visibly controlled;
- autoplay OFF cancels immediately;
- autoplay ON after OFF restarts only from zero;
- manual Play follows its defined contract;
- manual Pause follows its defined contract;
- Replay follows its defined contract;
- equations open automatically at the correct cinematic moments;
- equations remain manually operable;
- every required formula is present;
- formulas match Document 01;
- cinematic order works without locking user scroll;
- first implementation runs approximately 100 seconds before visual tuning;
- only meaningful manual intent cancels the journey;
- incidental touch/pointer contact does not cancel autoplay;
- completion returns home and stops;
- design reads as a warm editorial letter;
- design does not resemble application chrome;
- Carlos remains blue;
- Fer remains soft pink;
- shared trajectory remains gold;
- Carlos and Fer use continuous strokes initially;
- the shared path has no halo initially;
- 320 px portrait has no broken layout;
- no page-level horizontal overflow exists;
- desktop retains capped editorial measure;
- typography is visually reviewed before freeze;
- provisional copy is visually/tonally reviewed before freeze;
- no signature appears in the first implementation;
- reduced motion removes cinematic motion while preserving all information;
- keyboard operation passes;
- visible focus passes;
- ARIA/state behavior passes;
- contrast passes;
- 200% zoom passes;
- touch-target requirements pass;
- no audio/music/audiovisual functionality is introduced;
- no autoplay state is persisted with browser storage;
- existing tests continue passing;
- new presentation tests pass;
- typecheck passes;
- production build passes;
- mathematical files remain unchanged;
- parameter files remain unchanged.

---

# 26. Decisions: DEFINED

The following decisions are closed for the first implementation:

- the product is an intimate, contemplative mathematical digital letter;
- the artistic sources are mathematics/systems engineering, civil engineering and Greek mythology;
- those references are expressed indirectly;
- Carlos is blue;
- Fer is soft baby pink;
- the shared trajectory is gold;
- the background is warm letter/paper;
- mobile portrait is primary;
- 320 px minimum support is required;
- 360–430 px is the principal target range;
- narrative order is Intro → B → equations B → transition → A → equations A → closing;
- global autoplay exists;
- autoplay is ON by default unless reduced motion applies;
- autoplay state is runtime-only;
- OFF cancels immediately;
- OFF preserves current viewport;
- OFF preserves graph progress;
- ON from OFF restarts from zero;
- manual graph controls are Play, Pause and Replay;
- animation progress maps to mathematical time, never SVG path length;
- Model A simultaneous paths share the same visible mathematical time;
- Model B duration is 30 seconds;
- Model A duration is 30 seconds;
- each graph plays once during a cinematic journey;
- `ExperienceController` owns page orchestration;
- `AnimationController` owns individual graph playback;
- cinematic scroll never locks manual user control;
- mathematical disclosures show complete models;
- equations open after graph completion during autoplay;
- disclosures are manually operable;
- traditional chart axes are excluded;
- dense grids are excluded;
- numerical ticks are excluded;
- technical graph panels are excluded;
- invasive tooltips are excluded;
- Model A milestones/events are not visually annotated in V1;
- \((t_{\text{present}},1]\) is symbolic continuation, not prediction;
- semantic HTML is mandatory;
- keyboard access is mandatory;
- visible focus is mandatory;
- meaningful SVG semantics are mandatory;
- reduced motion disables cinematic autoplay and progressive reveal while preserving content;
- audio/music/audiovisual synchronization is future v1.1.

---

# 27. Decisions: PROPOSED V1 / FIRST IMPLEMENTATION

The following choices define the first visual implementation and are intentionally subject to deliberate post-render validation:

- temporal sample-prefix reveal using binary search and linear interpolation;
- retention of Model B timing offsets `0–0.92` and `0.04–1.00`;
- no automatic graph loop in cinematic or manual mode;
- manual graph actions cancel global autoplay;
- only meaningful navigation/control intent cancels autoplay;
- incidental `touchstart`/`pointerdown` alone does not cancel autoplay;
- one `AbortController` and run id per global journey;
- approximately 99.6-second cinematic timeline;
- `Measured Correspondence / Correspondencia Medida` visual concept;
- warm-paper palette;
- blue Carlos curve;
- soft-pink Fer curve;
- antique-gold shared curve;
- system font stacks as first typography implementation;
- typography remains subject to visual QA;
- 4 px spacing rhythm;
- subtle paper graph surface;
- hairline graph container;
- minimal legend;
- Carlos curve continuous;
- Fer curve continuous;
- shared curve continuous;
- no halo around shared trajectory initially;
- slight stroke-width differentiation;
- fixed safe-area-aware autoplay control;
- no autoplay persistence storage;
- provisional intro copy;
- provisional Model B copy;
- provisional transition copy;
- provisional Model A copy;
- provisional closing copy;
- literary copy remains open until mounted UI is reviewed;
- automatically opened equations remain open unless manually closed;
- no signature in the first implementation;
- proposed module structure from Section 21;
- proposed state machine from Section 22;
- reduced-motion preference changes cancel active cinematic runs and reveal complete curves.

These decisions must not be silently changed during implementation.

Any adjustment should be based on visual, UX, responsive or accessibility review after the first implementation is observable.

---

# 28. Explicit non-goals

Core v1.0 presentation does not include:

- changes to Document 01;
- changes to Model A equations;
- changes to Model B equations;
- changes to Baseline v1.1;
- parameter recalibration;
- altered sampling for visual convenience;
- audio;
- music;
- soundtrack files;
- audiovisual synchronization;
- music licensing work;
- visible Model A event annotations;
- visible Model A milestone annotations;
- predictive claims about symbolic continuation;
- dashboards;
- parameter panels;
- data tooltips;
- conventional chart axes;
- dense grids;
- backend;
- database;
- accounts;
- analytics;
- CMS;
- runtime external content;
- framework migration;
- D3;
- Canvas as primary renderer;
- WebGL;
- a second graph engine;
- final long-form romantic copy;
- proprietary font files;
- mandatory remote fonts;
- ornamental Greek iconography;
- ornamental civil-engineering iconography;
- infinite global loop;
- infinite per-graph loop;
- autoplay preference persistence through `sessionStorage`;
- autoplay preference persistence through `localStorage`;
- a signature in the first implementation.

---

# 29. Boundary with Audiovisual v1.1

The future audiovisual proposal is consulted only to preserve a clean boundary.

```text
CORE v1.0

ExperienceController
  → page order
  → cancellable scrolling
  → reading time
  → graph playback
  → disclosures
  → closing
  → return home


FUTURE v1.1

Audiovisual timeline
  → AudioController
  → soundtrack / user gesture
  → musical timestamps
  → regional audiovisual mapping
  → synchronized pause/resume
  → tab/background handling
```

Core v1.0 must remain fully meaningful, operable and complete without sound.

Its `ExperienceController` may later become:

- a dependency of;
- or a component coordinated by;

the audiovisual timeline.

It must not contain dormant music logic during v1.0.

No:

- graph duration;
- equation;
- milestone;
- parameter;
- geometry

may be changed to match music.

If v1.1 later maps musical time to mathematical time, that mapping belongs above the frozen models and requires its own approved specification.

**Final boundary:**

\[
\boxed{
\text{Audio / music / audiovisual synchronization}
=
\text{FUTURE v1.1}
=
\text{OUT OF SCOPE}
}
\]

---

# 30. First implementation review boundary

This specification authorizes one complete first implementation of Presentation & Experience Core v1.0.

The implementation is intentionally followed by a visual validation pass.

The following may be adjusted after observing the real page without reopening the mathematical core:

```text
colors
typography
spacing
control placement
graph surface treatment
responsive proportions
cinematic hold durations
cinematic scroll durations
provisional narrative copy
minor transition presentation
```

The following may **not** be adjusted through visual review:

```text
mathematical equations
Baseline Parameter Set v1.1
mathematical semantics
Model A / Model B independence
30-second graph durations
temporal reveal correctness
global autoplay ON/OFF semantics
manual Play/Pause/Replay semantics
mobile-first requirement
accessibility requirements
reduced-motion behavior
v1.1 audiovisual boundary
```

The first implementation therefore follows:

\[
\boxed{
\text{Specification}
\rightarrow
\text{Implementation}
\rightarrow
\text{Visual / UX validation}
\rightarrow
\text{Deliberate adjustments}
\rightarrow
\text{Presentation freeze}
}
\]

Only after that freeze is complete may the project proceed to the separate **Audiovisual v1.1 specification and implementation phase**.
