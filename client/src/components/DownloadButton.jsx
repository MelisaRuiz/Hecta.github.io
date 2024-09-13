import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const exportToExcel = (data, filename) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filename);
};

export default function DownloadButton() {
  const handleExport = () => {
    const data = [
      { name: 'Item 1', value: 100 },
      { name: 'Item 2', value: 200 },
    ];
    exportToExcel(data, 'datos.xlsx');
  };

  return <button onClick={handleExport}>Descargar Excel</button>;
}
