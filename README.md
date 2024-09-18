# Typescript Formotex

Esta aplicación se basa en un gestor de inventarios de equipos informáticos de la empresa Formotex.

## Tecnologías utilizadas 

<p align="center">
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?logo=typescript&logoColor=white">
  </a>
  <a href="https://www.mongodb.com/" target="_blank">
    <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248.svg?logo=mongodb&logoColor=white">
  </a>
  <a href="https://jwt.io/" target="_blank">
    <img alt="JsonWebToken" src="https://img.shields.io/badge/JWT-000000.svg?logo=jsonwebtokens&logoColor=white">
  </a>
  <a href="https://reactjs.org/" target="_blank">
    <img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?logo=react&logoColor=black">
  </a>
  <a href="https://nodejs.org/" target="_blank">
    <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933.svg?logo=node.js&logoColor=white">
  </a>
  <a href="https://expressjs.com/" target="_blank">
    <img alt="Express" src="https://img.shields.io/badge/Express-000000.svg?logo=express&logoColor=white">
  </a>
  <a href="https://www.npmjs.com/package/bcryptjs" target="_blank">
    <img alt="BcryptJS" src="https://img.shields.io/badge/BcryptJS-00C853.svg?logo=lock&logoColor=white">
  </a>
</p>

## Instalación

Para instalar las dependencias necesarias, sigue estos pasos:

### **Frontend**

```bash
cd frontend
 npm install
```

### **Backend**

```bash
cd server
 npm install
```
## Configuración Inicial

1. **Crear Base de Datos**
   - Utiliza [MongoDB Compass](https://www.mongodb.com/products/compass) para crear una base de datos llamada **`formotexdb`**.

2. **Registro de Usuario Admin**
   - Usa [ThunderClient](https://www.thunderclient.com/) o [Postman](https://www.postman.com/) para registrar un usuario administrador. Aquí está el formato JSON que debes enviar en la solicitud de registro:
     ```json
     {
       "username": "admin",
       "email": "emailexample@gmail.com",
       "password": "yourpassworD123",
       "role": "admin"
     }
     ```
     - **Ruta:** `http://localhost:8000/api/auth/register`

* **Crear un archivo env con el parametro "SECRET_KEY"**

* **Iniciar el servidor y el cliente con el siguiente comando:**

```bash
cd server 
 npm run dev
```
```bash
cd client 
 npm run dev
```

* **Por ultimo, iniciar sesión con la cuenta admin para agregar, eliminar, y actualizar equipos informaticos, y para solo visualizarlos, crear un usuario desde el front.**

## Funcionalidades

### Gestión de Equipos

- **Agregar Equipos:** Permite a los usuarios con rol de administrador añadir nuevos equipos informáticos al inventario. Los detalles requeridos incluyen nombre, tipo, estado, ubicación y fecha de adquisición.

- **Eliminar Equipos:** Los administradores pueden eliminar equipos del inventario. Esta opción está restringida a los usuarios con rol de administrador.

- **Actualizar Equipos:** Los administradores pueden editar la información de los equipos existentes. Esto incluye la actualización del nombre, tipo, estado, ubicación y fecha de adquisición.

- **Visualización de Equipos:** Los usuarios pueden ver el listado de equipos disponibles en el inventario. Los administradores tienen la capacidad de realizar cambios, mientras que los usuarios regulares solo pueden visualizar.

### Autenticación y Roles

- **Registro de Usuario:** Permite a los usuarios crear una cuenta con un rol unico (user). Los administradores pueden crear cuentas para otros usuarios.

- **Inicio de Sesión:** Los usuarios pueden iniciar sesión utilizando sus credenciales. Los administradores tienen acceso completo a las funcionalidades de gestión de equipos, mientras que los usuarios regulares tienen acceso solo a la visualización de los equipos.

### Interfaz de Usuario

- **Dashboard:** Proporciona una vista general del inventario de equipos con opciones para agregar, eliminar y actualizar equipos, dependiendo del rol del usuario.

- **Formularios de Entrada:** Los formularios para agregar y actualizar equipos utilizan validaciones para asegurar la correcta entrada de datos.

- **Modales de Edición:** Utiliza modales para la edición de equipos, permitiendo una experiencia de usuario más fluida y organizada.

### Seguridad

- **Autenticación JWT:** Utiliza JSON Web Tokens (JWT) para la autenticación de usuarios, asegurando que las operaciones sensibles solo puedan ser realizadas por usuarios autenticados y autorizados.

- **Encriptación de Contraseñas:** Emplea `bcryptjs` para la encriptación segura de contraseñas, protegiendo así la seguridad de los datos de los usuarios.

### Backend y Base de Datos

- **API RESTful:** Ofrece una API RESTful para interactuar con el sistema de gestión de inventarios, permitiendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los equipos.

- **Base de Datos MongoDB:** Utiliza MongoDB para almacenar y gestionar los datos de los equipos y usuarios.

---