# Around the US — Proyecto Web con Autenticación

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_DOM-7-CA4245?logo=reactrouter&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

---

## Descripción del Proyecto

**Around the US** es una aplicación web interactiva de tipo red social fotográfica. Permite a los usuarios registrarse, iniciar sesión y, una vez autenticados, gestionar su perfil personal y publicar tarjetas con imágenes de lugares de interés.

Este proyecto es la evolución de una versión previa sin autenticación. En esta iteración se incorpora un sistema completo de **registro, inicio de sesión y protección de rutas mediante JWT (JSON Web Token)**, conectando el frontend con dos APIs externas especializadas.

---

## Funcionalidades Principales

- **Registro de usuario** con email y contraseña, con feedback visual de éxito o error.
- **Inicio de sesión** con autenticación JWT y persistencia del token en `localStorage`.
- **Verificación automática de token** al recargar la página, para mantener la sesión activa.
- **Cierre de sesión** con eliminación del token y redirección a la pantalla de login.
- **Rutas protegidas:** el contenido principal sólo es accesible para usuarios autenticados.
- **Gestión de perfil:** editar nombre, descripción y avatar.
- **Tarjetas de lugares:** agregar, visualizar, dar like/dislike y eliminar tarjetas propias.
- **Popups modales** para cada acción del usuario (editar perfil, cambiar avatar, añadir tarjeta, ampliar imagen).
- **Tooltip informativo** que notifica el resultado de registro o login.
- **Interfaz responsive** adaptada a escritorio, tablet y móvil.
- **Validación de formularios** en tiempo real con mensajes de error personalizados.

---

## Tecnologías y Herramientas Utilizadas

### Frontend

| Herramienta           | Versión | Rol en el proyecto                                                                                       |
| --------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| **React**             | 19      | Librería principal para la construcción de la interfaz con componentes reutilizables                     |
| **React Router DOM**  | 7       | Manejo de rutas del lado del cliente (`/`, `/signup`, `/signin`) y redirecciones                         |
| **Vite**              | 7       | Bundler y servidor de desarrollo con Hot Module Replacement (HMR) ultrarrápido                           |
| **JavaScript (ES6+)** | —       | Lenguaje principal: `async/await`, clases, módulos ES, destructuring                                     |
| **CSS Modular (BEM)** | —       | Arquitectura de estilos organizada por bloques: `auth`, `header`, `footer`, `popup`, `places`, `profile` |
| **normalize.css**     | 8       | Normalización de estilos base entre navegadores                                                          |
| **ESLint**            | 9       | Linting de código para mantener calidad y consistencia                                                   |

### Gestión del Estado

| Patrón                                    | Descripción                                                                 |
| ----------------------------------------- | --------------------------------------------------------------------------- |
| **React Hooks** (`useState`, `useEffect`) | Control del estado local: usuario, tarjetas, popups, sesión                 |
| **Context API** (`CurrentUserContext`)    | Estado global del usuario autenticado, accesible desde cualquier componente |

### Comunicación con APIs

El proyecto se comunica con **dos APIs externas**:

**1. API de Contenido — Around API**

```

```

Gestiona el contenido de la aplicación. Requiere token JWT en cabecera `Authorization: Bearer <token>`.

| Método   | Endpoint           | Acción                           |
| -------- | ------------------ | -------------------------------- |
| `GET`    | `/users/me`        | Obtener datos del usuario actual |
| `PATCH`  | `/users/me`        | Actualizar nombre y descripción  |
| `PATCH`  | `/users/me/avatar` | Actualizar avatar                |
| `GET`    | `/cards`           | Obtener todas las tarjetas       |
| `POST`   | `/cards`           | Crear una nueva tarjeta          |
| `DELETE` | `/cards/:id`       | Eliminar una tarjeta propia      |
| `PUT`    | `/cards/:id/likes` | Dar like a una tarjeta           |
| `DELETE` | `/cards/:id/likes` | Quitar like a una tarjeta        |

**2. API de Autenticación — TripleTen Register API**

```

```

Gestiona el ciclo de autenticación de usuarios.

| Método | Endpoint    | Acción                       |
| ------ | ----------- | ---------------------------- |
| `POST` | `/signup`   | Registrar un nuevo usuario   |
| `POST` | `/signin`   | Iniciar sesión y obtener JWT |
| `GET`  | `/users/me` | Verificar validez del token  |

---

## Arquitectura del Proyecto

```
src/
├── components/
│   ├── App.jsx                  # Componente raíz — lógica global, estado y rutas
│   ├── Header/                  # Barra de navegación con email y botón de logout
│   ├── Footer/                  # Pie de página
│   ├── Main/                    # Contenido principal protegido
│   │   └── components/
│   │       ├── Popup/           # Popup genérico reutilizable
│   │       ├── ImagePopup/      # Popup para ampliar imágenes
│   │       └── form/
│   │           ├── EditProfile/ # Formulario para editar nombre y descripción
│   │           ├── EditAvatar/  # Formulario para cambiar el avatar
│   │           └── NewCard/     # Formulario para agregar una nueva tarjeta
│   ├── Card/                    # Componente de tarjeta individual
│   ├── Login/                   # Formulario de inicio de sesión
│   ├── Register/                # Formulario de registro
│   ├── ProtectedRoute/          # HOC que redirige si el usuario no está autenticado
│   └── InfoTooltip/             # Feedback visual de éxito o error
├── contexts/
│   └── CurrentUserContext.js    # Contexto global del usuario autenticado
├── utils/
│   ├── api.js                   # Clase Api para peticiones al servidor de contenido
│   └── auth.js                  # Funciones de registro, login y verificación de token
└── blocks/                      # Estilos CSS organizados por bloque (metodología BEM)
```

---

## Flujo de Autenticación

```
Usuario entra a la app
        │
        ▼
¿Hay token en localStorage?
        │
   SÍ ──┼── Verificar token con /users/me
        │         │
        │    ¿Válido? ── SÍ ──► Redirige a "/" (app principal)
        │         │
        │         NO ──► Elimina token, redirige a /signin
        │
   NO ──┴──► Redirige a /signin
                  │
         ┌────────┴────────┐
         ▼                 ▼
     /signin            /signup
    (Login)           (Registro)
         │                 │
    JWT en              Feedback
  localStorage          tooltip
         │
         ▼
    Redirige a "/"
   (contenido protegido)
```

---

## Análisis del Portal Web

### Sistema de autenticación con JWT

El manejo del token JWT se implementó con una estrategia de persistencia en `localStorage`. Al iniciar la app, se verifica automáticamente la validez del token almacenado antes de renderizar cualquier contenido. Esto garantiza que la sesión se mantenga activa entre recargas de página sin necesidad de que el usuario vuelva a autenticarse.

### Protección de rutas con `ProtectedRoute`

Se creó el componente `ProtectedRoute`, que actúa como guardián de las rutas privadas. Si el usuario no está autenticado, React Router lo redirige automáticamente a `/signin`, impidiendo el acceso no autorizado al contenido principal sin necesidad de lógica duplicada en cada componente.

### Separación de responsabilidades

La lógica se distribuyó en capas claras: presentación (componentes React), estado global (Context API) y comunicación con el servidor (`api.js` y `auth.js`). Esta arquitectura facilita el mantenimiento, las pruebas y la extensión del proyecto a futuro.

### Clase `Api` orientada a objetos

La comunicación con la API de contenido se encapsula en una clase `Api` reutilizable. Cada instancia recibe la URL base y las cabeceras, y adjunta automáticamente el token JWT almacenado en cada petición. Esto centraliza la lógica HTTP y evita repetición de código.

### Feedback de usuario con `InfoTooltip`

Se implementó el componente `InfoTooltip` para ofrecer retroalimentación visual inmediata en operaciones críticas como registro y login. El tooltip distingue visualmente entre éxito y error, mejorando la experiencia de usuario de forma significativa.

---

## Conclusiones

Este proyecto consolidó la integración de autenticación JWT en una aplicación React del mundo real. Los aprendizajes clave fueron los siguientes:

La autenticación con JWT no se reduce a guardar un token: implica diseñar flujos completos de verificación, persistencia y redirección que garanticen una experiencia fluida y segura para el usuario. El patrón `ProtectedRoute` con React Router es una solución elegante y reutilizable para gestionar el acceso condicional a rutas privadas, manteniendo el código limpio y desacoplado.

Separar la lógica de autenticación (`auth.js`) de la lógica de negocio (`api.js`) hace el código más legible y facilita su mantenimiento o sustitución futura. La Context API de React es suficiente para gestionar el estado global de usuario en aplicaciones de mediana escala, sin necesidad de librerías externas más pesadas.

Este proyecto sienta las bases para escalar hacia aplicaciones más complejas con autenticación real en el backend, refresh tokens y manejo avanzado de sesiones.

---

Desarrollado con 💛 por Lolina — Around the US - Proyecto desarrollado como parte del programa de formación Full Stack de TripleTen.
