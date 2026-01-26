# Diseño Visual - AduanasPE
> Sistema de diseño **Vibrante Claro Premium**

---

## Paleta de Colores Vibrantes

### Rosa/Magenta - CTAs primarios
| Variable | Valor | Uso |
|----------|-------|-----|
| `--pink` | `#FF6B9D` | CTAs, enlaces, glows |
| `--pink-light` | `#FFE4EC` | Fondos, orbes |

### Azul Eléctrico
| Variable | Valor | Uso |
|----------|-------|-----|
| `--blue` | `#00D4FF` | Gradientes, iconos |
| `--blue-light` | `#E0F9FF` | Fondos |

### Púrpura - Marca
| Variable | Valor | Uso |
|----------|-------|-----|
| `--purple` | `#9B5DE5` | Palabras destacadas |
| `--purple-light` | `#EDE4FB` | Badges |

### Verde Neón
| Variable | Valor | Uso |
|----------|-------|-----|
| `--green` | `#00F5A0` | Éxito, confirmaciones |
| `--green-light` | `#E0FFF5` | Fondos |

### Amarillo Vibrante
| Variable | Valor | Uso |
|----------|-------|-----|
| `--yellow` | `#FFE66D` | Destacados, estrellas |
| `--yellow-light` | `#FFF8E0` | Fondos |

### Coral/Naranja
| Variable | Valor | Uso |
|----------|-------|-----|
| `--coral` | `#FF6B6B` | Alertas |
| `--orange` | `#FF9F1C` | Variedad |

---

## Gradientes

```css
/* Primario: Rosa → Púrpura → Azul */
linear-gradient(135deg, #FF6B9D 0%, #9B5DE5 50%, #00D4FF 100%)

/* Secundario: Verde → Azul */
linear-gradient(135deg, #00F5A0 0%, #00D4FF 100%)

/* Cálido: Amarillo → Naranja → Coral */
linear-gradient(135deg, #FFE66D 0%, #FF9F1C 50%, #FF6B6B 100%)
```

---

## Componentes Premium

### Hero
- Badge púrpura con `section-badge`
- Título con `gradient-text` (Rosa → Púrpura → Azul)
- Stats animados con gradiente
- Floating cards con iconos coloridos

### Buttons
- **Primary:** Gradiente Rosa → Púrpura → Azul
- **Secondary:** Blanco con hover púrpura
- **Accent:** Verde → Cyan

### Service Cards
- Borde de color al hover (4px top)
- Sombras coloridas según tipo

---

## Archivos Clave

| Archivo | Contenido |
|---------|-----------|
| [globals.css](file:///c:/Users/Gualbert/apps/aduanaspe/src/app/globals.css) | Paleta vibrante completa |
| [Hero.tsx](file:///c:/Users/Gualbert/apps/aduanaspe/src/components/sections/Hero.tsx) | Stats, floating cards |
| [Button.tsx](file:///c:/Users/Gualbert/apps/aduanaspe/src/components/ui/Button.tsx) | 4 variantes vibrantes |
| [Header.tsx](file:///c:/Users/Gualbert/apps/aduanaspe/src/components/layout/Header.tsx) | Glassmorphism |