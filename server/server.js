const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Crear una aplicación express
const app = express();
const PORT = process.env.PORT || 5000; // Usar variable de entorno o 5000 como por defecto

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Cambia el origen si es necesario
app.use(express.json()); // Permite recibir datos en formato JSON

// Conexión a MongoDB (conexión directa sin archivo .env)
mongoose.connect('mongodb://localhost:27017/Lunes', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/api/ejercicios', require('./routes/ejerciciosRoutes'));
app.use('/api/parcelas', require('./routes/parcelasRoutes'));
app.use('/api/movimientos', require('./routes/movimientosRoutes'));
app.use('/api/gestiones', require('./routes/gestionesRoutes'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
