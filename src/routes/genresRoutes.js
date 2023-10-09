
const { Router } = require("express");


const { getGenres } = require("../handlers/genresHandler.js");


const router = Router();


router.get("/", getGenres); // Obtener los géneros.


module.exports = router;
