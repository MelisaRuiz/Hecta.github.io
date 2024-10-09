const express = require('express');
const router = express.Router();
const gestionesController = require('../controllers/gestionesController');

// Obtener todas las gestiones
router.get('/', gestionesController.getGestiones);

module.exports = router;

