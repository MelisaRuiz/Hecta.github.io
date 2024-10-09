import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const ParcelasContext = createContext();

// Proveedor del contexto
export const ParcelasProvider = ({ children }) => {
    const [parcelas, setParcelas] = useState([]);
    
    // Función para agregar una nueva parcela
    const agregarParcela = (nuevaParcela) => {
        setParcelas(prevParcelas => [...prevParcelas, nuevaParcela]);
        console.log('Parcela agregada:', nuevaParcela);
    };

    // Función para avanzar las fases de las parcelas seleccionadas
    const avanzarFaseParcelas = (idsSeleccionados) => {
        const nuevasParcelas = parcelas.map(parcela => 
            idsSeleccionados.includes(parcela.id) 
                ? { ...parcela, etapa: siguienteFase(parcela.etapa) } // Cambia 'fase' por 'etapa'
                : parcela
        );

        setParcelas(nuevasParcelas);
        console.log('Fases avanzadas para parcelas con IDs:', idsSeleccionados);
    };

    // Lógica para determinar la siguiente fase
    const siguienteFase = (etapaActual) => {
        const fases = ['Preparación', 'Cosecha', 'Comercialización'];
        const indiceActual = fases.indexOf(etapaActual);
        return indiceActual < fases.length - 1 ? fases[indiceActual + 1] : etapaActual; // No avanzar más allá de la última fase
    };

    // Función para manejar el registro de un nuevo ejercicio
    const manejarNuevoEjercicio = (parcelasSeleccionadas) => {
        const nuevoEjercicio = {
            nombreEjercicio: "Ejercicio Nueva Fase",
            producto: "Producto Ejemplo",
            hectareas: 10,
            etapaSeleccionada: "Comercialización",
            parcelas: parcelasSeleccionadas,
        };

        console.log('Nuevo ejercicio creado:', nuevoEjercicio);
        // Aquí puedes realizar la lógica para guardar el nuevo ejercicio
    };

    return (
        <ParcelasContext.Provider value={{
            parcelas,
            agregarParcela,
            avanzarFaseParcelas,
            manejarNuevoEjercicio,
        }}>
            {children}
        </ParcelasContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useParcelas = () => {
    return useContext(ParcelasContext);
};
