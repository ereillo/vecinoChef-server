const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Menu = require("../models/Menu.model");
const Especialidad = require("../models/Especialidad.model");

//TODO: RUTAS DE ESPECIALIDADES
//GET ("/esp/especilidades") => Muestra la info de todas las especialidades
router.get("/especialidades", isAuthenticated, async (req, res, next) => {

  try {
    const especialidades = await Especialidad.find()
      .select({
        especialidadNombre: 1,
        especialidadPic: 1,
        especialidadIngredientes: 1,
        especialidadPrecio: 1,
        participantes: 1,
      })
      .populate({
        path: "creador",
        model: "User",
        select: "userName",
      });
    //vamos a tener que hacer varias promesas y esperar que todas se resuelvan
    const especialidadesConParticipantes = await Promise.all(
      //iteramos sobre las especialidades
      especialidades.map(async (especialidad) => {
        //buscamos participantes que su id también esté dentro de participantes
        const participantes = await User.find({
          _id: { $in: especialidad.participantes },
        }).select("userName _id"); // queremos recibir userName e id

        return {
          ...especialidad.toObject(), //esparcimos todos los elementos del array, los convertimos a objeto y PromiseAll nos va a devolver todo el array de objetos con cada uno de los participantes
          participantes: participantes.map((user) => ({
            _id: user._id,
            userName: user.userName,
          })),
        };
      })
    );

    res.json(especialidadesConParticipantes);
  } catch (error) {
    next(error);
  }
});

//GET ("/esp/espApuntada/especialidades") => Especialidades en los que el usuario se ha apuntado
router.get("/espApuntada/especialidades", isAuthenticated, async (req, res, next) => {

 const userId = req.payload._id

try {
    const response = await Especialidad.find({
     participantes: { $in: userId },
    })
   console.log(response)
   res.json(response)
} catch (error) {
 console.log(error)
}
})

//GET ("/esp/espCreada/especialidades") => Especialidades creadas por el usuario
router.get("/espCreada/especialidades", isAuthenticated, async (req, res, next) => {

  const userId = req.payload._id
 
 try {
     const response = await Especialidad.find({ creador: userId })
    console.log(response)
    res.json(response)
 } catch (error) {
  console.log(error)
 }
 })

//POST ("/esp/especialidades/:especialidadId") => Te apunta a una especialidad
router.post(
  "/especialidades/apuntar/:especialidadId",
  isAuthenticated,
  async (req, res, next) => {
    const userId = req.payload._id;

    try {
      const especialidadId = req.params.especialidadId;

      const especialidad = await Especialidad.findById(especialidadId);

      // Verificamos si el usuario ya está apuntado
      if (especialidad.participantes.includes(userId)) {
        return res.json({
          message: "El usuario ya estaba registrado en la especialidad",
        });
      }

      // ...si no, agregamos con  addtoSet porque push no estaba funcionando
      await Especialidad.findByIdAndUpdate(especialidadId, {
        $addToSet: { participantes: userId },
      });

      res.json({
        message: "El usuario se ha registrado correctamente en la especialidad",
      });
    } catch (error) {
      next(error);
    }
  }
);

//POST ("/esp/especialidades/:especialidadId")=> te desapunta de una especialidad
router.post(
  "/especialidades/desapuntar/:especialidadId",
  isAuthenticated,
  async (req, res, next) => {
    const userId = req.payload._id;

    try {
      const especialidadId = req.params.especialidadId;

      const especialidad = await Especialidad.findById(especialidadId);

      // Verificamos si el usuario ya está apuntado
      if (!especialidad.participantes.includes(userId)) {
        return res.json({
          message: "El usuario no está registrado en la especialidad",
        });
      }

      // ...si no, agregamos con  addtoSet porque push no estaba funcionando
      await Especialidad.findByIdAndUpdate(especialidadId, {
        $pull: { participantes: userId },
      });

      res.json({
        message: "El usuario se ha desapuntado correctamente en la especialidad",
      });
    } catch (error) {
      next(error);
    }
  }
);

//POST ("/esp/add-especialidad"=> información para añadir especialidad)

router.post("/add-especialidad", isAuthenticated, async (req, res, next) => {
  const {
    creador,
    especialidadNombre,
    especialidadIngredientes,
    especialidadPic,
    especialidadPrecio,
    isEspecialidad,
  } = req.body;

  const creadorId = req.payload._id;

  try {
    console.log(req.body, "cositas de las especialidades");
    await Especialidad.create({
      creador: creadorId,
      especialidadNombre,
      especialidadIngredientes,
      especialidadPic,
      especialidadPrecio,
      isEspecialidad,
    });
    res.json("todo bien, especialidad creada");
  } catch (error) {
    next(error);
  }
});

//GET ("/esp/edit-especialidad/:id")   => info de una especialidad concreta para el form de edit
router.get(
  "/edit-especialidad/:id",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const response = await Especialidad.findById(req.params.id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

//PUT ("/esp/edit-especialidad/:id")=> actualizar la info de una especialidad en edit
router.put(
  "/edit-especialidad/:id",
  isAuthenticated,
  async (req, res, next) => {
    const {
      especialidadNombre,
      especialidadIngredientes,
      especialidadPic,
      especialidadPrecio,
      isEspecialidad,
    } = req.body;
    console.log(req.body);
    try {
      const response = await Especialidad.findByIdAndUpdate(
        req.params.id,
        {
          especialidadNombre,
          especialidadIngredientes,
          especialidadPic,
          especialidadPrecio,
          isEspecialidad,
        },
        { new: true }
      );
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE "/esp/edit-especialidad/:id" => borrar una especialidad
router.delete(
  "/edit-especialidad/:id",
  isAuthenticated,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      await Especialidad.findByIdAndDelete(id);
      res.json("plato borrado");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
