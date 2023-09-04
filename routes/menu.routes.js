const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Menu = require("../models/Menu.model");
const Especialidad = require("../models/Especialidad.model");

//TODO: RUTAS MENU
//GET ("/menu/home") => Lista de menús por días
router.get("/home", isAuthenticated, async (req, res, next) => {
    try {
      const response = await Menu.find().select({
        platoNombre: 1,
        postreNombre: 1,
        creador: 1,
        menuPrecio: 1,
        weekDay: 1,
      });
      res.json(response);
    } catch (error) {
      next(error);
    }
  });

  //POST ("/menu/home/:menuId") => Para apuntarte a un menú
router.post("/home/:menuId", isAuthenticated, async (req, res, next) => {
    const { participantes } = req.body;
    console.log(req.params);
    console.log(req.body);
    try {
      const response = await Menu.findByIdAndUpdate(
        req.params.menuId,
        {
          participantes,
        },
        { new: true }
      );
      res, json(response);
    } catch (error) {
      next(error);
    }
  
    res.json("ruta post home creada");
  });

//GET ("/menu/myprofile") => Menus creados por el usuario logeado
router.get("/myprofile", isAuthenticated, async (req, res, next) => {
    try {
        const response = await Menu.find()
        .select({
        platoNombre: 1,
        postreNombre: 1,
        menuPrecio: 1,
        creador: 1, 
        }).populate({
            path: 'creador',
            select: 'userName', 
        })
        res.json(response)
        console.log(response + "MENUCONSOLE")
     } catch (error) {
        next(error)
     }
  })

  
router.post("/add-menu", isAuthenticated, async (req, res, next) => {
    const { platoNombre, postreNombre, creador, menuPrecio, weekDay } = req.body;
  console.log(req.body)
    try {

      const platoEspecialidad = await Especialidad.findOne({ especialidadNombre: platoNombre });
      const postreEspecialidad = await Especialidad.findOne({ especialidadNombre: postreNombre });
      console.log(platoEspecialidad, postreEspecialidad)
      
      const creadorId = req.payload._id;
      

      await Menu.create({
        platoNombre: platoEspecialidad._id,
        postreNombre: postreEspecialidad._id,
        creador: creadorId,
        menuPrecio,
        weekDay,
      });

      res.json("Menú creado correctamente");
    } catch (error) {
      next(error);
    }
});

  
  //PUT("/menu/add-menu"=> renderiza la infor y añade el menú creado a la DB)
  router.put("/add-menu", isAuthenticated, async (req, res, next) => {
    const {
      creador,
      participantes,
      platoNombre,
      postreNombre,
      menuPrecio,
      weekDay,
    } = req.body;

    const creadorId = req.payload._id
    try {
      console.log(req.body, "body del menú");
      await Menu.create({
      creador: creadorId,
      participantes,
      platoNombre,
      postreNombre,
      menuPrecio,
      weekDay,
      });
      res.json("todo bien, menú creado");
    } catch (error) {
      next(error);
    }
  });

//GET ("/menu/edit-menu/:menuId") => info de un menú concreto para el form de edit
router.get("/edit-menu/:menuId", isAuthenticated, async (req, res, next) => {
  try {
    console.log(req.body, "cosas del menú")
    const response = await Menu.findById(req.params.menuId)
    res.json(response)
  } catch (error) {
    next(error)
  }

})

//PUT ("/menu/edit-menu/menuId") => actualizar la info de un menú
router.put("/edit-menu/:menuId", isAuthenticated, async (req, res, next) => {
    const {
      creador,
      participantes,
      platoNombre,
      postreNombre,
      menuPrecio,
      weekDay,
      } = req.body;
      console.log(req.body);
      try {
        const response = await Menu.findByIdAndUpdate(
          req.params.menuId,
          {
      creador,
      participantes,
      platoNombre,
      postreNombre,
      menuPrecio,
      weekDay,
          },{new:true}
        );
        res.json(response)
      } catch (error) {
        next(error)
      }
    }); 

//DELETE "/esp/edit-menu/:menuId" => borrar un menú
router.delete("/edit-menu/:menuId", isAuthenticated, async (req, res, next) => {

    const {menuId} = req.params
    try {
       await Menu.findByIdAndDelete(menuId)
       res.json("menú borrado")
    } catch (error) {
       next (error)
    }

 })

module.exports = router;
