# Static Mathematical Letter

## Baseline Parameter Set

### Version 1.0

## 1. Propósito

Este documento define el conjunto inicial de parámetros numéricos para ejecutar los modelos matemáticos de **Static Mathematical Letter Core v1.0**.

Su objetivo no es declarar estos valores como definitivos.

El propósito del baseline es proporcionar una primera configuración:

* matemáticamente válida;
* coherente con la intención de los modelos;
* determinista;
* reproducible;
* visualmente interpretable;
* fácilmente ajustable después de observar la ejecución local.

El flujo esperado será:

$$
\text{Baseline v1.0}
\rightarrow
\text{implementación}
\rightarrow
\text{observación local}
\rightarrow
\text{calibración}
\rightarrow
\text{baseline revisado}
$$

Por tanto, los valores definidos aquí deben considerarse:

$$
\boxed{\text{initial calibration}}
$$

y no:

$$
\boxed{\text{final interpretation}}
$$

---

# 2. Autoridad del documento

Este documento es **100 % subordinado** a las especificaciones cerradas del proyecto.

Jerarquía aplicable:

1. `01-Mathematical-Models-Specification.md` — máxima autoridad sobre significado matemático, ecuaciones, parámetros conceptuales, restricciones e invariantes.
2. `02-Software-Implementation-Specification.md` — autoridad sobre arquitectura, contratos de software, rendering, animación y testing, siempre subordinada al Documento 01 en materia matemática.
3. `03-Development-Execution-Plan.md` — plan de ejecución subordinado a 01 y 02.
4. Este documento — baseline numérico inicial subordinado a 01 y 02.

Este documento **no puede introducir nuevas ecuaciones, variables matemáticas, reglas de negocio matemáticas ni capacidades de software**. Únicamente asigna valores iniciales a parámetros ya definidos por el Documento 01 o a configuraciones permitidas por el Documento 02.

Si algún valor o bloque de este documento entra en conflicto con 01 o 02, dicho valor o bloque es inválido y debe corregirse aquí; no se modifica la especificación superior para acomodar el baseline.

---

# 3. Principio de calibración

Los parámetros se dividen en tres categorías.

### Semánticos

Derivados directamente del significado definido para los modelos.

Ejemplos:

* encuentro;
* pico;
* divergencia;
* presente;
* existencia de memoria;
* tendencia asintótica.

### Matemáticos

Valores numéricos escogidos para producir inicialmente el comportamiento semántico requerido.

Ejemplos:

* amplitudes;
* frecuencias;
* fases;
* tasas de decaimiento;
* pendientes.

Estos valores son calibrables.

### Visuales

No modifican el significado matemático.

Ejemplos:

* duración de animación;
* pausa antes del loop;
* número de muestras.

Pueden modificarse libremente durante diseño.

---

# 4. Modelo B — dominio

Para la representación visible se utilizará:

$$
t\in[0,10].
$$

Por tanto:

```ts
domain: {
  start: 0,
  end: 10
}
```

El dominio matemático conceptual continúa siendo:

$$
t\in[0,\infty).
$$

El valor \(10\) únicamente representa el límite de la ventana visible.

---

# 5. Modelo B — trayectoria compartida

Se utilizará:

$$
L_B(t)=mt+b
$$

con:

$$
m=0.12
$$

$$
b=0.
$$

Por tanto:

$$
\boxed{L_B(t)=0.12t}
$$

La pendiente positiva es deliberadamente pequeña.

Su propósito es evitar que la composición se perciba completamente horizontal sin convertir \(L_B(t)\) en una representación de “progreso de la relación”.

Configuración:

```ts
limit: {
  slope: 0.12,
  intercept: 0
}
```

---

# 6. Modelo B — Carlos

Se utilizará inicialmente:

$$
C_B(t)
=
L_B(t)
+
A_Ce^{-\alpha_Ct}
\sin(\omega_Ct+\phi_C)
$$

con:

$$
A_C=2.6
$$

$$
\alpha_C=0.24
$$

$$
\omega_C=2.65
$$

$$
\phi_C=0.35.
$$

Configuración:

```ts
carlos: {
  amplitude: 2.6,
  decay: 0.24,
  frequency: 2.65,
  phase: 0.35
}
```

---

# 7. Modelo B — Fer

Se utilizará:

$$
F_B(t)
=
L_B(t)
+
A_Fe^{-\alpha_Ft}
\sin(\omega_Ft+\phi_F)
$$

con:

$$
A_F=2.4
$$

$$
\alpha_F=0.255
$$

$$
\omega_F=2.90
$$

$$
\phi_F=2.45.
$$

Configuración:

```ts
fer: {
  amplitude: 2.4,
  decay: 0.255,
  frequency: 2.90,
  phase: 2.45
}
```

---

# 8. Intención geométrica de B

Los parámetros anteriores buscan producir:

* dos trayectorias claramente distintas;
* amplitudes iniciales comparables;
* fases diferentes;
* frecuencias ligeramente diferentes;
* varios cruces con \(L_B(t)\);
* encuentros entre Carlos y Fer;
* reducción exponencial gradual;
* aproximación visual evidente hacia la trayectoria compartida.

No se pretende caracterizar psicológicamente a ninguna persona mediante frecuencia o amplitud.

Las diferencias son geométricas.

---

# 9. Decaimiento visible de B

Para Carlos:

$$
e^{-0.24(10)}
\approx0.0907.
$$

Su envolvente final será aproximadamente:

$$
2.6(0.0907)\approx0.236.
$$

Para Fer:

$$
e^{-0.255(10)}
\approx0.0781
$$

y:

$$
2.4(0.0781)\approx0.187.
$$

Por tanto, al final de la ventana las dos curvas estarán muy próximas a \(L_B(t)\), pero no matemáticamente colapsadas sobre ella.

Esto permitirá visualizar que:

$$
t=10\neq\infty.
$$

---

# 10. Oscilaciones de B

Carlos tendrá aproximadamente:

$$
\frac{\omega_C(10)}{2\pi}
\approx4.22
$$

ciclos visibles.

Fer:

$$
\frac{\omega_F(10)}{2\pi}
\approx4.62.
$$

Esto proporciona aproximadamente cuatro a cinco oscilaciones completas.

El resultado esperado es suficientemente complejo para producir cruces sin convertir la gráfica en ruido visual.

---

# 11. Triple intersección

No se parametrizará deliberadamente ningún punto:

$$
C_B(t)=F_B(t)=L_B(t).
$$

Si aparece accidentalmente debido a la configuración, podrá conservarse o eliminarse durante calibración.

No constituye un requisito del modelo.

---

# 12. Baseline completo de B

```ts
export const asymptoteParameters = {
  domain: {
    start: 0,
    end: 10
  },

  limit: {
    slope: 0.12,
    intercept: 0
  },

  carlos: {
    amplitude: 2.6,
    decay: 0.24,
    frequency: 2.65,
    phase: 0.35
  },

  fer: {
    amplitude: 2.4,
    decay: 0.255,
    frequency: 2.90,
    phase: 2.45
  }
};
```

---

# 13. Modelo A — dominio

Para A se utilizará un dominio normalizado:

$$
t\in[0,1].
$$

Configuración:

```ts
domain: {
  start: 0,
  end: 1
}
```

Este dominio no representa fechas directamente.

Representa:

$$
0=\text{prehistoria visible}
$$

y:

$$
1=\text{fin de la continuación simbólica}.
$$

---

# 14. Distribución temporal inicial de A

Se propone:

$$
t_e=0.12
$$

para el encuentro.

$$
t_p=0.40
$$

para la entrada en la región principal de máxima compatibilidad.

$$
t_d=0.70
$$

para el comienzo de la divergencia sostenida.

$$
t_n=0.90
$$

para el presente.

Por tanto:

```ts
milestones: {
  encounter: 0.12,
  peak: 0.40,
  divergence: 0.70,
  present: 0.90
}
```

La distribución aproximada es:

```text
0.00 ─ 0.12   prehistoria
0.12 ─ 0.40   encuentro / evolución inicial / reconexión
0.40 ─ 0.70   compatibilidad máxima sostenida
0.70 ─ 0.90   divergencia irregular
0.90 ─ 1.00   continuación simbólica
```

El pico ocupa:

$$
30\%
$$

del dominio completo.

---

# 15. Evento intermedio — primera separación

La primera interrupción no debe desaparecer dentro del ruido.

Se establecerá metadata aproximadamente en:

$$
t_s=0.24.
$$

La reconexión:

$$
t_r=0.31.
$$

Configuración de eventos inicial:

```ts
export const historyEvents = [
  {
    id: "encounter",
    t: 0.12,
    significance: 1.0
  },
  {
    id: "first-separation",
    t: 0.24,
    significance: 0.8
  },
  {
    id: "reconnection",
    t: 0.31,
    significance: 0.9
  },
  {
    id: "peak-entry",
    t: 0.40,
    significance: 1.0
  },
  {
    id: "divergence",
    t: 0.70,
    significance: 1.0
  },
  {
    id: "present",
    t: 0.90,
    significance: 1.0
  }
];
```

Estos eventos siguen siendo metadata.

No causan directamente el comportamiento matemático.

---

# 16. Trayectoria central de A

Se utilizará:

$$
L_A(t)=mt+b+\beta\sin(\nu t+\psi).
$$

Baseline:

$$
m=0.35
$$

$$
b=0
$$

$$
\beta=0.12
$$

$$
\nu=2\pi
$$

$$
\psi=0.20.
$$

Configuración:

```ts
center: {
  slope: 0.35,
  intercept: 0,
  amplitude: 0.12,
  frequency: 6.28318530718,
  phase: 0.20
}
```

La variación central será deliberadamente pequeña.

\(L_A(t)\) funciona como referencia móvil.

No representa a ninguna persona.

---

# 17. Amplitud de separación de A

Se utilizará una envolvente:

$$
A(t)
$$

que transiciona entre tres regiones.

Baseline:

$$
A_0=1.60
$$

$$
A_{\min}=0.28
$$

$$
A_f=0.95.
$$

Configuración:

```ts
oscillation: {
  initialAmplitude: 1.60,
  minimumAmplitude: 0.28,
  finalAmplitude: 0.95
}
```

Interpretación:

### Inicial

Variación considerable.

### Pico

Variación pequeña pero no nula.

### Divergencia

La amplitud vuelve a crecer.

---

# 18. Frecuencia de A

Para la oscilación principal se utilizará inicialmente:

$$
\omega_A=12\pi.
$$

Esto corresponde aproximadamente a:

$$
6
$$

ciclos sobre todo el dominio.

Configuración:

```ts
frequency: 37.6991118431
```

Fase:

$$
\phi_A=0.45.
$$

```ts
phase: 0.45
```

La frecuencia podrá revisarse después de observar cuántos cruces reales produce.

---

# 19. Drift estructural

El drift representa la tendencia de separación independientemente de las oscilaciones.

Baseline:

$$
B_0=0.75
$$

$$
B_f=1.10.
$$

Configuración:

```ts
drift: {
  initial: 0.75,
  final: 1.10
}
```

El drift inicial disminuye después del encuentro.

Durante el pico deberá aproximarse suficientemente a:

$$
B(t)\approx0
$$

para permitir múltiples cruces.

Después de \(t_d\), el drift vuelve a crecer progresivamente.

---

# 20. Primera separación y reconexión como metadata

Los puntos de primera separación y reconexión definidos en `historyEvents` permanecen exclusivamente como **metadata observacional**, conforme al Documento 01.

Baseline:

$$
t_s=0.24
$$

$$
t_r=0.31.
$$

No se introduce ningún pulso, ventana ni término adicional en $B(t)$, $A(t)$, $d_A(t)$ o cualquier otra ecuación para forzar estos eventos.

Su presencia en `history.events.ts` no garantiza por sí sola una forma geométrica específica en esos instantes.

---

# 21. Transiciones logísticas

Se utilizará:

$$
S(t;a,k)=\frac{1}{1+e^{-k(t-a)}}.
$$

Baseline:

```ts
transitions: {
  encounterSharpness: 35,
  peakSharpness: 28,
  divergenceSharpness: 30,
  presentSharpness: 35
}
```

Estas transiciones son suficientemente suaves para evitar cambios discontinuos pero suficientemente localizadas para distinguir las regiones.

---

# 22. Perturbaciones individuales

No se utilizará ruido aleatorio.

Cada persona tendrá una perturbación determinista:

$$
\eta_i(t)
=
\sum_{j=1}^{3}
a_{ij}\sin(f_{ij}t+\varphi_{ij}).
$$

## Carlos

$$
\eta_C(t)
=
0.10\sin(7\pi t+0.2)
+
0.06\sin(17\pi t+1.1)
+
0.035\sin(29\pi t+2.0).
$$

Configuración conceptual:

```ts
carlosNoise: [
  { amplitude: 0.10, frequency: 21.9911, phase: 0.20 },
  { amplitude: 0.06, frequency: 53.4071, phase: 1.10 },
  { amplitude: 0.035, frequency: 91.1062, phase: 2.00 }
]
```

## Fer

$$
\eta_F(t)
=
0.09\sin(9\pi t+1.4)
+
0.055\sin(19\pi t+0.6)
+
0.04\sin(27\pi t+2.5).
$$

```ts
ferNoise: [
  { amplitude: 0.09, frequency: 28.2743, phase: 1.40 },
  { amplitude: 0.055, frequency: 59.6903, phase: 0.60 },
  { amplitude: 0.04, frequency: 84.8230, phase: 2.50 }
]
```

Estas diferencias son geométricas y no psicológicas.

---

# 23. Coupling

El acoplamiento será:

$$
K(t)
=
S(t;t_e,k_e)
\left[
1-S(t;t_n,k_n)
\right].
$$

Baseline:

$$
t_e=0.12
$$

$$
t_n=0.90
$$

$$
k_e=35
$$

$$
k_n=35.
$$

Por tanto, el acoplamiento:

* es aproximadamente cero antes del encuentro;
* aumenta rápidamente después;
* permanece significativo durante la historia compartida;
* comienza a disminuir alrededor del presente.

---

# 24. Influencia del coupling sobre perturbaciones

Se utilizará exactamente la formulación definida por el Documento 01:

$$
\eta_i^*(t)=[1-K(t)]\eta_i(t).
$$

No se introduce un coeficiente adicional de supresión.

Cuando $K(t)\approx1$, las perturbaciones individuales pierden peso relativo conforme a la ecuación autoritativa.

---

# 25. Memoria histórica

La memoria se implementará exactamente conforme al modelo completo del Documento 01:

$$
H(t)=H_\infty+\int_{t_e}^{\min(t,t_n)}K(s)e^{-\lambda(t-s)}ds.
$$

Baseline:

$$
H_\infty=0.20
$$

$$
\lambda=1.4.
$$

Configuración:

```ts
memory: {
  decay: 1.4,
  residual: 0.20
}
```

Este documento no añade gates, funciones de activación ni términos adicionales a $H(t)$.

La implementación podrá calcular la integral numéricamente si no existe una expresión cerrada conveniente.

---

# 26. Estado presente

En:

$$
t_n=0.90
$$

la configuración debe producir:

* distancia perceptible;
* divergencia global;
* posibilidad de proximidad residual;
* ausencia de separación extrema;
* acoplamiento en descenso;
* memoria histórica positiva.

El baseline no debe imponer:

$$
D_A(t_n)=0
$$

ni una distancia máxima.

El objetivo inicial será una **distancia media**.

---

# 27. Futuro simbólico

El intervalo:

$$
t\in(0.90,1]
$$

representa continuación simbólica.

No representa una predicción.

En esta región:

$$
K(t)\rightarrow0.
$$

Las perturbaciones individuales recuperan mayor independencia.

La memoria:

$$
H_A(t)>0
$$

permanece.

Por tanto:

$$
R_1(t|H)\neq R_0(t).
$$

No se fuerza:

* nueva convergencia;
* nueva separación definitiva;
* nuevo cruce;
* ausencia de cruces.

---

# 28. Baseline resumido de A

```ts
export const historyParameters = {
  domain: {
    start: 0,
    end: 1
  },

  milestones: {
    encounter: 0.12,
    peak: 0.40,
    divergence: 0.70,
    present: 0.90
  },

  center: {
    slope: 0.35,
    intercept: 0,
    amplitude: 0.12,
    frequency: 6.28318530718,
    phase: 0.20
  },

  oscillation: {
    initialAmplitude: 1.60,
    minimumAmplitude: 0.28,
    finalAmplitude: 0.95,
    frequency: 37.6991118431,
    phase: 0.45
  },

  drift: {
    initial: 0.75,
    final: 1.10
  },

  transitions: {
    encounterSharpness: 35,
    peakSharpness: 28,
    divergenceSharpness: 30,
    presentSharpness: 35
  },

  memory: {
    decay: 1.4,
    residual: 0.20
  },

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

# 29. Configuración de sampling

Baseline:

```ts
export const samplingConfig = {
  asymptote: 700,
  history: 900
};
```

B necesita suficientes muestras para representar aproximadamente cinco oscilaciones.

A utiliza más debido a:

* perturbaciones individuales;
* transiciones suaves;
* mayor densidad estructural.

Estos valores no forman parte de las matemáticas.

---

# 30. Animación B

Baseline:

```ts
export const asymptoteAnimation = {
  duration: 12000,
  autoplay: true,
  loop: true,
  loopDelay: 2800
};
```

Por tanto:

$$
T_B=12s.
$$

Al completar:

$$
2.8s
$$

de observación antes del reinicio.

Ciclo total aproximado:

$$
14.8s.
$$

---

# 31. Animación A

Baseline:

```ts
export const historyAnimation = {
  duration: 24000,
  autoplay: true,
  loop: true,
  loopDelay: 4000
};
```

Por tanto:

$$
T_A=24s.
$$

Pausa final:

$$
4s.
$$

Ciclo total:

$$
28s.
$$

---

# 32. Correspondencia temporal aproximada de A

Con una animación de 24 segundos:

| Región            |   Dominio | Tiempo visual aproximado |
| ----------------- | --------: | -----------------------: |
| Prehistoria       |    0–0.12 |                    2.9 s |
| Evolución inicial | 0.12–0.40 |                    6.7 s |
| Pico              | 0.40–0.70 |                    7.2 s |
| Divergencia       | 0.70–0.90 |                    4.8 s |
| Continuación      | 0.90–1.00 |                    2.4 s |

Esto surge directamente de:

$$
t_{visual}=24t.
$$

No se aplicará inicialmente una deformación temporal por regiones.

---

# 33. Política de easing

Baseline:

```ts
easing: "linear"
```

para el avance de las curvas.

Esto conserva:

$$
p_{visual}\propto t_{matemático}.
$$

Posteriormente pueden utilizarse transiciones visuales para:

* textos;
* opacidades;
* labels;
* aparición de controles.

Pero la progresión fundamental de las curvas permanecerá inicialmente lineal.

---

# 34. Inicio por viewport

Baseline:

```ts
viewportActivation: {
  threshold: 0.35
}
```

Una gráfica comenzará cuando aproximadamente:

$$
35\%
$$

de su sección sea visible.

La activación inicial utilizará la capacidad de `IntersectionObserver` ya definida por el Documento 02. El comportamiento posterior de loop/replay seguirá exclusivamente las reglas de animación de ese documento.

---

# 35. Orden inicial de B

La configuración deberá soportar offsets independientes.

Baseline inicial:

```ts
curveTiming: {
  limit: {
    start: 0.00,
    end: 0.92
  },

  carlos: {
    start: 0.04,
    end: 1.00
  },

  fer: {
    start: 0.04,
    end: 1.00
  }
}
```

Esto hace que la trayectoria compartida comience ligeramente antes.

La diferencia es visual, no matemática.

Si durante pruebas se percibe demasiado artificial, las tres podrán utilizar:

```ts
start: 0
end: 1
```

---

# 36. Orden inicial de A

Carlos y Fer deberán avanzar sobre el mismo reloj visual:

```ts
curveTiming: {
  carlos: {
    start: 0,
    end: 1
  },

  fer: {
    start: 0,
    end: 1
  }
}
```

No se utilizarán offsets entre personas.

Esto evita implicar visualmente que una trayectoria “empieza después”.

---

# 37. Parámetros prioritarios para tuning

Después de ejecutar localmente, **no debe modificarse todo simultáneamente**.

La calibración deberá realizarse por categorías.

### Si B converge demasiado rápido

Reducir:

```text
carlos.decay
fer.decay
```

### Si B converge demasiado lento

Aumentarlos.

### Si B tiene demasiados cruces

Reducir:

```text
frequency
```

### Si tiene muy pocos

Aumentarla.

### Si empiezan demasiado separados

Reducir:

```text
amplitude
```

### Si la trayectoria compartida domina visualmente demasiado

Reducir:

```text
limit.slope
```

---

# 38. Tuning prioritario de A

### Si el pico parece demasiado corto

Mover:

```text
peak
```

hacia la izquierda o:

```text
divergence
```

hacia la derecha.

### Si el pico parece demasiado separado

Reducir:

```text
minimumAmplitude
```

y/o drift residual.

### Si parecen una sola curva

Aumentar ligeramente:

```text
minimumAmplitude
```

o perturbaciones individuales.


### Si la divergencia final es excesiva

Reducir:

```text
drift.final
```

### Si apenas se percibe

Aumentarlo.

### Si existen demasiados cruces

Reducir:

```text
oscillation.frequency
```

### Si el movimiento parece artificialmente periódico

Modificar perturbaciones individuales antes de introducir aleatoriedad.

---

# 39. Parámetros que NO deben usarse para corregir diseño

No modificar ecuaciones para solucionar:

* colores;
* grosor;
* espaciado;
* tamaño de gráfica;
* tipografía;
* composición;
* velocidad de animación;
* etiquetas.

Esos problemas pertenecen a otras capas.

Igualmente, no modificar CSS para ocultar un problema matemático.

Si:

$$
D_A(t)
$$

no representa correctamente el comportamiento deseado, primero deberán ajustarse únicamente los parámetros permitidos por este baseline. Si el problema exige cambiar una ecuación, la modificación deberá realizarse explícitamente en el Documento 01 y después propagarse a los documentos subordinados; nunca se redefinirá el modelo desde este documento.

---

# 40. Procedimiento de calibración local

Después de la primera implementación:

### Paso 1 — B aislado

Observar únicamente B.

Evaluar:

* separación inicial;
* cantidad de oscilaciones;
* cruces;
* aproximación;
* distancia final;
* legibilidad.

Modificar solamente parámetros B.

### Paso 2 — A aislado

Observar únicamente A.

Evaluar:

* independencia inicial;
* encuentro;
* duración del pico;
* cruces durante pico;
* divergencia;
* acercamientos residuales;
* presente;
* continuación.

Modificar solamente parámetros A.

### Paso 3 — Animación

Una vez aprobada la geometría:

* duración;
* pausa;
* loop;
* timing.

### Paso 4 — Composición

Sólo entonces:

* layout;
* colores;
* tipografía;
* textos;
* transiciones;
* estética final.

---

# 41. Regla de una variable

Durante tuning se recomienda modificar **una familia de parámetros a la vez**.

Por ejemplo:

```text
decay
```

primero.

Después:

```text
frequency
```

Después:

```text
phase
```

Esto permite identificar qué cambio produjo qué comportamiento.

Evitar modificar simultáneamente:

```text
amplitude + decay + frequency + phase
```

salvo que se esté descartando completamente una calibración.

---

# 42. Instrumentación de desarrollo

Durante desarrollo local se permite mostrar información que no aparecerá en la carta final.

Por ejemplo:

```text
t = 0.704
D_A = 0.213
K = 0.923
H = 0.516
```

También pueden mostrarse temporalmente:

* bounds;
* milestones;
* eventos;
* \(L_A(t)\);
* envolventes;
* puntos de sampling.

Esta instrumentación deberá poder desactivarse mediante una constante de desarrollo.

Ejemplo:

```ts
export const DEBUG_GRAPHS = false;
```

No forma parte de la experiencia final.

---

# 43. Presets de desarrollo

Se recomienda soportar:

```ts
export const BASELINE = "v1";
```

para evitar modificar valores sin conservar referencia.

Después de calibración pueden existir:

```text
baseline-v1
baseline-v1.1
baseline-v1.2
```

hasta seleccionar una configuración final.

No es necesario implementar un sistema complejo de presets; basta mantener configuraciones versionadas en código/Git.

---

# 44. Criterio de aceptación del baseline

El Baseline v1.0 **no necesita producir la composición definitiva**.

Será exitoso si al ejecutar localmente permite reconocer:

### B

$$
\text{trayectorias distintas}
\rightarrow
\text{oscilaciones/cruces}
\rightarrow
\text{aproximación asintótica compartida}.
$$

### A

$$
\text{independencia}
\rightarrow
\text{aproximación}
\rightarrow
\text{máxima compatibilidad}
\rightarrow
\text{divergencia}
\rightarrow
\text{independencia condicionada}.
$$

Si esas estructuras son reconocibles, el baseline cumplió su función.

Los detalles se calibrarán visualmente.

---

# 45. Configuración consolidada

La implementación final deberá mantener claramente separados:

```text
MATHEMATICAL PARAMETERS
│
├── Model A
└── Model B

RENDER PARAMETERS
│
├── samples
├── viewport
└── graph configuration

ANIMATION PARAMETERS
│
├── duration
├── loopDelay
├── curve timing
└── viewport activation

PRESENTATION PARAMETERS
│
├── colors
├── typography
├── dimensions
└── composition
```

Nunca deberán mezclarse estas categorías.

---

# 46. Estado del Parameter Set

Con esta especificación:

$$
\boxed{
\text{Baseline Parameter Set v1.0}
}
$$

queda suficientemente definido para comenzar la implementación.

Los números contenidos aquí son **hipótesis de calibración**, no afirmaciones objetivas sobre las personas representadas.

El criterio definitivo será la observación del comportamiento generado localmente.

La primera ejecución responderá preguntas que no vale la pena intentar resolver únicamente sobre papel:

> ¿Converge demasiado rápido?

> ¿Hay demasiados cruces?

> ¿El pico se siente suficientemente estable?

> ¿La divergencia reciente conserva suficientes reconvergencias?

> ¿El presente queda demasiado lejos?

> ¿24 segundos se sienten lentos o correctos?

Esas observaciones producirán:

$$
\boxed{
\text{Baseline v1.0}
\rightarrow
\text{visual feedback}
\rightarrow
\text{Parameter Set v1.1}
}
$$

sin necesidad de modificar la arquitectura.
