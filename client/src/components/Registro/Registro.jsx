import React, { useState, useEffect } from 'react'; 
import './Registro.css';
import ModalMovimiento from './ModalMovimiento';
import ModalPreview from './ModalPreview';
import ModalParcelas from './ModalParcelas';
import { calcularBalance, calcularEstadoResultados, calcularFlujoEfectivo } from './Calculos';
import ExportarEjercicio from './ExportarEjercicio';
import { useParcelas } from '../Gestion/ParcelasContext'; 
import { useEjercicios } from './EjerciciosContext'; 

const Registro = () => {
  const { parcelas } = useParcelas(); 
  const { movimientos, setMovimientos, ejercicios, setEjercicios, actualizarFaseParcelas, crearEjercicioAutomaticamente } = useEjercicios(); 

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalPreview, setMostrarModalPreview] = useState(false);
  const [mostrarModalParcelas, setMostrarModalParcelas] = useState(false); 
  const [vistaPreview, setVistaPreview] = useState(null);
  const fases = ['Preparación', 'Siembra', 'Cosecha', 'Comercialización'];

  useEffect(() => {
    habilitarEjercicio();
  }, [parcelas]);

  const habilitarEjercicio = () => {
    const existeEjercicioEnProceso = Object.values(ejercicios).some(ejercicio => ejercicio.estado === 'En Proceso');
    
    // Crear un ejercicio automáticamente si hay parcelas registradas
    if (!existeEjercicioEnProceso && parcelas.length > 0) {
      const nuevoEjercicio = `Ejercicio ${Object.keys(ejercicios).length + 1}`;
      setEjercicios(prev => ({
        ...prev,
        [nuevoEjercicio]: {
          estado: 'En Proceso',
          fases: [],
          movimientos: {},
        },
      }));
    }
  };

  const agregarMovimiento = (nuevoMovimiento, parcelasSeleccionadas) => {
    const ejercicioSeleccionado = Object.keys(ejercicios).find(ejercicio => ejercicios[ejercicio].estado === 'En Proceso');
    
    if (!ejercicioSeleccionado) {
      alert("No hay ejercicio en proceso para agregar un movimiento.");
      return;
    }

    // Agregar el movimiento para cada parcela seleccionada
    parcelasSeleccionadas.forEach(idParcela => {
      const faseActual = parcelas.find(p => p.id === idParcela).etapa; 

      setMovimientos(prev => ({
        ...prev,
        [ejercicioSeleccionado]: {
          ...(prev[ejercicioSeleccionado] || {}),
          [faseActual]: [
            ...(prev[ejercicioSeleccionado]?.[faseActual] || []), 
            {
              ...nuevoMovimiento,
              parcelaId: idParcela, // Guardar el ID de la parcela
            },
          ],
        },
      }));
    });

    setMostrarModal(false);
  };

  const avanzarFase = (parcelasSeleccionadas) => {
    const nuevasFases = parcelasSeleccionadas.map(idParcela => {
      const parcela = parcelas.find(p => p.id === idParcela);
      const faseAnterior = parcela.etapa;
      const nuevaFase = fases[fases.indexOf(faseAnterior) + 1]; // Avanza a la siguiente fase

      return nuevaFase; // Devuelve la nueva fase para esa parcela
    });

    // Actualiza las fases de las parcelas seleccionadas
    actualizarFaseParcelas(parcelasSeleccionadas, nuevasFases);
  };

  const toggleModalPreview = () => {
    setVistaPreview(null);
    setMostrarModalPreview(prev => !prev);
  };

  const cerrarModalPreview = () => setMostrarModalPreview(false);

  const obtenerDatosPreview = () => {
    const ejercicioSeleccionado = Object.keys(ejercicios).find(ejercicio => ejercicios[ejercicio].estado === 'En Proceso');
    
    if (!ejercicioSeleccionado) return null;

    const movimientosEjercicio = movimientos[ejercicioSeleccionado] || {};
    const balance = calcularBalance(movimientosEjercicio);
    const estadoResultados = calcularEstadoResultados(movimientosEjercicio);
    const flujoEfectivo = calcularFlujoEfectivo(movimientosEjercicio);

    return {
      balance,
      estadoResultados,
      flujoEfectivo,
    };
  };

  const manejarAbrirModalParcelas = () => {
    setMostrarModalParcelas(true);
  };

  const manejarCerrarModalParcelas = () => {
    setMostrarModalParcelas(false);
  };

  return (
    <div className="main-content">
      <div className="top-row">
        <div className="container">
          <button 
            onClick={() => setMostrarModal(prev => !prev)} 
            disabled={Object.values(ejercicios).every(ejercicio => ejercicio.estado !== "En Proceso")}
          >
            {mostrarModal ? 'Cerrar Agregar Movimiento' : 'Agregar Movimiento'}
          </button>

          {parcelas.length === 0 && (
            <p style={{ color: 'red' }}>Se podrán registrar movimientos a un Ejercicio Contable una vez se registren parcelas.</p>
          )}

          {Object.values(ejercicios).some(ejercicio => ejercicio.estado === "En Proceso") && (
            <div>
              <p>{ejercicios[Object.keys(ejercicios).find(ejercicio => ejercicios[ejercicio].estado === "En Proceso")].fases.map(f => `${f.parcela}: ${f.nuevaFase}`).join(', ')}</p>
              <button onClick={manejarAbrirModalParcelas}>Siguiente Fase</button>

              <table>
                <thead>
                  <tr>
                    <th>Monto</th>
                    <th>Fecha</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {fases.map(fase => (
                    movimientos[Object.keys(ejercicios).find(ejercicio => ejercicios[ejercicio].estado === "En Proceso")]?.[fase]?.map((mov, index) => (
                      <tr key={index}>
                        <td>{mov.monto}</td>
                        <td>{mov.fecha}</td>
                        <td>{mov.descripcion}</td>
                      </tr>
                    )) || (
                      <tr key={fase}>
                        <td></td>
                        <td></td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {mostrarModalPreview && (
            <ModalPreview
              datos={obtenerDatosPreview()}
              vistaPreview={vistaPreview}
              setVistaPreview={setVistaPreview}
              cerrarModal={cerrarModalPreview}
            />
          )}

          {mostrarModal && (
            <ModalMovimiento
              agregarMovimiento={agregarMovimiento}
              cerrarModal={() => setMostrarModal(false)}
              parcelas={parcelas}
            />
          )}

          {mostrarModalParcelas && (
            <ModalParcelas 
              parcelas={parcelas} 
              onSeleccionarParcelas={parcelasSeleccionadas => {
                avanzarFase(parcelasSeleccionadas);
                manejarCerrarModalParcelas();
              }}
              onCerrar={manejarCerrarModalParcelas}
            />
          )}
        </div>

        <div className="sidebare">
          <h3>Ejercicios</h3>
          <div className="ejercicios">
            {Object.keys(ejercicios).map((ejercicio, index) => (
              <div 
                key={index} 
                className={`${ejercicio} ${ejercicios[ejercicio].estado}`} 
                onClick={toggleModalPreview}
              >
                {ejercicio} - {ejercicios[ejercicio].estado}
                <ExportarEjercicio 
                  ejercicio={ejercicio}
                  movimientosEjercicio={movimientos[ejercicio] || {}}
                />
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
