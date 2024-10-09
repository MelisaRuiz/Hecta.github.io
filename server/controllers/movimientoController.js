const Movimiento = require('../models/Movimiento');

// Crear un nuevo movimiento
exports.crearMovimiento = async (req, res) => {
    try {
        const { ejercicioId, descripcion, monto } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!ejercicioId || !descripcion || monto === undefined) {
            return res.status(400).json({ error: "ejercicioId, descripcion y monto son requeridos." });
        }

        const nuevoMovimiento = new Movimiento(req.body);
        await nuevoMovimiento.save();
        res.status(201).json(nuevoMovimiento);
    } catch (error) {
        console.error("Error al crear movimiento:", error); // Para depuración
        res.status(500).json({ error: error.message });
    }
};

// Obtener movimientos según ejercicioId
exports.obtenerMovimientos = async (req, res) => {
    try {
        const movimientos = await Movimiento.find({ ejercicioId: req.params.ejercicioId });
        if (!movimientos) {
            return res.status(404).json({ error: "No se encontraron movimientos para el ejercicio especificado." });
        }
        res.json(movimientos);
    } catch (error) {
        console.error("Error al obtener movimientos:", error); // Para depuración
        res.status(500).json({ error: error.message });
    }
};

// Aquí puedes agregar más métodos según sea necesario (actualizar, eliminar, etc.)
