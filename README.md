
# VECINOCHEF

## [See the App!](https://vecinochef-app.netlify.app/)



## Description

Vecinochef es una app para que los vecinos de un puebl o barrio puedan apuntarse a los menús que hacen ellos mismos aprovechando la comida de sus vecinos y sacando provecho a la comida de casa.

#### [Client Repo here](www.your-github-url-here.com)
#### [Server Repo here](www.your-github-url-here.com)

## Backlog Functionalities

Homepage para Usuarios no Logeados

Descripción: Muestra la página de inicio para usuarios que aún no han iniciado sesión.
Registro de Usuario

Descripción: Permite a los usuarios registrarse proporcionando información como nombre, correo electrónico y contraseña.
Inicio de Sesión de Usuario

Descripción: Permite a los usuarios iniciar sesión verificando sus credenciales.
Verificación de Usuario

Descripción: Indica al frontend que el usuario está activo.
Especialidades Creadas por el Usuario Logeado

Descripción: Muestra las especialidades creadas por el usuario que ha iniciado sesión.
Edición de Perfil de Usuario

Descripción: Permite a los usuarios editar su información de perfil.
Borrado de Usuario

Descripción: Permite a los usuarios eliminar sus cuentas.
Perfil de Otro Usuario con Especialidades y Menús

Descripción: Envía la información de otro usuario, incluyendo las especialidades y menús que ha creado.
Información de Todas las Especialidades

Descripción: Muestra información sobre todas las especialidades disponibles.
Especialidades en las que el Usuario se ha Apuntado

Descripción: Muestra las especialidades en las que el usuario ha mostrado interés o se ha apuntado.
Especialidades Creadas por el Usuario

Descripción: Muestra las especialidades que el usuario ha creado.
Especialidades Creadas por Otro Usuario

Descripción: Muestra las especialidades creadas por otro usuario.
Todos los Platos que son Especialidades

Descripción: Lista todos los platos que son considerados especialidades.
Apuntarse a una Especialidad

Descripción: Permite a los usuarios apuntarse a una especialidad específica.
Desapuntarse de una Especialidad

Descripción: Permite a los usuarios cancelar su participación en una especialidad.
Añadir Especialidad

Descripción: Permite a los usuarios agregar nueva información sobre una especialidad.
Información de una Especialidad para Edición

Descripción: Muestra información detallada de una especialidad específica para su edición.
Actualizar Información de una Especialidad en Edición

Descripción: Permite a los usuarios actualizar la información de una especialidad en el proceso de edición.
Borrar una Especialidad

Descripción: Permite a los usuarios eliminar una especialidad.
Lista de Menús por Días

Descripción: Muestra una lista de menús organizados por días.
Apuntarse a un Menú

Descripción: Permite a los usuarios apuntarse a un menú específico.
Desapuntarse de un Menú

Descripción: Permite a los usuarios cancelar su participación en un menú.
Menús Creados por el Usuario Logeado

Descripción: Muestra los menús que el usuario ha creado.
Menús en los que el Usuario se ha Apuntado

Descripción: Muestra los menús en los que el usuario ha mostrado interés o se ha apuntado.
Menús Creados por el Usuario

Descripción: Muestra los menús que el usuario ha creado.
Menús Creados por Otro Usuario

Descripción: Muestra los menús creados por otro usuario.
Añadir Menú

Descripción: Permite a los usuarios agregar información sobre un nuevo menú.
Actualizar Información de un Menú

Descripción: Permite a los usuarios actualizar la información de un menú existente.
Borrar un Menú

Descripción: Permite a los usuarios eliminar un menú.
Subir una Imagen a Cloudinary

Descripción: Permite a los usuarios subir una imagen a la plataforma Cloudinary.

## Technologies used
HTML
CSS
JavaScript
Express
React
Axios
React Context
Mongoose (para la base de datos)


# Server Structure

## Models

User model
const userSchema = new Schema(
  {
    userName: {
    type: String,
    required: [true, 'Email is required.'],
    },
    userSurname: {
    type: String,
    required: [true, 'Email is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    profilePic: {
      type: String,
      default: "https://res.cloudinary.com/dj9npvnlg/image/upload/v1693817717/fotos-de-perfiles/blank-profile-picture-973460_960_720_1_erjnkk.webp"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  })


Menu model
const menuSchema = new Schema(
    {
        creador: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        participantes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        platoNombre: {
            type: Schema.Types.ObjectId,
            ref: "Especialidad",
        },
        postreNombre: {
            type: Schema.Types.ObjectId,
            ref: "Especialidad",
        },
        menuPrecio: Number,
        weekDay: {
            type: String,
            enum: daysOfWeekEnum, // Usamos el enum aquí
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

Especialidad 
const especialidadSchema = new Schema(
    {
        creador: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        participantes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        especialidadNombre: String,
        especialidadPrecio: Number,
        especialidadIngredientes: String,
        especialidadPic: String,
        isEspecialidad: Boolean,
    },
{
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
}
);



## API Endpoints (backend routes)
| HTTP Method | URL                                       | Request Body         | Success Status | Error Status | Description                                     |
| ----------- | ----------------------------------------- | -------------------- | -------------- | ------------ | ----------------------------------------------- |
| GET         | `/`                                       | N/A                  | 200            | N/A          | Homepage usuarios no logeados                  |
| POST        | `/api/auth/signup`                        | JSON                 | 200            | 400          | Registrar al usuario                            |
| POST        | `/api/auth/login`                         | JSON                 | 200            | 400          | Validar las credenciales                        |
| GET         | `/api/auth/verify`                       | N/A                  | 200            | N/A          | Indicar al frontend que el usuario está activo |
| GET         | `/user/myprofile`                        | N/A                  | 200            | N/A          | Especialidades creadas por el usuario logeado  |
| GET         | `/user/edit-profile/:userId`              | N/A                  | 200            | N/A          | Manda la info del usuario al formulario de edición |
| PUT         | `/user/edit-profile/:userId`              | JSON                 | 200            | N/A          | Actualizar la info del usuario                 |
| DELETE      | `/user/edit-profile/:userId`              | N/A                  | 200            | N/A          | Borrar un usuario                               |
| GET         | `/user/user-profile/:userId`              | N/A                  | 200            | N/A          | Envía la información de otro usuario con las especialidades y menús que haya creado |
| GET         | `/esp/especialidades`                    | N/A                  | 200            | N/A          | Muestra la info de todas las especialidades     |
| GET         | `/esp/espApuntada/especialidades`         | N/A                  | 200            | N/A          | Especialidades en los que el usuario se ha apuntado |
| GET         | `/esp/espCreada/especialidades`           | N/A                  | 200            | N/A          | Especialidades creadas por el usuario           |
| GET         | `/esp/espCreada/especialidades/:userId`   | N/A                  | 200            | N/A          | Especialidades creadas por otro usuario         |
| GET         | `/esp/espCreada/allEspecialidades`        | N/A                  | 200            | N/A          | Todos los platos que son especialidades         |
| POST        | `/esp/especialidades/apuntar/:especialidadId` | N/A               | 200            | N/A          | Te apunta a una especialidad                   |
| POST        | `/esp/especialidades/desapuntar/:especialidadId` | N/A            | 200            | N/A          | Te desapunta de una especialidad                |
| POST        | `/esp/add-especialidad`                  | JSON                 | 200            | N/A          | Información para añadir especialidad            |
| GET         | `/esp/edit-especialidad/:id`              | N/A                  | 200            | N/A          | Info de una especialidad concreta para el form de edit |
| PUT         | `/esp/edit-especialidad/:id`              | JSON                 | 200            | N/A          | Actualizar la info de una especialidad en edit  |
| DELETE      | `/esp/edit-especialidad/:id`              | N/A                  | 200            | N/A          | Borrar una especialidad                         |
| GET         | `/menu/home`                             | N/A                  | 200            | N/A          | Lista de menús por días                         |
| POST        | `/menu/home/apuntar/:menuId`             | N/A                  | 200            | N/A          | Para apuntarte a un menú                        |
| POST        | `/menu/home/desapuntar/:menuId`          | N/A                  | 200            | N/A          | Para desapuntarse a un menú                     |
| GET         | `/menu/myprofile`                        | N/A                  | 200            | N/A          | Menús creados por el usuario logeado            |
| GET         | `/menu/menuApuntado/myprofile`           | N/A                  | 200            | N/A          | Menús en los que el usuario se ha apuntado      |
| GET         | `/menu/menuCreado/myprofile`             | N/A                  | 200            | N/A          | Menús creados por el usuario                   |
| GET         | `/menu/menuCreado/menu/:userId`          | N/A                  | 200            | N/A          | Menús creados por otro usuario                  |
| POST        | `/menu/add-menu`                         | JSON                 | 200            | N/A          | Añadir menú                                    |
| PUT         | `/menu/edit-menu/:menuId`                | JSON                 | 200            | N/A          | Actualizar la info de un menú                  |
| DELETE      | `/menu/edit-menu/:menuId`                | N/A                  | 200            | N/A          | Borrar un menú                                 |
| POST        | `/upload`                                | File                 | 200            | N/A          | Subir una imagen a Cloudinary                   |

  
## Links

### Collaborators

[EVelio Reillo](github.com/ereillo)

[Antonio Muñoz](github.com/antoniomudom)

### Project

[Repository Link Client](ereillo/vecinochef-client)

[Repository Link Server](ereillo/vecinochef-server)

[Deploy Link](vecinochef-app.netlify.app)

