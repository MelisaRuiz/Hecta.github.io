import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ExportarExcel = ({ movimientos }) => {
  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();

    const balanceData = Object.keys(movimientos).map(key => ({
      Fecha: key,
      Total: movimientos[key].reduce((acc, mov) => acc + parseFloat(mov.monto), 0)
    }));
    const balanceWs = XLSX.utils.json_to_sheet(balanceData);
    XLSX.utils.book_append_sheet(wb, balanceWs, 'Balance');

    const resultadosData = Object.keys(movimientos).flatMap(key =>
      movimientos[key].map(movimiento => ({
        Fecha: movimiento.fecha,
        Tipo: movimiento.tipoMovimiento,
        Clasificación: movimiento.clasificacion,
        Monto: `${movimiento.monto} Gs`,
        Detalle: movimiento.detalle,
      }))
    );
    const resultadosWs = XLSX.utils.json_to_sheet(resultadosData);
    XLSX.utils.book_append_sheet(wb, resultadosWs, 'Estado de Resultados');

    const flujoEfectivoData = Object.keys(movimientos).map(key => ({
      Fecha: key,
      Ingresos: movimientos[key]
        .filter(mov => mov.tipoMovimiento.includes('Activo'))
        .reduce((acc, mov) => acc + parseFloat(mov.monto), 0),
      Egresos: movimientos[key]
        .filter(mov => mov.tipoMovimiento.includes('Pasivo'))
        .reduce((acc, mov) => acc + parseFloat(mov.monto), 0),
    }));
    const flujoEfectivoWs = XLSX.utils.json_to_sheet(flujoEfectivoData);
    XLSX.utils.book_append_sheet(wb, flujoEfectivoWs, 'Flujo de Efectivo');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Estados_Financieros.xlsx');
  };

  return (
    <button onClick={exportarExcel} className="btn-cargar">
      Exportar a Excel
    </button>
  );
};

export default ExportarExcel;
