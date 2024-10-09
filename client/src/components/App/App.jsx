import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Registro from '../Registro/Registro'; // Componente de registro
import Gestion from '../Gestion/Gestion'; // Componente de gestión
import Comunidad from '../Comunidad/Comunidad'; // Componente de Comunidad
import { ParcelasProvider } from '../Gestion/ParcelasContext'; // Importa el ParcelasProvider
import { EjerciciosProvider } from '../Registro/EjerciciosContext'; // Importa el EjerciciosProvider
import './App.css'; // Estilos generales

// Componente ErrorBoundary
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Algo salió mal.</h1>;
        }
        return this.props.children; 
    }
}

const App = () => {
    const [activeSection, setActiveSection] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);

    const handleSidebarClick = (section) => {
        setActiveSection(section);
        // Lógica adicional según la sección
    };

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    return (
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
                            <ErrorBoundary>
                                <Routes>
                                    <Route path="/registro" element={<Registro />} />
                                    <Route path="/gestion" element={<Gestion />} />
                                    <Route path="/comunidad" element={<Comunidad />} />
                                </Routes>
                            </ErrorBoundary>
                        </main>
                    </div>
                </Router>
            </EjerciciosProvider>
        </ParcelasProvider>
    );
};

export default App;
