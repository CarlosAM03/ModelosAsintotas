# Modelos Asíntotas

## Acta de Freeze y Cierre de Producción

### Versión 1.1.0 — Production Freeze

**Estado:** `FROZEN — CLOSED — DEPLOYED TO PRODUCTION`  
**Fecha de cierre:** 28 de septiembre de 2026  
**Repositorio:** `CarlosAM03/ModelosAsintotas`  
**Producción:** `https://modelos-asintotas.vercel.app`  
**Plataforma de despliegue:** Vercel  
**Versión congelada:** `v1.1.0`

---

# 1. Propósito del acta

La presente acta formaliza el cierre de **Modelos Asíntotas v1.1.0** como primera versión completa, funcional y desplegada en producción de la obra.

A partir de este punto, el repositorio deja de considerarse un proyecto en desarrollo activo y pasa a considerarse una versión terminada y preservada.

El commit que incorpore esta acta y sea etiquetado como `v1.1.0` constituirá el **punto oficial de rollback estable** del proyecto.

Cualquier modificación futura deberá partir de este estado sin alterar retrospectivamente el significado, comportamiento ni decisiones que conforman esta versión.

---

# 2. Naturaleza del proyecto

**Modelos Asíntotas** es una carta digital interactiva construida mediante modelos matemáticos, visualización SVG, animación temporal y una capa audiovisual.

No fue concebido como producto comercial, plataforma SaaS, sistema empresarial, aplicación de propósito general ni producto académico convencional. Su finalidad principal es expresiva.

La obra surgió como respuesta a una conversación personal y como una forma de representar, mediante matemáticas y software, una interpretación de dos trayectorias personales, su aproximación, sus cruces, su divergencia y aquello que permanece después de una interacción significativa.

La implementación tecnológica existe para hacer observables los modelos y permitir que esa lectura pueda recorrerse como una carta.

---

# 3. Sentido de cierre

La versión 1.1.0 representa el punto en el que la intención original del proyecto se considera satisfecha.

El proyecto nació de una mezcla de cariño, amor, desamor, dolor, nostalgia, memoria, necesidad de comprender y necesidad de expresar mediante un lenguaje propio.

Su origen no fue la búsqueda de una solución técnica, sino la necesidad de responder a una experiencia humana utilizando las herramientas con las que su autor mejor sabe construir significado: matemáticas, sistemas y software.

En ese sentido, la obra trasciende su implementación.

Los modelos, las curvas, el hilo compartido, las animaciones y la música constituyen una interpretación personal de una historia que tuvo un punto de máxima cercanía y que posteriormente cambió.

La existencia de esta carta no pretende modificar decisiones ajenas, reconstruir una relación ni producir una conclusión determinada. Su propósito es dejar constancia de que esa historia tuvo valor, de que fue sentida profundamente y de que mereció ser expresada.

De forma personal y deliberadamente simbólica, esta versión puede considerarse el **último acto de amor asociado a esa historia**: no como intento de retenerla, sino como una manera de cerrar una respuesta que necesitaba existir.

---

# 4. Estado técnico congelado

A la fecha de cierre, la arquitectura estable del proyecto queda definida por el siguiente flujo:

```text
Matemática
→ Sampling
→ Geometría
→ SVG
→ Animación
→ Experiencia
→ Capa audiovisual
```

La aplicación es completamente estática.

Stack principal:

- TypeScript;
- HTML;
- CSS;
- SVG;
- Vite;
- Vitest.

No requiere backend, base de datos, autenticación, persistencia, APIs de runtime, secretos, variables de entorno ni infraestructura propia.

---

# 5. Estado de las capas del proyecto

## 5.1 Mathematical Core v1.0

**Estado:** `FROZEN`

Los modelos matemáticos quedan cerrados. No forman parte de futuras iteraciones visuales o de infraestructura salvo decisión explícita de reabrir la autoridad matemática.

## 5.2 Baseline Parameter Set v1.1

**Estado:** `FROZEN / CALIBRATED / APPROVED`

Los parámetros numéricos aprobados permanecen congelados. La representación actual de Model A y Model B constituye la calibración aceptada de esta versión.

## 5.3 Presentation & Experience v1.0

**Estado:** `ACCEPTED`

La experiencia de presentación se considera estable. La versión está optimizada principalmente para dispositivos móviles.

El comportamiento en escritorio es funcional y aceptado, aunque podrían existir pequeñas imperfecciones de ritmo o desplazamiento automático que no justifican reabrir esta versión.

La lectura detallada continúa siendo posible desactivando autoplay y recorriendo la carta manualmente.

## 5.4 Ambient Audiovisual Experience v1.1.0

**Estado:** `ACCEPTED`

La capa audiovisual queda integrada como acompañamiento narrativo de la experiencia.

Principios preservados:

- la música no gobierna los modelos matemáticos;
- no existe beat synchronization;
- no existe mathematical time remapping;
- las animaciones conservan sus tiempos propios;
- el audio acompaña el recorrido automático;
- el modo manual permanece independiente del soundtrack.

---

# 6. Contratos congelados

Los siguientes comportamientos se consideran parte de la identidad de `v1.1.0` y no deben modificarse dentro de esta versión:

- Model B conserva una duración de 30 segundos;
- Model A conserva una duración de 30 segundos;
- Model B conserva 700 muestras;
- Model A conserva 900 muestras;
- el reveal de las curvas depende de tiempo matemático y no de longitud geométrica SVG;
- los modelos A y B permanecen matemáticamente independientes;
- el hilo compartido conserva su representación dorada;
- el halo del hilo utiliza la misma geometría temporal que el trazo principal;
- `ExperienceController` permanece como autoridad del recorrido visual;
- `AudioController` permanece desacoplado de los modelos;
- `Abrir carta` inicia la experiencia audiovisual;
- autoplay OFF detiene la reproducción musical;
- reiniciar autoplay reinicia la experiencia y el audio desde cero;
- el modo manual no inicia soundtrack;
- la experiencia permanece comprensible sin audio;
- reduced motion conserva navegación manual y curvas completas;
- la versión no utiliza backend ni servicios de ejecución propios.

---

# 7. Timing aceptado

La composición final de esta versión utiliza como referencias nominales:

```text
Transition hold:       2.2 s
Model A start:        ~55.5 s
Musical knot:         ~59.0 s
Nominal journey:      ~119.5 s
```

Estas referencias pertenecen a presentación y composición audiovisual. No constituyen parámetros matemáticos.

Las pequeñas diferencias perceptuales causadas por viewport, navegador, scrolling o dispositivo se consideran aceptables mientras la experiencia principal permanezca funcional.

---

# 8. Validación técnica previa al freeze

Antes del cierre fueron ejecutados satisfactoriamente:

```text
npm ci
npm test
npm run typecheck
npm run build
```

Resultado final conocido:

```text
Test files: 12 passed
Tests:      42 passed
Typecheck:  PASS
Build:      PASS
```

El build de producción genera correctamente:

```text
dist/index.html
dist/assets/*
dist/audio/background.mp3
```

La aplicación fue validada mediante preview de producción antes del despliegue.

---

# 9. Producción

La versión queda desplegada públicamente en:

```text
https://modelos-asintotas.vercel.app
```

Proveedor:

```text
Vercel
```

Características del deployment:

- Vite static deployment;
- Node.js 22.x para build;
- root directory estándar;
- build mediante `npm run build`;
- salida `dist`;
- sin `vercel.json`;
- sin variables de entorno;
- sin backend;
- sin infraestructura adicional.

La experiencia móvil fue validada como suficientemente satisfactoria para el propósito real de la obra.

---

# 10. Criterio de aceptación final

La versión 1.1.0 se considera terminada porque satisface la intención original del proyecto:

1. los dos modelos matemáticos existen y permanecen coherentes con sus especificaciones;
2. las trayectorias pueden observarse de manera animada;
3. la carta ofrece un recorrido narrativo completo;
4. la experiencia audiovisual funciona;
5. el contenido puede recorrerse automáticamente o leerse manualmente;
6. la experiencia móvil resulta satisfactoria;
7. la aplicación está desplegada y accesible públicamente;
8. no existen bloqueos técnicos conocidos que impidan su propósito;
9. cualquier refinamiento restante sería incremental y no necesario para completar la intención original.

Por lo anterior:

> **Modelos Asíntotas v1.1.0 queda oficialmente aceptado, cerrado y congelado como primer release funcional de producción.**

---

# 11. Política de cambios futuros

No existe actualmente una versión posterior planificada.

El repositorio puede permanecer indefinidamente en este estado.

Si en el futuro se decide continuar el proyecto, cualquier nueva modificación deberá tratarse como una evolución posterior a `v1.1.0`.

El punto congelado debe preservarse mediante:

```text
Git commit de freeze
+
tag v1.1.0
```

El tag representa el rollback estable de la obra.

Una futura versión deberá partir desde ese estado y documentar explícitamente cualquier cambio que afecte matemática, parámetros, experiencia, narrativa, audiovisual o infraestructura.

La existencia de una posible futura versión no invalida ni reemplaza el significado de `v1.1.0`.

---

# 12. Regla de rollback

En caso de futuras modificaciones, experimentos o expansiones que deterioren la experiencia, introduzcan regresiones o cambien la intención original, el estado definido por el tag:

```text
v1.1.0
```

debe considerarse el punto oficial de restauración.

Este freeze existe precisamente para mantener una versión conocida, estable, funcional y emocionalmente completa de la obra.

---

# 13. Alcance del freeze

Este freeze comprende conjuntamente:

```text
Mathematical Core v1.0
+
Baseline Parameter Set v1.1
+
Presentation & Experience v1.0
+
Ambient Audiovisual Experience v1.1.0
+
Production Deployment
```

y los considera, en conjunto, la versión:

```text
Modelos Asíntotas v1.1.0
```

---

# 14. Declaración final

**Modelos Asíntotas** comenzó con una frase y terminó convirtiéndose en dos modelos matemáticos, una arquitectura de software, una visualización animada y una carta audiovisual.

Su valor final no depende de la complejidad del código ni del número de funciones implementadas.

El software fue el medio.

La obra fue la respuesta.

El proyecto queda cerrado no porque toda posible mejora haya sido agotada, sino porque ya expresa aquello para lo que fue creado.

Las trayectorias pueden continuar fuera de la gráfica y fuera del proyecto.

Esta versión conserva únicamente el recorrido que se quiso representar, el significado que se quiso dejar escrito y el momento en el que se decidió detener el dibujo.

---

**Freeze:** `Modelos Asíntotas v1.1.0`  
**Estado:** `FROZEN — CLOSED — PRODUCTION`  
**Fecha:** `2026-09-28`  
**Producción:** `https://modelos-asintotas.vercel.app`

> **Las trayectorias quedan abiertas. También su lectura.**
