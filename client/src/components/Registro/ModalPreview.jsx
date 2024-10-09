import React from 'react';

const ModalPreview = ({ datos, vistaPreview, setVistaPreview, cerrarModal }) => {
  return (
    <div className="modal">
      <button onClick={cerrarModal}>Cerrar</button>
      <h2>Vista de Cálculos</h2>
      <button onClick={() => setVistaPreview('balance')}>Balance</button>
      <button onClick={() => setVistaPreview('estadoResultados')}>Estado de Resultados</button>
      <button onClick={() => setVistaPreview('flujoEfectivo')}>Flujo de Efectivo</button>
      
      {vistaPreview === 'balance' && datos.balance && <Tabla datos={datos.balance} />}
      {vistaPreview === 'estadoResultados' && datos.estadoResultados && <Tabla datos={datos.estadoResultados} />}
      {vistaPreview === 'flujoEfectivo' && datos.flujoEfectivo && <Tabla datos={datos.flujoEfectivo} />}
    </div>
  );
};

export default ModalPreview;
