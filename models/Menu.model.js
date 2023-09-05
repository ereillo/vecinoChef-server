const { Schema, model } = require("mongoose");

const daysOfWeekEnum = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

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

const Menu = model("Menu", menuSchema);

module.exports = Menu;


// const { Schema, model } = require("mongoose");

// // TODO: Please make sure you edit the User model to whatever makes sense in this case
// const menuSchema = new Schema(
//     {
//         creador: {
//             type: Schema.Types.ObjectId,
//             ref: "User",
//         },
//         participantes: [
//             {
//                 type: Schema.Types.ObjectId,
//                 ref: "User",
//             },
//         ],
//         platoNombre: {
//             type: Schema.Types.ObjectId,
//             ref: "Especialidad",
//         },
//         postreNombre: {
//             type: Schema.Types.ObjectId,
//             ref: "Especialidad",
//         },
//         menuPrecio: Number,
//         weekDay: String,
//     },
// {
//     // this second object adds extra properties: `createdAt` and `updatedAt`    
//     timestamps: true
// }
// );

// const Menu = model("Menu", menuSchema);

// module.exports = Menu;
