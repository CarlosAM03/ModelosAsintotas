# Modelos Asíntotas

Carta digital interactiva construida a partir de modelos matemáticos para representar dos trayectorias personales, su evolución y su relación con una trayectoria compartida.

El proyecto utiliza funciones matemáticas, muestreo y visualización SVG animada como medio principal de expresión. La interfaz web funciona únicamente como soporte para presentar los modelos y su narrativa.

> Estado: Core matemático y Baseline Parameter Set v1.1 estables; Presentation & Experience v1.0 y Ambient Audiovisual Experience v1.1.0 implementados. La validación audiovisual humana sigue pendiente.

## Proyecto

La experiencia está compuesta por dos modelos matemáticos independientes:

- **Modelo B — Asíntotas:** representación directa de la metáfora que origina el proyecto mediante dos trayectorias asintóticas respecto de una trayectoria compartida.
- **Modelo A — Histórico:** representación paramétrica de la evolución de dos trayectorias personales a través del tiempo, considerando aproximación, cruces, convergencia, divergencia y memoria de la interacción.

El Modelo B se presenta primero y constituye la pieza principal.  
El Modelo A funciona como una segunda lectura de carácter histórico.

## Arquitectura

El proyecto sigue el flujo:

Matemática → Sampling → Geometría → SVG → Animación → Composición

La matemática es independiente de la representación visual y del sistema de animación. `ExperienceController` orquesta el recorrido; `AudioController` gestiona únicamente la música ambiental.

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

El build de Vite se ejecuta con `npm run build` y produce `dist/`.

## Especificaciones

La implementación está gobernada por los siguientes documentos:

1. `docs/01-Mathematical-Models-Specification(1).md` — autoridad matemática.
2. `docs/02-Software-Implementation-Specification(1).md` — arquitectura y contratos técnicos.
3. `docs/BaselineParameterSet/05-Baseline-Parameter-Set-v1.1.md` — parámetros numéricos aprobados.
4. `docs/06-Presentation-Experience-Specification-v1.0.md` — presentación y experiencia.
5. `docs/07-v1.1-First Audiovisual Implementation Baseline.md` — implementación audiovisual.

`docs/03-Development-Execution-Plan(1).md` conserva el plan de ejecución como contexto.

## Principio del proyecto

Los modelos matemáticos constituyen el contenido.

La aplicación web, la animación y el diseño visual existen únicamente para hacerlos observables como una carta digital.
