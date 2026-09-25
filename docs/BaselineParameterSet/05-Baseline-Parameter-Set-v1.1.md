**# Static Mathematical Letter**



**## Baseline Parameter Set**



**### Version 1.1 — Calibration Working Baseline**



**## 1. Propósito**



Este documento define el **\*\*Baseline Parameter Set v1.1\*\*** para la fase de calibración de **\*\*Modelos Asíntotas / Static Mathematical Letter Core v1.0\*\***.



La versión 1.1 no redefine los modelos matemáticos. Su función es servir como documento vivo de calibración sobre el Core v1.0 ya congelado y validado.



El flujo de trabajo de esta versión es:



\\[

\boxed{

\text{Baseline v1.0}

\rightarrow

\text{visual feedback}

\rightarrow

\text{calibración por passes}

\rightarrow

\text{Baseline v1.1}

}

\\]



El Baseline v1.0 permanece como referencia histórica e inmutable del primer conjunto funcional de parámetros.



El Baseline v1.1 podrá modificarse durante la calibración hasta encontrar una configuración que produzca de forma suficientemente clara el comportamiento artístico y matemático buscado.



La versión 1.1 no se considerará cerrada hasta que:



\- la geometría de ambos modelos sea aceptada;

\- la lectura temporal del Modelo A sea adecuada;

\- la convergencia del Modelo B sea visualmente clara;

\- la divergencia presente del Modelo A sea progresiva y no excesiva;

\- las aproximaciones, cruces y separaciones se distribuyan de forma coherente con la intención narrativa;

\- los parámetros finales hayan sido aprobados mediante observación local;

\- tests, typecheck y build continúen pasando.



\---



**# 2. Autoridad y congelamiento del Core**



Jerarquía aplicable:



1\. \`01-Mathematical-Models-Specification(1).md\`

2\. \`02-Software-Implementation-Specification(1).md\`

3\. \`03-Development-Execution-Plan(1).md\`

4\. \`BaselineParameterSet/04-Baseline-Parameter-Set-v1.0.md\`

5\. Este documento de calibración v1.1

6\. Implementación

7\. Tests



El Core v1.0 fue congelado después del gate de conformidad.



Por tanto, durante esta fase:



\- no se modifican ecuaciones;

\- no se crean variables matemáticas nuevas;

\- no se modifican invariantes;

\- no se alteran contratos de memoria;

\- no se redefine coupling;

\- no se introduce frecuencia temporal variable;

\- no se convierten eventos en causas;

\- no se introduce aleatoriedad;

\- no se modifica Doc01 para acomodar una preferencia visual.



Si una curva no representa correctamente el comportamiento buscado, primero deberán utilizarse los parámetros ya permitidos por el modelo.



Un cambio de ecuaciones requeriría reabrir formalmente el contrato matemático y queda fuera de esta calibración.



\---



**# 3. Estado de referencia**



El punto cero de calibración corresponde al Baseline Parameter Set v1.0.



**## Modelo B**



\`\`\`ts

export *const* asymptoteParameters = {

  domain: { start: 0, end: 10 },

  limit: { slope: 0.12, intercept: 0 },

  carlos: { amplitude: 2.6, decay: 0.24, frequency: 2.65, phase: 0.35 },

  fer: { amplitude: 2.4, decay: 0.255, frequency: 2.90, phase: 2.45 }

};

\`\`\`



**## Modelo A**



\`\`\`ts

export *const* historyParameters = {

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

\`\`\`



\---



**# 4. Intención de calibración del Modelo B**



El Modelo B debe sostener visual y matemáticamente la metáfora:



\\[

\boxed{

\text{dos trayectorias distintas}

\rightarrow

\text{oscilaciones y cruces}

\rightarrow

\text{aproximación asintótica a una trayectoria compartida}

}

\\]



El Modelo B no reconstruye una cronología real.



Su función es representar de forma limpia dos trayectorias que:



\- parten diferenciadas;

\- oscilan alrededor de una trayectoria compartida;

\- pueden cruzarla;

\- pueden cruzarse entre sí;

\- disminuyen progresivamente su distancia respecto de la trayectoria límite;

\- permanecen visualmente diferenciables dentro de la ventana finita;

\- tienden matemáticamente a la misma trayectoria cuando \\(t\to\infty\\).



El Baseline v1.0 ya cumple esta estructura de forma satisfactoria.



Por tanto, la calibración de B será de **\*\*fine tuning\*\***, no de reconstrucción.



\---



**# 5. Intención de calibración del Modelo A**



El Modelo A representa una historia abstracta de compatibilidad interpersonal mediante:



\\[

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

\\]



No representa sentimientos ni causalidad de eventos.



La calibración deberá producir visualmente una lectura aproximadamente equivalente a:



\`\`\`text

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

\`\`\`



Los eventos reales continúan siendo metadata.



No se exigirá que:



\\[

1\text{ cruce matemático}=1\text{ encuentro real}.

\\]



Un cruce:



\\[

D_A(t)=0

\\]



representa sincronización máxima instantánea.



Un encuentro o periodo compatible puede corresponder simplemente a una región donde \\(D_A(t)\\) sea pequeña.



\---



**# 6. Problemas observados en el Baseline v1.0**



La primera ejecución local mostró que el Modelo A es matemáticamente correcto pero todavía está visualmente desequilibrado.



La lectura actual se aproxima a:



\`\`\`text

oscilación inicial intensa

        ↓

estrechamiento central relativamente corto

        ↓

divergencia final intensa

\`\`\`



Los principales problemas de calibración observados son:



1\. la fase inicial consume demasiado protagonismo visual;

2\. la reducción de amplitud hacia máxima compatibilidad llega relativamente tarde;

3\. la región de máxima compatibilidad existe, pero se percibe comprimida;

4\. la divergencia posterior crece demasiado rápido;

5\. el estado cercano al presente puede percibirse como una separación demasiado fuerte;

6\. las reconvergencias residuales existen, pero la transición hacia divergencia necesita mayor progresividad.



No se consideran problemas de ecuación.



Se consideran problemas de calibración.



\---



**# 7. Objetivo visual del Modelo A por regiones**



**## Región I — independencia inicial**



Las trayectorias deben ser claramente independientes.



Pueden existir aproximaciones y cruces, pero deben conservar una distancia perceptible y no dominar toda la composición.



**## Región II — primer encuentro y evolución inicial**



Debe percibirse una reducción gradual de la separación estructural.



La dinámica todavía puede ser inestable.



No debe confundirse con el periodo principal de máxima compatibilidad.



**## Región III — máxima compatibilidad**



Debe ser la región visualmente dominante de proximidad.



Las dos trayectorias no necesitan colapsar en una sola curva.



Se busca:



\- distancia habitualmente pequeña;

\- persistencia de proximidad;

\- coupling alto;

\- drift bajo;

\- amplitud reducida;

\- individualidad aún visible.



**## Región IV — segunda divergencia**



Debe existir una separación real respecto del periodo anterior.



No debe producirse una explosión inmediata.



La salida de máxima compatibilidad y una separación extrema no son equivalentes.



**## Región V — reconvergencias recientes**



Después de la divergencia deben seguir existiendo acercamientos visibles.



No necesitan ser cruces exactos.



**## Región VI — presente**



La divergencia debe ser reconocible y progresiva.



La intención no es representar una separación máxima.



Se busca una distancia media o moderada que esté creciendo.



**## Región VII — continuación simbólica**



\\[

t\in(0.90,1]

\\]



No representa predicción.



Puede mostrar nuevas aproximaciones o mayor separación dentro de lo permitido por el modelo.



\---



**# 8. Regla principal de calibración**



Se modificará **\*\*una familia de parámetros por pass\*\***.



Cada cambio deberá seguir:



\`\`\`text

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

\`\`\`



No se modificarán simultáneamente familias distintas salvo que una iteración completa se descarte.



\---



**# 9. Pass 0 — preparación**



Objetivo: crear una referencia limpia antes del tuning.



Acciones:



\- conservar screenshots del Baseline v1.0;

\- conservar todos los valores iniciales;

\- mantener Core v1.0 congelado;

\- registrar cada experimento;

\- opcionalmente utilizar instrumentación de desarrollo.



Instrumentación permitida:



\`\`\`text

t

D_A(t)

A(t)

B(t)

K(t)

H(t)

\`\`\`



También pueden mostrarse temporalmente milestones, eventos, bounds, trayectoria central, puntos de sampling y envolventes.



La instrumentación no forma parte de la experiencia final.



\---



**# 10. Pass 1 — estructura temporal de A**



Pregunta:



*> ¿Las distintas etapas ocupan una proporción temporal y visual adecuada?*



Parámetros autorizados:



\`\`\`ts

milestones.peak

milestones.divergence

transitions.peakSharpness

transitions.divergenceSharpness

\`\`\`



Parámetros congelados durante este pass:



\`\`\`ts

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

\`\`\`



Anclas iniciales:



\`\`\`ts

encounter: 0.12

present: 0.90

\`\`\`



Objetivo: dar mayor territorio perceptual al periodo de compatibilidad y hacer más gradual su salida.



**## Registro Pass 1**



\| Campo | Baseline v1.0 | Candidato | Final aprobado |

\|---|---:|---:|---:|

\| \`milestones.peak\` | 0.40 | 0.34 | 0.28 |

\| \`milestones.divergence\` | 0.70 | 0.74 | 0.74 |

\| \`peakSharpness\` | 28 | 20 | 20 |

\| \`divergenceSharpness\` | 30 | 18 | 18 |



Estado: \`APPLIED\`



\---



**# 11. Pass 2 — magnitud de compatibilidad**



Pregunta:



*> ¿La diferencia entre independencia inicial y máxima compatibilidad es suficientemente clara?*



Parámetros autorizados:



\`\`\`ts

oscillation.initialAmplitude

oscillation.minimumAmplitude

\`\`\`



Parámetro opcional sólo si se demuestra necesario:



\`\`\`ts

drift.initial

\`\`\`



Objetivo:



\- reducir protagonismo excesivo de la región inicial si es necesario;

\- conservar independencia perceptible;

\- producir una región central claramente próxima;

\- evitar que Carlos y Fer se perciban permanentemente como una sola curva.



**## Registro Pass 2**



\| Campo | Baseline v1.0 | Candidato | Final aprobado |

\|---|---:|---:|---:|

\| \`initialAmplitude\` | 1.60 | 1.35 | 1.35 |

\| \`minimumAmplitude\` | 0.28 | 0.20 | 0.20 |

\| \`drift.initial\` | 0.75 | SIN CAMBIO | 0.75 |



Estado: \`APPLIED\`



\---



**# 12. Pass 3 — divergencia y reconvergencias recientes**



Pregunta:



*> ¿La salida del periodo compatible produce una separación real pero todavía permite aproximaciones significativas?*



Parámetros autorizados:



\`\`\`ts

drift.final

oscillation.finalAmplitude

\`\`\`



Interpretación:



\- \`drift.final\` controla la separación estructural posterior;

\- \`finalAmplitude\` controla cuánto puede continuar oscilando la separación alrededor de esa tendencia.



Objetivo:



\`\`\`text

máxima compatibilidad

→ separación real

→ reconvergencias residuales

→ divergencia presente progresiva

\`\`\`



Evitar:



\`\`\`text

máxima compatibilidad

→ explosión inmediata

\`\`\`



**## Registro Pass 3**



\| Campo | Baseline v1.0 | Candidato | Final aprobado |

\|---|---:|---:|---:|

\| \`drift.final\` | 1.10 | 0.78 | 0.96 |

\| \`finalAmplitude\` | 0.95 | 0.82 | 0.95 |



Estado: \`APPLIED\`



\---



**# 13. Pass 4 — densidad de aproximaciones**



Pregunta:



*> ¿La densidad de cruces y acercamientos produce un ritmo temporal adecuado?*



Parámetros autorizados:



\`\`\`ts

oscillation.frequency

oscillation.phase

\`\`\`



Baseline:



\`\`\`ts

frequency: 37.6991118431

phase: 0.45

\`\`\`



No se intentará representar literalmente una frecuencia cronológica real.



La frecuencia matemática controla la densidad de oscilaciones dentro del dominio normalizado.



El criterio será perceptual y estructural.



**## Registro Pass 4**



\| Campo | Baseline v1.0 | Candidato | Final aprobado |

\|---|---:|---:|---:|

\| \`oscillation.frequency\` | 37.6991118431 | 34.5575191895 | 44.5575191895 |

\| \`oscillation.phase\` | 0.45 | 0.25 | 0.25 |



Estado: \`APPLIED\`



\---



**# 14. Pass 5 — organicidad**



Pregunta:



*> ¿Las trayectorias se perciben demasiado periódicas o artificialmente simétricas?*



Parámetros autorizados:



\`\`\`ts

perturbations.carlos

perturbations.fer

\`\`\`



Las perturbaciones continúan siendo deterministas.



No se utilizará \`Math.random()\`.



Este pass no debe arreglar estructura temporal, amplitud macro, divergencia estructural ni milestones.



**## Registro Pass 5**



**### Carlos**



\| Término | Baseline | Candidato | Final aprobado |

\|---|---|---|---|

\| 1 | \`(0.10, 21.9911, 0.20)\` | SIN CAMBIO | \`(0.10, 21.9911, 0.20)\` |

\| 2 | \`(0.06, 53.4071, 1.10)\` | SIN CAMBIO | \`(0.06, 53.4071, 1.10)\` |

\| 3 | \`(0.035, 91.1062, 2.00)\` | SIN CAMBIO | \`(0.035, 91.1062, 2.00)\` |



**### Fer**



\| Término | Baseline | Candidato | Final aprobado |

\|---|---|---|---|

\| 1 | \`(0.09, 28.2743, 1.40)\` | SIN CAMBIO | \`(0.09, 28.2743, 1.40)\` |

\| 2 | \`(0.055, 59.6903, 0.60)\` | SIN CAMBIO | \`(0.055, 59.6903, 0.60)\` |

\| 3 | \`(0.04, 84.8230, 2.50)\` | SIN CAMBIO | \`(0.04, 84.8230, 2.50)\` |



Estado: \`NO CHANGE\`



\---



**# 15. Pass 6 — fine tuning de B**



El Modelo B ya produce correctamente la estructura buscada.



Por tanto, este pass sólo se realizará después de aprobar la geometría de A.



Orden recomendado:



\`\`\`text

decay

↓

amplitude

↓

frequency

↓

phase

\`\`\`



Preguntas:



\- ¿la convergencia visible ocurre demasiado rápido?

\- ¿termina demasiado lejos de la trayectoria compartida?

\- ¿hay demasiadas o muy pocas oscilaciones?

\- ¿las fases producen una composición artificial?

\- ¿la separación inicial es excesiva?



**## Registro Pass 6 — Carlos**



\| Campo | Baseline v1.0 | Candidato | Final aprobado |

\|---|---:|---:|---:|

\| \`amplitude\` | 2.6 | SIN CAMBIO | 2.6 |

\| \`decay\` | 0.24 | SIN CAMBIO | 0.24 |

\| \`frequency\` | 2.65 | SIN CAMBIO | 2.65 |

\| \`phase\` | 0.35 | SIN CAMBIO | 0.35 |



**## Registro Pass 6 — Fer**



\| Campo | Baseline v1.0 | Candidato | Final aprobado |

\|---|---:|---:|---:|

\| \`amplitude\` | 2.4 | SIN CAMBIO | 2.4 |

\| \`decay\` | 0.255 | SIN CAMBIO | 0.255 |

\| \`frequency\` | 2.90 | SIN CAMBIO | 2.90 |

\| \`phase\` | 2.45 | SIN CAMBIO | 2.45 |



Estado: \`NO CHANGE\`



\---



**# 16. Pass 7 — duración y ritmo de animación**



Este pass se realizará después de aprobar la geometría matemática.



La duración no modifica las ecuaciones.



**## Estado v1.0**



**### B**



\`\`\`ts

duration: 12000

loopDelay: 2800

\`\`\`



**### A**



\`\`\`ts

duration: 24000

loopDelay: 4000

\`\`\`



**## Candidato inicial v1.1**



Se propone evaluar:



\`\`\`ts

asymptoteAnimation.duration = 30000

historyAnimation.duration = 30000

\`\`\`



Es decir:



\\[

T_B=30s

\\]



\\[

T_A=30s.

\\]



Esto produciría aproximadamente 60 segundos de observación efectiva de las dos animaciones, sin contar pausas.



Este valor es **\*\*candidato\*\***, no final.



También podrán evaluarse 30 s, 36 s, 45 s, 50 s o 60 s por gráfica si la composición lo requiere.



No se modificará la geometría matemática para acomodar una duración visual.



**## Registro Pass 7**



\| Configuración | Baseline v1.0 | Candidato | Final aprobado |

\|---|---:|---:|---:|

\| B duration | 12 s | 30 s | 30 s |

\| B loopDelay | 2.8 s | SIN CAMBIO | 2.8 s |

\| A duration | 24 s | 30 s | 30 s |

\| A loopDelay | 4 s | SIN CAMBIO | 4 s |



Estado: \`APPLIED — PENDING FINAL VISUAL REVIEW\`



\---



**# 17. Música y timeline audiovisual**



La sincronización musical queda fuera de esta calibración base.



No se modificarán parámetros matemáticos para acomodar una canción.



Orden obligatorio:



\`\`\`text

geometría matemática

↓

calibración

↓

ritmo visual

↓

composición

↓

timeline audiovisual

\`\`\`



Como referencia preliminar, una experiencia completa podría terminar utilizando aproximadamente:



\\[

80\text{ s}-120\text{ s}

\\]



Esta estimación no forma parte del baseline matemático y podrá cambiar durante la futura fase audiovisual.



\---



**# 18. Parámetros congelados inicialmente**



Mientras no exista una razón observacional concreta, los siguientes parámetros permanecerán congelados.



**## Modelo A**



\`\`\`ts

domain

center

memory

encounter

present

\`\`\`



**## Modelo B**



\`\`\`ts

domain

limit

\`\`\`



El congelamiento es operativo para calibración, no una nueva regla matemática.



Puede levantarse únicamente si un pass demuestra que uno de estos valores impide alcanzar el comportamiento deseado dentro de Doc01.



\---



**# 19. Memoria durante calibración**



Los parámetros:



\`\`\`ts

memory.decay

memory.residual

\`\`\`



no afectan actualmente las trayectorias visualizadas.



Por tanto, no se utilizarán para corregir geometría.



Se mantienen inicialmente:



\`\`\`ts

memory: {

  decay: 1.4,

  residual: 0.20

}

\`\`\`



Cualquier calibración futura de memoria deberá responder a una pregunta conceptual propia de \\(H(t)\\), no a la forma de las curvas.



\---



**# 20. Eventos durante calibración**



Los eventos permanecen metadata.



No se utilizarán para forzar:



\- cruces;

\- picos;

\- reconexiones;

\- divergencias;

\- amplitudes;

\- cambios de coupling.



Su función es permitir interpretar la trayectoria en instantes relevantes.



El modelo deberá sostener el comportamiento mediante sus propios parámetros matemáticos.



\---



**# 21. Plantilla de registro por iteración**



Cada experimento debe documentarse con esta estructura:



**## Iteración X**



**### Hipótesis**



\`\`\`text

HIPOTESIS DE LA ITERACION

\`\`\`



**### Propiedad responsable**



\`\`\`text

PROPIEDAD MATEMATICA RESPONSABLE

\`\`\`



**### Parámetros autorizados**



\`\`\`text

FAMILIA AUTORIZADA

\`\`\`



**### Valores anteriores**



\`\`\`text

VALORES ACUMULADOS ANTERIORES

\`\`\`



**### Valores candidatos**



\`\`\`text

VALORES EVALUADOS

\`\`\`



**### Comportamiento esperado**



\`\`\`text

COMPORTAMIENTO ESPERADO

\`\`\`



**### Resultado observado**



\`\`\`text

METRICAS Y RESULTADO

\`\`\`



**### Decisión**



\`\`\`text

ACEPTAR / REVERTIR / ITERAR

\`\`\`



**### Notas**



\`\`\`text

ESTADO ACUMULADO

\`\`\`



\---



**# 22. Regla de aceptación**



Un cambio se incorpora al Baseline v1.1 únicamente cuando:



1\. corresponde a la familia autorizada del pass;

2\. no modifica ecuaciones;

3\. respeta Doc01;

4\. tests continúan pasando;

5\. typecheck continúa pasando;

6\. build continúa pasando;

7\. el comportamiento observado mejora respecto del objetivo explícito del pass;

8\. no degrada una propiedad previamente aprobada sin justificación.



\---



**# 23. Gate de cada pass**



Después de aceptar una iteración:



\`\`\`text

npm test

npm run typecheck

npm run build

\`\`\`



deben continuar pasando.



Si el entorno requiere Windows CMD:



\`\`\`text

npm.cmd test

npm.cmd run typecheck

npm.cmd run build

\`\`\`



No se considerará aprobado un pass con regresiones estructurales.



\---



**# 24. Configuración final consolidada**



Esta sección representa el estado final aprobado del Baseline Parameter Set v1.1.



Parte del Baseline v1.0 y consolida únicamente los ajustes finalmente aceptados para v1.1.



Los valores de esta sección son autoritativos para la configuración v1.1.



**## Modelo B — baseline v1.1**



\`\`\`ts

export *const* asymptoteParametersV11 = {

  domain: { start: 0, end: 10 },

  limit: { slope: 0.12, intercept: 0 },

  carlos: { amplitude: 2.6, decay: 0.24, frequency: 2.65, phase: 0.35 },

  fer: { amplitude: 2.4, decay: 0.255, frequency: 2.90, phase: 2.45 }

};

\`\`\`



**## Modelo A — baseline v1.1**



\`\`\`ts

export *const* historyParametersV11 = {

  domain: { start: 0, end: 1 },

  milestones: { encounter: 0.12, peak: 0.28, divergence: 0.74, present: 0.90 },

  center: { slope: 0.35, intercept: 0, amplitude: 0.12, frequency: 6.28318530718, phase: 0.20 },

  oscillation: { initialAmplitude: 1.35, minimumAmplitude: 0.20, finalAmplitude: 0.95, frequency: 44.5575191895, phase: 0.25 },

  drift: { initial: 0.75, final: 0.96 },

  transitions: { encounterSharpness: 35, peakSharpness: 20, divergenceSharpness: 18, presentSharpness: 35 },

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

\`\`\`



\---



**# 25. Configuración de animación final v1.1**



La geometría v1.1 ya fue aceptada visualmente. La configuración de animación vigente mantiene 30 s para ambos modelos.



Configuración final:



\`\`\`ts

export *const* animationBaselineV11 = {

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

\`\`\`



Estos valores quedan aceptados para el Baseline v1.1. Cualquier corrección posterior del mecanismo de reveal pertenece a la capa de animación/rendering y no modifica este parameter set.



\---



**# 26. Criterio de aceptación final del Modelo B**



B estará calibrado cuando la visualización permita reconocer sin explicación adicional:



\\[

\boxed{

\text{trayectorias distintas}

\rightarrow

\text{oscilaciones/cruces}

\rightarrow

\text{aproximación asintótica compartida}

}

\\]



Debe conservarse:



\- diferenciación inicial;

\- convergencia visible;

\- aproximación no monótona;

\- posibilidad de cruces;

\- distancia final pequeña dentro de la ventana;

\- no colapso artificial en \\(t=10\\).



\---



**# 27. Criterio de aceptación final del Modelo A**



A estará calibrado cuando sea posible reconocer:



\\[

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

\\]



En particular:



\- la región inicial no debe dominar toda la gráfica;

\- la compatibilidad debe disponer de suficiente territorio visual;

\- la salida del pico debe ser gradual;

\- la divergencia posterior debe existir sin ser inmediatamente extrema;

\- deben permanecer aproximaciones posteriores;

\- el presente debe mostrar una separación creciente, no una conclusión definitiva;

\- la continuación simbólica no debe interpretarse como predicción.



\---



**# 28. Estado del documento**



Estado final del Baseline Parameter Set v1.1:



\`\`\`text

BASELINE PARAMETER SET v1.1

STATUS: CALIBRATED / APPROVED

SOURCE: BASELINE v1.0

CORE CONTRACT: FROZEN

\`\`\`



La sección **Configuración final consolidada** representa el Baseline Parameter Set v1.1 aprobado después de la calibración automática y el ajuste visual manual final.



\---



**# 29. Resultado esperado**



La calibración v1.1 debe modificar únicamente valores numéricos y parámetros visuales permitidos.



El resultado final será:



\\[

\boxed{

\text{Core v1.0 congelado}

\+

\text{Parameter Set v1.1 calibrado}

}

\\]



sin modificar la arquitectura ni el contrato matemático.



El Baseline v1.0 continuará existiendo como referencia reproducible del estado inicial.



El Baseline v1.1 representará la primera configuración calibrada específicamente para la pieza final.

**---**



**# 30. CALIBRATION EXECUTION STATE**



Current pass: COMPLETE — FINAL MANUAL ALIGNMENT



Completed passes: 0–7 (incluye GATE MODELO A y GATE MODELO B)



Current accumulated parameters: FINAL APPROVED v1.1 (peak=0.28, Af=0.95, Bf=0.96, frequency=44.5575191895, phase=0.25)



Last gate result: FINAL GATE — 6 archivos/29 tests PASS; typecheck PASS; build PASS; git diff --check PASS.



Remaining passes: NONE — PARAMETER CALIBRATION CLOSED



**## PASS 0 — Preparacion**



**### Hipotesis**



El runtime coincide con v1.0 y puede calibrarse modificando solo parametros autorizados, sin tocar el Core.



**### Parametros evaluados**



Todos los parametros efectivos de A y B; sampling y configuracion runtime de animacion.



**### Valores anteriores y seleccionados**



Sin cambios. A y B coincidian con v1.0. Animacion efectiva: B \`duration=12000\`, \`loopDelay=2800\`; A \`duration=24000\`, \`loopDelay=4000\`.



**### Razonamiento matematico**



Se verificaron dominio, orden de milestones, positividad de amplitudes/decays y correspondencia exacta entre ecuaciones de Doc01 y modelos runtime.



**### Metricas**



\- SHA base: \`aebe41f52b0953f4eb748b1d1c0d5c4dbb8f2368\`.

\- Working tree inicial: modificado solo en este documento v1.1 por un registro previo de Pass 0; no habia cambios runtime.

\- Gate: 6/6 archivos y 29/29 tests PASS; typecheck PASS; build PASS.

\- B, envolventes en \`t=10\`: Carlos \`0.235867\`, Fer \`0.187396\`.

\- A v1.0, distancia media: \`[0,0.34]=1.077455\`, \`[0.34,0.74]=0.488581\`, \`[0.74,0.90]=1.051097\`, \`[0.90,1]=0.692759\`.



**### Resultado**



\`PASS\`



**### Estado acumulado**



Baseline v1.0 efectivo, sin cambios runtime.



**## PASS 1 — Estructura temporal de A**



**### Hipotesis**



Adelantar la entrada compatible, retrasar la divergencia y reducir sharpness ampliara la region de proximidad y evitara entradas/salidas abruptas.



**### Parametros autorizados**



\`milestones.peak\`, \`milestones.divergence\`, \`transitions.peakSharpness\`, \`transitions.divergenceSharpness\`.



**### Valores anteriores**



\`peak=0.40\`, \`divergence=0.70\`, \`peakSharpness=28\`, \`divergenceSharpness=30\`.



**### Valores seleccionados**



\`peak=0.34\`, \`divergence=0.74\`, \`peakSharpness=20\`, \`divergenceSharpness=18\`.



**### Razonamiento**



El intervalo nominal compatible aumenta de \`0.30\` a \`0.40\` del dominio (+33.3%). Reducir las pendientes logisticas ensancha las transiciones: el ancho 10–90 % es aproximadamente \`4.394/k\`, pasando de \`0.157\` a \`0.220\` en entrada y de \`0.146\` a \`0.244\` en salida. Se conserva estrictamente \`0 < 0.12 < 0.34 < 0.74 < 0.90 < 1\`.



**### Metricas**



\- Distancia media compatible \`[0.34,0.74]\`: \`0.366972\` frente a \`0.488581\` en v1.0.

\- Distancia media inicial \`[0,0.34]\`: \`1.014689\` frente a \`1.077455\`.

\- \`A(0.40)=0.587017\`, \`A(0.50)=0.340493\`, \`A(0.60)=0.337135\`.

\- No se alteraron frecuencia, fase, amplitudes, drift, perturbaciones, memoria ni eventos.



**### Resultado**



\`APPLIED\`



**### Estado acumulado**



Modelo A: \`milestones={encounter:0.12, peak:0.34, divergence:0.74, present:0.90}\`; \`transitions={encounterSharpness:35, peakSharpness:20, divergenceSharpness:18, presentSharpness:35}\`. Resto de A y todo B: v1.0.



**## PASS 2 — Magnitud de compatibilidad**



**### Hipotesis**



Una reduccion moderada de la amplitud inicial disminuira su protagonismo, mientras una amplitud minima menor hara inequívoca la proximidad central sin colapsarla.



**### Parametros autorizados**



\`oscillation.initialAmplitude\`, \`oscillation.minimumAmplitude\`; \`drift.initial\` solo si fuera necesario.



**### Valores anteriores**



\`initialAmplitude=1.60\`, \`minimumAmplitude=0.28\`, \`drift.initial=0.75\`.



**### Valores seleccionados**



\`initialAmplitude=1.35\`, \`minimumAmplitude=0.20\`; \`drift.initial=0.75\` SIN CAMBIO.



**### Razonamiento**



La reduccion de \`A0\` es 15.625 %, suficiente para rebajar la dominancia inicial conservando \`A0 > Amin > 0\`. La reduccion de \`Amin\` es 28.57 %, y el drift central ya tiende a cero; por ello no fue necesario alterar \`drift.initial\`.



**### Metricas**



\- Distancia media inicial \`[0,0.34]\`: \`0.870639\` (v1.0: \`1.077455\`; Pass 1: \`1.014689\`).

\- Distancia media compatible \`[0.34,0.74]\`: \`0.310605\` (Pass 1: \`0.366972\`).

\- \`D_A(0.40)=0.085443\`, \`D_A(0.50)=0.125305\`, \`D_A(0.60)=0.149085\`.

\- \`A(0.50)=0.254885\`; permanece positiva y no existe colapso permanente.



**### Resultado**



\`APPLIED\`



**### Estado acumulado**



A: milestones \`0.12/0.34/0.74/0.90\`; sharpness \`35/20/18/35\`; amplitudes \`1.35/0.20/0.95\`; drift \`0.75/1.10\`; frecuencia/fase y perturbaciones v1.0. B completo: v1.0.



**## PASS 3 — Divergencia y reconvergencias**



**### Hipotesis**



Reducir simultaneamente la deriva final y la amplitud final, manteniendo \`Af > Amin\` y \`Af > Bf\`, moderara los maximos tardios y permitira cancelaciones residuales reales.



**### Parametros autorizados**



\`drift.final\`, \`oscillation.finalAmplitude\`.



**### Valores anteriores**



\`drift.final=1.10\`, \`finalAmplitude=0.95\`.



**### Valores seleccionados**



\`drift.final=0.78\`, \`finalAmplitude=0.82\`.



**### Razonamiento**



La deriva final baja 29.09 % y la amplitud final 13.68 %. La relacion \`Af/Bf=1.0513\` conserva la capacidad de la oscilacion principal para cancelar temporalmente la deriva, pero ambas magnitudes son menores, evitando la explosion final del baseline.



**### Metricas**



Distancias antes de ajustar frecuencia/fase (Pass 3 acumulado):



\| t | D_A v1.0 | D_A Pass 3 |

\|---:|---:|---:|

\| 0.74 (\`t_d\`) | 0.787086 | 0.352470 |

\| 0.75 | 0.538904 | 0.190591 |

\| 0.80 | 0.384338 | 0.103089 |

\| 0.85 | 1.913482 | 1.336629 |

\| 0.90 | 1.280305 | 0.892960 |

\| 0.95 | 0.226018 | 0.031358 |

\| 1.00 | 1.550442 | 1.164418 |



\- Distancia media post-divergencia \`[0.74,0.90]\`: \`0.669840\` frente a \`1.051097\` en v1.0.

\- Se incorporan dos cruces observables post-divergencia, aproximadamente en \`t=0.7635\` y \`t=0.7935\`; no fueron forzados con eventos.



**### Resultado**



\`APPLIED\`



**### Estado acumulado**



A: milestones \`0.12/0.34/0.74/0.90\`; sharpness \`35/20/18/35\`; amplitudes \`1.35/0.20/0.82\`; drift \`0.75/0.78\`; frecuencia \`37.6991118431\`, fase \`0.45\`; perturbaciones/memoria/center v1.0. B completo: v1.0.



**## PASS 4 — Densidad de aproximaciones**



**### Hipotesis**



Reducir moderadamente la frecuencia de 6 a 5.5 ciclos y adelantar la fase distribuira las reconvergencias tardias antes del presente, dejando una divergencia creciente al llegar a \`t=0.90\`.



**### Parametros autorizados**



\`oscillation.frequency\`, \`oscillation.phase\`.



**### Valores anteriores**



\`frequency=37.6991118431\` (\`12π\`, 6 ciclos), \`phase=0.45\`.



**### Valores seleccionados**



\`frequency=34.5575191895\` (\`11π\`, 5.5 ciclos), \`phase=0.25\`.



**### Razonamiento**



La reduccion de frecuencia es 8.33 %, moderada y constante. Mantiene una densidad alta durante la compatibilidad, pero desplaza las dos cancelaciones tardias hacia \`0.8447/0.8705\`; despues de la ultima, la distancia crece hasta el presente. No se introduce frecuencia variable.



**### Metricas**



\- Cruces observables totales: 10, aproximadamente \`0.0975, 0.1725, 0.2656, 0.3564, 0.4477, 0.5359, 0.6405, 0.7002, 0.8447, 0.8705\`.

\- Distribucion: 1 pre-encuentro, 2 de evolucion inicial, 5 en la region compatible y 2 post-divergencia.

\- Ultimo cruce: \`t≈0.8705\`, antes del presente \`0.90\`.

\- Zonas de proximidad post-divergencia: \`D_A(0.85)=0.0464\`; tras la segunda reconvergencia, \`D_A(0.90)=0.7029\` y la derivada numerica local de la distancia en \`t=0.90\` es positiva (\`≈30.97\` unidades de distancia/dominio).

\- Comportamiento simbolico posterior: \`D_A(0.95)=1.6328\`, \`D_A(1.00)=0.6088\`; no se interpreta como prediccion.



**### Resultado**



\`APPLIED\`



**### Estado acumulado**



A: milestones \`0.12/0.34/0.74/0.90\`; sharpness \`35/20/18/35\`; amplitudes \`1.35/0.20/0.82\`; drift \`0.75/0.78\`; frecuencia/fase \`34.5575191895/0.25\`; perturbaciones, center y memoria v1.0. B completo: v1.0.



**## PASS 5 — Organicidad**



**### Hipotesis**



Las perturbaciones asimetricas deterministas existentes ya rompen la periodicidad exacta sin ocultar la macroestructura lograda en Passes 1–4.



**### Parametros autorizados**



\`perturbations.carlos\`, \`perturbations.fer\`.



**### Valores anteriores**



Carlos: \`(0.10,21.9911,0.20)\`, \`(0.06,53.4071,1.10)\`, \`(0.035,91.1062,2.00)\`. Fer: \`(0.09,28.2743,1.40)\`, \`(0.055,59.6903,0.60)\`, \`(0.04,84.8230,2.50)\`.



**### Valores seleccionados**



SIN CAMBIO para los seis terminos.



**### Razonamiento**



Las frecuencias y fases individuales ya son diferentes entre personas y no son multiplos de la frecuencia principal calibrada (\`11π\`). El coupling suprime su peso durante compatibilidad y lo recupera cerca del presente, exactamente como prescribe Doc01. Alterarlas no mejoraria una deficiencia macro ya resuelta y agregaria complejidad sin evidencia.



**### Metricas**



\- Amplitud maxima teorica de perturbacion: Carlos \`0.195\`, Fer \`0.185\`.

\- Diferencia de perturbaciones acotada por \`0.380\`; durante coupling alto queda multiplicada por \`1-K(t)\`.

\- En \`t=0.60\`, \`K≈0.999967\`, por lo que la contribucion diferencial maxima queda por debajo de \`0.000013\`.

\- No existe \`Math.random()\` en \`src\`.



**### Resultado**



\`NO CHANGE\`



**### Estado acumulado**



A final previo a Gate A: milestones \`0.12/0.34/0.74/0.90\`; center v1.0; amplitudes \`1.35/0.20/0.82\`; frecuencia/fase \`34.5575191895/0.25\`; drift \`0.75/0.78\`; sharpness \`35/20/18/35\`; memoria y perturbaciones v1.0. B completo: v1.0.



**## GATE MODELO A**



**### Hipotesis**



El candidato acumulado mejora la macrolectura de A sin alterar contratos, ecuaciones ni familias congeladas.



**### Parametros evaluados**



Comparacion completa v1.0 → v1.1 de milestones, sharpness, amplitudes, drift, frecuencia, fase y perturbaciones.



**### Valores anteriores → seleccionados**



\- Milestones: \`0.12/0.40/0.70/0.90\` → \`0.12/0.34/0.74/0.90\`.

\- Sharpness: \`35/28/30/35\` → \`35/20/18/35\`.

\- Amplitudes: \`1.60/0.28/0.95\` → \`1.35/0.20/0.82\`.

\- Drift: \`0.75/1.10\` → \`0.75/0.78\`.

\- Frecuencia/fase: \`37.6991118431/0.45\` → \`34.5575191895/0.25\`.

\- Perturbaciones: SIN CAMBIO.



**### Razonamiento matematico**



El candidato mantiene amplitud positiva, orden estricto de milestones y transiciones logisticas continuas. \`Af>Bf\` permite reconvergencias tardias; la menor escala final modera la divergencia. La frecuencia constante de 5.5 ciclos sitúa las reconvergencias antes del presente.



**### Metricas relevantes**



\| t | D_A v1.0 | D_A v1.1 | A v1.0 | A v1.1 | B v1.0 | B v1.1 |

\|---:|---:|---:|---:|---:|---:|---:|

\| 0.00 | 1.396906 | 1.034649 | 1.599982 | 1.348722 | 0.738919 | 0.738921 |

\| 0.40 | 0.166930 | 0.468353 | 0.940083 | 0.467557 | 0.000177 | 0.001753 |

\| 0.50 | 0.158145 | 0.235069 | 0.357325 | 0.253178 | 0.002721 | 0.010239 |

\| 0.60 | 0.226836 | 0.271446 | 0.316639 | 0.252479 | 0.052168 | 0.058085 |

\| 0.70 | 1.159705 | 0.002388 | 0.615297 | 0.403842 | 0.550000 | 0.255367 |

\| 0.74 | 0.787086 | 0.714510 | 0.795008 | 0.510386 | 0.845377 | 0.390000 |

\| 0.85 | 1.913482 | 0.046355 | 0.942643 | 0.744825 | 1.087914 | 0.685371 |

\| 0.90 | 1.280305 | 0.702892 | 0.948344 | 0.787062 | 1.097280 | 0.738542 |

\| 1.00 | 1.550442 | 0.608764 | 0.949917 | 0.814302 | 1.099864 | 0.772829 |



\- Cruces observables: 10; dos post-divergencia; ultimo \`t≈0.8705\`.

\- Gate: 6/6 archivos, 29/29 tests PASS; typecheck PASS; build PASS.

\- \`Doc01\`, \`history.model.ts\`, \`history.events.ts\` y tests: sin diff.

\- Memoria \`1.4/0.20\`, coupling y eventos-metadata: intactos.



**### Resultado**



\`PASS\`



**### Estado acumulado**



Modelo A candidato consolidado igual al bloque de la seccion 24. Modelo B aun identico a v1.0.



**## PASS 6A — Decay de B**



**### Hipotesis**



Las tasas actuales ya equilibran convergencia visible y diferenciacion finita al final de la ventana.



**### Parametros autorizados**



\`carlos.decay\`, \`fer.decay\`.



**### Valores anteriores**



Carlos \`0.24\`; Fer \`0.255\`.



**### Valores seleccionados**



SIN CAMBIO: Carlos \`0.24\`; Fer \`0.255\`.



**### Razonamiento**



Las envolventes exponenciales decrecen de manera monotona a aproximadamente 9.07 % y 7.81 % de su valor inicial en \`t=10\`. No convergen tan rapido como para ocultar oscilaciones intermedias ni tan lento como para quedar lejos de \`L_B\`.



**### Metricas**



\| t | Envolvente Carlos | Envolvente Fer |

\|---:|---:|---:|

\| 0.0 | 2.600000 | 2.400000 |

\| 2.5 | 1.426910 | 1.268670 |

\| 5.0 | 0.783105 | 0.670634 |

\| 7.5 | 0.429777 | 0.354506 |

\| 10.0 | 0.235867 | 0.187396 |



**### Resultado**



\`NO CHANGE\`



**### Estado acumulado**



A candidato de Gate A; B continua completo en v1.0, con decay Carlos/Fer \`0.24/0.255\`.



**## PASS 6B — Amplitude de B**



**### Hipotesis**



Las amplitudes actuales producen diferenciacion inicial clara sin desbalancear las dos trayectorias.



**### Parametros autorizados**



\`carlos.amplitude\`, \`fer.amplitude\`.



**### Valores anteriores**



Carlos \`2.6\`; Fer \`2.4\`.



**### Valores seleccionados**



SIN CAMBIO: Carlos \`2.6\`; Fer \`2.4\`.



**### Razonamiento**



La diferencia nominal entre envolventes iniciales es solo \`0.2\` (8.0 % respecto de su media), mientras fases distintas producen offsets iniciales \`0.891534\` y \`1.530635\`. La separacion interpersonal inicial \`0.639101\` es perceptible pero no extrema.



**### Metricas**



\- Envolventes en \`t=0\`: \`2.6/2.4\`.

\- Offsets respecto de \`L_B(0)\`: Carlos \`0.891534\`, Fer \`1.530635\`.

\- \`D_B(0)=0.639101\`.



**### Resultado**



\`NO CHANGE\`



**### Estado acumulado**



A candidato de Gate A; B amplitudes \`2.6/2.4\` y decay \`0.24/0.255\`, sin cambios; frecuencia/fase aun v1.0.



**## PASS 6C — Frequency de B**



**### Hipotesis**



Las frecuencias actuales ya generan suficientes oscilaciones y cruces sin saturar la ventana.



**### Parametros autorizados**



\`carlos.frequency\`, \`fer.frequency\`.



**### Valores anteriores**



Carlos \`2.65\`; Fer \`2.90\`.



**### Valores seleccionados**



SIN CAMBIO: Carlos \`2.65\`; Fer \`2.90\`.



**### Razonamiento**



Las frecuencias diferentes evitan periodicidad interpersonal simple. En diez unidades producen aproximadamente 4.22 y 4.62 ciclos, dentro de la intencion v1.0 de cuatro a cinco oscilaciones visibles.



**### Metricas**



\- Ciclos visibles: Carlos \`4.217606\`; Fer \`4.615493\`.

\- Cruces Carlos–Fer en \`[0,10]\`: 9, aproximadamente \`0.0534, 1.1867, 2.3209, 3.4558, 4.5914, 5.7279, 6.8658, 8.0050, 9.1463\`.



**### Resultado**



\`NO CHANGE\`



**### Estado acumulado**



A candidato de Gate A; B amplitud/decay/frequency completos en v1.0; fases aun v1.0.



**## PASS 6D — Phase de B**



**### Hipotesis**



La relacion de fase actual ya mantiene las curvas diferenciadas y naturales durante toda la ventana.



**### Parametros autorizados**



\`carlos.phase\`, \`fer.phase\`.



**### Valores anteriores**



Carlos \`0.35\`; Fer \`2.45\`; diferencia relativa \`2.10 rad\`.



**### Valores seleccionados**



SIN CAMBIO: Carlos \`0.35\`; Fer \`2.45\`.



**### Razonamiento**



La diferencia de fase, combinada con frecuencias distintas, evita simetria espejo y produce encuentros no uniformes. Cambiarla no aportaria una mejora cuantitativa necesaria y podria degradar la diferenciacion inicial ya adecuada.



**### Metricas**



\- Diferencia de fase inicial: \`2.10 rad\` (\`≈120.32°\`).

\- \`D_B(0)=0.639101\`.

\- Nueve encuentros numericos no equiespaciados exactamente por la diferencia de frecuencias y decays.



**### Resultado**



\`NO CHANGE\`



**### Estado acumulado**



A candidato de Gate A. B completo SIN CAMBIO respecto de v1.0: Carlos \`(2.6,0.24,2.65,0.35)\`, Fer \`(2.4,0.255,2.90,2.45)\`.



**## GATE MODELO B**



**### Hipotesis**



Mantener B en v1.0 conserva una geometria ya satisfactoria y todos sus contratos asintoticos.



**### Parametros evaluados**



Decay, amplitude, frequency y phase de Carlos y Fer, en el orden 6A–6D.



**### Valores anteriores y seleccionados**



SIN CAMBIO: Carlos \`(amplitude=2.6, decay=0.24, frequency=2.65, phase=0.35)\`; Fer \`(2.4,0.255,2.90,2.45)\`.



**### Razonamiento matematico**



Ambos decays siguen siendo positivos, por lo que las cotas \`A exp(-alpha t)\` tienden a cero. En la ventana finita existe diferenciacion, oscilacion no monotona y multiples encuentros, sin colapso artificial en \`t=10\`.



**### Metricas relevantes**



\- Envolventes en \`t=10\`: Carlos \`0.235867\`, Fer \`0.187396\`.

\- Distancias reales a \`L_B(10)\`: Carlos \`0.233341\`, Fer \`0.006384\`.

\- Distancia interpersonal \`D_B(10)=0.226957\`.

\- Ciclos visibles: \`4.217606/4.615493\`; cruces interpersonales: 9.

\- Gate: 6/6 archivos, 29/29 tests PASS; typecheck PASS; build PASS.

\- \`asymptote.parameters.ts\` y \`asymptote.model.ts\`: sin diff; propiedad asintotica intacta.



**### Resultado**



\`PASS\`



**### Estado acumulado**



A candidato aprobado por Gate A; B identico a v1.0 y aprobado por Gate B. Animacion aun en valores v1.0 hasta Pass 7.



**## PASS 7 — Duracion y ritmo**



**### Hipotesis**



Igualar ambas duraciones a 30 s dara tiempo perceptual suficiente a B y A sin deformar el tiempo matematico ni modificar el comportamiento de loop.



**### Parametros autorizados**



Duracion runtime de B y A; conservar inicialmente \`loopDelay\`.



**### Valores anteriores**



B \`duration=12000\`, \`loopDelay=2800\`; A \`duration=24000\`, \`loopDelay=4000\`.



**### Valores seleccionados**



B \`duration=30000\`, \`loopDelay=2800\`; A \`duration=30000\`, \`loopDelay=4000\`.



**### Razonamiento**



El cambio afecta solo la parametrizacion visual lineal: B se ralentiza por factor \`2.5\`, A por factor \`1.25\`. Easing, autoplay, loop, curve timing y viewport activation permanecen intactos. No se probaron otras duraciones.



**### Metricas**



\- Ciclo B: \`32.8 s\` incluyendo pausa (antes \`14.8 s\`).

\- Ciclo A: \`34.0 s\` incluyendo pausa (antes \`28.0 s\`).

\- Progreso matematico sigue siendo lineal y proporcional al progreso visual.



**### Resultado**



\`APPLIED — PENDING FINAL VISUAL REVIEW\`



**### Estado acumulado**



Candidato completo: A calibrado; B sin cambios; duraciones \`30/30 s\`; loopDelay \`2.8/4.0 s\`. Pendiente unicamente Gate Final automatizado y revision visual humana posterior.



**## GATE FINAL**



**### Hipotesis**



El candidato completo cumple contratos, limita los cambios a parametros autorizados y queda listo para revision visual humana.



**### Parametros evaluados**



Configuracion consolidada de A y B, duraciones runtime, integridad del Core y superficie completa del diff.



**### Valores anteriores y seleccionados**



A: cambios numericos consolidados en la seccion 24. B: SIN CAMBIO. Animacion: B \`12000→30000\`, A \`24000→30000\`; loopDelay SIN CAMBIO.



**### Razonamiento matematico**



Las ecuaciones y validaciones no cambiaron. A conserva orden estricto, amplitudes positivas, memoria y coupling canonicos; B conserva amplitudes/decays positivos y convergencia exponencial. Los unicos cambios de presentacion son las dos duraciones.



**### Metricas y auditoria**



\- Tests: 6/6 archivos, 29/29 tests PASS.

\- Typecheck: PASS.

\- Build: PASS.

\- \`git diff --check\`: PASS.

\- Doc01, Doc02, Doc03, Baseline v1.0 y \`docs/future\`: intactos.

\- Modelos, ecuaciones, validaciones, memoria, eventos y tests: intactos.

\- \`Math.random()\`: ausente en \`src\`.

\- Archivos runtime modificados: \`history.parameters.ts\`, \`asymptote.section.ts\`, \`history.section.ts\`.

\- \`asymptote.parameters.ts\`: intacto.

\- Sin musica, sincronizacion ni timeline audiovisual.



**### Resultado**



\`PASS\`



**### Estado acumulado**



FINAL CANDIDATE v1.1. \`STATUS: CALIBRATED / APPROVED\`.



\---



**# 31. Final-segment microcalibration — HISTORICAL / SUPERSEDED**



Alcance exclusivo: tramo final del Modelo A, \`t ∈ [0.74,1]\`. La ejecucion parte del candidato v1.1 calibrado y mantiene congelados ecuaciones, milestones, sharpness, amplitudes inicial/minima, drift inicial, center, memoria, perturbaciones, Modelo B y animacion.



**## PASS F1 — Escala del tramo final**



**### Hipotesis**



Aumentar moderadamente \`finalAmplitude\` y \`drift.final\`, conservando la primera por encima de la segunda, pronunciara los lobulos sin eliminar las dos reconvergencias anteriores al presente.



**### Valores anteriores**



\`finalAmplitude=0.82\`, \`drift.final=0.78\`.



**### Valores seleccionados**



\`finalAmplitude=0.95\`, \`drift.final=0.86\`.



**### Razonamiento**



Se cumple \`0.95 > 0.86 > minimumAmplitude=0.20\`. La amplitud conserva capacidad de cancelar temporalmente el drift, mientras la mayor escala aumenta separaciones tardias sin modificar la estructura temporal.



**### Metricas del candidato F1**



\`D_A\` en \`t=0.74/0.80/0.84/0.85/0.87/0.90/0.95/1.00\`: \`0.795876 / 0.922137 / 0.031842 / 0.087505 / 0.038984 / 0.770748 / 1.837563 / 0.656161\`.



Cruces post-divergencia: \`t≈0.84211\` y \`t≈0.87264\`, ambos antes de \`present=0.90\`.



**### Resultado**



\`APPLIED\`



**### Estado acumulado**



F1: amplitudes \`1.35/0.20/0.95\`, drift \`0.75/0.86\`; frecuencia/fase aun \`11π/0.25\`.



**## PASS F2 — Frecuencia global**



**### Hipotesis**



Elevar la frecuencia constante de \`11π\` a \`11.5π\` aumentara ligeramente el recorrido sin saturar la macroestructura inicial.



**### Valores anteriores**



\`frequency=34.5575191895\` (\`11π\`).



**### Valores seleccionados**



\`frequency=36.1283155163\` (\`11.5π\`).



**### Razonamiento**



El incremento es de 4.55 % y añade solo un cuarto de ciclo al dominio completo. Se mantienen ocho cruces antes de \`t=0.74\` y dos reconvergencias antes del presente. Con la fase aun en \`0.25\`, el cierre queda casi colapsado (\`D_A(1)=0.024298\`), por lo que se requiere F3.



**### Metricas del candidato F2**



\`D_A\` en \`t=0.74/0.80/0.84/0.85/0.87/0.90/0.95/1.00\`: \`0.982452 / 0.056493 / 0.127800 / 0.371655 / 0.981480 / 1.717071 / 0.894898 / 0.024298\`.



Cruces post-divergencia: \`t≈0.80373\`, \`0.83283\` y, ya en continuacion simbolica, \`0.98646\`.



**### Resultado**



\`APPLIED\`



**### Estado acumulado**



F2: escala final \`0.95/0.86\`, frecuencia \`11.5π\`, fase aun \`0.25\`.



**## PASS F3 — Fase de cierre**



**### Hipotesis**



Desplazar moderadamente la fase colocara el ultimo lóbulo con separacion positiva creciente en \`t=1\` y pendientes individuales opuestas.



**### Valores anteriores**



\`phase=0.25\`.



**### Valor seleccionado**



\`phase=0.90\`.



**### Razonamiento**



El desplazamiento de \`0.65 rad\` conserva dos reconvergencias entre divergencia y presente. La frecuencia de 5.75 ciclos implica que la continuacion simbolica contiene otro par breve de cruces; despues de ellos, la separacion vuelve a crecer y ambas trayectorias llegan a \`t=1\` moviendose en sentidos opuestos.



**### Metricas finales**



\| t | D_A(t) | C_A(t) | F_A(t) |

\|---:|---:|---:|---:|

\| 0.74 | 0.773032 | 0.526624 | -0.246408 |

\| 0.80 | 0.117871 | 0.113527 | 0.231398 |

\| 0.84 | 0.602383 | 0.510010 | -0.092373 |

\| 0.85 | 0.915499 | 0.678436 | -0.237064 |

\| 0.87 | 1.450425 | 0.979573 | -0.470851 |

\| 0.90 | 1.656869 | 1.117829 | -0.539040 |

\| 0.95 | 0.332890 | 0.585852 | 0.252962 |

\| 1.00 | 0.303245 | 0.404687 | 0.101442 |



Cruces post-divergencia: \`t≈0.784563\`, \`0.815782\`; en continuacion simbolica posterior al presente: \`0.971422\`, \`0.980198\`.



Pendientes numericas en \`t=1\`: \`C_A'(1)≈+12.146776\`, \`F_A'(1)≈-12.842967\`. La distancia tambien esta creciendo: \`D_A'(1)≈+24.989742\`.



**### Resultado**



\`APPLIED\`



**### Estado acumulado**



Modelo A final: \`finalAmplitude=0.95\`, \`drift.final=0.86\`, \`frequency=36.1283155163\`, \`phase=0.90\`. Todos los parametros fuera del alcance permanecen iguales al candidato v1.1 previo.



**## Gate final de microcalibracion**



\- Tests: 6/6 archivos, 29/29 tests PASS.

\- Typecheck: PASS.

\- Build: PASS.

\- \`git diff --check\`: PASS.

\- Modelo B, animacion, ecuaciones, Doc01 y familias congeladas: intactos.



Resultado: \`PASS\`.



Estado: \`CALIBRATED — PENDING FINAL VISUAL REVIEW\`.



\---



**# 32. F1 isolated validation — HISTORICAL / SUPERSEDED**



Esta iteracion reemplaza el candidato de cierre documentado en la seccion 31. Su unico objetivo es evaluar el efecto de escala tardia de F1 manteniendo exactamente la distribucion temporal de cruces del Baseline v1.1 aprobado.



**## Estado de los passes anteriores**



\- **\*\*F1:\*\*** queda \`IN EVALUATION\` con \`oscillation.finalAmplitude=0.95\` y \`drift.final=0.86\`.

\- **\*\*F2:\*\*** \`REVERTED\`; \`oscillation.frequency\` vuelve de \`36.1283155163\` (\`11.5π\`) a \`34.5575191895\` (\`11π\`).

\- **\*\*F3:\*\*** \`REVERTED\`; \`oscillation.phase\` vuelve de \`0.90\` a \`0.25\`.

\- El candidato \`phase=0.90\` queda \`REJECTED\`: introdujo dos cruces adicionales despues del presente (\`t≈0.971422\` y \`t≈0.980198\`) y comprimio visualmente el cierre.



**## Parametros anteriores y candidato aislado**



\| Parametro | Baseline v1.1 aprobado | Candidato F1 aislado |

\|---|---:|---:|

\| \`finalAmplitude\` | 0.82 | 0.95 |

\| \`drift.final\` | 0.78 | 0.86 |

\| \`frequency\` | 34.5575191895 | 34.5575191895 — SIN CAMBIO |

\| \`phase\` | 0.25 | 0.25 — SIN CAMBIO |



No se modifica ningun otro parametro.



**## Metricas de F1 aislado**



\| t | D_A(t) | C_A(t) | F_A(t) |

\|---:|---:|---:|---:|

\| 0.74 | 0.795876 | 0.538046 | -0.257830 |

\| 0.80 | 0.922137 | 0.633531 | -0.288606 |

\| 0.84 | 0.031842 | 0.224740 | 0.192898 |

\| 0.85 | 0.087505 | 0.176933 | 0.264439 |

\| 0.87 | 0.038984 | 0.234869 | 0.273853 |

\| 0.90 | 0.770748 | 0.674768 | -0.095979 |

\| 0.95 | 1.837563 | 1.338188 | -0.499375 |

\| 1.00 | 0.656161 | 0.581145 | -0.075016 |



Todos los cruces en \`[0.74,1]\`: \`t≈0.842116\` y \`t≈0.872644\`. Por tanto existen dos reconvergencias en \`[0.74,0.90]\` y cero cruces en \`(0.90,1]\`.



Pendientes numericas en \`t=1\`: \`C_A'(1)≈-16.964441\`, \`F_A'(1)≈+16.268249\`. Son de signo opuesto, pero \`D_A'(1)≈-33.232690\`: la distancia desciende localmente al final. Esta observacion se registra sin modificar fase ni frecuencia.



**## Evaluacion**



\- Dos reconvergencias antes del presente: \`PASS\`.

\- Cero cruces despues del presente: \`PASS\`.

\- Lobulos mas pronunciados que en Baseline v1.1: \`PASS\`.

\- Separacion creciente al aproximarse a \`present=0.90\`: \`PASS\` despues del segundo cruce.

\- Continuacion simbolica uniformemente divergente hasta \`t=1\`: \`PARTIAL\`; aparece un lóbulo fuerte en \`t≈0.95\`, pero la distancia decrece al llegar a \`t=1\`.

\- Macroestructura inicial y central intacta: \`PASS\`.



Resultado de iteracion: \`F1 IN EVALUATION\`.



\`STATUS: CALIBRATED / APPROVED\`.



**## Gate de F1 aislado**



\- Tests: 6/6 archivos, 29/29 tests PASS.

\- Typecheck: PASS.

\- Build: PASS.

\- \`git diff --check\`: PASS.

\- Modelo B, animacion, ecuaciones y todos los parametros fuera de F1: intactos.
\---

**# 33. Final manual alignment — Baseline Parameter Set v1.1**

Esta sección cierra la calibración de parámetros de v1.1 y prevalece sobre los candidatos intermedios documentados en las secciones históricas de calibración.

La configuración fue aceptada visualmente después de ajustar manualmente el comportamiento global del Modelo A. Los cambios continúan dentro de las familias ya permitidas por Doc01; no se modifican ecuaciones, invariantes, memoria, coupling, eventos ni arquitectura.

**## 33.1 Modelo A — parámetros finales aprobados**

```ts
export const historyParametersV11 = {
  domain: { start: 0, end: 1 },

  milestones: {
    encounter: 0.12,
    peak: 0.28,
    divergence: 0.74,
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
    initialAmplitude: 1.35,
    minimumAmplitude: 0.20,
    finalAmplitude: 0.95,
    frequency: 44.5575191895,
    phase: 0.25
  },

  drift: {
    initial: 0.75,
    final: 0.96
  },

  transitions: {
    encounterSharpness: 35,
    peakSharpness: 20,
    divergenceSharpness: 18,
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

**## 33.2 Diferencias finales frente a Baseline v1.0**

| Parámetro | v1.0 | v1.1 final |
|---|---:|---:|
| `milestones.peak` | 0.40 | **0.28** |
| `milestones.divergence` | 0.70 | **0.74** |
| `initialAmplitude` | 1.60 | **1.35** |
| `minimumAmplitude` | 0.28 | **0.20** |
| `finalAmplitude` | 0.95 | **0.95 — SIN CAMBIO respecto de v1.0** |
| `oscillation.frequency` | 37.6991118431 | **44.5575191895** |
| `oscillation.phase` | 0.45 | **0.25** |
| `drift.initial` | 0.75 | **0.75 — SIN CAMBIO** |
| `drift.final` | 1.10 | **0.96** |
| `peakSharpness` | 28 | **20** |
| `divergenceSharpness` | 30 | **18** |
| `encounterSharpness` | 35 | **35 — SIN CAMBIO** |
| `presentSharpness` | 35 | **35 — SIN CAMBIO** |

Center, memoria y perturbaciones permanecen sin cambio respecto de v1.0.

**## 33.3 Modelo B — final v1.1**

Modelo B permanece matemáticamente idéntico al Baseline v1.0:

```ts
export const asymptoteParametersV11 = {
  domain: { start: 0, end: 10 },
  limit: { slope: 0.12, intercept: 0 },
  carlos: { amplitude: 2.6, decay: 0.24, frequency: 2.65, phase: 0.35 },
  fer: { amplitude: 2.4, decay: 0.255, frequency: 2.90, phase: 2.45 }
};
```

No se requirió recalibración matemática de B.

**## 33.4 Animación final v1.1**

```ts
export const animationBaselineV11 = {
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

La duración pertenece a la capa de presentación y no modifica el tiempo matemático.

**## 33.5 Interpretación del ajuste final de A**

La configuración final aceptada busca:

```text
independencia
→ aproximaciones iniciales
→ entrada más temprana a máxima compatibilidad
→ periodo prolongado con mayor densidad de oscilaciones
→ divergencia posterior
→ reconvergencias residuales
→ separación estructural creciente
→ continuación simbólica con cierre divergente
```

El cambio de `peak` a `0.28` amplía el territorio de máxima compatibilidad sin alterar `encounter`, `divergence` o `present`.

El incremento de `oscillation.frequency` a `44.5575191895` aumenta la densidad global de oscilaciones dentro del dominio normalizado. La frecuencia continúa siendo constante, conforme al modelo congelado.

La combinación:

```text
finalAmplitude = 0.95
drift.final = 0.96
```

produce un régimen final donde la deriva estructural es ligeramente mayor que la amplitud principal. Por tanto, la separación progresiva comienza a imponerse sobre la capacidad de cancelación de la oscilación principal sin eliminar los acercamientos permitidos durante la transición posterior a `t_d`.

**## 33.6 Estado de la calibración**

```text
BASELINE PARAMETER SET v1.1
STATUS: CALIBRATED / APPROVED
SOURCE: BASELINE v1.0
CORE CONTRACT: FROZEN
PARAMETER CALIBRATION: CLOSED
```

Las secciones 31 y 32 se conservan únicamente como historial de candidatos descartados o intermedios. No representan la configuración vigente.

La siguiente intervención técnica identificada pertenece a la capa de animación/rendering: sincronizar el reveal de las curvas por progreso temporal en lugar de longitud geométrica del path SVG. Esa corrección no modifica este Baseline Parameter Set v1.1.
