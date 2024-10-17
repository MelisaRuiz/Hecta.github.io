import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Registro from '../Registro/Registro'; // Componente de registro
import Gestion from '../Gestion/Gestion'; // Componente de gestión
import Comunidad from '../Comunidad/Comunidad'; // Componente de Comunidad
import { ParcelasProvider } from '../Gestion/ParcelasContext'; // Importa el ParcelasProvider
import { EjerciciosProvider } from '../Registro/EjerciciosContext'; // Importa el EjerciciosProvider
import { ActivosProvider } from '../Gestion/ActivosContext'; // Importa el EjerciciosProvider
import { CuentasProvider } from '../Registro/CuentasContext'; // Importa el CuentasProvider
import './App.css'; // Estilos generales

const App = () => {
    const [activeSection, setActiveSection] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);

    const handleSidebarClick = (section) => {
        setActiveSection(section);
    };

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <CuentasProvider>
            <ActivosProvider>
            <ParcelasProvider>
                <EjerciciosProvider>
                    <Router basename="/Hecta.github.io">
                        <div className={`app-container ${isMinimized ? 'sidebar-minimized' : ''}`}>
                            <Sidebar 
                                onClick={handleSidebarClick} 
                                activeSection={activeSection} 
                                isMinimized={isMinimized} 
                                toggleSidebar={toggleSidebar}
                            />
                            <main className="main-content">
                                <Routes>
                                    <Route path="/registro" element={<Registro />} />
                                    <Route path="/gestion" element={<Gestion />} />
                                    <Route path="/comunidad" element={<Comunidad />} />
                                </Routes>
                            </main>
                        </div>
                    </Router>
                </EjerciciosProvider>
            </ParcelasProvider>
            </ActivosProvider>
        </CuentasProvider>
    );
};

export default App;
