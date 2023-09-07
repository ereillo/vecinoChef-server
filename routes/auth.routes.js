const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken")
const isAuthenticated = require("../middlewares/isAuthenticated")

//TODO: importación de modelos
const User = require("../models/User.model.js");




//TODO: RUTAS DE SIGNUP
// POST "/api/auth/signup" => Registrar al usuario
router.post("/signup", async (req, res, next) => {

   const {userName, userSurname, email, password, confirmPassword} = req.body
   console.log(req.body)

   //validaciones del formulario SIGNUP
   //!validación formulario todos los campos completos OK
   if (
    !userName ||
    !userSurname ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    res.status(400).json ({
      errorMessage: "Todos los campos son obligatorios",
    });
    return;
  }

 //! misma contraseña  OK
 if (password !== confirmPassword) {
    res.status(400).json({
      previousUserName: userName,
      previousSurname: userSurname,
      previousEmail: email,
      errorMessage: "Las contraseñas no coinciden",
    });
    return;
  }

  //! contraseña segura  OK
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (regexPassword.test(password) === false) {
    res.status(400).json ({
      previousUserName: userName,
      previousUserSurname: userSurname,
      previousEmail: email,
      errorMessage:
        "La contraseña debe tener al menos, una mayuscula, una minuscula, un caracter especial y tener 8 caracteres o más",
    });
    return;
  }

  //! que el email no esté ya registrado OK 

  try {
    const foundEmail = await User.findOne({ email: email });
    // console.log(foundEmail);
    if (foundEmail !== null) {
      res.status(400).json({
        errorMessage: "Correo electrónico ya en uso",
      });
      return;
    }

    //! cifrado de la contraseña  OK
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
     console.log(passwordHash);

    //TODO: creación de nuevo usuario
    await User.create({
      userName,
      userSurname,
      email,
      password: passwordHash,
    });
    res.json("usuario creado")
  } catch (error) {
    next(error);
  }
})


// POST "/api/auth/login" => validar las credenciales 
router.post("/login", async (req, res, next) => {

   const {email, password} = req.body
   console.log(req.body)

  //validaciones del formulario LOGIN

  try {

  //! Que el usuario exista
  const foundUser = await User.findOne({ email })
  console.log(foundUser)
  if (foundUser === null) {res.status(400).json ({
    errorMessage: "El usuario no existe",
  });
  return;
}
  //! Que la contraseña sea correcta OK
  const isPasswordValid = await bcrypt.compare(password, foundUser.password)
  if (isPasswordValid === false) {res.status(400).json ({
    errorMessage: "La contraseña no es correcta",
  });
  return;
}

  //! Crear la ruta con Token OK
  const payload = {
    _id: foundUser._id,
    email: foundUser.email,
    userName: foundUser.userName
  }

  const authToken = jwt.sign(
    payload, 
    process.env.TOKEN_SECRET,
    {algorithm: "HS256", expiresIn: "3d"}
  )

  res.json({authToken})

  } catch (error) {
    next(error)
  }
})

// GET "/api/auth/verify" => indicar al frontend que el user está activo
router.get("/verify", isAuthenticated, (req, res, next) => {

   //!OJO. Cuando usemos el middleware isAuthenticated 
   //!...vamos tener acceso a req.payload
   console.log(req.payload)

   res.json(req.payload)

})

module.exports = router;