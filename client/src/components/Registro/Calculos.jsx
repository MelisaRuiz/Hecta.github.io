export const calcularBalance = (movimientosEjercicio) => {
  const balancePorCategoria = Object.values(movimientosEjercicio).flat().reduce((acc, mov) => {
    const categoria = mov.categoria || 'Sin Categoría';
    acc[categoria] = (acc[categoria] || 0) + mov.monto;
    return acc;
  }, {});

  return balancePorCategoria;
};

export const calcularFlujoEfectivo = (movimientosEjercicio) => {
  const ingresosPorCategoria = {};
  const egresosPorCategoria = {};

  Object.values(movimientosEjercicio).flat().forEach((mov) => {
    const categoria = mov.categoria || 'Sin Categoría';
    if (mov.tipoMovimiento === 'Ingresos') {
      ingresosPorCategoria[categoria] = (ingresosPorCategoria[categoria] || 0) + mov.monto;
    } else if (mov.tipoMovimiento === 'Costos') {
      egresosPorCategoria[categoria] = (egresosPorCategoria[categoria] || 0) + mov.monto;
    }
  });

  return {
    Fecha: new Date().toISOString().split('T')[0],
    Ingresos: ingresosPorCategoria,
    Egresos: egresosPorCategoria,
  };
};

export const calcularEstadoResultados = (movimientosEjercicio) => {
  return Object.values(movimientosEjercicio).flat().map((mov) => ({
    Fecha: mov.fecha,
    Categoria: mov.categoria || 'Sin Categoría',
    Tipo: mov.tipoMovimiento,
    Clasificación: mov.clasificacion,
    Monto: `${mov.monto} Gs`,
    Detalle: mov.detalle,
  }));
};
