import React, { useState } from 'react';
import './Registro.css';
import ExportarExcel from '../ExportarExcel';

const Registro = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoMovimiento, setTipoMovimiento] = useState('');
  const [clasificacion, setClasificacion] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [detalle, setDetalle] = useState('');
  const [movimientos, setMovimientos] = useState({});
  const [mesSeleccionado, setMesSeleccionado] = useState('');
  const [currentSheet, setCurrentSheet] = useState('Balance');

  const clasificaciones = {
    "Activo Corriente": ["Efectivo", "Cuentas por Cobrar", "Inventarios", "Inversiones a Corto Plazo"],
    "Activo No Corriente": ["Bienes Raíces", "Maquinaria y Equipo", "Vehículos", "Inversiones a Largo Plazo"],
    "Pasivo Corriente": ["Cuentas por Pagar", "Deudas Corto Plazo"],
    "Pasivo No Corriente": ["Deudas Largo Plazo", "Hipotecas"],
  };

  const abrirModal = () => setMostrarModal(!mostrarModal);

  const agregarMovimiento = () => {
    if (tipoMovimiento && clasificacion && monto && fecha && detalle) {
      const [year, month] = fecha.split('-');
      const key = `${year}-${month}`;

      const nuevoMovimiento = {
        tipoMovimiento,
        clasificacion,
        monto,
        fecha,
        detalle,
      };

      setMovimientos(prev => ({
        ...prev,
        [key]: [...(prev[key] || []), nuevoMovimiento],
      }));

      setMostrarModal(false);
      setTipoMovimiento('');
      setClasificacion('');
      setMonto('');
      setFecha('');
      setDetalle('');
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  const handleMesSeleccionado = (mes) => {
    setMesSeleccionado(mes);
  };

  const getEstadoMes = (mes) => {
    const hoy = new Date();
    const mesActual = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}`;

    if (mes === mesActual) return 'En Proceso';
    return 'Finalizado';
  };

  const getSheetData = () => {
    switch (currentSheet) {
      case 'Balance':
        return Object.keys(movimientos).map(key => ({
          Fecha: key,
          Total: movimientos[key].reduce((acc, mov) => acc + parseFloat(mov.monto), 0)
        }));
      case 'Cuadro de Resultados':
        return Object.keys(movimientos).flatMap(key =>
          movimientos[key].map(movimiento => ({
            Fecha: movimiento.fecha,
            Tipo: movimiento.tipoMovimiento,
            Clasificación: movimiento.clasificacion,
            Monto: `${movimiento.monto} Gs`,
            Detalle: movimiento.detalle,
          }))
        );
      case 'Flujo de Efectivo':
        return Object.keys(movimientos).map(key => ({
          Fecha: key,
          Ingresos: movimientos[key]
            .filter(mov => mov.tipoMovimiento.includes('Activo'))
            .reduce((acc, mov) => acc + parseFloat(mov.monto), 0),
          Egresos: movimientos[key]
            .filter(mov => mov.tipoMovimiento.includes('Pasivo'))
            .reduce((acc, mov) => acc + parseFloat(mov.monto), 0),
        }));
      default:
        return [];
    }
  };

  return (
    <div className="container">
      <div className="main-content">
        <button onClick={abrirModal} className="btn-cargar">
          {mostrarModal ? '-' : '+'}
        </button>
        {mostrarModal && (
          <div className="modal">
            <h3>Movimiento</h3>
            <div>
              <label>Tipo de Movimiento:</label>
              <select value={tipoMovimiento} onChange={(e) => setTipoMovimiento(e.target.value)}>
                <option value="">Seleccione</option>
                <option value="Activo Corriente">Activo Corriente</option>
                <option value="Activo No Corriente">Activo No Corriente</option>
                <option value="Pasivo Corriente">Pasivo Corriente</option>
                <option value="Pasivo No Corriente">Pasivo No Corriente</option>
              </select>
            </div>
            {tipoMovimiento && (
              <div>
                <label>Clasificación:</label>
                <select value={clasificacion} onChange={(e) => setClasificacion(e.target.value)}>
                  <option value="">Seleccione</option>
                  {clasificaciones[tipoMovimiento].map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label>Monto:</label>
              <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="Monto" />
            </div>
            <div>
              <label>Fecha:</label>
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>
            <div>
              <label>Detalle:</label>
              <input type="text" value={detalle} onChange={(e) => setDetalle(e.target.value)} placeholder="Detalle" />
            </div>

            <button onClick={agregarMovimiento}>Agregar Movimiento</button>
            <button onClick={abrirModal}>Cancelar</button>
          </div>
        )}

        <h3>Registro Contable</h3>
        <table>
          <thead>
            <tr>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Detalle</th>
              <th>Clasificación</th>
              <th>Tipo de Movimiento</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(movimientos).flat().map((movimiento, index) => (
              <tr key={index}>
                <td>{movimiento.monto} Gs</td>
                <td>{movimiento.fecha}</td>
                <td>{movimiento.detalle}</td>
                <td>{movimiento.clasificacion}</td>
                <td>{movimiento.tipoMovimiento}</td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>

      <div className="sidebare">
        <h3>Estados Financieros</h3>
        <div className="estado-financiero">
          {['2024-09', '2024-10'].map((mes, index) => (
            <div key={index} className={`estado-financiero ${getEstadoMes(mes)}`} onClick={() => handleMesSeleccionado(mes)}>
              {mes === '2024-09' ? 'Septiembre 2024' : 'Próximo mes (Octubre 2024)'}: {getEstadoMes(mes)}
            </div>
          ))}
        </div>

        {mesSeleccionado && (
          <div className="preview">
            <h4>Detalles de {mesSeleccionado}</h4>
            <div className="sheet-selector">
              <button onClick={() => setCurrentSheet('Balance')}>Balance</button>
              <button onClick={() => setCurrentSheet('Cuadro de Resultados')}>Cuadro de Resultados</button>
              <button onClick={() => setCurrentSheet('Flujo de Efectivo')}>Flujo de Efectivo</button>
            </div>
            <table>
              <thead>
                <tr>
                  {currentSheet === 'Balance' && <><th>Fecha</th><th>Total</th></>}
                  {currentSheet === 'Cuadro de Resultados' && <>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Clasificación</th>
                    <th>Monto</th>
                    <th>Detalle</th>
                  </>}
                  {currentSheet === 'Flujo de Efectivo' && <>
                    <th>Fecha</th>
                    <th>Ingresos</th>
                    <th>Egresos</th>
                  </>}
                </tr>
              </thead>
              <tbody>
                {getSheetData().map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
                <ExportarExcel movimientos={movimientos} />
      </div>
    </div>
  );
};

export default Registro;
