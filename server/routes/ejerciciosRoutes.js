const express = require('express');
const router = express.Router();
const { crearEjercicio, obtenerEjercicios } = require('../controllers/ejerciciosController'); // Asegúrate de que esta ruta sea correcta

// Ruta para crear un nuevo ejercicio (POST)
router.post('/ejercicios', crearEjercicio); // Cambia '/' por '/ejercicios'

// Ruta para obtener todos los ejercicios (GET)
router.get('/ejercicios', obtenerEjercicios); // Cambia '/' por '/ejercicios'

module.exports = router;
