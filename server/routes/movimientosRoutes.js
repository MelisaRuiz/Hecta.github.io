const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimientoController');

// Obtener movimientos según ejercicioId
router.get('/:ejercicioId', movimientoController.obtenerMovimientos); // Asegúrate de usar el id del ejercicio
router.post('/', movimientoController.crearMovimiento);

module.exports = router;
