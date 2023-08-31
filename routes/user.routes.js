const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken")
const isAuthenticated = require("../middlewares/isAuthenticated")

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Menu = require("../models/Menu.model")
const Especialidad = require("../models/Especialidad.model")

//TODO: RUTAS DE USER
//GET ("/user/home") => Lista de menús por días
router.get("/home", isAuthenticated, async (req, res, next) => {

    try{
    const response = await Menu.find().select("platoNombre");
    res.json(response);
    } catch (error){
        next(error);
    }
});

//POST ("/user/home") => Para apuntarte a un menú
router.post("/home", isAuthenticated, (req, res, next) => {

    res.json("ruta post home creada")

})


module.exports = router