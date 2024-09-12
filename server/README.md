# Trabajo Práctico: Desarrollo con TypeScript

###  Objetivo:
Desarrollar una aplicación que gestione el inventario de equipos informáticos de una empresa, utilizando TypeScript, una base de datos (PostgreSQL o MongoDB),
autenticación basada en JSON Web Token (JWT) y un front-end sencillo con React.

### Contexto:
La empresa FORMOTEX se dedica al mantenimiento y distribución de equipos
informáticos para diversas organizaciones. Actualmente, la empresa gestiona su inventario de manera manual, lo que provoca errores en el seguimiento de los equipos, como la falta de información actualizada sobre su estado, ubicación y fecha de adquisición.
Requerimientos:
1. Funcionalidades CRUD:

* La aplicación debe permitir las operaciones básicas de gestión de equipos
informáticos.
* Solo los usuarios autenticados podrán acceder a la aplicación y realizar
operaciones CRUD.
* FUNCIONALIDAD ADICIONALES: Según su abstracción, determine las
funcionalidades adicionales, requeridas para el manejo de inventario de los
equipos informáticos.

2. Autenticación con JWT:
* Implementar un sistema de autenticación utilizando JWT.
* Los usuarios deben iniciar sesión utilizando un endpoint de autenticación.
* Una vez autenticados, recibirán un token que deberán enviar en el
encabezado de las solicitudes a los endpoints protegidos.
* Endpoints protegidos: Los endpoints de creación, actualización,
eliminación y listado de equipos deben requerir un token válido, y un rol
específico de usuario.
* Endpoints:

- POST /auth/login: Permitir a los usuarios autenticarse con
credenciales (usuario y contraseña).
- POST /auth/register: Permitir el registro de nuevos usuarios
(opcional).

3. Front-end con React:
* Crear un front-end sencillo que consuma la API.
* Implementar un formulario de login en React para permitir que los usuarios
ingresen sus credenciales y obtengan el JWT.
* Al iniciar sesión, almacenar el token en el localStorage del navegador.
* El front-end debe permitir a los usuarios visualizar el inventario de equipos,
agregar nuevos equipos, actualizar y eliminarlos.
* Enviar el JWT en el encabezado de cada solicitud para acceder a los
endpoints protegidos.

### Pasos sugeridos:
1. Backend:
* Diseñar el modelo de datos: Crear una tabla o colección para usuarios y
equipos.
* Implementar JWT:
- Crear un sistema de registro e inicio de sesión.
- Generar y firmar un token JWT en el backend al autenticarse el
usuario.
- Proteger los endpoints de equipos con un middleware que valide el
token JWT.
* Capa de servicio: Gestionar la lógica de negocio para usuarios y equipos.

2. Front-end (React):
* Login: Crear una página de login donde el usuario introduzca su usuario y
contraseña.
* Autenticación: Enviar las credenciales a un endpoint /auth/login para obtener
el token JWT y almacenarlo en el localStorage.
* CRUD de equipos: Crear componentes React que permitan visualizar,
agregar, actualizar y eliminar equipos, asegurándose de enviar el token en
cada solicitud.
* Desarrollar las interfaces de usuario para las funcionalidades
adicionales que haya determinado según su abstracción.

3. Validaciones:
* En el back-end, validar que solo los usuarios autenticados puedan acceder a
los endpoints protegidos.
* En el front-end, asegurarse de que los formularios de login y de equipos
tengan validaciones básicas.

4. Base de Datos:
- Configurar la conexión con PostgreSQL o MongoDB según el sistema
elegido.
- Utilizar JWT para permitir solo a los usuarios registrados realizar cambios
en la base de datos.
Herramientas recomendadas:
* Backend:
- jsonwebtoken para el manejo de JWT.
- bcryptjs para encriptar contraseñas.
- Express.js como framework para construir la API.
-pg (PostgreSQL) o mongoose (MongoDB) para la conexión a la base de datos.
* Front-end:
- React para el desarrollo del front-end.
- axios o fetch API para hacer las solicitudes HTTP.

### Criterios de Evaluación:
1. Correcta implementación de JWT para la autenticación.
2. Integración de la autenticación en el front-end.
3. Uso adecuado de TypeScript en el back-end y front-end.
4. Implementación de la capa de servicio en el back-end.
5. Funcionalidad completa (CRUD de equipos protegidos por autenticación).
6. Estética y funcionalidad del front-end en React.