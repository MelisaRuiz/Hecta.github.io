import React, { useState } from 'react';
import { useParcelas } from './ParcelasContext';
import RegistroParcelas from './RegistroParcelas';
import RegistroActivos from './RegistroActivos';
import { useActivos } from './ActivosContext';
import Mapa from './Mapa';
import './Gestion.css';

const Gestion = () => {
    const { parcelas } = useParcelas();
    const { activos, agregarActivo } = useActivos();

    const [mostrarFormularioParcelas, setMostrarFormularioParcelas] = useState(false);
    const [mostrarFormularioActivos, setMostrarFormularioActivos] = useState(false);

    const cerrarModal = () => {
        setMostrarFormularioParcelas(false);
        setMostrarFormularioActivos(false);
    };

    return (
        <div className="parcela">
            <div className="top">
                <div className="regi">
                    <h3>Gestión de Parcelas</h3>
                    <button onClick={() => setMostrarFormularioParcelas(true)}>
                        Registrar Nueva Parcela
                    </button>
                    <h4>Parcelas Registradas:</h4>
                    <ul>
                        {parcelas.map((parcela) => (
                            <li key={parcela.id}>
                                {parcela.nombre} - {parcela.tipoCultivo} - {parcela.tamano} ha - Etapa: {parcela.etapa}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sidebaredos">
                    <h3>Gestión de Activos</h3>
                    <button onClick={() => setMostrarFormularioActivos(true)}>
                        Registrar Nuevo Activo
                    </button>
                    <h4>Activos Registrados:</h4>
                    <ul>
                        {activos.map((activo, index) => (
                            <li key={index}>
                                {activo.nombreActivo} - Valor: {activo.valorInicial} - Depreciación Anual: {activo.depreciacionAnual}%
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="grafics">
                <Mapa />
            </div>

            {/* Modal de Registro de Parcelas */}
            {mostrarFormularioParcelas && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-modal" onClick={cerrarModal}>X</button>
                        <RegistroParcelas onRegistroExitoso={cerrarModal} />
                    </div>
                </div>
            )}

            {/* Modal de Registro de Activos */}
            {mostrarFormularioActivos && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-modal" onClick={cerrarModal}>X</button>
                        <RegistroActivos agregarActivo={agregarActivo} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gestion;
