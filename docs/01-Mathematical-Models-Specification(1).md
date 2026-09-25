
# Modelo A — Dinámica histórica de compatibilidad interpersonal

## 1. Objetivo matemático

Representar dos trayectorias individuales, Carlos y Fer, cuya **distancia relativa** evoluciona según tres grandes regímenes:

$$
\text{independencia}
\rightarrow
\text{aproximación}
\rightarrow
\text{máxima compatibilidad}
\rightarrow
\text{divergencia}
\rightarrow
\text{independencia condicionada}
$$

No pretende medir sentimientos. Modela abstractamente la **compatibilidad de estados/necesidades interpersonales**.

---

## 2. Dominio temporal

Normalizamos toda la historia:

$$
\boxed{t\in[0,1]}
$$

y definimos cuatro puntos:

$$
0<t_e<t_p<t_d<t_n<1
$$

donde:

* \(t_e\): encuentro;
* \(t_p\): entrada al periodo de máxima compatibilidad;
* \(t_d\): comienzo de divergencia sostenida;
* \(t_n\): presente.

El intervalo restante:

$$
(t_n,1]
$$

es continuación simbólica, no predicción.

---

# 3. Trayectoria central

Definimos:

$$
\boxed{L_A(t)=mt+b+\beta\sin(\nu t+\psi)}
$$

\(L_A(t)\) no representa a ninguno de los dos. Es un **marco central móvil** alrededor del cual representamos sus estados.

La componente:

$$
mt+b
$$

produce tendencia global, mientras:

$$
\beta\sin(\nu t+\psi)
$$

evita una trayectoria artificialmente recta.

Si buscamos máxima simplicidad:

$$
\boxed{L_A(t)=mt+b}
$$

también es suficiente.

---

# 4. Variable fundamental de separación

Definimos una separación firmada:

$$
\boxed{d_A(t)=B(t)+A(t)\sin\theta(t)}
$$

con fase:

$$
\boxed{
\theta(t)=\phi+\int_0^t\omega(s)\,ds
}
$$

Si usamos frecuencia constante:

$$
\boxed{\theta(t)=\omega t+\phi}
$$

Entonces:

* \(A(t)\): amplitud de las oscilaciones;
* \(B(t)\): deriva o separación estructural;
* \(\omega(t)\): frecuencia local de aproximaciones/cruces;
* \(\phi\): fase inicial.

La distancia interpersonal abstracta será:

$$
\boxed{D_A(t)=|d_A(t)|}
$$

antes de introducir perturbaciones individuales.

---

# 5. Trayectorias individuales

La construcción simétrica mínima es:

$$
\boxed{
C_A(t)=L_A(t)+\frac{d_A(t)}{2}+\eta_C(t)
}
$$

$$
\boxed{
F_A(t)=L_A(t)-\frac{d_A(t)}{2}+\eta_F(t)
}
$$

donde \(\eta_C,\eta_F\) son perturbaciones individuales suaves.

La distancia observable completa es:

$$
\boxed{
D_A(t)=
|C_A(t)-F_A(t)|
}
$$

por lo tanto:

$$
\boxed{
D_A(t)=
|d_A(t)+\eta_C(t)-\eta_F(t)|
}
$$

Si:

$$
\eta_C=\eta_F=0
$$

entonces simplemente:

$$
D_A(t)=|d_A(t)|.
$$

---

# 6. Transiciones suaves entre etapas

Para no producir discontinuidades utilizamos la función logística:

$$
\boxed{
S(t;a,k)=
\frac{1}{1+e^{-k(t-a)}}
}
$$

donde:

* \(a\): centro de la transición;
* \(k\): rapidez.

De ella obtenemos ventanas suaves.

Por ejemplo, la ventana del periodo de convergencia:

$$
\boxed{
W_P(t)=S(t;t_p,k)-S(t;t_d,k)
}
$$

que aproximadamente vale:

$$
W_P(t)\approx
\begin{cases}
0 & t<t_p\\
1 & t_p<t<t_d\\
0 & t>t_d
\end{cases}
$$

sin discontinuidades.

---

# 7. Envolvente de amplitud \(A(t)\)

Queremos:

* varianza inicial;
* reducción durante convergencia;
* amplitud mínima durante el pico;
* crecimiento progresivo durante divergencia.

Una formulación compacta es:

$$
\boxed{
A(t)=
A_0
-
(A_0-A_{\min})S(t;t_p,k_p)
+
(A_f-A_{\min})S(t;t_d,k_d)
}
$$

con:

$$
A_0>A_{\min}>0
$$

y:

$$
A_f>A_{\min}.
$$

Por tanto:

### Inicio

$$
A(t)\approx A_0
$$

### Pico

$$
A(t)\approx A_{\min}
$$

### Cierre

$$
A(t)\approx A_f.
$$

Esto produce exactamente la macroforma:

$$
\text{variabilidad}\rightarrow
\text{estabilidad}\rightarrow
\text{variabilidad}
$$

sin cortes.

---

# 8. Deriva estructural \(B(t)\)

La amplitud produce oscilaciones, pero necesitamos que durante el cierre exista una tendencia real de separación.

Definimos:

$$
\boxed{
B(t)=
B_0[1-S(t;t_e,k_e)]
+
B_fS(t;t_d,k_d)
}
$$

Interpretación:

antes del encuentro existe separación independiente:

$$
B(t)\approx B_0.
$$

Durante máxima compatibilidad:

$$
B(t)\approx0.
$$

Durante divergencia:

$$
B(t)\rightarrow B_f.
$$

Esto permite que después de \(t_d\):

$$
B(t)>0
$$

pero la oscilación:

$$
A(t)\sin\theta(t)
$$

todavía pueda cancelar temporalmente esa separación.

Así pueden existir **cruces residuales dentro de una tendencia global divergente**.

---

# 9. Condición de cruce

Existe sincronía máxima cuando:

$$
\boxed{C_A(t_i)=F_A(t_i)}
$$

o equivalentemente:

$$
\boxed{D_A(t_i)=0}.
$$

Sin perturbaciones:

$$
\boxed{
B(t_i)+A(t_i)\sin\theta(t_i)=0
}
$$

Ésta es una propiedad muy importante de A.

Un cruce no significa que la relación haya alcanzado estabilidad.

Sóamente:

$$
D_A(t_i)=0
$$

en ese instante.

---

# 10. Ruido individual suave

No utilizaremos ruido blanco frame por frame.

Una solución determinista es:

$$
\boxed{
\eta_i(t)=
\sum_{j=1}^{n}
a_{ij}\sin(f_{ij}t+\varphi_{ij})
}
$$

con \(i\in\{C,F\}\).

Con apenas \(n=3\):

$$
\eta_C(t)=
a_1\sin(f_1t+\phi_1)
+a_2\sin(f_2t+\phi_2)
+a_3\sin(f_3t+\phi_3)
$$

es suficiente para obtener irregularidad orgánica.

Para Fer utilizamos otros parámetros.

---

# 11. Acoplamiento

Definimos conceptualmente:

$$
K(t)\in[0,1]
$$

como intensidad del régimen compartido.

Una formulación:

$$
\boxed{
K(t)=
S(t;t_e,k_e)
\left[
1-S(t;t_n,k_n)
\right]
}
$$

Antes del encuentro:

$$
K(t)\approx0
$$

Durante la historia compartida:

$$
K(t)>0
$$

y después:

$$
K(t)\rightarrow0.
$$

Podemos utilizarlo para controlar el ruido:

$$
\boxed{
\eta_i^*(t)=
[1-K(t)]\eta_i(t)
}
$$

De esta manera, durante alta interacción las perturbaciones individuales pierden peso relativo y las trayectorias quedan gobernadas principalmente por \(d_A(t)\).

---

# 12. Memoria

Aquí conviene distinguir **acoplamiento** de **memoria**. La memoria se genera exclusivamente por la interacción; \(H_\infty\) no representa memoria preexistente, sino la huella residual de una interacción que ocurrió.

Definimos primero la interacción acumulada:

$$
\boxed{
Q(t)=\int_{t_e}^{\min(t,t_n)}K(s)\,ds
}
$$

y el acumulado total de interacción:

$$
\boxed{
Q_n=Q(t_n)=\int_{t_e}^{t_n}K(s)\,ds
}
$$

con \(Q_n>0\). La memoria canónica queda definida por tramos:

$$
\boxed{
H(t)=
\begin{cases}
0, & t<t_e\\[8pt]
H_\infty\dfrac{Q(t)}{Q_n}
+\displaystyle\int_{t_e}^{t}K(s)e^{-\lambda(t-s)}\,ds,
& t_e\le t\le t_n\\[14pt]
H_\infty+
\displaystyle\int_{t_e}^{t_n}K(s)e^{-\lambda(t-s)}\,ds,
& t>t_n
\end{cases}
}
$$

con las restricciones estrictas:

$$
H_\infty>0,\qquad \lambda>0,\qquad Q_n>0.
$$

Por definición \(H(t_e)=0\). Durante la interacción, el componente residual se construye progresivamente desde cero hasta \(H_\infty\), mientras el componente transitorio acumula la interacción con decaimiento exponencial. Después de \(t_n\) no se incorpora nueva interacción: sólo decae el componente transitorio y permanece el residual.

Por tanto:

$$
\lim_{t\to\infty}H(t)=H_\infty.
$$

La consecuencia conceptual es:

$$
\boxed{R_1(t\mid H)\neq R_0(t)}
$$

El comportamiento posterior vuelve a ser independiente, pero **no corresponde al mismo sistema que habría existido sin la interacción previa**.

Para una implementación v1 ni siquiera necesitamos visualizar \(H(t)\); es una propiedad del modelo.

---

# 13. Eventos

Los eventos no modifican las ecuaciones.

Se representan mediante:

$$
\boxed{
E=\{(t_i,e_i)\}_{i=1}^{N}
}
$$

y se interpretan como observaciones asociadas al estado del sistema.

Por tanto evitamos:

$$
E_i\Rightarrow d_A(t)
$$

como causalidad.

En cambio:

$$
\boxed{
d_A(t),D_A(t),K(t)
\longrightarrow
\text{estado observable en }t_i
}
$$

Los eventos son anotaciones sobre la trayectoria.

---

# 14. Modelo A completo

La versión compacta queda:

$$
\boxed{
L_A(t)=mt+b+\beta\sin(\nu t+\psi)
}
$$

$$
\boxed{
A(t)=
A_0-(A_0-A_{\min})S(t;t_p,k_p)
+(A_f-A_{\min})S(t;t_d,k_d)
}
$$

$$
\boxed{
B(t)=
B_0[1-S(t;t_e,k_e)]
+B_fS(t;t_d,k_d)
}
$$

$$
\boxed{
d_A(t)=B(t)+A(t)\sin(\omega t+\phi)
}
$$

$$
\boxed{
C_A(t)=L_A(t)+\frac{d_A(t)}2+\eta_C^*(t)
}
$$

$$
\boxed{
F_A(t)=L_A(t)-\frac{d_A(t)}2+\eta_F^*(t)
}
$$

$$
\boxed{
D_A(t)=|C_A(t)-F_A(t)|
}
$$

con memoria:

$$
\boxed{
H(t)=
\begin{cases}
0, & t<t_e\\[6pt]
H_\infty\dfrac{Q(t)}{Q_n}
+\displaystyle\int_{t_e}^{t}K(s)e^{-\lambda(t-s)}ds,
& t_e\le t\le t_n\\[10pt]
H_\infty+
\displaystyle\int_{t_e}^{t_n}K(s)e^{-\lambda(t-s)}ds,
& t>t_n
\end{cases}
}
$$

Aquí \(Q(t)\) y \(Q_n\) son los acumulados definidos en la sección de Memoria. Esta es la definición canónica que deberá exponer el Modelo A en Core v1.0.

Éste es el **modelo histórico-paramétrico A**.

---

# Modelo B — Dos trayectorias asintóticas a una trayectoria compartida

B tiene una filosofía matemática completamente diferente.

No reconstruye acontecimientos.

Queremos representar exclusivamente:

$$
\boxed{
\text{Carlos}\rightarrow L_B(t)
\leftarrow\text{Fer}
}
$$

mediante comportamiento asintótico real.

---

# 1. Dominio

Conceptualmente:

$$
\boxed{t\in[0,\infty)}
$$

aunque gráficamente mostraremos solamente:

$$
t\in[0,T].
$$

---

# 2. Trayectoria compartida

Utilizamos:

$$
\boxed{
L_B(t)=mt+b
}
$$

Ésta es la trayectoria límite compartida.

No representa a Carlos ni a Fer.

---

# 3. Trayectoria de Carlos

$$
\boxed{
C_B(t)=
L_B(t)+
A_Ce^{-\alpha_Ct}
\sin(\omega_Ct+\phi_C)
}
$$

con:

$$
A_C>0,\qquad\alpha_C>0.
$$

---

# 4. Trayectoria de Fer

$$
\boxed{
F_B(t)=
L_B(t)+
A_Fe^{-\alpha_Ft}
\sin(\omega_Ft+\phi_F)
}
$$

con:

$$
A_F>0,\qquad\alpha_F>0.
$$

---

# 5. Propiedad asintótica

Para Carlos:

$$
C_B(t)-L_B(t)
=
A_Ce^{-\alpha_Ct}
\sin(\omega_Ct+\phi_C)
$$

y como:

$$
|\sin x|\le1
$$

tenemos:

$$
|C_B(t)-L_B(t)|
\le
A_Ce^{-\alpha_Ct}.
$$

Como:

$$
\lim_{t\to\infty}A_Ce^{-\alpha_Ct}=0,
$$

por el teorema del sándwich:

$$
\boxed{
\lim_{t\to\infty}
[C_B(t)-L_B(t)]
=0
}
$$

y exactamente igual:

$$
\boxed{
\lim_{t\to\infty}
[F_B(t)-L_B(t)]
=0.
}
$$

Por tanto \(L_B(t)\) es una **asíntota oblicua común** de ambas funciones cuando \(m\neq0\).

Si:

$$
m=0,
$$

sería una asíntota horizontal.

Ésta es la formulación matemática rigurosa de B.

---

# 6. Envolventes asintóticas

Carlos está contenido entre:

$$
\boxed{
L_B(t)-A_Ce^{-\alpha_Ct}
\le C_B(t)\le
L_B(t)+A_Ce^{-\alpha_Ct}
}
$$

y Fer entre:

$$
\boxed{
L_B(t)-A_Fe^{-\alpha_Ft}
\le F_B(t)\le
L_B(t)+A_Fe^{-\alpha_Ft}
}
$$

Estas cuatro curvas auxiliares ni siquiera tienen que mostrarse en la visualización final, pero son útiles para el diseño porque describen la contracción progresiva alrededor de \(L_B\).

---

# 7. Distancia a la trayectoria compartida

Para Carlos:

$$
\boxed{
\delta_C(t)=
|C_B(t)-L_B(t)|
}
$$

$$
=
A_Ce^{-\alpha_Ct}
|\sin(\omega_Ct+\phi_C)|
$$

y para Fer:

$$
\boxed{
\delta_F(t)=
A_Fe^{-\alpha_Ft}
|\sin(\omega_Ft+\phi_F)|
}
$$

con:

$$
\boxed{
\lim_{t\to\infty}\delta_C(t)
=
\lim_{t\to\infty}\delta_F(t)
=0.
}
$$

---

# 8. Distancia Carlos–Fer

Definimos:

$$
\boxed{
D_B(t)=|C_B(t)-F_B(t)|
}
$$

por tanto:

$$
\boxed{
D_B(t)=
\left|
A_Ce^{-\alpha_Ct}
\sin(\omega_Ct+\phi_C)
-
A_Fe^{-\alpha_Ft}
\sin(\omega_Ft+\phi_F)
\right|
}
$$

y debido a que ambas perturbaciones tienden a cero:

$$
\boxed{
\lim_{t\to\infty}D_B(t)=0.
}
$$

Esto no significa que la animación afirme que ustedes terminarán juntos. Es una propiedad del objeto matemático B, no una predicción interpersonal.

---

# 9. Cruces con la asíntota

Carlos cruza \(L_B\) cuando:

$$
C_B(t)=L_B(t).
$$

Entonces:

$$
\sin(\omega_Ct+\phi_C)=0
$$

y:

$$
\boxed{
t_{C,k}=
\frac{k\pi-\phi_C}{\omega_C},
\qquad k\in\mathbb Z.
}
$$

Para Fer:

$$
\boxed{
t_{F,k}=
\frac{k\pi-\phi_F}{\omega_F}.
}
$$

Esto demuestra explícitamente que:

$$
\boxed{
\text{cruzar una asíntota}\not\Rightarrow
\text{dejar de tener comportamiento asintótico}.
}
$$

---

# 10. Encuentros entre las dos trayectorias

Ocurren cuando:

$$
\boxed{
C_B(t)=F_B(t)
}
$$

es decir:

$$
\boxed{
A_Ce^{-\alpha_Ct}
\sin(\omega_Ct+\phi_C)
=
A_Fe^{-\alpha_Ft}
\sin(\omega_Ft+\phi_F)
}
$$

En el modelo general probablemente resolveremos esos \(t_i\) numéricamente.

Eso es conveniente porque evita obligarnos a que los encuentros sean perfectamente periódicos.

---

# 11. Caso simétrico analíticamente soluble

Para estudiar el comportamiento podemos imponer:

$$
A_C=A_F=A,
$$

$$
\alpha_C=\alpha_F=\alpha,
$$

$$
\omega_C=\omega_F=\omega,
$$

$$
\phi_C=0,
\qquad
\phi_F=\phi.
$$

Entonces:

$$
\boxed{
C_B(t)=L_B(t)+Ae^{-\alpha t}\sin(\omega t)
}
$$

$$
\boxed{
F_B(t)=L_B(t)+Ae^{-\alpha t}
\sin(\omega t+\phi)
}
$$

y:

$$
\boxed{
D_B(t)=
2Ae^{-\alpha t}
\left|\sin\frac{\phi}{2}\right|
\left|
\cos\left(\omega t+\frac{\phi}{2}\right)
\right|
}
$$

Esta versión es especialmente útil para validar matemáticamente el renderer.

Después podemos utilizar la versión asimétrica en la pieza final.

---

# 12. Condición de encuentro triple

Puede existir un punto especial:

$$
\boxed{
C_B(t_i)=F_B(t_i)=L_B(t_i)
}
$$

Para ello ambas oscilaciones deben anularse simultáneamente:

$$
\omega_Ct_i+\phi_C=k\pi
$$

$$
\omega_Ft_i+\phi_F=j\pi.
$$

No necesitamos garantizar muchos.

Podemos parametrizar el modelo para producir **uno especialmente visible** si queremos representar una sincronía completa.

---

# 13. Modelo B completo

Finalmente:

$$
\boxed{L_B(t)=mt+b}
$$

$$
\boxed{
C_B(t)=
mt+b+
A_Ce^{-\alpha_Ct}
\sin(\omega_Ct+\phi_C)
}
$$

$$
\boxed{
F_B(t)=
mt+b+
A_Fe^{-\alpha_Ft}
\sin(\omega_Ft+\phi_F)
}
$$

con:

$$
\boxed{
A_C,A_F,\alpha_C,\alpha_F>0
}
$$

y las propiedades fundamentales:

$$
\boxed{
C_B(t)-L_B(t)\rightarrow0
}
$$

$$
\boxed{
F_B(t)-L_B(t)\rightarrow0
}
$$

$$
\boxed{
D_B(t)=|C_B(t)-F_B(t)|
}
$$

$$
\boxed{
D_B(t)\rightarrow0
}
$$

cuando:

$$
t\rightarrow\infty.
$$

---

# Separación formal entre A y B

|                  | **Modelo A**                    | **Modelo B**         |
| ---------------- | ------------------------------- | -------------------- |
| Objeto           | historia abstracta              | metáfora matemática  |
| Naturaleza       | paramétrico por regímenes       | analítico/asintótico |
| Variable central | \(D_A(t)\)                      | \(L_B(t)\)           |
| Eventos          | sí, como metadata               | ninguno              |
| Memoria          | \(H(t)\)                        | ninguna              |
| Ruido            | sí                              | no                   |
| Regímenes        | varios                          | uno                  |
| Cruces           | representan sincronía histórica | propiedad geométrica |
| Futuro           | aleatorio condicionado          | límite matemático    |
| Asíntota real    | no requerida                    | sí                   |
| Objetivo         | parecido conductual             | elegancia geométrica |

Por tanto, **no se deberían reutilizar las ecuaciones de uno dentro del otro**. Lo único compartido debería ser infraestructura matemática genérica del futuro software —evaluación de funciones, muestreo, transformación de coordenadas y renderer—, no el modelo.
