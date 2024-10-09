import React, { useState } from 'react';
import axios from 'axios';
import { useParcelas } from './ParcelasContext'; // Asegúrate de que esta ruta sea correcta
import './Gestion.css';

const fases = ['Preparación', 'Siembra', 'Cosecha', 'Comercialización'];

const Gestion = () => {
    const { agregarParcela, parcelas } = useParcelas();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoCultivo, setNuevoCultivo] = useState({
        idParcela: '',
        tamano: '',
        tipoCultivo: '',
        etapa: 'Preparación',
        descripcion: ''
    });
    const [error, setError] = useState('');

    const agregarNuevaParcela = async () => {
        const { idParcela, tamano, tipoCultivo } = nuevoCultivo;

        if (!idParcela || !tamano || !tipoCultivo) {
            setError('Por favor, complete todos los campos obligatorios.');
            return;
        }
        if (Number(tamano) <= 0) {
            setError('El tamaño de la parcela debe ser mayor que cero.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/parcelas', nuevoCultivo);
            agregarParcela(response.data);
            setError('');
            setNuevoCultivo({
                idParcela: '',
                tamano: '',
                tipoCultivo: '',
                etapa: 'Preparación',
                descripcion: ''
            });
            setMostrarFormulario(false);
        } catch (error) {
            console.error('Error al agregar la parcela:', error);
            setError(error.response?.data?.message || 'Error al agregar la parcela. Intente de nuevo.');
        }
    };

    return (
        <div className="parcela">
            <h3>Gestión de Parcelas</h3>
            <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                {mostrarFormulario ? 'Ocultar Formulario' : 'Registrar Nueva Parcela'}
            </button>

            {mostrarFormulario && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Registrar Nueva Parcela</h3>
                        <div className="form-section">
                            <div className="form-column">
                                <label>ID de la Parcela:</label>
                                <input
                                    type="text"
                                    value={nuevoCultivo.idParcela}
                                    onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, idParcela: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-column">
                                <label>Tamaño de la Parcela (hectáreas):</label>
                                <input
                                    type="number"
                                    value={nuevoCultivo.tamano}
                                    onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, tamano: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-column">
                                <label>Tipo de Cultivo:</label>
                                <input
                                    type="text"
                                    value={nuevoCultivo.tipoCultivo}
                                    onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, tipoCultivo: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-column">
                                <label>Etapa del Cultivo:</label>
                                <select
                                    value={nuevoCultivo.etapa}
                                    onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, etapa: e.target.value })}
                                >
                                    {fases.map((fase, index) => (
                                        <option key={index} value={fase}>{fase}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-column">
                                <label>Descripción:</label>
                                <textarea
                                    value={nuevoCultivo.descripcion}
                                    onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, descripcion: e.target.value })}
                                    rows="4"
                                    placeholder="Breve descripción de la parcela"
                                ></textarea>
                            </div>
                            <button type="button" onClick={agregarNuevaParcela}>Agregar Parcela</button>
                            {error && <p className="error">{error}</p>}
                        </div>
                    </div>
                </div>
            )}

            {/* Mostrar la lista de parcelas */}
            <div className="lista-parcelas">
                <h4>Parcelas Registradas:</h4>
                <ul>
                    {parcelas.map((parcela) => (
                        <li key={parcela.idParcela}>
                            {parcela.idParcela},{parcela.tipoCultivo}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Gestion;
