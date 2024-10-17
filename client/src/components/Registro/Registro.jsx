import React, { useState } from 'react';
import './Registro.css';
import ModalTransaccion from './ModalTransaccion';
import ModalParcelas from './ModalParcelas';
import { useParcelas } from '../Gestion/ParcelasContext';
import { useEjercicios } from './EjerciciosContext';

const Registro = () => {
    const { parcelas } = useParcelas();
    const { movimientos, ejercicios, agregarMovimiento } = useEjercicios();

    const [mostrarModalTransaccion, setMostrarModalTransaccion] = useState(false);
    const [mostrarModalParcelas, setMostrarModalParcelas] = useState(false);

    const agregarTransaccionLocal = (nuevaTransaccion, parcelasSeleccionadas) => {
        agregarMovimiento(nuevaTransaccion, parcelasSeleccionadas);
        setMostrarModalTransaccion(false);
    };

    const handleOpenTransaccionModal = () => {
        setMostrarModalTransaccion(true);
    };

    // Comprobar si hay al menos un ejercicio en proceso
    const hayEjercicioEnProceso = Object.values(ejercicios).some(ejercicio => ejercicio.estado === "En Proceso");

    return (
        <div className="main-content">
            <div className="top-row">
                <div className="container">
                    {hayEjercicioEnProceso && (
                        <button onClick={handleOpenTransaccionModal}>
                            Agregar Transacción
                        </button>
                    )}

                    {parcelas.length === 0 && (
                        <p style={{ color: 'red' }}>Se podrán registrar transacciones a un Ejercicio Contable una vez se registren parcelas.</p>
                    )}

                    {hayEjercicioEnProceso && (
                        <div>
                            <button onClick={() => setMostrarModalParcelas(true)}>Siguiente Fase</button>
                        </div>
                    )}

                    {/* Mostrar las transacciones registradas en forma de tabla solo si hay ejercicios en proceso */}
                    {hayEjercicioEnProceso && (
                        <div className="transacciones">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Fase</th>
                                        <th>Parcelas</th>
                                        <th>Monto</th>
                                        <th>Fecha</th>
                                        <th>Descripción</th>
                                        <th>Tipo de Transacción</th>
                                        <th>Categoría</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(ejercicios).map((ejercicioId) => (
                                        Object.keys(movimientos[ejercicioId] || {}).map(fase => (
                                            movimientos[ejercicioId][fase]?.map((mov, index) => {
                                                const parcelasIds = mov.parcelas.split(', ');
                                                const parcelasAsociadas = parcelasIds.map(id => {
                                                    const parcela = parcelas.find(p => p.id === parseInt(id));
                                                    return parcela ? parcela.nombre : 'Parcela no encontrada';
                                                }).join(', ');

                                                return (
                                                    <tr key={index}>
                                                        <td>{mov.fase}</td>
                                                        <td>{parcelasAsociadas}</td>
                                                        <td>{mov.monto}</td>
                                                        <td>{mov.fecha}</td>
                                                        <td>{mov.descripcion}</td>
                                                        <td>{mov.tipo}</td>
                                                        <td>{mov.categoria}</td>
                                                    </tr>
                                                );
                                            })
                                        ))
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {mostrarModalTransaccion && (
                        <ModalTransaccion
                            agregarMovimiento={agregarTransaccionLocal}
                            cerrarModal={() => setMostrarModalTransaccion(false)}
                            parcelas={parcelas}
                        />
                    )}

                    {mostrarModalParcelas && (
                        <ModalParcelas 
                            parcelas={parcelas} 
                            onSeleccionarParcelas={parcelasSeleccionadas => {
                                setMostrarModalParcelas(false);
                            }}
                            onCerrar={() => setMostrarModalParcelas(false)}
                        />
                    )}
                </div>

                <div className="sidebare">
                    <h3>Ejercicios</h3>
                    <div className="ejercicios">
                        {Object.keys(ejercicios).map((ejercicio) => (
                            <div key={ejercicio} className={`${ejercicio} ${ejercicios[ejercicio].estado}`}>
                                {ejercicio} - {ejercicios[ejercicio].estado}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sidebare">
                    <h3>Informes</h3>
                </div>
            </div>

            <div className="container-grafics">
                <h3>Gráficas</h3>
            </div>
        </div>
    );
};

export default Registro;
