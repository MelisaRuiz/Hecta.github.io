import React, { createContext, useContext, useState } from 'react';

// Crear el contexto de Ejercicios
const EjerciciosContext = createContext();

// Hook para usar el contexto de Ejercicios
export const useEjercicios = () => {
    return useContext(EjerciciosContext);
};

// Proveedor del contexto de Ejercicios
export const EjerciciosProvider = ({ children }) => {
    const [movimientos, setMovimientos] = useState({});
    const [ejercicios, setEjercicios] = useState({});

    // Función para crear un nuevo ejercicio automáticamente
    const crearEjercicioAutomaticamente = (parcelasEnPreparacion) => {
        if (!Array.isArray(parcelasEnPreparacion) || parcelasEnPreparacion.length === 0) {
            console.error("No hay parcelas en preparación para crear un ejercicio.");
            return;
        }

        const nuevoEjercicio = {
            nombreEjercicio: `Ejercicio Nueva Fase ${new Date().toLocaleDateString()}`,
            estado: 'En Proceso',
            fases: [], // Registro de fases para cada parcela
            parcelas: parcelasEnPreparacion, // Asignar parcelas al nuevo ejercicio
        };

        // Agregar el nuevo ejercicio al estado
        setEjercicios(prevEjercicios => ({
            ...prevEjercicios,
            [nuevoEjercicio.nombreEjercicio]: nuevoEjercicio
        }));

        console.log("Nuevo ejercicio creado automáticamente:", nuevoEjercicio);
    };

    // Función para agregar un movimiento
    const agregarMovimiento = (nuevoMovimiento, parcelasSeleccionadas) => {
        const ejercicioSeleccionado = Object.keys(ejercicios).find(ejercicio => ejercicios[ejercicio].estado === 'En Proceso');
        
        if (!ejercicioSeleccionado) {
            alert("No hay ejercicio en proceso para agregar un movimiento.");
            return;
        }

        parcelasSeleccionadas.forEach(idParcela => {
            const parcela = ejercicios[ejercicioSeleccionado].parcelas.find(p => p.id === idParcela);
            const faseActual = parcela.etapa;

            // Registrar el movimiento solo para la fase actual de cada parcela seleccionada
            setMovimientos(prev => ({
                ...prev,
                [ejercicioSeleccionado]: {
                    ...(prev[ejercicioSeleccionado] || {}),
                    [faseActual]: [
                        ...(prev[ejercicioSeleccionado]?.[faseActual] || []),
                        nuevoMovimiento,
                    ],
                },
            }));
        });
    };

    // Función para actualizar la fase de las parcelas
    const actualizarFaseParcelas = (parcelasSeleccionadas, nuevasFases) => {
        const ejercicioSeleccionado = Object.keys(ejercicios).find(ejercicio => ejercicios[ejercicio].estado === 'En Proceso');
        
        if (!ejercicioSeleccionado) {
            alert("No hay ejercicio en proceso para actualizar las fases.");
            return;
        }

        // Iterar sobre las parcelas seleccionadas y sus nuevas fases
        nuevasFases.forEach((nuevaFase, index) => {
            const idParcela = parcelasSeleccionadas[index];
            const parcela = ejercicios[ejercicioSeleccionado].parcelas.find(p => p.id === idParcela);

            // Actualizar la etapa de la parcela
            if (parcela) {
                // Actualizamos la fase de la parcela
                parcela.etapa = nuevaFase; 

                // Agregar la nueva fase al registro del ejercicio
                setEjercicios(prev => ({
                    ...prev,
                    [ejercicioSeleccionado]: {
                        ...prev[ejercicioSeleccionado],
                        fases: [
                            ...(prev[ejercicioSeleccionado].fases || []),
                            { parcela: parcela.id, nuevaFase },
                        ],
                    },
                }));

                // Crear un nuevo ejercicio si alguna de las parcelas ha pasado a "Preparación"
                if (nuevaFase === "Preparación") {
                    crearEjercicioAutomaticamente(parcelasSeleccionadas);
                }
            }
        });
    };

    // Función para cerrar el ejercicio
    const cerrarEjercicio = (ejercicioSeleccionado) => {
        const parcelasEnEjercicio = ejercicios[ejercicioSeleccionado].parcelas;
        const todasComercializadas = parcelasEnEjercicio.every(parcela => parcela.etapa === "Comercialización");

        if (todasComercializadas) {
            setEjercicios(prev => ({
                ...prev,
                [ejercicioSeleccionado]: {
                    ...prev[ejercicioSeleccionado],
                    estado: 'Cerrado', // Cambiar el estado a 'Cerrado'
                }
            }));
            console.log(`El ejercicio ${ejercicioSeleccionado} ha sido cerrado.`);
        } else {
            alert("No se puede cerrar el ejercicio porque no todas las parcelas han completado la fase de Comercialización.");
        }
    };

    return (
        <EjerciciosContext.Provider
            value={{
                movimientos,
                setMovimientos,
                ejercicios,
                setEjercicios,
                crearEjercicioAutomaticamente,
                agregarMovimiento,
                actualizarFaseParcelas,
                cerrarEjercicio,
            }}
        >
            {children}
        </EjerciciosContext.Provider>
    );
};
