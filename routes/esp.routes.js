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
       const response = await Especialidad.find()
       .populate({
        path: 'creador',
        select: 'userName', 
    }).select({
       especialidadNombre: 1,
       especialidadPic: 1,
       especialidadIngredientes: 1,
       creador: 1, 
       })
       res.json(response)
    } catch (error) {
       next(error)
    }
})


//POST ("/esp/especialidades") => Te apunta a una especialidad
router.post("/especialidades/:especialidadId", isAuthenticated, async (req, res, next) => {
    const userId = req.payload._id;

    try {
        const especialidadId = req.params.especialidadId;

        const especialidad = await Especialidad.findById(especialidadId);

        // Verificamos si el usuario ya está apuntado
        if (especialidad.participantes.includes(userId)) {
            return res.json({ message: 'El usuario ya estaba registrado en la especialidad' });
        }

        // ...si no, agregamos con  addtoSet porque push no estaba funcionando
        await especialidad.updateOne({ $addToSet: { participantes: userId } });

        res.json({ message: 'El usuario se ha registrado correctamente en la especialidad' });
    } catch (error) {
        next(error);
    }
});


//POST ("/esp/add-especialidad"=> información para añadir especialidad)

router.post("/add-especialidad", async (req, res, next) => {
    const {
      especialidadNombre,
      especialidadIngredientes,
      especialidadPic,
      especialidadPrecio,
      isEspecialidad
    } = req.body;
    try {
      console.log(req.body, "cositas de las especialidades");
      await Especialidad.create({
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

 //GET ("/esp/edit-especialidad")   => info de una especialidad concreta para el form de edit
 router.get("/edit-especialidad/:id", async (req, res, next) => {
    try {
      console.log(req.body, "cositas de las especialidades");
      const response = await Especialidad.findById(req.params.id);
      res.json(response);
    } catch (error) {
      next(error);
    }
})
  
  //PUT ("/esp/edit-especialidad/:id")=> actualizar la info de una especialidad en edit
  router.put("/edit-especialidad/:id", async (req, res, next) => {
    const {
      especialidadNombre,
      especialidadIngredientes,
      especialidadPic,
      especialidadPrecio,
      isEspecialidad
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
          isEspecialidad
        },{new:true}
      );
      res.json(response)
    } catch (error) {
      next(error)
    }
  });

  //DELETE "/esp/edit-especialidad/:id" => borrar una especialidad
  router.delete("/edit-especialidad/:id", async (req, res, next) => {

     const {id} = req.params
     try {
        await Especialidad.findByIdAndDelete(id)
        res.json("plato borrado")
     } catch (error) {
        next (error)
     }

  })

  module.exports = router;
