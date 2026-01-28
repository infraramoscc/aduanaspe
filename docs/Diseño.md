# Sistema de Diseño - Vibrante Claro Premium

> **Concepto**: Un sistema visual moderno, energético y profesional que combina fondos claros y limpios con una paleta de colores vibrantes y degradados sofisticados. Diseñado para generar confianza y dinamismo.

---

## 🎨 Design Tokens (Implementación Actual)

Este proyecto utiliza **Tailwind CSS v4** con configuración CSS-first en `src/app/globals.css`.

### 🌈 Paleta de Colores

| Token | Hex | Var CSS | Uso Principal |
|-------|-----|---------|---------------|
| **Pink** | `#FF6B9D` | `--pink` | CTAs primarios, Gradientes |
| *Pink Dark* | `#E5507F` | `--pink-dark` | Hover states |
| *Pink Light* | `#FFE4EC` | `--pink-light` | Fondos suaves, Orbes |
| **Purple** | `#9B5DE5` | `--purple` | Marca, Títulos, Bordes |
| *Purple Dark* | `#7B3FC5` | `--purple-dark` | Hover states |
| *Purple Light* | `#EDE4FB` | `--purple-light` | Badges, Orbes |
| **Blue** | `#00D4FF` | `--blue` | Iconos, Tecnológico, Frescura |
| *Blue Dark* | `#00B8E0` | `--blue-dark` | Hover states |
| *Blue Light* | `#E0F9FF` | `--blue-light` | Fondos de iconos, Orbes |
| **Green** | `#00F5A0` | `--green` | Éxito, Acentos secundarios |
| *Green Dark* | `#00D68A` | `--green-dark` | Hover states |
| *Green Light* | `#E0FFF5` | `--green-light` | Fondos de iconos, Orbes |
| **Yellow** | `#FFE66D` | `--yellow` | Estrellas, Destacados |
| *Yellow Dark* | `#F5D14F` | `--yellow-dark` | Hover states |
| *Yellow Light* | `#FFF8E0` | `--yellow-light` | Fondos suaves |
| **Coral** | `#FF6B6B` | `--coral` | Alertas, Calidez |
| *Coral Light* | `#FFE4E4` | `--coral-light` | Fondos suaves |
| **Orange** | `#FF9F1C` | `--orange` | Variedad, Energía |
| *Orange Light* | `#FFF0DC` | `--orange-light` | Fondos suaves |

**Textos y Fondos**:
- Background: `#FFFFFF` (`--background`)
- Heading: `#1A202C` (`--text-heading`)
- Body: `#4A5568` (`--text-body`)
- Muted: `#8896A6` (`--text-muted`)

### 🌠 Gradientes

| Nombre | CSS Gradient | Visual |
|--------|--------------|--------|
| **Primary** | `linear-gradient(135deg, #FF6B9D 0%, #9B5DE5 50%, #00D4FF 100%)` | 🩷 ➜ 💜 ➜ 🩵 |
| **Secondary** | `linear-gradient(135deg, #00F5A0 0%, #00D4FF 100%)` | 💚 ➜ 🩵 |
| **Warm** | `linear-gradient(135deg, #FFE66D 0%, #FF9F1C 50%, #FF6B6B 100%)` | 💛 ➜ 🧡 ➜ ❤️ |
| **Soft** | `linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 100%)` | ⚪ ➜ 🌫️ |

### 🌑 Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-sm` | `0 2px 8px rgba(0, 0, 0, 0.06)` | Elementos sutiles |
| `--shadow-md` | `0 8px 30px rgba(0, 0, 0, 0.08)` | Elementos elevados |
| `--shadow-lg` | `0 20px 50px rgba(0, 0, 0, 0.1)` | Modales, Dropdowns |
| `--shadow-card` | `0 10px 40px rgba(155, 93, 229, 0.12)` | Tarjetas flotantes |
| `--shadow-pink` | `0 10px 40px rgba(255, 107, 157, 0.25)` | Glow efecto (Pink) |
| `--shadow-blue` | `0 10px 40px rgba(0, 212, 255, 0.25)` | Glow efecto (Blue) |
| `--shadow-purple` | `0 10px 40px rgba(155, 93, 229, 0.25)` | Glow efecto (Purple) |
| `--shadow-green` | `0 10px 40px rgba(0, 245, 160, 0.25)` | Glow efecto (Green) |

---

## 🎬 Animaciones

### Keyframes Definidos

1.  **Float (Orbes)**: Movimiento suave de flotación y escala.
    ```css
    @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(30px, -30px) scale(1.1); }
    }
    ```

2.  **FloatCard (Tarjetas)**: Levitación vertical suave.
    ```css
    @keyframes floatCard {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    ```

3.  **FadeInUp**: Aparición gradual con desplazamiento hacia arriba.
    ```css
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    ```

### Clases de Utilidad

- `.gradient-orb`: Aplica la animación `float` (8s infinite).
- `.floating-card`: Aplica la animación `floatCard` (6s infinite).
- `.animate-fade-in-up`: Aplica `fadeInUp` (0.8s ease forwards).
- `.hover-elevate`: Hover effect `translateY(-10px)`.

---

## 🧩 Elementos de UI

### Glassmorphism
Efecto de cristal esmerilado para superposiciones.
```css
.glass {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
}
```

### Tarjetas de Servicio
Tarjetas interactivas con borde superior gradiente al hover.
- Clase base: `.service-card`
- Variantes de color: `.service-pink`, `.service-blue`, `.service-green`, `.service-orange`, `.service-cyan`, `.service-coral`, `.service-teal`, `.service-amber`.
- **Interacción**: Al hacer hover, se revela un borde superior de 4px con el gradiente correspondiente y una sombra de color (`box-shadow`).

### Orbes Flotantes
Elementos decorativos de fondo.
- Clase base: `.gradient-orb`
- Variantes: `.orb-purple`, `.orb-pink`, `.orb-blue`, `.orb-green`.
- **Propósito**: Añadir profundidad y dinamismo al fondo sin distraer.

### Texto Gradiente
Para títulos destacados.
- `.gradient-text`: Usa `var(--gradient-primary)`.
- `.gradient-text-warm`: Usa `var(--gradient-warm)`.

### Badges
Etiquetas para secciones.
- `.section-badge`: Fondo `purple-light`, texto `purple`, rounded-full.

---

## 🚀 Configuración Global (Referencia)

El proyecto utiliza variables CSS para definir el tema directamente en `globals.css`, compatible con Tailwind v4 mediante la directiva `@theme inline`.

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--text-heading);
  --color-primary: var(--pink);
  --color-accent: var(--purple);
  --font-sans: 'Outfit', sans-serif;
}
```