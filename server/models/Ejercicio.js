const mongoose = require('mongoose');

const ejercicioSchema = new mongoose.Schema({
    nombreEjercicio: { type: String, required: true },
    estado: { type: String, enum: ['En Proceso', 'Finalizado'], default: 'En Proceso' },
}, { timestamps: true });

module.exports = mongoose.model('Ejercicio', ejercicioSchema);