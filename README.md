1. Nombre del proyecto
   Alrededor de los EE. UU. - registro y la autorización en el frontend

2. Descripción del proyecto y su funcionalidad
   Este proyecto es el frontend de la aplicación "Alrededor de los EE. UU.". La funcionalidad principal incluye:

- **Registro de usuarios**: Los nuevos usuarios pueden crear una cuenta proporcionando su correo electrónico y contraseña
- **Inicio de sesión**: Los usuarios registrados pueden acceder a la aplicación con sus credenciales
- **Cierre de sesión**: Los usuarios pueden cerrar sesión de forma segura
- **Editar información personal**: Los usuarios pueden actualizar su nombre y descripción
- **Cambiar foto de perfil**: Posibilidad de actualizar la imagen de avatar mediante un enlace URL
- **Visualización del email**: El correo electrónico del usuario se muestra en el encabezado
- **Agregar nuevas tarjetas**: Los usuarios pueden crear tarjetas con un título y enlace a una imagen
- **Eliminar tarjetas**: Solo el propietario puede eliminar sus propias tarjetas
- **Sistema de "Me gusta"**: Los usuarios pueden dar o quitar "me gusta" a cualquier tarjeta
- **Vista ampliada**: Al hacer clic en una imagen, se abre una ventana modal con la imagen en tamaño completo
- **Interfaz responsive**: La aplicación se adapta a diferentes tamaños de pantalla (desktop, tablet, móvil)
- **Validación de formularios**: Todos los formularios incluyen validación de datos en tiempo real
- **Mensajes de retroalimentación**: Tooltips informativos que indican el éxito o fallo de las operaciones
- **Navegación intuitiva**: Sistema de rutas que facilita la navegación entre diferentes secciones

3. Descripción de las tecnologías y técnicas utilizadas

- Estados controlados para formularios
- Estado compartido mediante Context API
- Actualización inmutable del estado
- Uso de `async/await` para operaciones asíncronas
- Manejo de errores con `try/catch`
- Promesas con `.then()` y `.catch()`
- Validación HTML5 (required, minLength, maxLength, type="email")
- Validación en tiempo real con atributos de input
- Mensajes de error personalizados
- Lazy loading de imágenes
- Tokens JWT para autenticación segura
- Validación de entrada de usuario
- Rutas protegidas del lado del cliente
- Transiciones suaves (opacity, transform)
- Indicadores de carga cuando sea necesario
- Tooltips informativos para operaciones críticas
