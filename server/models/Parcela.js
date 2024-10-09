const mongoose = require('mongoose');

const parcelaSchema = new mongoose.Schema({
    idParcela: { type: String, required: true },
    tamano: { type: Number, required: true },
    tipoCultivo: { type: String, required: true },
    etapa: { type: String, default: 'Preparación' },
    descripcion: { type: String, required: false },
}, { timestamps: true });

// Exportar el modelo
module.exports = mongoose.model('Parcela', parcelaSchema);

