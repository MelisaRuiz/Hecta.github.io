import React, { createContext, useContext, useState } from 'react';

const CuentasContext = createContext();

export const useCuentas = () => {
    return useContext(CuentasContext);
};

export const CuentasProvider = ({ children }) => {
    const [cuentas, setCuentas] = useState({}); // Inicializa el estado para cuentas

    // Función para agregar una nueva cuenta
    const agregarCuenta = (nombre, detalles) => {
        setCuentas(prev => ({
            ...prev,
            [nombre]: detalles,
        }));
    };

    return (
        <CuentasContext.Provider value={{ cuentas, agregarCuenta }}>
            {children}
        </CuentasContext.Provider>
    );
};
