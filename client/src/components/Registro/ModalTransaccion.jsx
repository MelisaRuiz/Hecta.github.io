import React, { useState } from 'react';
import { useEjercicios } from './EjerciciosContext';

const ModalTransaccion = ({ cerrarModal, parcelas = [] }) => {
    const { agregarTransaccion } = useEjercicios();
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoTransaccion, setTipoTransaccion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [parcelasSeleccionadas, setParcelasSeleccionadas] = useState([]);
    const [tipoModal, setTipoModal] = useState('');

    const handleAgregar = () => {
        if (!monto || !fecha || !descripcion || !tipoTransaccion) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Validar que se seleccionaron parcelas y obtener sus fases
        const fases = parcelasSeleccionadas.map(id => {
            const parcela = parcelas.find(p => p.id === id);
            return parcela ? parcela.etapa : null;
        });

        if (fases.some(f => f !== fases[0])) {
            alert("Todas las parcelas deben estar en la misma fase para realizar la transacción.");
            return;
        }

        const nuevaTransaccion = {
            monto: parseFloat(monto),
            fecha,
            descripcion,
            tipo: tipoTransaccion,
            categoria,
            parcelas: parcelasSeleccionadas.join(', '), // Guardar IDs de parcelas
            fase: fases[0], // Guardar la fase
        };

        agregarTransaccion(nuevaTransaccion);
        cerrarModal();

        // Reiniciar formularios
        setParcelasSeleccionadas([]);
        setMonto('');
        setFecha('');
        setDescripcion('');
        setTipoTransaccion('');
        setCategoria('');
    };

    const manejarSeleccionParcela = (idParcela) => {
        setParcelasSeleccionadas(prev =>
            prev.includes(idParcela)
                ? prev.filter(p => p !== idParcela)
                : [...prev, idParcela]
        );
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Agregar Transacción</h2>
                <label>
                    Tipo de Transacción:
                    <select value={tipoModal} onChange={(e) => setTipoModal(e.target.value)} required>
                        <option value="">Seleccione</option>
                        <option value="parcelas">Transacción para Parcelas</option>
                        <option value="activos">Transacción para Activos/Pasivos</option>
                    </select>
                </label>
                <div>
                    <label>Monto:</label>
                    <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} required />
                </div>
                <div>
                    <label>Fecha:</label>
                    <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                </div>
                <div>
                    <label>Tipo de Transacción:</label>
                    <select value={tipoTransaccion} onChange={(e) => setTipoTransaccion(e.target.value)} required>
                        <option value="">Seleccione</option>
                        <option value="Ingreso">Ingreso</option>
                        <option value="Egreso">Egreso</option>
                    </select>
                </div>
                <div>
                    <label>Categoría:</label>
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                        <option value="">Seleccione</option>
                        {tipoTransaccion === "Ingreso" && (
                            <>
                                <option value="Ventas">Ventas</option>
                                <option value="Subsidios">Subsidios</option>
                                <option value="Otros ingresos">Otros ingresos</option>
                            </>
                        )}
                        {tipoTransaccion === "Egreso" && (
                            <>
                                <option value="Compras">Compras</option>
                                <option value="Gastos operativos">Gastos operativos</option>
                                <option value="Pagos de deudas">Pagos de deudas</option>
                                <option value="Otros gastos">Otros gastos</option>
                            </>
                        )}
                    </select>
                </div>

                {tipoModal === 'parcelas' && (
                    <div>
                        <label>Parcelas:</label>
                        {parcelas.length > 0 ? parcelas.map((parcela) => (
                            <div key={parcela.id}>
                                <input type="checkbox" checked={parcelasSeleccionadas.includes(parcela.id)} onChange={() => manejarSeleccionParcela(parcela.id)} />
                                <label>{parcela.nombre} - {parcela.tipoCultivo}</label>
                            </div>
                        )) : <p>No hay parcelas disponibles</p>}
                    </div>
                )}

                <button onClick={handleAgregar}>Agregar</button>
                <button onClick={cerrarModal}>Cerrar</button>
            </div>
        </div>
    );
};

export default ModalTransaccion;
