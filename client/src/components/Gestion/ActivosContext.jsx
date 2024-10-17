import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de Activos
const ActivosContext = createContext();

// Hook personalizado para usar el contexto de Activos
export const useActivos = () => useContext(ActivosContext);

// Proveedor del contexto de Activos
export const ActivosProvider = ({ children }) => {
    const [activos, setActivos] = useState([]);

    // Función para agregar un activo
    const agregarActivo = (nuevoActivo) => {
        if (!nuevoActivo.nombreActivo || !nuevoActivo.valorInicial || !nuevoActivo.depreciacionAnual || !nuevoActivo.fechaAdquisicion) {
            console.error('Error: campos obligatorios incompletos');
            return;
        }
        setActivos(prevActivos => [...prevActivos, nuevoActivo]);
        console.log('Activo agregado:', nuevoActivo);
    };

    // Función para eliminar un activo (opcional)
    const eliminarActivo = (id) => {
        setActivos(prevActivos => prevActivos.filter(activo => activo.id !== id));
    };

    return (
        <ActivosContext.Provider value={{ activos, agregarActivo, eliminarActivo }}>
            {children}
        </ActivosContext.Provider>
    );
};
