const express = require('express');
const router = express.Router();
const { crearParcela, obtenerParcelas } = require('../controllers/parcelasController'); // Asegúrate de que esta ruta sea correcta

// Ruta para crear una nueva parcela (POST)
router.post('/', crearParcela);

// Ruta para obtener todas las parcelas (GET)
router.get('/', obtenerParcelas);

module.exports = router;
