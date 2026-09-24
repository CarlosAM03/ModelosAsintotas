
# Static Mathematical Letter

## Documento de Diseño e Implementación de Software

### Versión 1.0

---

# 1. Propósito

**Static Mathematical Letter** es una pieza web estática y animada cuyo propósito es presentar dos modelos matemáticos relacionados conceptualmente, pero independientes en su formulación:

* **Modelo B — Asíntotas:** representación de dos trayectorias individuales con comportamiento asintótico respecto de una trayectoria compartida.
* **Modelo A — Historia:** representación matemática abstracta de la evolución histórica de compatibilidad entre dos trayectorias individuales.

La pieza se concibe como una **carta digital construida mediante matemáticas, software y diseño visual**, no como una aplicación web convencional.

El término **static** describe su arquitectura:

$$
\boxed{
\text{sin backend}
+
\text{sin base de datos}
+
\text{sin API}
+
\text{sin contenido remoto dinámico}
}
$$

No significa que su representación gráfica sea inmóvil.

Las gráficas serán animadas y representarán progresivamente la evolución de sus respectivos dominios temporales.

El flujo fundamental será:

$$
\boxed{
\text{Modelo matemático}
\rightarrow
\text{muestreo}
\rightarrow
\text{geometría}
\rightarrow
\text{SVG}
\rightarrow
\text{animación}
\rightarrow
\text{composición}
}
$$

---

# 2. Fuente de verdad matemática

Este documento **no redefine los Modelos A y B**.

La formulación de:

$$
C_A(t),F_A(t),D_A(t),K(t),H(t)
$$

y:

$$
C_B(t),F_B(t),L_B(t),D_B(t)
$$

pertenece exclusivamente al **Documento de Modelos Matemáticos**.

Este documento define cómo dichas funciones serán implementadas, muestreadas, transformadas, renderizadas y animadas.

Por tanto:

$$
\boxed{
\text{Mathematical Models}
\rightarrow
\text{Static Mathematical Letter}
}
$$

El software implementa el modelo; no lo redefine.

En caso de cualquier discrepancia matemática entre este documento y `01-Mathematical-Models-Specification.md`, prevalece siempre el Documento 01. Este documento conserva autoridad únicamente sobre arquitectura, contratos de software, rendering, animación, testing e integración técnica.

---

# 3. Naturaleza del producto

La aplicación será una **Single Page Static Experience**.

Conceptualmente:

```text
Static Mathematical Letter
│
├── Introducción
│
├── Modelo B — Asíntotas
│   ├── composición textual
│   ├── gráfica animada
│   ├── controles mínimos
│   └── modelo matemático opcional
│
├── Transición
│
├── Modelo A — Historia
│   ├── composición textual
│   ├── gráfica animada
│   ├── controles mínimos
│   └── modelo matemático opcional
│
└── Cierre
```

El orden obligatorio será:

$$
\boxed{B\rightarrow A}
$$

B constituye la respuesta principal.

A funciona como una segunda pieza que amplía la carta.

---

# 4. Objetivos de implementación

La V1 deberá:

* implementar correctamente ambos modelos matemáticos;
* generar sus trayectorias mediante TypeScript;
* convertir las funciones continuas en muestras discretas;
* transformar coordenadas matemáticas en coordenadas SVG;
* representar las curvas mediante SVG;
* animar el progreso temporal de cada modelo;
* permitir volver a reproducir cada gráfica;
* permitir reinicio automático al finalizar;
* funcionar en móvil y escritorio;
* conservar A y B matemáticamente independientes;
* funcionar completamente como sitio estático;
* permitir modificar posteriormente el diseño visual sin reestructurar el núcleo.

---

# 5. Fuera de alcance

La V1 no implementará:

* backend;
* base de datos;
* autenticación;
* usuarios;
* API;
* WebSockets;
* persistencia remota;
* CMS;
* React;
* router;
* Redux;
* Zustand;
* D3 como dependencia;
* Three.js;
* WebGL;
* Canvas como renderer principal;
* editor visual de ecuaciones;
* modificación pública de parámetros matemáticos;
* panel administrativo;
* cuentas;
* analytics como requisito;
* sincronización con servicios externos.

Sí estarán dentro de alcance:

$$
\boxed{
\text{animación}
+
\text{replay}
+
\text{reinicio automático}
}
$$

---

# 6. Stack tecnológico

| Área            | Tecnología                           |
| --------------- | ------------------------------------ |
| Lenguaje        | TypeScript                           |
| Documento       | HTML5                                |
| Presentación    | CSS                                  |
| Gráficos        | SVG                                  |
| Animación       | TypeScript + `requestAnimationFrame` |
| Build           | Vite                                 |
| Testing         | Vitest                               |
| Package manager | npm                                  |
| Versionado      | Git                                  |
| Hosting         | plataforma de hosting estático       |

No se requiere framework frontend.

La aplicación será esencialmente:

$$
\boxed{
\text{HTML}
+
\text{CSS}
+
\text{TypeScript}
+
\text{SVG}
}
$$

---

# 7. Principios arquitectónicos

## 7.1 Matemática independiente de visualización

Los modelos producirán valores matemáticos.

Nunca elementos visuales.

Permitido:

```ts
model.carlos(t): number
```

No permitido:

```ts
model.carlos(t): SVGPathElement
```

---

## 7.2 Visualización independiente del significado

El motor gráfico conocerá:

```text
points
paths
coordinates
progress
viewport
```

pero no:

```text
Carlos
Fer
relación
Bumble
compatibilidad
asíntota
```

---

## 7.3 Animación independiente del modelo

El motor de animación no modificará las ecuaciones.

Su responsabilidad será controlar:

$$
\boxed{p\in[0,1]}
$$

donde \(p\) representa el progreso visual.

La relación con el dominio matemático será:

$$
\boxed{
t(p)=t_{start}+p(t_{end}-t_{start})
}
$$

Por tanto:

$$
p=0\Rightarrow t=t_{start}
$$

$$
p=1\Rightarrow t=t_{end}.
$$

---

## 7.4 A y B independientes

No existirán dependencias:

$$
A\rightarrow B
$$

ni:

$$
B\rightarrow A.
$$

Ambos podrán compartir:

* tipos;
* sampler;
* viewport;
* renderer;
* animation engine.

Pero no ecuaciones ni parámetros.

---

## 7.5 Determinismo

Mismos parámetros:

$$
P
$$

deben producir las mismas trayectorias.

No utilizaremos `Math.random()` durante el render.

---

# 8. Arquitectura general

```text
┌─────────────────────────────────────────────┐
│                PRESENTATION                 │
│                                             │
│ HTML · CSS · copy · composición             │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│                 SECTIONS                    │
│                                             │
│ AsymptoteSection       HistorySection       │
└───────────────┬─────────────────┬───────────┘
                │                 │
                ▼                 ▼
┌─────────────────────────────────────────────┐
│              ANIMATION ENGINE               │
│                                             │
│ play · replay · loop · progress · timing    │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│                 GRAPH                       │
│                                             │
│ SVG · paths · viewport · coordinates        │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│                SAMPLING                     │
│                                             │
│            f(t) → Point[]                   │
└───────────────┬─────────────────┬───────────┘
                │                 │
                ▼                 ▼
        ┌──────────────┐   ┌──────────────┐
        │   MODEL A    │   │   MODEL B    │
        │   HISTORY    │   │  ASYMPTOTE   │
        └──────┬───────┘   └──────┬───────┘
               └─────────┬────────┘
                         ▼
                  ┌────────────┐
                  │ MATH COMMON│
                  └────────────┘
```

---

# 9. Estructura del proyecto

```text
static-mathematical-letter/
│
├── src/
│   │
│   ├── math/
│   │   ├── types.ts
│   │   ├── sigmoid.ts
│   │   └── utils.ts
│   │
│   ├── models/
│   │   ├── history/
│   │   │   ├── history.model.ts
│   │   │   ├── history.parameters.ts
│   │   │   ├── history.events.ts
│   │   │   └── history.types.ts
│   │   │
│   │   └── asymptote/
│   │       ├── asymptote.model.ts
│   │       ├── asymptote.parameters.ts
│   │       └── asymptote.types.ts
│   │
│   ├── graph/
│   │   ├── sampler.ts
│   │   ├── bounds.ts
│   │   ├── viewport.ts
│   │   ├── path.ts
│   │   └── svg.ts
│   │
│   ├── animation/
│   │   ├── animator.ts
│   │   ├── timeline.ts
│   │   ├── easing.ts
│   │   └── types.ts
│   │
│   ├── sections/
│   │   ├── asymptote.section.ts
│   │   └── history.section.ts
│   │
│   ├── main.ts
│   └── styles.css
│
├── tests/
│   ├── history.model.test.ts
│   ├── asymptote.model.test.ts
│   ├── sampling.test.ts
│   ├── viewport.test.ts
│   └── animation.test.ts
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# 10. Tipos matemáticos fundamentales

```ts
export interface MathematicalPoint {
  t: number;
  y: number;
}
```

Función:

```ts
export type MathematicalFunction =
  (t: number) => number;
```

Punto visual:

```ts
export interface ScreenPoint {
  x: number;
  y: number;
}
```

La transformación fundamental será:

$$
\boxed{
f(t)
\rightarrow
MathematicalPoint[]
\rightarrow
ScreenPoint[]
\rightarrow
SVGPath
}
$$

---

# 11. Modelo A — Contrato de software

La matemática permanece definida externamente.

El contrato será:

```ts
export interface HistoryModel {
  center(t: number): number;

  amplitude(t: number): number;

  drift(t: number): number;

  separation(t: number): number;

  carlos(t: number): number;

  fer(t: number): number;

  distance(t: number): number;

  coupling(t: number): number;

  memory(t: number): number;
}
```

Correspondencias:

$$
center(t)\leftrightarrow L_A(t)
$$

$$
amplitude(t)\leftrightarrow A(t)
$$

$$
drift(t)\leftrightarrow B(t)
$$

$$
separation(t)\leftrightarrow d_A(t)
$$

$$
carlos(t)\leftrightarrow C_A(t)
$$

$$
fer(t)\leftrightarrow F_A(t)
$$

$$
distance(t)\leftrightarrow D_A(t).
$$

$$
coupling(t)\leftrightarrow K(t).
$$

$$
memory(t)\leftrightarrow H(t).
$$

---

# 12. Parámetros de A

Todos estarán centralizados en:

```text
history.parameters.ts
```

Contrato aproximado:

```ts
export interface HistoryParameters {
  domain: {
    start: number;
    end: number;
  };

  milestones: {
    encounter: number;
    peak: number;
    divergence: number;
    present: number;
  };

  center: {
    slope: number;
    intercept: number;
    amplitude: number;
    frequency: number;
    phase: number;
  };

  oscillation: {
    initialAmplitude: number;
    minimumAmplitude: number;
    finalAmplitude: number;
    frequency: number;
    phase: number;
  };

  drift: {
    initial: number;
    final: number;
  };

  transitions: {
    encounterSharpness: number;
    peakSharpness: number;
    divergenceSharpness: number;
    presentSharpness: number;
  };

  memory: {
    decay: number;
    residual: number;
  };

  perturbations: {
    carlos: Array<{
      amplitude: number;
      frequency: number;
      phase: number;
    }>;

    fer: Array<{
      amplitude: number;
      frequency: number;
      phase: number;
    }>;
  };
}
```

Los nombres finales deberán corresponder exactamente con la especificación matemática.

---

# 13. Eventos de A

Los eventos serán metadata:

```ts
export interface HistoryEvent {
  id: string;
  t: number;
  significance?: number;
}
```

Conceptualmente:

```ts
[
  { id: "encounter", t: ... },
  { id: "reconnection", t: ... },
  { id: "peak", t: ... },
  { id: "divergence", t: ... },
  { id: "present", t: ... }
]
```

Los eventos **no alteran las ecuaciones**.

Podrán utilizarse posteriormente para sincronizar elementos visuales o textos con la animación.

---

# 14. Modelo B — Contrato de software

```ts
export interface AsymptoteModel {
  limit(t: number): number;

  carlos(t: number): number;

  fer(t: number): number;

  carlosDistanceToLimit(t: number): number;

  ferDistanceToLimit(t: number): number;

  interpersonalDistance(t: number): number;
}
```

Correspondencias:

$$
limit(t)\leftrightarrow L_B(t)
$$

$$
carlos(t)\leftrightarrow C_B(t)
$$

$$
fer(t)\leftrightarrow F_B(t)
$$

$$
interpersonalDistance(t)\leftrightarrow D_B(t).
$$

---

# 15. Parámetros de B

```ts
export interface AsymptoteParameters {
  domain: {
    start: number;
    end: number;
  };

  limit: {
    slope: number;
    intercept: number;
  };

  carlos: {
    amplitude: number;
    decay: number;
    frequency: number;
    phase: number;
  };

  fer: {
    amplitude: number;
    decay: number;
    frequency: number;
    phase: number;
  };
}
```

Creación:

```ts
const model = createAsymptoteModel(parameters);
```

---

# 16. Funciones puras

Los modelos se implementarán mediante funciones puras:

$$
f(t,P)\rightarrow y.
$$

No dependerán de:

* DOM;
* SVG;
* reloj;
* frame actual;
* viewport;
* CSS;
* navegador;
* almacenamiento.

La animación tampoco cambiará los resultados del modelo.

Únicamente determinará **qué porción de los resultados es visible**.

---

# 17. Sampling

Las funciones continuas se discretizarán.

Contrato:

```ts
export interface SampleOptions {
  start: number;
  end: number;
  samples: number;
}

export function sampleFunction(
  fn: MathematicalFunction,
  options: SampleOptions
): MathematicalPoint[];
```

Con:

$$
\Delta t=
\frac{t_{end}-t_{start}}{n-1}
$$

$$
t_i=t_{start}+i\Delta t.
$$

Inicialmente:

```ts
samples: 500
```

Será configurable.

---

# 18. Bounds

Contrato:

```ts
export interface Bounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}
```

Todas las curvas pertenecientes a una misma gráfica deberán compartir bounds.

Para B:

$$
Bounds(C_B,F_B,L_B)
$$

Para A:

$$
Bounds(C_A,F_A)
$$

o:

$$
Bounds(C_A,F_A,L_A)
$$

si posteriormente se muestra la trayectoria central.

---

# 19. Viewport

```ts
export interface Viewport {
  width: number;
  height: number;
  padding: number;
}
```

Transformación horizontal:

$$
x=
p+
\frac{t-x_{\min}}
{x_{\max}-x_{\min}}
(W-2p)
$$

Vertical:

$$
y=
H-p-
\frac{f(t)-y_{\min}}
{y_{\max}-y_{\min}}
(H-2p).
$$

Los modelos jamás conocerán estas coordenadas.

---

# 20. Generación de paths

Contrato:

```ts
export function pointsToPath(
  points: ScreenPoint[]
): string;
```

Inicialmente se utilizarán segmentos SVG:

```text
M x0 y0
L x1 y1
L x2 y2
...
```

Con sampling suficientemente alto no necesitamos interpolación visual que pueda deformar la matemática.

---

# 21. Renderer SVG

El renderer podrá construir:

```html
<svg>
<g>
<path>
<line>
<circle>
<text>
```

No evaluará ninguna ecuación.

La estructura conceptual será:

```text
Mathematical Model
       ↓
     Sample
       ↓
 Mathematical Points
       ↓
    Viewport
       ↓
   Screen Points
       ↓
    SVG Path
```

---

# 22. Principio de animación

Las funciones matemáticas no se recalcularán necesariamente cada frame.

Primero calculamos la trayectoria completa:

$$
P=\{p_0,p_1,\ldots,p_n\}.
$$

Después la animación controla su revelado.

Esto separa:

$$
\boxed{\text{cálculo matemático}}
$$

de:

$$
\boxed{\text{evolución visual}}.
$$

---

# 23. Estado de animación

Definiremos:

```ts
export type AnimationState =
  | "idle"
  | "playing"
  | "completed";
```

Y:

```ts
export interface AnimationController {
  play(): void;
  restart(): void;
  stop(): void;
  getProgress(): number;
}
```

No necesitamos inicialmente un sistema complejo de estados.

---

# 24. Progreso

El progreso estará normalizado:

$$
\boxed{p\in[0,1]}.
$$

Para una duración \(T\):

$$
\boxed{
p=
\min\left(
\frac{t_{elapsed}}{T},
1
\right)
}
$$

donde `t_elapsed` es tiempo real transcurrido desde el inicio de la reproducción.

La duración visual **no es equivalente al tiempo matemático**.

Ejemplo:

$$
12\text{ segundos visuales}
$$

pueden representar todo:

$$
t\in[0,1]
$$

del Modelo A.

---

# 25. `requestAnimationFrame`

El motor utilizará:

```ts
requestAnimationFrame(frame);
```

para actualizar el progreso.

Conceptualmente:

```ts
function frame(timestamp: number) {
  const elapsed = timestamp - startTime;
  const progress = elapsed / duration;

  update(progress);

  if (progress < 1) {
    requestAnimationFrame(frame);
  } else {
    complete();
  }
}
```

La matemática no se encontrará dentro de este loop.

---

# 26. Revelado del SVG

La técnica preferente para V1 será mediante:

```css
stroke-dasharray
stroke-dashoffset
```

Para un path de longitud \(L\):

Inicio:

$$
dashoffset=L
$$

Final:

$$
dashoffset=0.
$$

Entonces:

$$
\boxed{
offset(p)=L(1-p)
}
$$

Esto hace que la trayectoria parezca dibujarse progresivamente.

---

# 27. Sincronización entre curvas

No necesariamente todas las curvas deben comenzar exactamente en el mismo milisegundo.

El motor podrá soportar offsets normalizados.

Por ejemplo:

```ts
export interface CurveTiming {
  start: number;
  end: number;
}
```

con:

$$
0\le start<end\le1.
$$

El progreso local será:

$$
\boxed{
p_{local}
=
clamp\left(
\frac{p-start}{end-start},
0,
1
\right)
}
$$

Esto permitirá posteriormente decisiones como:

```text
L(t)       0.00 ───────────────── 1.00
Carlos     0.05 ───────────────── 1.00
Fer        0.05 ───────────────── 1.00
```

sin cambiar el motor.

---

# 28. Easing

El motor soportará una función:

$$
E:[0,1]\rightarrow[0,1].
$$

Por defecto podrá utilizarse una transición suave.

Sin embargo, para las curvas matemáticas deberemos evitar easings que hagan parecer que el **tiempo matemático cambia irregularmente** cuando no es esa la intención.

Por ello habrá dos conceptos separados:

* progreso matemático;
* progreso visual.

La configuración decidirá si se aplica easing al revelado o no.

---

# 29. Configuración de animación

Cada gráfica tendrá configuración propia:

```ts
export interface AnimationConfig {
  duration: number;
  autoplay: boolean;
  loop: boolean;
  loopDelay: number;
}
```

Ejemplo:

```ts
const asymptoteAnimation = {
  duration: 12000,
  autoplay: true,
  loop: true,
  loopDelay: 2000
};
```

Los valores definitivos serán de diseño, no arquitectura.

---

# 30. Autoplay

B y A podrán reproducirse automáticamente.

Sin embargo, para evitar que A se reproduzca antes de que Fer llegue a ella, el autoplay deberá poder activarse **cuando la sección entre en viewport**.

Esto puede implementarse mediante:

```text
IntersectionObserver
```

Por tanto:

```text
B entra en viewport
       ↓
play B

A entra en viewport
       ↓
play A
```

Esto sigue siendo completamente estático desde el punto de vista arquitectónico.

---

# 31. Reinicio automático

Cuando:

$$
p=1
$$

la gráfica entra en:

```text
completed
```

Si:

```ts
loop === true
```

esperará:

$$
T_{delay}
$$

y posteriormente:

$$
p\leftarrow0.
$$

Después:

$$
play().
$$

Flujo:

```text
PLAY
 ↓
0 ───────────────→ 1
                    │
                    ▼
                 COMPLETE
                    │
                    ▼
                  DELAY
                    │
                    ▼
                  RESET
                    │
                    └──────→ PLAY
```

---

# 32. Replay manual

Cada gráfica tendrá la capacidad técnica de reiniciarse:

```ts
controller.restart();
```

Visualmente podrá representarse mediante un botón discreto.

Por ejemplo:

```text
↻
```

o:

```text
volver a ver
```

La forma exacta se decidirá posteriormente.

La funcionalidad sí pertenece a V1.

---

# 33. Autoplay y replay coexistentes

La política será:

* primera visualización → autoplay;
* finalización → pausa corta;
* después → loop automático si está habilitado;
* usuario puede reiniciar manualmente en cualquier momento.

No será necesario recargar la página.

---

# 34. Modelo B — Secuencia visual

B es la pieza principal.

La animación deberá permitir representar:

$$
t_0\rightarrow t_{end}
$$

haciendo visibles progresivamente:

$$
L_B(t)
$$

$$
C_B(t)
$$

$$
F_B(t).
$$

Una configuración inicial puede hacer que \(L_B\) esté visible desde el comienzo o se revele junto con las demás.

Eso será una decisión visual posterior.

La arquitectura soportará ambas opciones.

---

# 35. Modelo A — Secuencia visual

A utilizará el mismo motor.

Sin embargo, al avanzar:

$$
t_0\rightarrow t_{end}
$$

se harán visibles naturalmente las distintas regiones del modelo:

```text
independencia
      ↓
encuentro
      ↓
aproximación
      ↓
convergencia
      ↓
pico
      ↓
divergencia
      ↓
presente
```

No necesitamos codificar estas etapas dentro del motor de animación.

Surgen de la geometría producida por:

$$
C_A(t),F_A(t).
$$

---

# 36. Eventos sincronizados en A

Los eventos definidos en:

```text
history.events.ts
```

podrán mapearse a progreso:

$$
\boxed{
p_i=
\frac{t_i-t_{start}}
{t_{end}-t_{start}}
}
$$

Cuando:

$$
p\ge p_i
$$

la capa de presentación puede activar:

* marcador;
* texto;
* etiqueta;
* cambio de opacidad.

Esto será opcional.

El modelo no cambia.

---

# 37. Intersection Observer

Cada sección podrá registrarse:

```ts
observer.observe(section);
```

Cuando alcance un threshold configurable:

```text
section visible
      ↓
animation.play()
```

Cada gráfica deberá registrar si ya tuvo su primera reproducción para evitar reinicios accidentales causados por pequeños movimientos del scroll.

---

# 38. Reduced Motion

La aplicación respetará:

```css
@media (prefers-reduced-motion: reduce)
```

Si el usuario solicita movimiento reducido:

* no se realizará loop continuo;
* las gráficas podrán mostrarse completas;
* replay animado no será necesario.

La carta seguirá siendo comprensible.

---

# 39. Sections

`asymptote.section.ts` será responsable de:

```text
crear Modelo B
      ↓
samplear funciones
      ↓
calcular bounds
      ↓
crear viewport
      ↓
generar SVG
      ↓
registrar animación
      ↓
registrar autoplay/replay
```

`history.section.ts` hará lo mismo con A.

Son adaptadores.

---

# 40. `main.ts`

Será pequeño:

```text
bootstrap
│
├── initializeAsymptoteSection()
│
└── initializeHistorySection()
```

No contendrá:

* ecuaciones;
* parámetros matemáticos;
* generación de paths;
* lógica de frames;
* CSS;
* narrativa extensa.

---

# 41. HTML

La estructura semántica:

```html
<main>
  <section id="intro">
  </section>

  <section id="asymptote">
    <div class="graph"></div>
  </section>

  <section id="history">
    <div class="graph"></div>
  </section>

  <section id="closing">
  </section>
</main>
```

Los controles de replay pertenecerán a sus respectivas secciones.

---

# 42. CSS

CSS controlará:

* composición;
* tipografía;
* colores;
* tamaños;
* responsive;
* apariencia de curvas;
* apariencia de \(L(t)\);
* opacidad;
* labels;
* controles;
* estados visuales;
* transiciones no matemáticas.

Los modelos no conocerán ningún color.

---

# 43. Responsive

Diseño:

$$
\boxed{\text{mobile-first}}
$$

Los SVG utilizarán:

```html
viewBox="0 0 1000 700"
```

o dimensiones lógicas equivalentes.

CSS:

```css
svg {
  width: 100%;
  height: auto;
}
```

El mismo modelo debe funcionar en móvil y escritorio sin recalcular sus ecuaciones.

---

# 44. Modelo matemático visible

Cada sección podrá contener opcionalmente:

```html
<details>
  <summary>ver el modelo matemático</summary>
  ...
</details>
```

Esto no forma parte del motor.

Sirve para mantener dos niveles:

```text
Carta
│
└── experiencia principal

Matemática
│
└── fundamento opcional
```

---

# 45. Testing de B

Se verificarán:

### Valores finitos

$$
C_B(t),F_B(t),L_B(t)\in\mathbb R.
$$

### Distancias

$$
D_B(t)\ge0.
$$

### Propiedad asintótica

Para \(T\) suficientemente grande:

$$
|C_B(T)-L_B(T)|<\epsilon
$$

$$
|F_B(T)-L_B(T)|<\epsilon.
$$

### Determinismo

Mismos parámetros → mismos resultados.

---

# 46. Testing de A

Se verificarán:

$$
D_A(t)\ge0
$$

$$
A(t)>0
$$

y que todas las funciones produzcan valores finitos.

Además:

* transición hacia convergencia;
* amplitud mínima alrededor del pico;
* deriva posterior;
* acoplamiento;
* memoria residual.

Las pruebas verifican el modelo matemático, no interpretaciones emocionales.

---

# 47. Testing gráfico

Se comprobará:

### Sampling

$$
|P|=n.
$$

### Extremos

$$
P_0.t=start
$$

$$
P_{n-1}.t=end.
$$

### Viewport

Las transformaciones deberán producir coordenadas válidas.

### Path

Una colección válida deberá producir un atributo `d` SVG no vacío.

---

# 48. Testing de animación

El motor deberá comprobar:

$$
0\le p\le1.
$$

También:

```text
idle → playing
playing → completed
completed → playing
```

cuando exista loop.

`restart()` deberá producir:

$$
p\leftarrow0.
$$

El progreso local de una curva deberá permanecer:

$$
0\le p_{local}\le1.
$$

---

# 49. Manejo de errores

Deberán rechazarse configuraciones como:

```text
samples < 2
start >= end
duration <= 0
width <= 0
height <= 0
NaN
Infinity
```

En desarrollo, los errores deberán ser explícitos.

No se intentará renderizar silenciosamente una función inválida.

---

# 50. Accesibilidad

Los SVG tendrán:

```html
role="img"
```

con:

```html
<title>
<desc>
```

La información esencial no dependerá únicamente de color.

Los controles de replay serán botones reales:

```html
<button>
```

y no `div` con click.

---

# 51. Privacidad

No necesitamos recopilar información.

Por tanto:

$$
\boxed{cookies=0}
$$

$$
\boxed{analytics=0}
$$

$$
\boxed{localStorage=0}
$$

$$
\boxed{tracking=0}
$$

$$
\boxed{API=0}
$$

La carta puede ejecutarse enteramente desde assets estáticos.

---

# 52. Dependencias

Dependencias base:

```text
vite
typescript
vitest
```

No se instalará una biblioteca para operaciones ya disponibles mediante:

```ts
Math.sin()
Math.exp()
Math.abs()
```

Tampoco necesitamos una biblioteca de animación para V1.

`requestAnimationFrame` es suficiente.

---

# 53. Build

Flujo:

```text
src/
 ↓
TypeScript
 ↓
Vite
 ↓
dist/
```

Comando:

```bash
npm run build
```

`dist/` contendrá la carta completa.

---

# 54. Despliegue

El proyecto podrá alojarse en cualquier plataforma de contenido estático:

```text
GitHub Pages
Vercel
Cloudflare Pages
servidor HTTP
```

No se acoplará el código a un proveedor específico.

---

# 55. Flujo completo de ejecución

```text
Browser
   │
   ▼
index.html
   │
   ├──────────────► CSS
   │
   ▼
 main.ts
   │
   ├──────────────► initialize B
   │                    │
   │                    ▼
   │                 Model B
   │                    │
   │                    ▼
   │                 Sampling
   │                    │
   │                    ▼
   │                  Bounds
   │                    │
   │                    ▼
   │                 Viewport
   │                    │
   │                    ▼
   │                    SVG
   │                    │
   │                    ▼
   │                 Animator
   │
   └──────────────► initialize A
                        │
                        ▼
                     Model A
                        │
                        ▼
                     Sampling
                        │
                        ▼
                      Bounds
                        │
                        ▼
                     Viewport
                        │
                        ▼
                        SVG
                        │
                        ▼
                     Animator
```

---

# 56. Ciclo de vida de una gráfica

Cada gráfica tendrá:

```text
INITIALIZE
    │
    ▼
GENERATE MODEL
    │
    ▼
SAMPLE
    │
    ▼
RENDER COMPLETE PATH
    │
    ▼
HIDE PATH
    │
    ▼
WAIT FOR VIEWPORT
    │
    ▼
PLAY
    │
    ▼
COMPLETE
    │
    ├──────────────► manual REPLAY
    │
    ▼
LOOP DELAY
    │
    ▼
RESET
    │
    └──────────────► PLAY
```

Éste será el ciclo estándar de B y A.

---

# 57. Separación de dominios

El proyecto queda dividido en cuatro dominios técnicos claros.

### Matemática

```text
math/
models/
```

Responde:

> ¿qué valor tiene cada función para un \(t\)?

### Geometría

```text
graph/
```

Responde:

> ¿cómo convierto funciones matemáticas en geometría SVG?

### Tiempo visual

```text
animation/
```

Responde:

> ¿qué parte de esa geometría debe estar visible en este instante?

### Composición

```text
sections/
index.html
styles.css
```

Responde:

> ¿cómo se presenta todo como carta?

Esto puede expresarse:

$$
\boxed{
\text{Matemática}
\rightarrow
\text{Geometría}
\rightarrow
\text{Tiempo visual}
\rightarrow
\text{Composición}
}
$$

---

# 58. Orden de implementación

El desarrollo debería realizarse exactamente en este orden:

**Fase 1 — Base**

1. Inicializar Vite + TypeScript + Vitest.
2. Crear estructura.
3. Crear tipos matemáticos comunes.

**Fase 2 — Modelo B**

4. Implementar parámetros B.
5. Implementar funciones B.
6. Probar propiedades matemáticas B.

**Fase 3 — Renderer**

7. Implementar sampler.
8. Implementar bounds.
9. Implementar viewport.
10. Implementar generación SVG.
11. Renderizar B completamente estático.

**Fase 4 — Animación**

12. Implementar `Animator`.
13. Implementar progreso normalizado.
14. Implementar revelado SVG.
15. Implementar autoplay.
16. Implementar replay.
17. Implementar loop/reinicio automático.
18. Implementar IntersectionObserver.

**Fase 5 — Modelo A**

19. Implementar parámetros A.
20. Implementar funciones A.
21. Implementar eventos.
22. Probar propiedades matemáticas.
23. Renderizar A con el renderer existente.
24. Conectar A al mismo Animation Engine.

**Fase 6 — Carta**

25. Crear estructura HTML definitiva.
26. Colocar B primero.
27. Colocar A después.
28. Añadir controles mínimos.
29. Añadir responsive base.
30. Añadir `prefers-reduced-motion`.

**Fase 7 — Validación**

31. Ejecutar tests.
32. Validar móvil.
33. Validar desktop.
34. Validar autoplay.
35. Validar replay.
36. Validar loop.
37. Generar build.
38. Probar `dist/` independientemente.

Después comienza el diseño artístico.

---

# 59. Definition of Done — Core V1

El núcleo estará terminado cuando:

* A esté implementado conforme al documento matemático.
* B esté implementado conforme al documento matemático.
* Sus parámetros estén separados.
* A y B no dependan entre sí.
* Las funciones matemáticas sean puras.
* No exista aleatoriedad no determinista.
* Sampling funcione.
* Bounds funcione.
* Viewport funcione.
* SVG funcione.
* B represente \(C_B,F_B,L_B\).
* A represente \(C_A,F_A\).
* Ambas gráficas estén animadas.
* La evolución visual corresponda al avance del dominio matemático.
* Cada gráfica pueda reproducirse automáticamente.
* Cada gráfica pueda reiniciarse manualmente.
* El motor soporte reinicio automático al terminar.
* El loop tenga pausa configurable.
* Las gráficas comiencen al entrar en viewport.
* `prefers-reduced-motion` sea respetado.
* Los modelos no dependan del sistema de animación.
* Los modelos no dependan del DOM.
* No existan `NaN` ni infinitos.
* Los tests principales pasen.
* La página sea mobile-first.
* B aparezca antes que A.
* No exista backend.
* No exista persistencia.
* No existan llamadas de red necesarias.
* El build sea completamente estático.
* `dist/` pueda desplegarse directamente.

Entonces tendremos:

$$
\boxed{
\text{Static Mathematical Letter Core v1.0}
}
$$

---

# 60. Estado arquitectónico final

Con este documento y el **Documento de Modelos Matemáticos**, ya quedan congeladas las dos especificaciones necesarias para comenzar a programar:

$$
\boxed{
\text{Documento 1}
=
\text{qué comportamiento matemático existe}
}
$$

$$
\boxed{
\text{Documento 2}
=
\text{cómo ese comportamiento se convierte en software}
}
$$

La composición artística queda deliberadamente desacoplada:

$$
\boxed{
\text{Modelos}
\rightarrow
\text{Renderer}
\rightarrow
\text{Animación}
\rightarrow
\underbrace{\text{Diseño visual}}_{\text{ajustable después}}
}
$$


---
