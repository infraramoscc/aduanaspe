# Especificaciones Técnicas de Imágenes - AduanasPE

> Referencia para generar imágenes con IA o manualmente

---

## 📐 Resumen de Dimensiones

| Tipo | Dimensiones | Aspecto | Formato | Peso Máx |
|------|-------------|---------|---------|----------|
| Logo | Variable | - | SVG | - |
| Favicon | 32x32, 16x16 | 1:1 | ICO/PNG | 10KB |
| Hero | 1920x1080 | 16:9 | WebP | 200KB |
| SplitFeature | 800x600 | 4:3 | WebP | 100KB |
| Vehículos | 800x600 | 4:3 | PNG/WebP | 100KB |
| Equipo | 400x400 | 1:1 | WebP | 50KB |
| Oficina | 1200x800 | 3:2 | WebP | 150KB |

---

## 🎨 Logo y Branding

### `logo.svg`
- **Formato**: SVG (vector)
- **Colores**: Violeta `#7C3AED`, Gris `#1F2937`
- **Fondo**: Transparente
- **Uso**: Header, firma email, documentos

### `logo-white.svg`
- **Formato**: SVG (vector)
- **Color**: Blanco `#FFFFFF`
- **Fondo**: Transparente
- **Uso**: Hero, fondos oscuros, footer

### `favicon.ico`
- **Dimensiones**: 32x32px y 16x16px (multi-size)
- **Formato**: ICO o PNG
- **Contenido**: Solo símbolo "A" del logo
- **Fondo**: Transparente o violeta sólido

---

## 🖼️ Imágenes Hero (Secciones Principales)

> **Especificaciones comunes:**
> - Dimensiones: **1920 x 1080px** (landscape)
> - Aspecto: **16:9**
> - Formato: **WebP** (fallback JPG)
> - Calidad: 80-85%
> - Peso: < 200KB
> - Estilo: Profesional, moderno, colores que armonicen con violeta

### `hero-home.webp`
- **Contenido**: Puerto marítimo, contenedores, operación de importación
- **Mood**: Dinámico, global, conectividad
- **Prompt sugerido**: `Aerial view of busy shipping port with colorful containers, cargo ships, cranes at work, golden hour lighting, professional corporate photography style`

### `hero-servicios.webp`
- **Contenido**: Operación logística general
- **Mood**: Organizado, eficiente
- **Prompt sugerido**: `Modern logistics warehouse with organized shipping containers, workers with tablets, professional lighting, corporate blue tones`

### `hero-agenciamiento-aduanas.webp`
- **Contenido**: Documentos, trámites, oficina profesional
- **Mood**: Confiable, experto
- **Prompt sugerido**: `Professional customs agent reviewing documents at modern desk, laptop, official papers, stamps, organized office, soft lighting`

### `hero-agencia-carga.webp`
- **Contenido**: Barco de carga, puerto internacional
- **Mood**: Internacional, conexión global
- **Prompt sugerido**: `Large cargo ship loaded with containers at international port, dramatic sky, cranes in background, professional photography`

### `hero-transporte.webp`
- **Contenido**: Camión en carretera, entrega
- **Mood**: Movimiento, eficiencia
- **Prompt sugerido**: `Modern cargo truck driving on highway at sunset, motion blur effect, professional transportation photography, warm lighting`

### `hero-resguardo.webp`
- **Contenido**: Seguridad, custodia, protección
- **Mood**: Seguro, confiable
- **Prompt sugerido**: `Security personnel monitoring cargo containers, GPS tracking screen, professional security operation, blue and violet tones`

### `hero-consultoria.webp`
- **Contenido**: Reunión de negocios, asesoría
- **Mood**: Profesional, experto
- **Prompt sugerido**: `Business meeting in modern office, consultant explaining charts to client, professional attire, warm lighting, corporate setting`

---

## 📷 Imágenes SplitFeature (Contenido)

> **Especificaciones comunes:**
> - Dimensiones: **800 x 600px**
> - Aspecto: **4:3**
> - Formato: **WebP**
> - Calidad: 80%
> - Peso: < 100KB
> - Esquinas: Se mostrarán con border-radius (16px)

### `que-hacemos.webp`
- **Contenido**: Equipo trabajando, coordinación logística
- **Prompt sugerido**: `Team of logistics professionals working together at modern office, tablets and screens showing shipping data, collaborative atmosphere`

### `por-que-elegirnos.webp`
- **Contenido**: Profesionalismo, experiencia, confianza
- **Prompt sugerido**: `Confident business professional shaking hands with client, modern office background, trust and partnership concept`

### `proceso-importacion.webp`
- **Contenido**: Flujo visual de importación
- **Prompt sugerido**: `Visual representation of import process: ship, port, customs, truck, warehouse - minimalist infographic style, professional`

### `proceso-exportacion.webp`
- **Contenido**: Flujo visual de exportación
- **Prompt sugerido**: `Export process visualization: factory, truck, port, container ship - clean infographic style, professional corporate`

### `clasificacion-arancelaria.webp`
- **Contenido**: Códigos, documentos, análisis
- **Prompt sugerido**: `Customs documents with tariff codes, magnifying glass, calculator, organized desk, professional detail shot`

### `tratados-comerciales.webp`
- **Contenido**: Conexión Perú con el mundo
- **Prompt sugerido**: `Map highlighting Peru with trade connections to China, USA, Europe, modern corporate infographic style, violet accents`

---

## 🚚 Imágenes de Vehículos (Transporte)

> **Especificaciones comunes:**
> - Dimensiones: **800 x 600px**
> - Aspecto: **4:3**
> - Formato: **PNG** (fondo transparente) o **WebP**
> - Peso: < 100KB
> - Estilo: Limpio, fondo neutro o transparente

### `furgon.png`
- **Contenido**: Furgón/van de carga cerrado
- **Prompt sugerido**: `White cargo van, side view, clean studio background, professional product photography, no people`

### `camion.png`
- **Contenido**: Camión de carga grande
- **Prompt sugerido**: `Large cargo truck with enclosed trailer, side view, white or silver color, clean studio background, professional`

### `ala-gaviota.png`
- **Contenido**: Camión con puertas laterales abiertas (tipo alas)
- **Prompt sugerido**: `Cargo truck with open side doors (gull-wing style), showing cargo space, white color, studio background`

### `plataforma.png`
- **Contenido**: Plataforma porta-contenedores
- **Prompt sugerido**: `Flatbed truck platform for shipping containers, side view, industrial yellow or neutral color, clean background`

---

## 👥 Imágenes Quiénes Somos

### `oficina.webp`
- **Dimensiones**: 1200 x 800px
- **Aspecto**: 3:2
- **Contenido**: Oficinas modernas, espacio de trabajo
- **Prompt sugerido**: `Modern corporate office interior, clean desks, computers, natural lighting, professional workspace, warm tones`

### `equipo.webp` (Opcional)
- **Dimensiones**: 1200 x 800px
- **Contenido**: Foto grupal del equipo
- **Nota**: Preferible foto real del equipo

### `ceo.webp` (Opcional)
- **Dimensiones**: 400 x 400px
- **Aspecto**: 1:1 (cuadrado)
- **Contenido**: Foto profesional del director/gerente
- **Nota**: Preferible foto real

---

## 🔧 Notas de Optimización

### Formato WebP
- Usar calidad 80-85% para balance tamaño/calidad
- Siempre proporcionar fallback JPG/PNG para navegadores antiguos

### Compresión
- Herramientas recomendadas: Squoosh, TinyPNG, ImageOptim
- Objetivo: reducir 50-70% sin pérdida visible

### Next.js Image
- Todas las imágenes se cargarán con `next/image`
- El componente aplica lazy loading automáticamente
- Proporcionar width y height para evitar layout shift

### Estructura de Carpetas
```
/public
├── logo.svg
├── logo-white.svg
├── favicon.ico
└── images/
    ├── furgon.png
    ├── camion.png
    ├── ala-gaviota.png
    ├── plataforma.png
    ├── hero/
    │   ├── hero-home.webp
    │   ├── hero-servicios.webp
    │   └── ...
    ├── features/
    │   ├── que-hacemos.webp
    │   └── ...
    └── equipo/
        ├── oficina.webp
        └── ...
```

---

## ✅ Checklist de Validación

Antes de usar cada imagen, verificar:
- [ ] Dimensiones correctas
- [ ] Formato correcto (WebP/PNG/SVG)
- [ ] Peso dentro del límite
- [ ] Sin marcas de agua
- [ ] Estilo consistente con la marca
- [ ] Fondo apropiado (transparente si aplica)
