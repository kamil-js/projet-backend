const { userNew, userCreate } = require("../controllers/user.controllers");
const router = require("express").Router();

router.get("/new", userNew);
router.post("/", userCreate);

module.exports = router;
