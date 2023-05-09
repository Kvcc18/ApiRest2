const usuariosController = require("../controllers/usuarios-controllers");



const express = require("express");
const router = express.Router();
router.get("/usuarios",usuariosController.findAllUsuarios);
router.get("/usuarios/:id",usuariosController.findUsuario);
router.post("/usuarios",usuariosController.createUser);
module.exports = router;