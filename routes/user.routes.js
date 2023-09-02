const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Menu = require("../models/Menu.model");
const Especialidad = require("../models/Especialidad.model");

//TODO: RUTAS DE USER

//GET ("/user/myprofile") => Especialidades creadas por el usuario logeado
router.get("/myprofile", isAuthenticated, async (req, res, next) => {
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


//GET ("/user/edit-profile") => manda la info del usuario al formulario de edición
router.get("/edit-profile/", isAuthenticated, async (req, res, next) => {
    try {
      const userId = req.payload._id
      const response = await User.findById(userId);
      res.json(response);
    } catch (error) {
      next(error);
    }
  });


//PUT ("/user/edit-profile/:userId") => actualizar la info del usuario
router.put("/edit-profile/:userId", async (req, res, next) => {
    const {
      userName,
      userSurname,
      password,
      profilePic,
    } = req.body;
    console.log(req.body);
    try {
      const response = await User.findByIdAndUpdate(
        req.params.id,
        {
            userName,
            userSurname,
            password,
            profilePic,
        },{new:true}
      );
      res.json(response)
    } catch (error) {
      next(error)
    }
  });

module.exports = router;
