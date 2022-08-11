const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
require("dotenv").config();

const schemaRegister = Joi.object({
  fname: Joi.string().min(3).max(255).required(),
  lname: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(8).max(255).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(8).max(255).required(),
});

// (1) Usuario - Login.
router.post("/login", async (req, res) => {
  //validaciones de usuario (ingreso)
  const { error } = schemaLogin.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ error: true, mensaje: "Email no registrado" });

  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword)
    return res.status(400).json({ error: true, mensaje: "Contraseña errónea" });

  //crear token
  const token = jwt.sign(
    {
      id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    },
    process.env.TOKEN_SECRET
  );

  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
});

//(2) Usuario - Register.
router.post("/register", async (req, res) => {
  //validaciones de usuarios (registro)
  const { error } = schemaRegister.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const duplicatedEmailAddress = await User.findOne({ email: req.body.email });
  if (duplicatedEmailAddress) {
    return res
      .status(400)

      .json({ error: true, mensaje: "Email ya registrado" });
  }

  //hash contraseña
  const saltos = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, saltos);

  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: password,
  });

  user.save()

  return res.json({ error: false, mensaje: "Registro exitoso" })

});

module.exports = router;