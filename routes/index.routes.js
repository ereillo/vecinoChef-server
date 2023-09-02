const router = require("express").Router();


//GET ("/") => Homepage usuarios no logeados
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter);

const userRouter = require("./user.routes.js")
router.use("/user", userRouter);

const espRouter = require("./esp.routes.js")
router.use("/esp", espRouter)

const menuRouter = require("./menu.routes.js")
router.use("/menu", menuRouter)

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

module.exports = router;
