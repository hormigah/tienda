# Tienda - E-commerce SPA

Aplicación SPA de e-commerce desarrollada con React, TypeScript y Vite. Permite visualizar productos, buscar por nombre, ver detalles con galería de imágenes y gestionar un carrito de compras.

## Cómo Ejecutar el Proyecto

### Requisitos Previos

- Node.js >= 20.x
- npm >= 10.x

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd tienda

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar `.env` con la URL del backend:
VITE_API_BASE_URL=https://apim-dev-proxy.sodhc.co/test-jasson/api
```

### Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Ejecutar linter
npm run lint

# Formatear código
npm run format

# Ejecutar tests
npm run test

# Ejecutar tests con cobertura
npm run test:coverage

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## Decisiones Técnicas

### Stack Tecnológico

| Tecnología | Versión | Justificación |
|------------|---------|---------------|
| **React** | 19.x | Framework principal, últimas características de rendering |
| **TypeScript** | 5.9 | Tipado estático para mayor robustez y mantenibilidad |
| **Vite** | 7.x | Build tool rápido con HMR instantáneo |
| **Redux Toolkit** | 2.x | Gestión de estado global para el carrito |
| **React Query** | 5.x | Manejo de estado servidor, caché y sincronización |
| **React Router** | 7.x | Enrutamiento declarativo para SPA |
| **Axios** | 1.x | Cliente HTTP con interceptores y manejo de errores |
| **Vitest** | 4.x | Framework de testing compatible con Vite |

### Patrones de Diseño Aplicados

- **Container/Presentational**: Separación entre lógica y presentación
- **Custom Hooks**: Encapsulación de lógica reutilizable (`useApiProductList`, `useApiProduct`, `useCart`)
- **Adapter Pattern**: Transformación de datos del API al modelo de la aplicación (`adaptProducts`)
- **Provider Pattern**: Inyección de dependencias via Context y Redux Provider
- **Composition**: Componentes pequeños y composables

### Principios SOLID

- **Single Responsibility**: Cada componente tiene una única responsabilidad
- **Open/Closed**: Componentes extensibles via props sin modificar código fuente
- **Liskov Substitution**: Interfaces consistentes entre componentes similares
- **Interface Segregation**: Props específicas por componente, sin dependencias innecesarias
- **Dependency Inversion**: Dependencia de abstracciones (hooks, contexts) no implementaciones

### Arquitectura de Estado

```
Estado Global (Redux)          Estado Servidor (React Query)
       │                                │
       ▼                                ▼
   cartSlice                     useApiProductList
   - items[]                     - products[]
   - totalQuantity               - isLoading
   - totalAmount                 - error
       │                                │
       └────────────┬───────────────────┘
                    ▼
              Componentes UI
```

## Estructura del Proyecto

```
src/
├── api/
│   └── v1/
│       ├── config/          # Constantes de configuración API
│       ├── hooks/           # Custom hooks para consumo de API
│       │   └── useApiProduct/
│       │       ├── types/   # Tipos de respuesta del API
│       │       ├── utils/   # Funciones de fetch y adaptadores
│       │       └── useApiProduct.ts
│       ├── types/           # Tipos globales de API (errores)
│       └── utils/           # Cliente HTTP (axios instance)
├── components/
│   ├── AddCart/             # Botón agregar al carrito con cantidad
│   ├── Card/                # Tarjeta de producto
│   ├── Cart/                # Panel lateral del carrito
│   ├── Footer/              # Pie de página
│   ├── Header/              # Encabezado con logo y carrito
│   ├── Layout/              # Layout principal de la aplicación
│   ├── List/                # Grid de productos
│   ├── Loading/             # Indicador de carga
│   ├── NavBar/              # Barra de navegación con búsqueda
│   ├── Search/              # Componente de búsqueda con sugerencias
│   └── Slider/              # Galería de imágenes con navegación
├── contexts/
│   └── CartContext.tsx      # Context para estado del modal del carrito
├── pages/
│   ├── HomePage/            # Página principal con listado de productos
│   ├── NotFoundPage/        # Página 404
│   └── ProductPage/         # Página de detalle del producto
├── routes/
│   └── routes.tsx           # Configuración de rutas
├── store/
│   ├── cartSlice.ts         # Slice de Redux para el carrito
│   ├── hooks.ts             # Hooks tipados de Redux
│   ├── store.ts             # Configuración del store
│   └── StoreProvider.tsx    # Provider de Redux
├── tests/
│   ├── components/          # Providers para testing
│   ├── index.tsx            # Utilidades de testing
│   └── setup.ts             # Configuración de Vitest
├── types/
│   └── product.ts           # Tipos del modelo de producto
├── App.tsx                  # Componente raíz
├── main.tsx                 # Punto de entrada
└── index.css                # Estilos globales y variables CSS
```

## CI/CD

### Pipeline de Integración Continua

El proyecto utiliza GitHub Actions para CI/CD con el siguiente flujo:

```yaml
Triggers:
  - Push a main
  - Pull Request a main

Jobs:
  quality-checks:
    ├── Checkout código
    ├── Setup Node.js 20.x
    ├── Instalar dependencias (npm ci)
    ├── Ejecutar linter (npm run lint)
    ├── Verificar formato (npm run format:check)
    └── Ejecutar tests con cobertura (npm run test:coverage)
```

### Verificaciones Automatizadas

| Check | Comando | Descripción |
|-------|---------|-------------|
| Linting | `npm run lint` | ESLint con reglas de React y TypeScript |
| Formato | `npm run format:check` | Prettier para consistencia de código |
| Tests | `npm run test:coverage` | Vitest con reporte de cobertura |

### Estructura del JSON de Compra

```json
{
  "fechaCompra": "4/2/2026, 3:00:00 p. m.",
  "items": [
    {
      "sku": "SKU-001",
      "cantidad": 2,
      "precioUnitario": 150000,
      "totalItem": 300000
    }
  ],
  "subtotal": 252100.84,
  "impuestos": 47899.16,
  "valorTotal": 300000
}
```

### Cobertura de Tests

```
Test Files:  3 passed
Tests:       21 passed

Suites:
- useApiProduct.test.tsx (14 tests)
  - adaptProducts: transformación de datos
  - fetchProductList: llamadas al API
  - useApiProductList: hook de listado
  - useApiProduct: hook de producto individual

- Layout.spec.tsx (3 tests)
- NotFoundPage.spec.tsx (4 tests)
```
