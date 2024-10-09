const mongoose = require('mongoose');

const movimientoSchema = new mongoose.Schema({
    ejercicioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ejercicio', required: true },
    descripcion: { type: String, required: true },
    monto: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Movimiento', movimientoSchema);
