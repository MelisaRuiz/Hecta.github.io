import React, { useState } from 'react';
import { useEjercicios } from './EjerciciosContext';

const ModalMovimiento = ({
  cerrarModal,
  parcelas = [],
}) => {
  const { agregarMovimiento } = useEjercicios();
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [detalleMovimiento, setDetalleMovimiento] = useState('');
  const [tipoMovimiento, setTipoMovimiento] = useState('');
  const [parcelasSeleccionadas, setParcelasSeleccionadas] = useState([]);

  const handleAgregar = () => {
    // Validación de campos
    if (!monto || !fecha || !detalleMovimiento || !tipoMovimiento || parcelasSeleccionadas.length === 0) {
      alert("Por favor, completa todos los campos y selecciona al menos una parcela.");
      return;
    }

    const nuevoMovimiento = {
      monto: parseFloat(monto), // Asegúrate de que el monto sea un número
      fecha,
      descripcion: detalleMovimiento,
      tipoMovimiento,
    };

    // Llamar a la función agregarMovimiento pasando el nuevo movimiento y las parcelas seleccionadas
    agregarMovimiento(nuevoMovimiento, parcelasSeleccionadas);

    // Limpiar los campos
    setMonto('');
    setFecha('');
    setDetalleMovimiento('');
    setTipoMovimiento('');
    setParcelasSeleccionadas([]);
    cerrarModal(); // Cerrar el modal después de agregar el movimiento
  };

  const manejarSeleccionParcela = (idParcela) => {
    setParcelasSeleccionadas(prevSeleccionadas =>
      prevSeleccionadas.includes(idParcela)
        ? prevSeleccionadas.filter(p => p !== idParcela) // Deseleccionar si ya está seleccionada
        : [...prevSeleccionadas, idParcela] // Seleccionar si no está seleccionada
    );
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Agregar Movimiento</h2>
        <label>
          Monto:
          <input 
            type="number" 
            value={monto} 
            onChange={(e) => setMonto(e.target.value)} 
            required
          />
        </label>
        <label>
          Fecha:
          <input 
            type="date" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            required
          />
        </label>
        <label>
          Descripción:
          <input 
            type="text" 
            value={detalleMovimiento} 
            onChange={(e) => setDetalleMovimiento(e.target.value)} 
            required
          />
        </label>
        <label>
          Tipo de Movimiento:
          <select value={tipoMovimiento} onChange={(e) => setTipoMovimiento(e.target.value)} required>
            <option value="">Seleccione</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </select>
        </label>
        <label>
          Parcelas:
          {parcelas.length > 0 ? (
            parcelas.map((parcela) => (
              <div key={parcela.id}>
                <input 
                  type="checkbox" 
                  checked={parcelasSeleccionadas.includes(parcela.id)} 
                  onChange={() => manejarSeleccionParcela(parcela.id)} 
                />
                <label>{parcela.nombre} - {parcela.tipoCultivo}</label>
              </div>
            ))
          ) : (
            <p>No hay parcelas disponibles</p>
          )}
        </label>
        <button onClick={handleAgregar}>Agregar</button>
        <button onClick={cerrarModal}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalMovimiento;
