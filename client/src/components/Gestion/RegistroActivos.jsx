import React, { useState } from 'react';

const RegistroActivos = ({ agregarActivo }) => {
    const [nombreActivo, setNombreActivo] = useState('');
    const [valorInicial, setValorInicial] = useState('');
    const [depreciacionAnual, setDepreciacionAnual] = useState('');
    const [fechaAdquisicion, setFechaAdquisicion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');

    const handleAgregarActivo = () => {
        // Validación simple de campos vacíos
        if (!nombreActivo || !valorInicial || !fechaAdquisicion || !depreciacionAnual) {
            setError('Por favor, completa todos los campos obligatorios.');
            return;
        }

        if (isNaN(valorInicial) || valorInicial <= 0) {
            setError('El valor inicial debe ser un número positivo.');
            return;
        }

        const nuevoActivo = {
            id: Date.now(), // Generar un ID único
            nombreActivo,
            valorInicial: parseFloat(valorInicial),
            depreciacionAnual: parseFloat(depreciacionAnual),
            fechaAdquisicion,
            descripcion,
        };

        agregarActivo(nuevoActivo); // Función que se pasa desde el padre

        // Reiniciar los campos del formulario
        setNombreActivo('');
        setValorInicial('');
        setDepreciacionAnual('');
        setFechaAdquisicion('');
        setDescripcion('');
        setError('');
    };

    return (
        <div className="registro-activos">
            <h3>Registrar Nuevo Activo</h3>
            {error && <p className="error">{error}</p>}

            <label>Nombre del Activo:</label>
            <input
                type="text"
                value={nombreActivo}
                onChange={(e) => setNombreActivo(e.target.value)}
                required
            />

            <label>Valor Inicial (USD):</label>
            <input
                type="number"
                value={valorInicial}
                onChange={(e) => setValorInicial(e.target.value)}
                required
            />

            <label>Depreciación Anual (%):</label>
            <input
                type="number"
                value={depreciacionAnual}
                onChange={(e) => setDepreciacionAnual(e.target.value)}
                required
            />

            <label>Fecha de Adquisición:</label>
            <input
                type="date"
                value={fechaAdquisicion}
                onChange={(e) => setFechaAdquisicion(e.target.value)}
                required
            />

            <label>Descripción:</label>
            <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows="4"
                placeholder="Breve descripción del activo"
            />

            <button onClick={handleAgregarActivo}>Agregar Activo</button>
        </div>
    );
};

export default RegistroActivos;
