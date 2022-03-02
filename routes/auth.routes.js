// 3 fonctions pour l'authentification (paramètres par défaut res,req,next) avec définition des routes

const {
  signinForm,
  signin,
  signout,
} = require("../controllers/auth.controllers");
const router = require("express").Router();

router.get("/signin/form", signinForm);
router.post("/signin", signin);
router.get("/signout", signout);
module.exports = router;
