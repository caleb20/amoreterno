# Magia Florería - React Best Practices

Una aplicación web moderna para una floristería construida con React y las mejores prácticas de desarrollo.

## 🚀 Características

- **React 19** con las últimas características
- **Componentes modulares** y reutilizables
- **Custom Hooks** para lógica reutilizable
- **Context API** para gestión de estado global
- **Error Boundaries** para manejo de errores
- **Formularios con validación** usando custom hooks
- **API utilities** con manejo de errores
- **Loading states** y feedback visual
- **Responsive design** con Tailwind CSS
- **SEO optimizado**

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ErrorBoundary.js
│   ├── Loading.js
│   ├── Notification.js
│   ├── UrgentDeliverySection.js
│   ├── CategorySection.js
│   ├── ServiceBenefitsSection.js
│   └── ... (otros componentes)
├── context/            # Context API para estado global
│   └── AppContext.js
├── hooks/              # Custom hooks
│   ├── useProducts.js
│   ├── useCart.js
│   ├── useCountdown.js
│   └── useForm.js
├── utils/              # Utilidades y constantes
│   ├── api.js
│   └── constants.js
├── data/               # Datos estáticos
│   └── database.json
├── styles/             # Estilos CSS
├── App.js              # Componente principal
└── index.js            # Punto de entrada
```

## 🛠️ Mejores Prácticas Implementadas

### 1. **Componentes Modulares**
- Cada componente tiene una responsabilidad única
- Componentes extraídos de App.js para mejor mantenibilidad
- Props tipadas y documentadas

### 2. **Custom Hooks**
- `useCountdown`: Hook reutilizable para temporizadores
- `useForm`: Hook para manejo de formularios con validación
- `useProducts`: Hook para gestión de productos
- `useCart`: Hook para gestión del carrito

### 3. **Gestión de Estado**
- **Context API** para estado global (AppContext)
- **useReducer** para lógica compleja de estado
- **Local state** para estado específico de componentes

### 4. **Manejo de Errores**
- **Error Boundary** para capturar errores de React
- **API Error handling** con clases personalizadas
- **User-friendly error messages**

### 5. **Performance**
- **React.memo** para componentes que no necesitan re-renderizar
- **useCallback** y **useMemo** para optimización
- **Lazy loading** de componentes pesados

### 6. **Formularios**
- **Custom hook useForm** con validación
- **Validadores reutilizables**
- **Feedback visual** para errores y éxito

### 7. **API y Comunicación**
- **API utilities** centralizadas
- **Error handling** consistente
- **Loading states** para mejor UX

### 8. **Accesibilidad**
- **ARIA labels** apropiados
- **Keyboard navigation**
- **Screen reader friendly**

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd magia_floreria

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start

# Construir para producción
npm run build
```

### Scripts Disponibles
- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm run build:css` - Construye los estilos CSS

## 📱 Características de la Aplicación

### Funcionalidades Principales
- **Catálogo de productos** con filtros
- **Carrito de compras** persistente
- **Sistema de entrega** con zonas y horarios
- **Formulario de contacto** con validación
- **Galería de productos** por ocasión
- **Testimonios** de clientes
- **Información de la empresa**

### Componentes Destacados
- **UrgentDeliverySection**: Temporizador para entregas del día
- **ProductSection**: Catálogo con filtros avanzados
- **ContactSection**: Formulario de contacto con validación
- **Cart**: Carrito de compras con persistencia

## 🎨 Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **Tailwind CSS** - Framework de estilos
- **Custom Hooks** - Lógica reutilizable
- **Context API** - Gestión de estado
- **Fetch API** - Comunicación con backend

## 📋 Checklist de Mejores Prácticas

- [x] Componentes modulares y reutilizables
- [x] Custom hooks para lógica compleja
- [x] Error boundaries implementados
- [x] Gestión de estado con Context API
- [x] Formularios con validación
- [x] API utilities con error handling
- [x] Loading states y feedback visual
- [x] Responsive design
- [x] SEO optimizado
- [x] Accesibilidad básica
- [x] Performance optimizada
- [x] Código limpio y documentado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

Magia Florería Team - [@magiafloreria](https://twitter.com/magiafloreria)

Link del proyecto: [https://github.com/magiafloreria/react-app](https://github.com/magiafloreria/react-app)
