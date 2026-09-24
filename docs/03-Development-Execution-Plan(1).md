# Static Mathematical Letter
## Development Execution Plan
### Version 1.0

## 1. Purpose

This document defines the execution plan for implementing Static Mathematical Letter Core v1.0.

It does not define mathematical behavior.
It does not define software architecture.
It does not define the final artistic composition.

Sources of truth and authority hierarchy:

1. `01-Mathematical-Models-Specification.md` — **maximum authority**
   - Mathematical meaning
   - Equations
   - Parameter semantics and constraints
   - Mathematical properties and invariants

2. `02-Software-Implementation-Specification.md` — **software authority, subordinate to Document 01**
   - Technology stack
   - Architecture
   - Module boundaries
   - Rendering pipeline
   - Animation system
   - Testing strategy

3. This document — **execution-only, subordinate to Documents 01 and 02**
   - Implementation sequence
   - Development checkpoints
   - Verification criteria
   - Completion criteria

4. `04-Baseline-Parameter-Set.md` — **initial numeric calibration, subordinate to Documents 01 and 02**
   - Initial numeric values for parameters already defined by the authoritative specifications
   - Rendering and animation baseline values allowed by Document 02

Conflict rule:

- Document 01 always prevails on mathematics.
- Document 02 prevails on software architecture and implementation contracts when it does not contradict Document 01.
- Documents 03 and 04 may not introduce, redefine, extend, or override mathematical equations or software architecture.
- A numeric value from Document 04 is valid only if the corresponding parameter or configuration capability exists in Documents 01 or 02.

---

# 2. Development Goal

Build a complete functional implementation of Static Mathematical Letter Core v1.0.

The result must provide:

- a single static web page;
- Model B rendered first;
- Model A rendered second;
- mathematically generated SVG curves;
- animated progressive rendering;
- autoplay when appropriate;
- replay capability;
- automatic restart/loop support;
- responsive behavior;
- mathematical tests;
- rendering/animation tests;
- production build.

The initial implementation should prioritize:

1. mathematical correctness;
2. architectural correctness;
3. animation correctness;
4. responsive functionality;
5. maintainability.

Final visual polish is explicitly secondary.

---

# 3. Non-Goals

During Core v1.0 implementation, do not spend significant development effort on:

- final typography;
- final colors;
- decorative effects;
- final copywriting;
- elaborate transitions;
- visual branding;
- complex backgrounds;
- ornamental animation;
- additional application features.

Use a clean, neutral temporary presentation sufficient to evaluate the graphs.

The visual layer will be refined after the functional core is accepted.

---

# 4. Implementation Strategy

Development must proceed incrementally.

Do not attempt to implement the complete page in one monolithic change.

Each phase must leave the project in a valid state before proceeding.

Required sequence:

Phase 0 — Repository and tooling
Phase 1 — Mathematical primitives
Phase 2 — Model B
Phase 3 — Graph engine
Phase 4 — Model B visualization
Phase 5 — Animation engine
Phase 6 — Model A
Phase 7 — Model A visualization
Phase 8 — Page composition
Phase 9 — Verification and production build

---

# 5. Phase 0 — Repository and Tooling

Initialize the project using:

- Vite
- TypeScript
- Vitest
- npm

Create the directory structure established in the Software Implementation Specification.

Configure:

- TypeScript strict mode;
- development server;
- production build;
- test command.

Expected commands:

npm run dev
npm run build
npm test

Checkpoint:

- project starts;
- TypeScript compiles;
- tests execute;
- production build succeeds.

Do not continue if the base project is broken.

---

# 6. Phase 1 — Mathematical Primitives

Implement the shared mathematical types and utilities required by both models.

At minimum:

- MathematicalPoint
- MathematicalFunction
- sigmoid
- clamp
- finite-number validation

Do not introduce visualization dependencies into this layer.

Checkpoint:

- math utilities compile;
- deterministic behavior verified;
- unit tests pass.

---

# 7. Phase 2 — Model B

Implement Model B before Model A.

Reason:

Model B is mathematically smaller, visually central to the letter, and provides the simplest integration path for validating the complete mathematical-to-SVG pipeline.

Implement:

- AsymptoteParameters
- parameter configuration
- L_B(t)
- C_B(t)
- F_B(t)
- distance Carlos → L
- distance Fer → L
- D_B(t)

Use the exact equations established in the Mathematical Models Specification.

Do not simplify or reinterpret them.

Tests must verify:

- finite outputs;
- deterministic outputs;
- non-negative distances;
- expected asymptotic behavior;
- parameter validation.

Checkpoint:

Model B must be independently usable without DOM or SVG.

---

# 8. Phase 3 — Graph Engine

Implement the reusable graph pipeline.

Required components:

## Sampling

Convert:

f(t)

into:

MathematicalPoint[]

## Bounds

Calculate common mathematical bounds for multiple curves.

## Viewport

Convert:

MathematicalPoint

into:

ScreenPoint

## Path generation

Convert:

ScreenPoint[]

into an SVG path definition.

## SVG utilities

Create/configure SVG elements without mathematical knowledge.

Checkpoint:

A generic mathematical function must be renderable without Model A or Model B specific rendering logic.

---

# 9. Phase 4 — Model B Visualization

Create `asymptote.section.ts`.

Pipeline:

Model B
→ sample L_B
→ sample C_B
→ sample F_B
→ common bounds
→ viewport
→ SVG paths

Render all three trajectories.

Use temporary but distinguishable visual styling.

Labels may identify:

- Carlos
- Fer
- L(t)

Do not implement final artistic styling.

Checkpoint:

Model B must be fully visible as a static SVG before animation is introduced.

Verify visually that:

- all curves use the same coordinate system;
- no clipping occurs;
- the asymptotic behavior is visually recognizable;
- resizing does not destroy the graph.

---

# 10. Phase 5 — Animation Engine

Only after static Model B rendering works, implement animation.

Implement:

- AnimationConfig
- AnimationState
- AnimationController
- normalized progress;
- requestAnimationFrame loop;
- SVG path reveal;
- restart;
- autoplay;
- loop;
- loop delay;
- IntersectionObserver activation;
- reduced-motion handling.

Animation must operate on already-generated geometry.

Do not place mathematical equations inside the animation loop.

Checkpoint:

Model B must:

- start automatically when appropriate;
- progress from 0 to 1;
- complete correctly;
- restart manually;
- restart automatically when loop is enabled;
- maintain stable behavior across repeated loops.

---

# 11. Phase 6 — Model A

Implement Model A only after the complete B pipeline is operational.

Implement exactly the functions specified by the Mathematical Models Specification:

- L_A(t)
- A(t)
- B(t)
- d_A(t)
- C_A(t)
- F_A(t)
- D_A(t)
- K(t)
- H(t)

Implement deterministic individual perturbations where required by the mathematical specification.

Implement HistoryParameters.

Implement HistoryEvent metadata separately.

Events must not alter the equations.

Tests must verify:

- finite values;
- positive amplitude where required;
- non-negative distance;
- deterministic behavior;
- convergence-region behavior;
- peak-region behavior;
- divergence behavior;
- coupling behavior;
- memory behavior.

Checkpoint:

Model A must be mathematically valid independently of DOM and SVG.

---

# 12. Phase 7 — Model A Visualization

Create `history.section.ts`.

Reuse the existing:

- sampler;
- bounds;
- viewport;
- SVG renderer;
- animation engine.

Do not create a second graph engine.

Render at minimum:

- C_A(t)
- F_A(t)

Support optional rendering of:

- L_A(t)
- event markers

without making them mandatory for Core v1.0.

Checkpoint:

The complete Model A evolution must be observable through the animation.

The expected macro-behavior should be visually recognizable:

independence
→ encounter
→ approach
→ convergence
→ peak
→ divergence
→ present

This visual verification must arise from the equations, not from manually positioning SVG points.

---

# 13. Phase 8 — Page Composition

Create the single-page letter structure.

Required order:

1. Introduction
2. Model B
3. Transition
4. Model A
5. Closing

B must remain the primary piece.

A must appear after B.

Add minimal placeholder copy where final text has not yet been established.

Do not invent emotionally significant final wording.

Mark temporary copy clearly in source code where appropriate.

Each graph should expose replay functionality.

The page must be mobile-first.

---

# 14. Animation Behavior

Default implementation behavior:

- animation starts when the relevant graph enters the viewport;
- first playback is automatic;
- graph remains complete briefly after finishing;
- automatic loop may then restart it;
- replay is available manually;
- repeated scrolling must not produce broken or overlapping animation loops.

Animation configuration must remain centralized and easy to tune.

Durations and delays are presentation parameters, not mathematical parameters.

---

# 15. Responsive Verification

Verify at minimum:

- narrow mobile viewport;
- typical mobile viewport;
- tablet-like width;
- desktop width.

SVG must scale through `viewBox`.

Mathematical coordinates must not depend on CSS pixel dimensions.

No horizontal page scrolling should be required to understand the graphs.

---

# 16. Accessibility Verification

Implement:

- semantic sections;
- SVG title/description;
- actual buttons for replay;
- keyboard-accessible controls;
- sufficient temporary contrast;
- prefers-reduced-motion support.

Reduced motion must not remove access to the mathematical information.

---

# 17. Error Handling

Fail explicitly during development for invalid configuration.

Validate at minimum:

- invalid domains;
- samples < 2;
- non-finite mathematical parameters;
- non-finite mathematical results;
- invalid viewport dimensions;
- duration <= 0.

Do not silently draw corrupted geometry.

---

# 18. Testing Requirements

Before considering Core v1.0 complete:

## Mathematical tests

Model A and B invariants pass.

## Graph tests

Sampling, bounds, viewport and path generation pass.

## Animation tests

Progress, restart and state transitions pass.

## Build

Production build succeeds.

Do not weaken mathematical assertions merely to make tests pass.

If a mathematical test conflicts with the specification, inspect the implementation first.

---

# 19. Manual Verification

After automated tests pass, inspect the application manually.

Verify:

Model B:
- Carlos curve visible;
- Fer curve visible;
- shared trajectory visible;
- asymptotic behavior recognizable;
- animation completes;
- replay works;
- loop works.

Model A:
- both trajectories visible;
- evolution is recognizable;
- crossings/proximity are produced by the model;
- present state appears in the intended region;
- animation completes;
- replay works;
- loop works.

Page:
- B before A;
- mobile layout usable;
- desktop layout usable;
- no runtime console errors.

---

# 20. Implementation Constraints

Do not:

- introduce React;
- introduce D3;
- introduce a backend;
- introduce persistence;
- introduce network dependencies;
- merge Model A and Model B;
- duplicate the graph engine;
- hard-code mathematical trajectories as SVG coordinates;
- replace equations with manually drawn paths;
- couple animation timing to mathematical equations;
- rewrite the mathematical specification for visual convenience.

If a visual result appears undesirable, expose/tune parameters rather than violating module boundaries.

---

# 21. Code Quality

Prefer:

- small pure functions;
- explicit types;
- descriptive names;
- centralized configuration;
- minimal dependencies;
- clear module boundaries.

Avoid abstractions that are not required by the current problem.

This is a small, deliberate piece of software.

It should remain understandable from the repository structure.

---

# 22. Temporary Visual Design

Core v1.0 requires only enough styling to evaluate:

- graph geometry;
- animation;
- labels;
- responsive behavior;
- section hierarchy.

Final styling is a separate iteration.

Therefore temporary CSS should remain easy to replace.

Do not embed visual constants into mathematical or graph modules.

---

# 23. Completion Criteria

Core v1.0 is complete only when:

- both mathematical models are implemented;
- their tests pass;
- the generic graph pipeline works;
- B renders and animates;
- A renders and animates;
- autoplay works;
- replay works;
- automatic loop works;
- viewport activation works;
- reduced-motion behavior works;
- responsive layout works;
- production build succeeds;
- there are no known runtime errors;
- mathematical code remains independent from presentation;
- visual styling can be changed without modifying mathematical models.

---

# 24. Expected Final State

At completion, the repository must already contain a usable Static Mathematical Letter.

It does not need to be artistically final.

The remaining work should primarily consist of:

- tuning mathematical parameters;
- tuning animation durations;
- adjusting composition;
- choosing typography;
- choosing colors;
- refining copy;
- refining labels;
- adding subtle decorative details.

No architectural rewrite should be required for those iterations.