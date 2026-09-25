# Static Mathematical Letter

## Baseline Parameter Set

### Version 1.1 — Calibration Working Baseline

## 1. Propósito

Este documento define el **Baseline Parameter Set v1.1** para la fase de calibración de **Modelos Asíntotas / Static Mathematical Letter Core v1.0**.

La versión 1.1 no redefine los modelos matemáticos. Su función es servir como documento vivo de calibración sobre el Core v1.0 ya congelado y validado.

El flujo de trabajo de esta versión es:

\[
\boxed{
\text{Baseline v1.0}
\rightarrow
\text{visual feedback}
\rightarrow
\text{calibración por passes}
\rightarrow
\text{Baseline v1.1}
}
\]

El Baseline v1.0 permanece como referencia histórica e inmutable del primer conjunto funcional de parámetros.

El Baseline v1.1 podrá modificarse durante la calibración hasta encontrar una configuración que produzca de forma suficientemente clara el comportamiento artístico y matemático buscado.

La versión 1.1 no se considerará cerrada hasta que:

- la geometría de ambos modelos sea aceptada;
- la lectura temporal del Modelo A sea adecuada;
- la convergencia del Modelo B sea visualmente clara;
- la divergencia presente del Modelo A sea progresiva y no excesiva;
- las aproximaciones, cruces y separaciones se distribuyan de forma coherente con la intención narrativa;
- los parámetros finales hayan sido aprobados mediante observación local;
- tests, typecheck y build continúen pasando.

---

# 2. Autoridad y congelamiento del Core

Jerarquía aplicable:

1. `01-Mathematical-Models-Specification(1).md`
2. `02-Software-Implementation-Specification(1).md`
3. `03-Development-Execution-Plan(1).md`
4. `04-Baseline-Parameter-Set(1).md`
5. Este documento de calibración v1.1
6. Implementación
7. Tests

El Core v1.0 fue congelado después del gate de conformidad.

Por tanto, durante esta fase:

- no se modifican ecuaciones;
- no se crean variables matemáticas nuevas;
- no se modifican invariantes;
- no se alteran contratos de memoria;
- no se redefine coupling;
- no se introduce frecuencia temporal variable;
- no se convierten eventos en causas;
- no se introduce aleatoriedad;
- no se modifica Doc01 para acomodar una preferencia visual.

Si una curva no representa correctamente el comportamiento buscado, primero deberán utilizarse los parámetros ya permitidos por el modelo.

Un cambio de ecuaciones requeriría reabrir formalmente el contrato matemático y queda fuera de esta calibración.

---

# 3. Estado de referencia

El punto cero de calibración corresponde al Baseline Parameter Set v1.0.

## Modelo B

```ts
export const asymptoteParameters = {
  domain: { start: 0, end: 10 },
  limit: { slope: 0.12, intercept: 0 },
  carlos: { amplitude: 2.6, decay: 0.24, frequency: 2.65, phase: 0.35 },
  fer: { amplitude: 2.4, decay: 0.255, frequency: 2.90, phase: 2.45 }
};
```

## Modelo A

```ts
export const historyParameters = {
  domain: { start: 0, end: 1 },
  milestones: { encounter: 0.12, peak: 0.40, divergence: 0.70, present: 0.90 },
  center: { slope: 0.35, intercept: 0, amplitude: 0.12, frequency: 6.28318530718, phase: 0.20 },
  oscillation: { initialAmplitude: 1.60, minimumAmplitude: 0.28, finalAmplitude: 0.95, frequency: 37.6991118431, phase: 0.45 },
  drift: { initial: 0.75, final: 1.10 },
  transitions: { encounterSharpness: 35, peakSharpness: 28, divergenceSharpness: 30, presentSharpness: 35 },
  memory: { decay: 1.4, residual: 0.20 },
  perturbations: {
    carlos: [
      { amplitude: 0.10, frequency: 21.9911, phase: 0.20 },
      { amplitude: 0.06, frequency: 53.4071, phase: 1.10 },
      { amplitude: 0.035, frequency: 91.1062, phase: 2.00 }
    ],
    fer: [
      { amplitude: 0.09, frequency: 28.2743, phase: 1.40 },
      { amplitude: 0.055, frequency: 59.6903, phase: 0.60 },
      { amplitude: 0.04, frequency: 84.8230, phase: 2.50 }
    ]
  }
};
```

---

# 4. Intención de calibración del Modelo B

El Modelo B debe sostener visual y matemáticamente la metáfora:

\[
\boxed{
\text{dos trayectorias distintas}
\rightarrow
\text{oscilaciones y cruces}
\rightarrow
\text{aproximación asintótica a una trayectoria compartida}
}
\]

El Modelo B no reconstruye una cronología real.

Su función es representar de forma limpia dos trayectorias que:

- parten diferenciadas;
- oscilan alrededor de una trayectoria compartida;
- pueden cruzarla;
- pueden cruzarse entre sí;
- disminuyen progresivamente su distancia respecto de la trayectoria límite;
- permanecen visualmente diferenciables dentro de la ventana finita;
- tienden matemáticamente a la misma trayectoria cuando \(t\to\infty\).

El Baseline v1.0 ya cumple esta estructura de forma satisfactoria.

Por tanto, la calibración de B será de **fine tuning**, no de reconstrucción.

---

# 5. Intención de calibración del Modelo A

El Modelo A representa una historia abstracta de compatibilidad interpersonal mediante:

\[
\boxed{
\text{independencia}
\rightarrow
\text{aproximación}
\rightarrow
\text{máxima compatibilidad}
\rightarrow
\text{divergencia}
\rightarrow
\text{independencia condicionada}
}
\]

No representa sentimientos ni causalidad de eventos.

La calibración deberá producir visualmente una lectura aproximadamente equivalente a:

```text
PREHISTORIA / INDEPENDENCIA
        ↓
PRIMER ENCUENTRO
        ↓
APROXIMACIONES INICIALES
        ↓
PRIMER DISTANCIAMIENTO
        ↓
RECONEXIÓN
        ↓
PERIODO PROLONGADO DE MÁXIMA COMPATIBILIDAD
        ↓
SEGUNDA DIVERGENCIA
        ↓
RECONVERGENCIAS RESIDUALES
        ↓
PRESENTE
        ↓
DIVERGENCIA PROGRESIVA
        ↓
CONTINUACIÓN SIMBÓLICA
```

Los eventos reales continúan siendo metadata.

No se exigirá que:

\[
1\text{ cruce matemático}=1\text{ encuentro real}.
\]

Un cruce:

\[
D_A(t)=0
\]

representa sincronización máxima instantánea.

Un encuentro o periodo compatible puede corresponder simplemente a una región donde \(D_A(t)\) sea pequeña.

---

# 6. Problemas observados en el Baseline v1.0

La primera ejecución local mostró que el Modelo A es matemáticamente correcto pero todavía está visualmente desequilibrado.

La lectura actual se aproxima a:

```text
oscilación inicial intensa
        ↓
estrechamiento central relativamente corto
        ↓
divergencia final intensa
```

Los principales problemas de calibración observados son:

1. la fase inicial consume demasiado protagonismo visual;
2. la reducción de amplitud hacia máxima compatibilidad llega relativamente tarde;
3. la región de máxima compatibilidad existe, pero se percibe comprimida;
4. la divergencia posterior crece demasiado rápido;
5. el estado cercano al presente puede percibirse como una separación demasiado fuerte;
6. las reconvergencias residuales existen, pero la transición hacia divergencia necesita mayor progresividad.

No se consideran problemas de ecuación.

Se consideran problemas de calibración.

---

# 7. Objetivo visual del Modelo A por regiones

## Región I — independencia inicial

Las trayectorias deben ser claramente independientes.

Pueden existir aproximaciones y cruces, pero deben conservar una distancia perceptible y no dominar toda la composición.

## Región II — primer encuentro y evolución inicial

Debe percibirse una reducción gradual de la separación estructural.

La dinámica todavía puede ser inestable.

No debe confundirse con el periodo principal de máxima compatibilidad.

## Región III — máxima compatibilidad

Debe ser la región visualmente dominante de proximidad.

Las dos trayectorias no necesitan colapsar en una sola curva.

Se busca:

- distancia habitualmente pequeña;
- persistencia de proximidad;
- coupling alto;
- drift bajo;
- amplitud reducida;
- individualidad aún visible.

## Región IV — segunda divergencia

Debe existir una separación real respecto del periodo anterior.

No debe producirse una explosión inmediata.

La salida de máxima compatibilidad y una separación extrema no son equivalentes.

## Región V — reconvergencias recientes

Después de la divergencia deben seguir existiendo acercamientos visibles.

No necesitan ser cruces exactos.

## Región VI — presente

La divergencia debe ser reconocible y progresiva.

La intención no es representar una separación máxima.

Se busca una distancia media o moderada que esté creciendo.

## Región VII — continuación simbólica

\[
t\in(0.90,1]
\]

No representa predicción.

Puede mostrar nuevas aproximaciones o mayor separación dentro de lo permitido por el modelo.

---

# 8. Regla principal de calibración

Se modificará **una familia de parámetros por pass**.

Cada cambio deberá seguir:

```text
HIPÓTESIS
↓
PROPIEDAD MATEMÁTICA RESPONSABLE
↓
PARÁMETROS AUTORIZADOS
↓
VALORES CANDIDATOS
↓
EJECUCIÓN
↓
OBSERVACIÓN
↓
ACEPTAR / REVERTIR / ITERAR
↓
DOCUMENTAR
```

No se modificarán simultáneamente familias distintas salvo que una iteración completa se descarte.

---

# 9. Pass 0 — preparación

Objetivo: crear una referencia limpia antes del tuning.

Acciones:

- conservar screenshots del Baseline v1.0;
- conservar todos los valores iniciales;
- mantener Core v1.0 congelado;
- registrar cada experimento;
- opcionalmente utilizar instrumentación de desarrollo.

Instrumentación permitida:

```text
t
D_A(t)
A(t)
B(t)
K(t)
H(t)
```

También pueden mostrarse temporalmente milestones, eventos, bounds, trayectoria central, puntos de sampling y envolventes.

La instrumentación no forma parte de la experiencia final.

---

# 10. Pass 1 — estructura temporal de A

Pregunta:

> ¿Las distintas etapas ocupan una proporción temporal y visual adecuada?

Parámetros autorizados:

```ts
milestones.peak
milestones.divergence
transitions.peakSharpness
transitions.divergenceSharpness
```

Parámetros congelados durante este pass:

```ts
milestones.encounter
milestones.present
oscillation.initialAmplitude
oscillation.minimumAmplitude
oscillation.finalAmplitude
oscillation.frequency
oscillation.phase
drift.initial
drift.final
center
memory
perturbations
```

Anclas iniciales:

```ts
encounter: 0.12
present: 0.90
```

Objetivo: dar mayor territorio perceptual al periodo de compatibilidad y hacer más gradual su salida.

## Registro Pass 1

| Campo | Baseline v1.0 | Candidato | Final aprobado |
|---|---:|---:|---:|
| `milestones.peak` | 0.40 | TBD | TBD |
| `milestones.divergence` | 0.70 | TBD | TBD |
| `peakSharpness` | 28 | TBD | TBD |
| `divergenceSharpness` | 30 | TBD | TBD |

Estado: `PENDIENTE`

---

# 11. Pass 2 — magnitud de compatibilidad

Pregunta:

> ¿La diferencia entre independencia inicial y máxima compatibilidad es suficientemente clara?

Parámetros autorizados:

```ts
oscillation.initialAmplitude
oscillation.minimumAmplitude
```

Parámetro opcional sólo si se demuestra necesario:

```ts
drift.initial
```

Objetivo:

- reducir protagonismo excesivo de la región inicial si es necesario;
- conservar independencia perceptible;
- producir una región central claramente próxima;
- evitar que Carlos y Fer se perciban permanentemente como una sola curva.

## Registro Pass 2

| Campo | Baseline v1.0 | Candidato | Final aprobado |
|---|---:|---:|---:|
| `initialAmplitude` | 1.60 | TBD | TBD |
| `minimumAmplitude` | 0.28 | TBD | TBD |
| `drift.initial` | 0.75 | TBD / sin cambio | TBD |

Estado: `PENDIENTE`

---

# 12. Pass 3 — divergencia y reconvergencias recientes

Pregunta:

> ¿La salida del periodo compatible produce una separación real pero todavía permite aproximaciones significativas?

Parámetros autorizados:

```ts
drift.final
oscillation.finalAmplitude
```

Interpretación:

- `drift.final` controla la separación estructural posterior;
- `finalAmplitude` controla cuánto puede continuar oscilando la separación alrededor de esa tendencia.

Objetivo:

```text
máxima compatibilidad
→ separación real
→ reconvergencias residuales
→ divergencia presente progresiva
```

Evitar:

```text
máxima compatibilidad
→ explosión inmediata
```

## Registro Pass 3

| Campo | Baseline v1.0 | Candidato | Final aprobado |
|---|---:|---:|---:|
| `drift.final` | 1.10 | TBD | TBD |
| `finalAmplitude` | 0.95 | TBD | TBD |

Estado: `PENDIENTE`

---

# 13. Pass 4 — densidad de aproximaciones

Pregunta:

> ¿La densidad de cruces y acercamientos produce un ritmo temporal adecuado?

Parámetros autorizados:

```ts
oscillation.frequency
oscillation.phase
```

Baseline:

```ts
frequency: 37.6991118431
phase: 0.45
```

No se intentará representar literalmente una frecuencia cronológica real.

La frecuencia matemática controla la densidad de oscilaciones dentro del dominio normalizado.

El criterio será perceptual y estructural.

## Registro Pass 4

| Campo | Baseline v1.0 | Candidato | Final aprobado |
|---|---:|---:|---:|
| `oscillation.frequency` | 37.6991118431 | TBD | TBD |
| `oscillation.phase` | 0.45 | TBD | TBD |

Estado: `PENDIENTE`

---

# 14. Pass 5 — organicidad

Pregunta:

> ¿Las trayectorias se perciben demasiado periódicas o artificialmente simétricas?

Parámetros autorizados:

```ts
perturbations.carlos
perturbations.fer
```

Las perturbaciones continúan siendo deterministas.

No se utilizará `Math.random()`.

Este pass no debe arreglar estructura temporal, amplitud macro, divergencia estructural ni milestones.

## Registro Pass 5

### Carlos

| Término | Baseline | Candidato | Final aprobado |
|---|---|---|---|
| 1 | `(0.10, 21.9911, 0.20)` | TBD | TBD |
| 2 | `(0.06, 53.4071, 1.10)` | TBD | TBD |
| 3 | `(0.035, 91.1062, 2.00)` | TBD | TBD |

### Fer

| Término | Baseline | Candidato | Final aprobado |
|---|---|---|---|
| 1 | `(0.09, 28.2743, 1.40)` | TBD | TBD |
| 2 | `(0.055, 59.6903, 0.60)` | TBD | TBD |
| 3 | `(0.04, 84.8230, 2.50)` | TBD | TBD |

Estado: `PENDIENTE`

---

# 15. Pass 6 — fine tuning de B

El Modelo B ya produce correctamente la estructura buscada.

Por tanto, este pass sólo se realizará después de aprobar la geometría de A.

Orden recomendado:

```text
decay
↓
amplitude
↓
frequency
↓
phase
```

Preguntas:

- ¿la convergencia visible ocurre demasiado rápido?
- ¿termina demasiado lejos de la trayectoria compartida?
- ¿hay demasiadas o muy pocas oscilaciones?
- ¿las fases producen una composición artificial?
- ¿la separación inicial es excesiva?

## Registro Pass 6 — Carlos

| Campo | Baseline v1.0 | Candidato | Final aprobado |
|---|---:|---:|---:|
| `amplitude` | 2.6 | TBD | TBD |
| `decay` | 0.24 | TBD | TBD |
| `frequency` | 2.65 | TBD | TBD |
| `phase` | 0.35 | TBD | TBD |

## Registro Pass 6 — Fer

| Campo | Baseline v1.0 | Candidato | Final aprobado |
|---|---:|---:|---:|
| `amplitude` | 2.4 | TBD | TBD |
| `decay` | 0.255 | TBD | TBD |
| `frequency` | 2.90 | TBD | TBD |
| `phase` | 2.45 | TBD | TBD |

Estado: `PENDIENTE`

---

# 16. Pass 7 — duración y ritmo de animación

Este pass se realizará después de aprobar la geometría matemática.

La duración no modifica las ecuaciones.

## Estado v1.0

### B

```ts
duration: 12000
loopDelay: 2800
```

### A

```ts
duration: 24000
loopDelay: 4000
```

## Candidato inicial v1.1

Se propone evaluar:

```ts
asymptoteAnimation.duration = 30000
historyAnimation.duration = 30000
```

Es decir:

\[
T_B=30s
\]

\[
T_A=30s.
\]

Esto produciría aproximadamente 60 segundos de observación efectiva de las dos animaciones, sin contar pausas.

Este valor es **candidato**, no final.

También podrán evaluarse 30 s, 36 s, 45 s, 50 s o 60 s por gráfica si la composición lo requiere.

No se modificará la geometría matemática para acomodar una duración visual.

## Registro Pass 7

| Configuración | Baseline v1.0 | Candidato | Final aprobado |
|---|---:|---:|---:|
| B duration | 12 s | 30 s | TBD |
| B loopDelay | 2.8 s | TBD | TBD |
| A duration | 24 s | 30 s | TBD |
| A loopDelay | 4 s | TBD | TBD |

Estado: `PENDIENTE`

---

# 17. Música y timeline audiovisual

La sincronización musical queda fuera de esta calibración base.

No se modificarán parámetros matemáticos para acomodar una canción.

Orden obligatorio:

```text
geometría matemática
↓
calibración
↓
ritmo visual
↓
composición
↓
timeline audiovisual
```

Como referencia preliminar, una experiencia completa podría terminar utilizando aproximadamente:

\[
80\text{ s}-120\text{ s}
\]

Esta estimación no forma parte del baseline matemático y podrá cambiar durante la futura fase audiovisual.

---

# 18. Parámetros congelados inicialmente

Mientras no exista una razón observacional concreta, los siguientes parámetros permanecerán congelados.

## Modelo A

```ts
domain
center
memory
encounter
present
```

## Modelo B

```ts
domain
limit
```

El congelamiento es operativo para calibración, no una nueva regla matemática.

Puede levantarse únicamente si un pass demuestra que uno de estos valores impide alcanzar el comportamiento deseado dentro de Doc01.

---

# 19. Memoria durante calibración

Los parámetros:

```ts
memory.decay
memory.residual
```

no afectan actualmente las trayectorias visualizadas.

Por tanto, no se utilizarán para corregir geometría.

Se mantienen inicialmente:

```ts
memory: {
  decay: 1.4,
  residual: 0.20
}
```

Cualquier calibración futura de memoria deberá responder a una pregunta conceptual propia de \(H(t)\), no a la forma de las curvas.

---

# 20. Eventos durante calibración

Los eventos permanecen metadata.

No se utilizarán para forzar:

- cruces;
- picos;
- reconexiones;
- divergencias;
- amplitudes;
- cambios de coupling.

Su función es permitir interpretar la trayectoria en instantes relevantes.

El modelo deberá sostener el comportamiento mediante sus propios parámetros matemáticos.

---

# 21. Plantilla de registro por iteración

Cada experimento debe documentarse con esta estructura:

## Iteración X

### Hipótesis

```text
TBD
```

### Propiedad responsable

```text
TBD
```

### Parámetros autorizados

```text
TBD
```

### Valores anteriores

```text
TBD
```

### Valores candidatos

```text
TBD
```

### Comportamiento esperado

```text
TBD
```

### Resultado observado

```text
TBD
```

### Decisión

```text
ACEPTAR / REVERTIR / ITERAR
```

### Notas

```text
TBD
```

---

# 22. Regla de aceptación

Un cambio se incorpora al Baseline v1.1 únicamente cuando:

1. corresponde a la familia autorizada del pass;
2. no modifica ecuaciones;
3. respeta Doc01;
4. tests continúan pasando;
5. typecheck continúa pasando;
6. build continúa pasando;
7. el comportamiento observado mejora respecto del objetivo explícito del pass;
8. no degrada una propiedad previamente aprobada sin justificación.

---

# 23. Gate de cada pass

Después de aceptar una iteración:

```text
npm test
npm run typecheck
npm run build
```

deben continuar pasando.

Si el entorno requiere Windows CMD:

```text
npm.cmd test
npm.cmd run typecheck
npm.cmd run build
```

No se considerará aprobado un pass con regresiones estructurales.

---

# 24. Configuración candidata consolidada

Esta sección representa el estado acumulado actual de calibración.

Inicialmente es idéntica a v1.0.

Se actualizará después de cada pass aprobado.

## Modelo B — candidato v1.1

```ts
export const asymptoteParametersV11 = {
  domain: { start: 0, end: 10 },
  limit: { slope: 0.12, intercept: 0 },
  carlos: { amplitude: 2.6, decay: 0.24, frequency: 2.65, phase: 0.35 },
  fer: { amplitude: 2.4, decay: 0.255, frequency: 2.90, phase: 2.45 }
};
```

## Modelo A — candidato v1.1

```ts
export const historyParametersV11 = {
  domain: { start: 0, end: 1 },
  milestones: { encounter: 0.12, peak: 0.40, divergence: 0.70, present: 0.90 },
  center: { slope: 0.35, intercept: 0, amplitude: 0.12, frequency: 6.28318530718, phase: 0.20 },
  oscillation: { initialAmplitude: 1.60, minimumAmplitude: 0.28, finalAmplitude: 0.95, frequency: 37.6991118431, phase: 0.45 },
  drift: { initial: 0.75, final: 1.10 },
  transitions: { encounterSharpness: 35, peakSharpness: 28, divergenceSharpness: 30, presentSharpness: 35 },
  memory: { decay: 1.4, residual: 0.20 },
  perturbations: {
    carlos: [
      { amplitude: 0.10, frequency: 21.9911, phase: 0.20 },
      { amplitude: 0.06, frequency: 53.4071, phase: 1.10 },
      { amplitude: 0.035, frequency: 91.1062, phase: 2.00 }
    ],
    fer: [
      { amplitude: 0.09, frequency: 28.2743, phase: 1.40 },
      { amplitude: 0.055, frequency: 59.6903, phase: 0.60 },
      { amplitude: 0.04, frequency: 84.8230, phase: 2.50 }
    ]
  }
};
```

---

# 25. Configuración de animación candidata

Mientras la geometría no esté aprobada, la configuración de producción puede continuar utilizando v1.0.

Candidato de evaluación:

```ts
export const animationCandidateV11 = {
  asymptote: {
    duration: 30000,
    autoplay: true,
    loop: true,
    loopDelay: 2800
  },

  history: {
    duration: 30000,
    autoplay: true,
    loop: true,
    loopDelay: 4000
  },

  viewportActivation: {
    threshold: 0.35
  }
};
```

Los valores definitivos se establecerán después del Pass 7.

---

# 26. Criterio de aceptación final del Modelo B

B estará calibrado cuando la visualización permita reconocer sin explicación adicional:

\[
\boxed{
\text{trayectorias distintas}
\rightarrow
\text{oscilaciones/cruces}
\rightarrow
\text{aproximación asintótica compartida}
}
\]

Debe conservarse:

- diferenciación inicial;
- convergencia visible;
- aproximación no monótona;
- posibilidad de cruces;
- distancia final pequeña dentro de la ventana;
- no colapso artificial en \(t=10\).

---

# 27. Criterio de aceptación final del Modelo A

A estará calibrado cuando sea posible reconocer:

\[
\boxed{
\text{independencia}
\rightarrow
\text{aproximación}
\rightarrow
\text{máxima compatibilidad prolongada}
\rightarrow
\text{divergencia moderada}
\rightarrow
\text{reconvergencias residuales}
\rightarrow
\text{divergencia presente progresiva}
}
\]

En particular:

- la región inicial no debe dominar toda la gráfica;
- la compatibilidad debe disponer de suficiente territorio visual;
- la salida del pico debe ser gradual;
- la divergencia posterior debe existir sin ser inmediatamente extrema;
- deben permanecer aproximaciones posteriores;
- el presente debe mostrar una separación creciente, no una conclusión definitiva;
- la continuación simbólica no debe interpretarse como predicción.

---

# 28. Estado del documento

Estado inicial:

```text
BASELINE PARAMETER SET v1.1
STATUS: CALIBRATION IN PROGRESS
SOURCE: BASELINE v1.0
CORE CONTRACT: FROZEN
```

Este documento podrá modificarse después de cada pass aprobado.

Cuando todos los passes concluyan, esta sección deberá cambiar a:

```text
BASELINE PARAMETER SET v1.1
STATUS: CALIBRATED / APPROVED
```

y la sección **Configuración candidata consolidada** pasará a representar los valores finales de calibración.

---

# 29. Resultado esperado

La calibración v1.1 debe modificar únicamente valores numéricos y parámetros visuales permitidos.

El resultado final será:

\[
\boxed{
\text{Core v1.0 congelado}
+
\text{Parameter Set v1.1 calibrado}
}
\]

sin modificar la arquitectura ni el contrato matemático.

El Baseline v1.0 continuará existiendo como referencia reproducible del estado inicial.

El Baseline v1.1 representará la primera configuración calibrada específicamente para la pieza final.
