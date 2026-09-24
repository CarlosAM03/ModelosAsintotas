# Modelos Asíntotas — Feature Proposal v1.1

## Sincronización audiovisual de la carta digital

**Estado:** propuesta preservada para después de Core v1.0  
**Versión objetivo:** v1.1  
**Regla:** no implementar hasta validar localmente los Modelos A y B.

## 1. Idea

Incorporar una capa musical a la carta digital. La referencia propuesta es **“Love Is in the Air Pt. 1”**, mencionada como parte del soundtrack de *Obsesión*. La versión exacta y los timestamps deberán verificarse antes de congelar la sincronización.

La música no formará parte de los modelos matemáticos ni modificará sus ecuaciones. Funcionará como capa narrativa y temporal:

**Matemática → Sampling → Geometría → SVG → Animación → Composición audiovisual**

Intención preliminar:

- aproximadamente 0:15–0:58: entrada tranquila/cálida, introducción y Modelo B;
- alrededor de 0:58: ruptura musical y transición hacia la lectura histórica;
- aproximadamente hasta 1:25: clímax que podría coincidir con la región de pico del Modelo A;
- sección restante: divergencia, aproximaciones residuales, presente y cierre;
- idealmente, el cierre de A coincide con el cierre musical.

Los timestamps son referencias de diseño, no decisiones cerradas.

## 2. Restricción fundamental

No cambiar ecuaciones, milestones ni geometría matemática para hacerlos coincidir con la canción.

Cuando sea necesario sincronizar una región matemática con un momento musical, deberá modificarse la correspondencia entre **tiempo visual/audiovisual** y **tiempo matemático**, no el Modelo A o B.

El Documento 01 permanece como autoridad matemática y no debería modificarse por este feature.

## 3. Variante A — Audio ambiental independiente

La canción funciona como fondo mientras exista alguna gráfica activa.

Posible comportamiento:

- una interacción explícita inicia la experiencia y habilita audio;
- el audio continúa mientras B o A se reproduce;
- puede pausarse si ninguna animación está activa;
- puede funcionar en loop;
- las gráficas mantienen sus tiempos independientes.

**Ventajas:** sencilla, bajo riesgo, buena para prototipo audiovisual.  
**Desventajas:** los cambios musicales no coinciden necesariamente con los momentos narrativos y el loop puede romper la relación emocional.

**Estado:** conservada como prueba rápida.

## 4. Variante B — Un minuto por modelo

- Modelo B: aproximadamente primer minuto.
- Modelo A: aproximadamente segundo minuto.
- Animación cercana a 60 s por modelo.

**Ventajas:** correspondencia simple y segmentos musicales claramente asignados.  
**Desventajas:** el cambio alrededor de 0:58 sucede prácticamente al comenzar A, dificultando construir la aproximación hacia su pico.

**Estado:** conservada, pero no preferida actualmente.

## 5. Variante C — Timeline audiovisual global

La carta utiliza un único reloj narrativo:

```text
ExperienceTimeline
│
├── AudioController
├── Model B AnimationController
├── Transition Controller
├── Model A AnimationController
└── Closing Controller
```

Una acción explícita como `iniciar` puede habilitar simultáneamente audio y experiencia.

La timeline coordinaría introducción, B, transición, A, pico, divergencia, presente y cierre.

**Ventajas:** máxima coherencia narrativa, sincronización precisa y un solo reloj audiovisual.  
**Desventajas:** mayor complejidad; requiere manejar pausa, reanudación, scroll y cambio de pestaña.

**Estado:** recomendada para v1.1.

## 6. Variante D — Timeline global + mapeo temporal por regiones

Extiende la Variante C.

El dominio matemático permanece intacto, por ejemplo `t ∈ [0,1]`, pero su avance visible puede mapearse por tramos al reloj audiovisual.

Ejemplo:

```text
Audio / experiencia       Modelo A
entrada                   prehistoria / aproximación
ruptura musical           aproximación final
clímax                    pico
salida del clímax         divergencia
alteraciones finales      oscilaciones / proximidad residual
cierre musical            presente / cierre
```

Esto permite que el pico permanezca en pantalla aproximadamente lo que dura el clímax musical sin cambiar las ecuaciones.

**Ventajas:** mejor sincronización y preservación completa de la matemática.  
**Desventajas:** requiere una transformación temporal adicional y calibración audiovisual cuidadosa.

**Estado:** variante técnicamente preferida dentro de la Timeline Global.

## 7. Recomendación

Para v1.1, evaluar principalmente:

**Timeline audiovisual global + mapeo temporal por regiones.**

Orden recomendado:

1. terminar Core v1.0 sin audio;
2. ejecutar B y A localmente;
3. calibrar geometría exclusivamente por significado matemático;
4. aceptar/congelar temporalmente esa calibración;
5. verificar la versión exacta del audio y timestamps;
6. identificar transiciones musicales;
7. diseñar `ExperienceTimeline`;
8. definir mapeo audiovisual ↔ matemático;
9. integrar audio;
10. validar sincronización;
11. ajustar composición y texto.

La Variante A puede utilizarse antes como prototipo rápido. Las demás permanecen documentadas para no descartarlas prematuramente.

## 8. Mapa preliminar

| Tiempo aproximado | Música | Carta |
|---|---|---|
| ~0:15 | entrada tranquila | introducción / Modelo B |
| 0:15–0:58 | desarrollo cálido | Modelo B y transición |
| ~0:58 | ruptura | entrada/transición hacia Modelo A |
| ~0:58–1:25 | mayor intensidad | aproximación final y/o pico de A |
| ~1:25 en adelante | cambios posteriores | divergencia y oscilaciones residuales |
| cierre | cierre musical | presente / cierre de A / cierre de carta |

## 9. Reproducción

La futura arquitectura deberá considerar:

- inicio mediante interacción explícita;
- play/pause/reanudación sincronizados;
- replay completo;
- cambio de pestaña;
- scroll fuera de sección;
- prevención de múltiples relojes;
- `prefers-reduced-motion`;
- preferencia de audio/mute;
- fallback sin audio.

La carta deberá seguir siendo comprensible sin música.

## 10. Impacto en especificaciones

### Documento 01
No debería cambiar. La música no pertenece a la matemática.

### Documento 02
Podrá ampliarse con `ExperienceTimeline`, `AudioController`, sincronización, mapeo temporal, pausa/reanudación y ciclo de vida audiovisual.

### Documento 03
Podrá añadir una fase v1.1 para audio, timeline, sincronización, pruebas y fallback.

### Documento 04
No deberá alterar parámetros matemáticos por razones musicales. Podrá incorporar configuración audiovisual: timestamps, offsets, regiones, duraciones y timings.

## 11. Derechos y distribución

La referencia propuesta es una grabación comercial. Antes de publicar una versión que distribuya directamente el archivo musical deberá resolverse su uso legítimo. Esto no impide diseñar o probar localmente la arquitectura con un archivo disponible legítimamente para esas pruebas.

## 12. Criterio de activación

No implementar hasta que:

- B funcione localmente;
- A funcione localmente;
- ambos hayan sido inspeccionados visualmente;
- su comportamiento matemático haya sido aceptado;
- la animación base sea estable.

## 13. Decisión preservada

La intención no es simplemente agregar música de fondo.

La posibilidad principal es utilizar la música como **estructura temporal de la carta**, haciendo coincidir cambios de intensidad con la transición entre la metáfora asintótica y la lectura histórica del segundo modelo, sin alterar el significado matemático.

La implementación definitiva permanece abierta hasta observar Core v1.0.
