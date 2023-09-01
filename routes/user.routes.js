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
    const response = await Menu.find().select({
        platoNombre:1,
        postreNombre:1,
        creador:1,
        menuPrecio:1,
        weekDay:1
    });
    res.json(response);
    } catch (error){
        next(error);
    }
});

//POST ("/user/home/:menuId") => Para apuntarte a un menú
router.post("/home/:menuId", isAuthenticated, async (req, res, next) => {

    const{participantes}= req.body
    console.log(req.params)
    console.log(req.body)
    try {
        const response = await Menu.findByIdAndUpdate(req.params.menuId, {
            participantes,

        },{new:true})
        res,json(response)
    } catch (error) {
        next(error)
        
    }
    
    res.json("ruta post home creada")



})

//POST ("/user/add-menu"=> formulario de añadir menú)

router.post("/add-menu", async(req,res,next)=>{

const {platoNombre, postreNombre, creador, menuPrecio, weekDay} = req.body
try {
    console.log(req.body, "este console.log")
    await Menu.create({
        platoNombre, 
        postreNombre,
         creador, 
         menuPrecio, 
         weekDay
    })
    res.json("todo bien, menú creado")
} catch (error) {
    next(error)
    
}

}) 

//PUT("/user/add-menu"=> renderiza la infor y añade el menú creado a la DB)



//POST ("/user/add-especialidad"=> formulario de añadir menú)

router.post("/add-especialidad", async(req,res,next)=>{

    const {especialidadNombre, especialidadIngredientes, especialidadPic, especialidadPrecio} = req.body
    try {
        console.log(req.body, "cositas de las especialidades")
        await Especialidad.create({
            especialidadNombre, 
            especialidadIngredientes, 
            especialidadPic, 
            especialidadPrecio
            
        })
        res.json("todo bien, especialidad creada")
    } catch (error) {
        next(error)
        
    }
    
    }) 

module.exports = router