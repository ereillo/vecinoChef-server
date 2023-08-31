const router = require("express").Router();


//GET ("/") => Homepage usuarios no logeados
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter);

const userRouter = require("./user.routes.js")
router.use("/user", userRouter);

module.exports = router;
