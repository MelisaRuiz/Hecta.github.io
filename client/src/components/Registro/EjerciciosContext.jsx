import React, { createContext, useContext, useState, useEffect } from 'react'; 
import { useCuentas } from './CuentasContext'; 
import { useParcelas } from '../Gestion/ParcelasContext'; 

const EjerciciosContext = createContext();

export const useEjercicios = () => {
    return useContext(EjerciciosContext);
};

export const EjerciciosProvider = ({ children }) => {
    const [movimientos, setMovimientos] = useState({});
    const [ejercicios, setEjercicios] = useState({}); 
    const { agregarCuenta } = useCuentas(); 
    const { parcelas } = useParcelas(); 

    useEffect(() => {
        verificarEstadoEjercicio(); 
    }, [parcelas]);

    const verificarEstadoEjercicio = () => {
        const ejercicioEnProceso = Object.values(ejercicios).some(ejercicio => ejercicio.estado === 'En Proceso');
        
        // Si no hay un ejercicio en proceso y hay parcelas registradas, se crea uno nuevo
        if (!ejercicioEnProceso && parcelas.length > 0) {
            crearNuevoEjercicio();
        }
    };

    const crearNuevoEjercicio = () => {
        const nuevoEjercicio = `Ejercicio ${Object.keys(ejercicios).length + 1}`;
        setEjercicios(prev => ({
            ...prev,
            [nuevoEjercicio]: {
                estado: 'En Proceso',
                parcelas: parcelas.map(parcela => parcela.id), // Asignamos las parcelas actuales al ejercicio
                movimientos: {},
            },
        }));

        // Creamos las cuentas iniciales para el ejercicio
        agregarCuenta(nuevoEjercicio, { nombre: 'Ingresos', saldo: 0 });
        agregarCuenta(nuevoEjercicio, { nombre: 'Gastos', saldo: 0 });
        agregarCuenta(nuevoEjercicio, { nombre: 'Activos', saldo: 0 });
        agregarCuenta(nuevoEjercicio, { nombre: 'Pasivos', saldo: 0 });

        console.log(`Nuevo ejercicio habilitado: ${nuevoEjercicio}`);
    };

    const agregarTransaccion = (nuevaTransaccion) => {
        const ejercicioSeleccionado = Object.keys(ejercicios).find(ejercicio => ejercicios[ejercicio].estado === 'En Proceso');
        if (!ejercicioSeleccionado) {
            alert("No hay ejercicio en proceso para agregar un movimiento.");
            return;
        }

        setMovimientos(prev => {
            const movimientosEjercicio = prev[ejercicioSeleccionado] || {};
            return {
                ...prev,
                [ejercicioSeleccionado]: {
                    ...movimientosEjercicio,
                    [nuevaTransaccion.fase]: [
                        ...(movimientosEjercicio[nuevaTransaccion.fase] || []),
                        nuevaTransaccion,
                    ],
                }
            };
        });

        console.log('Transacción agregada:', nuevaTransaccion);
    };

    return (
        <EjerciciosContext.Provider
            value={{
                movimientos,
                setMovimientos,
                ejercicios,
                setEjercicios,
                agregarTransaccion, 
            }}
        >
            {children}
        </EjerciciosContext.Provider>
    );
};
