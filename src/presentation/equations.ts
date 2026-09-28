interface Equation { name: string; formula: string; descriptor: string; spoken: string; }

const b: Equation[] = [
  { name: "L<sub>B</sub>(t)", formula: "L<sub>B</sub>(t) = mt + b", descriptor: "Trayectoria compartida", spoken: "L sub B de t igual m por t más b" },
  { name: "O<sub>C</sub>(t)", formula: "O<sub>C</sub>(t) = A<sub>C</sub>e<sup>−α<sub>C</sub>t</sup> sin(ω<sub>C</sub>t + φ<sub>C</sub>)", descriptor: "Offset de Carlos", spoken: "O sub C de t igual A sub C por exponencial de menos alfa sub C por t, por seno de omega sub C por t más fi sub C" },
  { name: "O<sub>F</sub>(t)", formula: "O<sub>F</sub>(t) = A<sub>F</sub>e<sup>−α<sub>F</sub>t</sup> sin(ω<sub>F</sub>t + φ<sub>F</sub>)", descriptor: "Offset de Fer", spoken: "O sub F de t igual A sub F por exponencial de menos alfa sub F por t, por seno de omega sub F por t más fi sub F" },
  { name: "C<sub>B</sub>(t)", formula: "C<sub>B</sub>(t) = L<sub>B</sub>(t) + O<sub>C</sub>(t)", descriptor: "Carlos", spoken: "C sub B de t igual L sub B de t más O sub C de t" },
  { name: "F<sub>B</sub>(t)", formula: "F<sub>B</sub>(t) = L<sub>B</sub>(t) + O<sub>F</sub>(t)", descriptor: "Fer", spoken: "F sub B de t igual L sub B de t más O sub F de t" },
  { name: "δ<sub>C</sub>(t)", formula: "δ<sub>C</sub>(t) = |C<sub>B</sub>(t) − L<sub>B</sub>(t)|", descriptor: "Distancia al hilo", spoken: "delta sub C de t igual valor absoluto de C sub B de t menos L sub B de t" },
  { name: "δ<sub>F</sub>(t)", formula: "δ<sub>F</sub>(t) = |F<sub>B</sub>(t) − L<sub>B</sub>(t)|", descriptor: "Distancia al hilo", spoken: "delta sub F de t igual valor absoluto de F sub B de t menos L sub B de t" },
  { name: "D<sub>B</sub>(t)", formula: "D<sub>B</sub>(t) = |C<sub>B</sub>(t) − F<sub>B</sub>(t)|", descriptor: "Distancia compartida", spoken: "D sub B de t igual valor absoluto de C sub B de t menos F sub B de t" },
  { name: "t → ∞", formula: "C<sub>B</sub>(t) − L<sub>B</sub>(t) → 0; F<sub>B</sub>(t) − L<sub>B</sub>(t) → 0; D<sub>B</sub>(t) → 0", descriptor: "Límite asintótico", spoken: "Cuando t tiende a infinito, C sub B menos L sub B tiende a cero, F sub B menos L sub B tiende a cero, y D sub B tiende a cero" }
];

const a: Equation[] = [
  { name: "S(t; a, k)", formula: "S(t; a, k) = 1 / (1 + e<sup>−k(t−a)</sup>)", descriptor: "Transición suave", spoken: "S de t, a, k igual uno dividido entre uno más exponencial de menos k por t menos a" },
  { name: "L<sub>A</sub>(t)", formula: "L<sub>A</sub>(t) = mt + b + β sin(νt + ψ)", descriptor: "Trayectoria central", spoken: "L sub A de t igual m por t más b más beta por seno de nu por t más psi" },
  { name: "A(t)", formula: "A(t) = A<sub>0</sub> − (A<sub>0</sub> − A<sub>min</sub>)S(t; t<sub>p</sub>, k<sub>p</sub>) + (A<sub>f</sub> − A<sub>min</sub>)S(t; t<sub>d</sub>, k<sub>d</sub>)", descriptor: "Amplitud", spoken: "A de t igual A cero menos A cero menos A mínima por S de t, t pico, k pico, más A final menos A mínima por S de t, t divergencia, k divergencia" },
  { name: "B(t)", formula: "B(t) = B<sub>0</sub>[1 − S(t; t<sub>e</sub>, k<sub>e</sub>)] + B<sub>f</sub>S(t; t<sub>d</sub>, k<sub>d</sub>)", descriptor: "Separación estructural", spoken: "B de t igual B cero por uno menos S de t, t encuentro, k encuentro, más B final por S de t, t divergencia, k divergencia" },
  { name: "d<sub>A</sub>(t)", formula: "d<sub>A</sub>(t) = B(t) + A(t) sin(ωt + φ)", descriptor: "Separación firmada", spoken: "d sub A de t igual B de t más A de t por seno de omega por t más fi" },
  { name: "K(t)", formula: "K(t) = S(t; t<sub>e</sub>, k<sub>e</sub>)[1 − S(t; t<sub>n</sub>, k<sub>n</sub>)]", descriptor: "Compatibilidad", spoken: "K de t igual S de t, t encuentro, k encuentro, por uno menos S de t, t presente, k presente" },
  { name: "η<sub>C</sub>(t)", formula: "η<sub>C</sub>(t) = ∑<sub>j=1</sub><sup>n</sup> a<sub>Cj</sub> sin(f<sub>Cj</sub>t + φ<sub>Cj</sub>)", descriptor: "Perturbación de Carlos", spoken: "eta sub C de t igual suma desde j igual uno hasta n de a sub C j por seno de f sub C j por t más fi sub C j" },
  { name: "η<sub>F</sub>(t)", formula: "η<sub>F</sub>(t) = ∑<sub>j=1</sub><sup>n</sup> a<sub>Fj</sub> sin(f<sub>Fj</sub>t + φ<sub>Fj</sub>)", descriptor: "Perturbación de Fer", spoken: "eta sub F de t igual suma desde j igual uno hasta n de a sub F j por seno de f sub F j por t más fi sub F j" },
  { name: "η<sub>C</sub><sup>*</sup>(t)", formula: "η<sub>C</sub><sup>*</sup>(t) = [1 − K(t)]η<sub>C</sub>(t)", descriptor: "Perturbación acoplada", spoken: "eta sub C estrella de t igual uno menos K de t por eta sub C de t" },
  { name: "η<sub>F</sub><sup>*</sup>(t)", formula: "η<sub>F</sub><sup>*</sup>(t) = [1 − K(t)]η<sub>F</sub>(t)", descriptor: "Perturbación acoplada", spoken: "eta sub F estrella de t igual uno menos K de t por eta sub F de t" },
  { name: "C<sub>A</sub>(t)", formula: "C<sub>A</sub>(t) = L<sub>A</sub>(t) + d<sub>A</sub>(t)/2 + η<sub>C</sub><sup>*</sup>(t)", descriptor: "Carlos", spoken: "C sub A de t igual L sub A de t más d sub A de t dividido entre dos más eta sub C estrella de t" },
  { name: "F<sub>A</sub>(t)", formula: "F<sub>A</sub>(t) = L<sub>A</sub>(t) − d<sub>A</sub>(t)/2 + η<sub>F</sub><sup>*</sup>(t)", descriptor: "Fer", spoken: "F sub A de t igual L sub A de t menos d sub A de t dividido entre dos más eta sub F estrella de t" },
  { name: "D<sub>A</sub>(t)", formula: "D<sub>A</sub>(t) = |C<sub>A</sub>(t) − F<sub>A</sub>(t)|", descriptor: "Distancia observable", spoken: "D sub A de t igual valor absoluto de C sub A de t menos F sub A de t" },
  { name: "Q(t)", formula: '<span class="case-formula"><span>Q(t) = ⎧ 0, <small>t &lt; t<sub>e</sub></small></span><span>⎩ ∫<sub>t<sub>e</sub></sub><sup>min(t,t<sub>n</sub>)</sup> K(s) ds, <small>t ≥ t<sub>e</sub></small></span></span>', descriptor: "Interacción acumulada", spoken: "Q de t igual cero antes del encuentro; desde el encuentro, integral desde t encuentro hasta el mínimo de t y t presente de K de s diferencial s" },
  { name: "Q<sub>n</sub>", formula: "Q<sub>n</sub> = Q(t<sub>n</sub>) = ∫<sub>t<sub>e</sub></sub><sup>t<sub>n</sub></sup> K(s) ds", descriptor: "Interacción total", spoken: "Q sub n igual Q de t presente igual integral desde t encuentro hasta t presente de K de s diferencial s" },
  { name: "H(t)", formula: '<span class="case-formula"><span>H(t) = ⎧ 0, <small>t &lt; t<sub>e</sub></small></span><span>⎪ H<sub>∞</sub>Q(t)/Q<sub>n</sub> + ∫<sub>t<sub>e</sub></sub><sup>t</sup> K(s)e<sup>−λ(t−s)</sup> ds, <small>t<sub>e</sub> ≤ t ≤ t<sub>n</sub></small></span><span>⎩ H<sub>∞</sub> + ∫<sub>t<sub>e</sub></sub><sup>t<sub>n</sub></sup> K(s)e<sup>−λ(t−s)</sup> ds, <small>t &gt; t<sub>n</sub></small></span></span>', descriptor: "Memoria", spoken: "H de t igual cero antes del encuentro; durante la interacción, H infinito por Q de t dividido entre Q sub n más integral desde t encuentro hasta t de K de s por exponencial de menos lambda por t menos s, diferencial s; después del presente, H infinito más integral desde t encuentro hasta t presente de K de s por exponencial de menos lambda por t menos s, diferencial s" }
];

export const equationCounts = { asymptote: b.length, history: a.length } as const;

function mount(target: HTMLElement, equations: Equation[]): void {
  for (const equation of equations) {
    const article = document.createElement("article");
    article.className = "equation";
    const name = document.createElement("h3");
    name.innerHTML = equation.name;
    const formula = document.createElement("div");
    formula.className = "equation-formula";
    formula.setAttribute("role", "math");
    formula.setAttribute("aria-label", equation.spoken);
    formula.innerHTML = equation.formula;
    const descriptor = document.createElement("p");
    descriptor.className = "equation-descriptor";
    descriptor.textContent = equation.descriptor;
    article.append(name, formula, descriptor);
    target.append(article);
  }
}

export function renderEquations(): void {
  const bTarget = document.querySelector<HTMLElement>('[data-equations-content="asymptote"]');
  const aTarget = document.querySelector<HTMLElement>('[data-equations-content="history"]');
  if (!bTarget || !aTarget) throw new Error("Equation containers missing");
  mount(bTarget, b);
  mount(aTarget, a);
}
