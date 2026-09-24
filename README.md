# Modelos Asíntotas

Carta digital interactiva construida a partir de modelos matemáticos para representar dos trayectorias personales, su evolución y su relación con una trayectoria compartida.

El proyecto utiliza funciones matemáticas, muestreo y visualización SVG animada como medio principal de expresión. La interfaz web funciona únicamente como soporte para presentar los modelos y su narrativa.

> Estado: Core v1.0 en desarrollo.

## Proyecto

La experiencia está compuesta por dos modelos matemáticos independientes:

- **Modelo B — Asíntotas:** representación directa de la metáfora que origina el proyecto mediante dos trayectorias asintóticas respecto de una trayectoria compartida.
- **Modelo A — Histórico:** representación paramétrica de la evolución de dos trayectorias personales a través del tiempo, considerando aproximación, cruces, convergencia, divergencia y memoria de la interacción.

El Modelo B se presenta primero y constituye la pieza principal.  
El Modelo A funciona como una segunda lectura de carácter histórico.

## Arquitectura

El proyecto sigue el flujo:

Matemática → Sampling → Geometría → SVG → Animación → Composición

La matemática es independiente de la representación visual y del sistema de animación.

## Stack

- TypeScript
- HTML
- CSS
- SVG
- Vite
- Vitest

El proyecto es completamente estático:

- sin backend;
- sin base de datos;
- sin autenticación;
- sin persistencia;
- sin APIs requeridas;
- sin contenido remoto necesario.

## Especificaciones

La implementación está gobernada por los siguientes documentos:

1. `01-Mathematical-Models-Specification.md` — autoridad matemática del proyecto.
2. `02-Software-Implementation-Specification.md` — arquitectura y contrato técnico, subordinado al modelo matemático.
3. `03-Development-Execution-Plan.md` — secuencia de implementación.
4. `04-Baseline-Parameter-Set.md` — valores iniciales de calibración.

Los documentos 03 y 04 están completamente subordinados a las decisiones establecidas en 01 y 02.

## Principio del proyecto

Los modelos matemáticos constituyen el contenido.

La aplicación web, la animación y el diseño visual existen únicamente para hacerlos observables como una carta digital.
