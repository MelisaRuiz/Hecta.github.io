import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const ParcelasContext = createContext();

// Proveedor del contexto
export const ParcelasProvider = ({ children }) => {
    const [parcelas, setParcelas] = useState([]);

    // Función para generar un nuevo ID
    const generarNuevoId = () => {
        return parcelas.length > 0 ? Math.max(...parcelas.map(p => p.id)) + 1 : 1; // Comienza desde 1 si no hay parcelas
    };

    // Función para validar los datos de la parcela
    const validarParcela = (nombreParcela, tipoCultivo, tamano) => {
        if (!nombreParcela || !tipoCultivo || tamano <= 0) {
            throw new Error("Todos los campos son obligatorios y el tamaño debe ser mayor que cero.");
        }
    };

    // Función para agregar una nueva parcela
    const agregarParcela = (nombreParcela, tipoCultivo, tamano, descripcion, etapa) => {
        try {
            validarParcela(nombreParcela, tipoCultivo, tamano); // Validar datos
            const nuevoId = generarNuevoId(); // Genera un nuevo ID
            const nuevaParcela = { id: nuevoId, nombre: nombreParcela, tipoCultivo, tamano, descripcion, etapa };

            setParcelas(prevParcelas => [...prevParcelas, nuevaParcela]);
            console.log('Parcela agregada:', nuevaParcela);
        } catch (error) {
            console.error("Error al agregar la parcela:", error.message);
        }
    };

    return (
        <ParcelasContext.Provider value={{
            parcelas,
            agregarParcela,
        }}>
            {children}
        </ParcelasContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useParcelas = () => {
    return useContext(ParcelasContext);
};
