import React, { useState } from 'react';
import { useParcelas } from '../Gestion/ParcelasContext';
import { useEjercicios } from './EjerciciosContext';

const ModalParcelas = ({ cerrarModal }) => {
    const { parcelas } = useParcelas();
    const { crearEjercicioAutomaticamente, actualizarFaseParcelas } = useEjercicios();
    const [parcelasSeleccionadas, setParcelasSeleccionadas] = useState([]);

    const manejarSeleccion = (idParcela) => {
        setParcelasSeleccionadas(prevSeleccionadas => 
            prevSeleccionadas.includes(idParcela) 
                ? prevSeleccionadas.filter(p => p !== idParcela)
                : [...prevSeleccionadas, idParcela]
        );
    };

    const seleccionarTodas = () => {
        if (parcelasSeleccionadas.length === parcelas.length) {
            setParcelasSeleccionadas([]); // Deseleccionar todas
        } else {
            setParcelasSeleccionadas(parcelas.map(parcela => parcela.id)); // Seleccionar todas
        }
    };

    const obtenerSiguienteFase = (etapaActual) => {
        const fases = ['Preparación', 'Siembra y Cuidados', 'Cosecha', 'Comercialización'];
        const indiceActual = fases.indexOf(etapaActual);
        return indiceActual < fases.length - 1 ? fases[indiceActual + 1] : etapaActual; // Evita avanzar más allá de la última fase
    };

    const handleConfirmar = () => {
        if (parcelasSeleccionadas.length > 0) {
            const nuevasFases = parcelasSeleccionadas.map(id => {
                const parcela = parcelas.find(p => p.id === id);
                return obtenerSiguienteFase(parcela.etapa); // Obtener la siguiente fase
            });

            // Actualizar fases
            actualizarFaseParcelas(parcelasSeleccionadas, nuevasFases);

            // Si alguna parcela está en "Preparación", crear un nuevo ejercicio
            if (nuevasFases.some(fase => fase === "Preparación")) {
                crearEjercicioAutomaticamente();
            }

            cerrarModal(); // Cerrar el modal después de confirmar
        } else {
            alert('Por favor, selecciona al menos una parcela.'); // Mensaje de error
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Selecciona Parcelas para Avanzar Fase</h3>
                <div>
                    <input
                        type="checkbox"
                        checked={parcelasSeleccionadas.length === parcelas.length}
                        onChange={seleccionarTodas}
                    />
                    <label>Seleccionar Todas</label>
                </div>
                {parcelas.length > 0 ? (
                    parcelas.map(parcela => (
                        <div key={parcela.id}>
                            <input
                                type="checkbox"
                                checked={parcelasSeleccionadas.includes(parcela.id)}
                                onChange={() => manejarSeleccion(parcela.id)}
                            />
                            <label>
                                {parcela.nombre} - {parcela.tipoCultivo} - Fase: {parcela.etapa}
                            </label>
                        </div>
                    ))
                ) : (
                    <p>No hay parcelas disponibles</p> // Mensaje cuando no hay parcelas
                )}
                <button onClick={handleConfirmar}>Confirmar Selección</button>
                <button onClick={cerrarModal}>Cerrar</button>
            </div>
        </div>
    );
};

export default ModalParcelas;
