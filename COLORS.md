# 🎨 Paleta de Colores - Amor Eterno (ACTUALIZADA)

## Colores Principales

### 🌸 Rosa Principal - `#FF99C8`
- **Uso**: Botones principales, CTAs importantes, elementos destacados
- **Variable CSS**: `--color-primary` 
- **Clases Tailwind**: `bg-primary`, `text-primary`, `border-primary`
- **Contraste**: Excelente con texto blanco, bueno con texto oscuro

### 🌊 Celeste Principal - `#A9DEF9`
- **Uso**: Botones secundarios, fondos de sección, elementos complementarios
- **Variable CSS**: `--color-secondary`
- **Clases Tailwind**: `bg-secondary`, `text-secondary`, `border-secondary`
- **Contraste**: Bueno con texto oscuro (#2D3748)

## Colores Secundarios

### 💜 Lavanda - `#E4C1F9`
- **Uso**: Elementos de acento, highlights, decoraciones
- **Variable CSS**: `--color-accent`
- **Clases Tailwind**: `bg-accent`, `text-accent`, `border-accent`
- **Contraste**: Bueno con texto oscuro

### 🌿 Verde Menta - `#D0F4DE`
- **Uso**: Estados de éxito, confirmaciones, elementos naturales
- **Variable CSS**: `--color-mint`
- **Clases Tailwind**: `bg-mint`, `text-mint`, `border-mint`
- **Contraste**: Bueno con texto oscuro

### ☀️ Amarillo Claro - `#FCF6BD`
- **Uso**: Fondos suaves, avisos, elementos de calidez
- **Variable CSS**: `--color-yellow`
- **Clases Tailwind**: `bg-background`, `text-yellow`, `border-yellow`
- **Contraste**: Bueno con texto oscuro

## ✅ ACTUALIZACIÓN COMPLETADA

### 🎯 Cambios Realizados

1. **Paleta de Colores Actualizada**:
   - ✅ Rosa Principal: `#FF99C8` (reemplaza el anterior `#F8BBD9`)
   - ✅ Celeste Principal: `#A9DEF9` (reemplaza el anterior `#B8C5A6`)
   - ✅ Lavanda: `#E4C1F9` (nuevo color de acento)
   - ✅ Verde Menta: `#D0F4DE` (para estados de éxito)
   - ✅ Amarillo Claro: `#FCF6BD` (para fondos suaves)

2. **Mejoras de Contraste en Botones**:
   - ✅ Botones principales (`btn-primary`): Rosa con gradiente y texto blanco
   - ✅ Botones secundarios (`btn-secondary`): Celeste con texto oscuro
   - ✅ Botones de acento (`btn-accent`): Lavanda con texto oscuro
   - ✅ Botones de éxito (`btn-success`): Verde menta con texto oscuro

3. **Componentes Actualizados**:
   - ✅ Cart.tsx: Botones con mejor contraste
   - ✅ ProductCard.tsx: Botones "Agregar al carrito" mejorados
   - ✅ Variables CSS centralizadas en `/src/styles/tailwind.css`
   - ✅ Configuración de Tailwind actualizada

### 🎨 Clases de Botones Disponibles

```html
<!-- Botón Principal (Rosa) -->
<button class="btn-primary">Comprar Ahora</button>

<!-- Botón Secundario (Celeste) -->
<button class="btn-secondary">Ver Más</button>

<!-- Botón de Acento (Lavanda) -->
<button class="btn-accent">Personalizar</button>

<!-- Botón de Éxito (Verde Menta) -->
<button class="btn-success">Confirmar</button>
```

### 🌈 Gradientes Personalizados

```html
<!-- Gradiente Principal (Rosa → Celeste) -->
<div class="gradient-primary">...</div>

<!-- Gradiente Secundario (Celeste → Lavanda) -->
<div class="gradient-secondary">...</div>

<!-- Gradiente de Acento (Lavanda → Verde Menta) -->
<div class="gradient-accent">...</div>

<!-- Gradiente Cálido (Amarillo → Rosa) -->
<div class="gradient-warm">...</div>
```

## Paleta de Variantes

Cada color principal tiene variantes del 50 al 900 para diferentes intensidades:

### Texto
```html
<p class="text-primary">Texto en rosa</p>
<p class="text-secondary-700">Texto celeste oscuro</p>
<p class="text-accent">Texto lavanda</p>
```

### Bordes
```html
<div class="border border-primary">Borde rosa</div>
<div class="border-2 border-accent-300">Borde lavanda claro</div>
```

### Gradientes Predefinidos
```html
<div class="gradient-primary">Rosa a lavanda</div>
<div class="gradient-soft">Amarillo a verde menta</div>
<div class="gradient-cool">Celeste a verde menta</div>
```

## Uso con Variables CSS

### En archivos CSS
```css
.mi-elemento {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-accent);
}
```

### Variables disponibles
- `--color-primary` (#FF99C8)
- `--color-secondary` (#A9DEF9)
- `--color-accent` (#E4C1F9)
- `--color-background` (#FCF6BD)
- `--color-mint` (#D0F4DE)
- `--color-text-primary` (#1A202C)
- `--color-text-secondary` (#4A5568)
- `--color-surface` (#FFFFFF)

## Sombras Personalizadas

- `shadow-primary` - Sombra con tinte rosa
- `shadow-accent` - Sombra con tinte lavanda
- `shadow-secondary` - Sombra con tinte celeste
- `shadow-mint` - Sombra con tinte verde menta

## Recomendaciones de Uso

### Jerarquía Visual
1. **Primary (Rosa)** - Elementos más importantes
2. **Accent (Lavanda)** - Elementos de apoyo y hover
3. **Secondary (Celeste)** - Información y elementos secundarios
4. **Background (Amarillo)** - Fondos y áreas de contenido
5. **Mint (Verde)** - Estados positivos y éxito

### Combinaciones Recomendadas
- Rosa + Lavanda (complementarios)
- Celeste + Verde Menta (frescos)
- Amarillo + cualquier color (fondo neutro)
- Rosa + Celeste (contraste vibrante)

### Accesibilidad
- Usa tonos más oscuros (700-900) para texto sobre fondos claros
- Usa tonos más claros (50-200) para fondos
- Siempre verifica el contraste de color para legibilidad

## Actualización de Componentes Existentes

Para migrar componentes existentes:

1. Reemplaza `bg-pink-*` con `bg-primary-*`
2. Reemplaza `bg-blue-*` con `bg-secondary-*`
3. Reemplaza `bg-purple-*` con `bg-accent-*`
4. Usa `bg-background` en lugar de `bg-yellow-*`
5. Usa `bg-mint` para verdes

## 🛍️ Estilos Optimizados para Tarjetas de Producto (VERSIÓN GRANDE)

#### Tarjetas Grandes y Visibles
- **Clase**: `.product-card-compact` - Tarjetas ampliadas, máximo 420px de ancho
- **Imagen**: `.product-image` - Altura de 208px (h-52) para mayor impacto visual
- **Padding**: Aumentado a p-5 para mejor respiración del contenido
- **Hover Effect**: Elevación suave (-translate-y-1) y borde rosa sutil

#### Badges y Etiquetas Ampliadas
```html
<!-- Badge de Precio (Rosa con gradiente) - Más grande -->
<span class="price-badge text-xl">S/. 45.99</span>

<!-- Badge de Descuento (Rojo) - Tamaño medio -->
<span class="discount-badge text-sm">-20%</span>

<!-- Badge de Tiempo (Naranja claro) - Tamaño medio -->
<span class="time-badge text-sm">⏰ 4h restantes</span>

<!-- Badge de Entrega (Verde menta claro) - Tamaño medio -->
<span class="delivery-badge text-sm">🚚 2-4h</span>

<!-- Badge Destacado (Lavanda) - Tamaño medio -->
<span class="featured-badge text-sm">✨ Destacado</span>
```

#### Botones Grandes
```html
<!-- Botón Principal Grande -->
<button class="btn-compact-primary text-base py-2.5">🛒 Agregar</button>
```

#### Grid Responsive Optimizado para Visibilidad
- **Mobile**: 1 columna (ancho completo)
- **SM (640px+)**: 2 columnas (más espacio por tarjeta)
- **LG (1024px+)**: 3 columnas (balance perfecto)
- **Gap**: 32px (gap-8) para mayor separación y presencia

#### Mejoras de Tamaño y Visibilidad
- **Títulos más grandes**: text-lg para mejor legibilidad
- **Precios destacados**: text-xl para mayor impacto
- **Badges ampliados**: px-3 py-1.5 para mejor toque en móvil
- **Botones móviles**: py-3 text-base para fácil interacción
- **Rating más visible**: h-5 w-5 para mayor claridad

## ✅ ACTUALIZACIÓN FINAL - VERSIÓN GRANDE Y COMPLETA

### 🛍️ Tarjetas de Producto Optimizadas
- **Tamaño ampliado**: 480px máximo de ancho
- **Imagen más grande**: 240px (h-60) de altura
- **Todos los detalles restaurados**: Descripción, rating completo, stock, entrega, ofertas
- **Grid optimizado**: 4 columnas en XL, más juntas con gap-4

### 🎨 Mejoras de Color y Visibilidad
- **Botón WhatsApp**: Color oficial #25D366
- **Notificaciones**: Rosa primary para acciones, colores específicos por tipo
- **Precios carrito**: Rosa primary más visible (text-lg/text-2xl)
- **Contraste mejorado**: Textos más oscuros y legibles

### 📱 UX Mejorado
- **Productos más visibles**: Tarjetas grandes con todos los detalles
- **Espaciado optimizado**: Más juntos pero sin amontonar
- **Botones destacados**: Colores apropiados y contrastantes
- **Información completa**: Todo visible sin minimalismo excesivo
