import React, { useState } from 'react';
import { useParcelas } from './ParcelasContext';

const RegistroParcelas = ({ onRegistroExitoso }) => {
    const { agregarParcela } = useParcelas();
    const [nuevoCultivo, setNuevoCultivo] = useState({
        nombre: '',
        tamano: '',
        tipoCultivo: '',
        etapa: 'Preparación',
        descripcion: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const { nombre, tamano, tipoCultivo, etapa, descripcion } = nuevoCultivo;

        if (!nombre || !tamano || !tipoCultivo) {
            setError('Por favor, complete todos los campos obligatorios.');
            return;
        }
        if (Number(tamano) <= 0) {
            setError('El tamaño de la parcela debe ser mayor que cero.');
            return;
        }

        // Agregar nueva parcela
        agregarParcela(nombre, tipoCultivo, tamano, descripcion, etapa);

        // Limpiar el formulario
        setNuevoCultivo({
            nombre: '',
            tamano: '',
            tipoCultivo: '',
            etapa: 'Preparación',
            descripcion: ''
        });
        setError('');

        // Llamar a la función para cerrar el modal
        onRegistroExitoso();
    };

    return (
        <div className="registro-parcelas">
            <h3>Registrar Nueva Parcela</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de la Parcela:</label>
                    <input
                        type="text"
                        value={nuevoCultivo.nombre}
                        onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, nombre: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Tamaño de la Parcela (hectáreas):</label>
                    <input
                        type="number"
                        value={nuevoCultivo.tamano}
                        onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, tamano: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Tipo de Cultivo:</label>
                    <input
                        type="text"
                        value={nuevoCultivo.tipoCultivo}
                        onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, tipoCultivo: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Etapa del Cultivo:</label>
                    <select
                        value={nuevoCultivo.etapa}
                        onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, etapa: e.target.value })}
                    >
                        {['Preparación', 'Siembra', 'Cosecha', 'Comercialización'].map((fase, index) => (
                            <option key={index} value={fase}>{fase}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        value={nuevoCultivo.descripcion}
                        onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, descripcion: e.target.value })}
                        rows="4"
                        placeholder="Breve descripción de la parcela"
                    ></textarea>
                </div>
                <button type="submit">Agregar Parcela</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default RegistroParcelas;
