import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { calcularBalance, calcularEstadoResultados, calcularFlujoEfectivo } from './Calculos'; // Asegúrate de que la ruta sea correcta

const exportarEjercicioCompleto = (ejercicio, movimientosEjercicio) => {
  // Crear un nuevo libro de trabajo (workbook)
  const wb = XLSX.utils.book_new();

  // 1. Calcular y agregar el Balance
  const balance = calcularBalance(movimientosEjercicio);
  const balanceData = Object.keys(balance).map((categoria) => ({
    Categoria: categoria,
    Total: balance[categoria],
  }));
  const wsBalance = XLSX.utils.json_to_sheet(balanceData);
  XLSX.utils.book_append_sheet(wb, wsBalance, 'Balance');

  // 2. Calcular y agregar el Estado de Resultados
  const estadoResultados = calcularEstadoResultados(movimientosEjercicio);
  const wsEstadoResultados = XLSX.utils.json_to_sheet(estadoResultados);
  XLSX.utils.book_append_sheet(wb, wsEstadoResultados, 'Estado de Resultados');

  // 3. Calcular y agregar el Flujo de Efectivo
  const flujoEfectivo = calcularFlujoEfectivo(movimientosEjercicio);
  const flujoEfectivoData = [
    { Fecha: flujoEfectivo.Fecha, ...flujoEfectivo.Ingresos, ...flujoEfectivo.Egresos },
  ];
  const wsFlujoEfectivo = XLSX.utils.json_to_sheet(flujoEfectivoData);
  XLSX.utils.book_append_sheet(wb, wsFlujoEfectivo, 'Flujo de Efectivo');

  // Guardar el archivo Excel
  XLSX.writeFile(wb, `${ejercicio}.xlsx`);
};

// Componente para el botón de descarga
const ExportarEjercicio = ({ ejercicio, movimientosEjercicio }) => {
  const handleExport = () => {
    exportarEjercicioCompleto(ejercicio, movimientosEjercicio);
  };

  return (
    <button onClick={handleExport}>
      Descargar Ejercicio Completo
    </button>
  );
};

export default ExportarEjercicio;
