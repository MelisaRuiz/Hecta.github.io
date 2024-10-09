const Ejercicio = require('../models/Ejercicio');

// Crear un nuevo ejercicio
exports.crearEjercicio = async (req, res) => {
    try {
        const nuevoEjercicio = new Ejercicio(req.body);
        await nuevoEjercicio.save();
        res.status(201).json(nuevoEjercicio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los ejercicios
exports.obtenerEjercicios = async (req, res) => {
    try {
        const ejercicios = await Ejercicio.find();
        res.json(ejercicios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
