const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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

const Especialidad = model("Especialidad", especialidadSchema);

module.exports = Especialidad;