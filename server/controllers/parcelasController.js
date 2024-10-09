const Parcela = require('../models/Parcela');

// Crear una nueva parcela
exports.crearParcela = async (req, res) => {
    try {
        const nuevaParcela = new Parcela(req.body);
        await nuevaParcela.save();
        res.status(201).json(nuevaParcela);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las parcelas
exports.obtenerParcelas = async (req, res) => {
    try {
        const parcelas = await Parcela.find();
        res.json(parcelas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Aquí puedes agregar más funciones para actualizar y eliminar parcelas
