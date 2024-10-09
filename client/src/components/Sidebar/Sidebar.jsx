import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SidebarButton from './SidebarButton';
import SidebarGestion from './SidebarGestion';
import SidebarComunidad from './SidebarComunidad';
import SidebarAdministracion from './SidebarAdministracion';
import SidebarConfig from './SidebarConfig';
import './styles.css';
import lineas from './Imagenes/lineas.png';
import ayudaIcon from './Imagenes/interrogacion.png'; // Imagen para Ayuda
import confIcon from './Imagenes/conf.png'; // Imagen para Configuración

const Sidebar = ({ onClick, activeSection, isMinimized, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isMinimized ? 'minisidebar' : ''}`}>
      <div className="nombre">
        <span>Hecta</span>
        <button id="linea" onClick={toggleSidebar}>
          <img src={lineas} alt="Menu" />
        </button>
      </div>

      <nav>
        <ul className="separacion">
          <li>
            <SidebarButton />
          </li>
        </ul>
        <ul className="separacionabajo">
          <li>
            <NavLink to="/gestion" className={({ isActive }) => (isActive ? 'navlink-active' : '')}>
              <SidebarGestion 
                text="Gestión" 
                onClick={() => onClick("Gestión")}
                isActive={activeSection === "Gestión"}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/registro" className={({ isActive }) => (isActive ? 'navlink-active' : '')}>
              <SidebarAdministracion 
                text="Administración" 
                onClick={() => onClick("Administración")}
                isActive={activeSection === "Administración"}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/comunidad" className={({ isActive }) => (isActive ? 'navlink-active' : '')}>
              <SidebarComunidad 
                text="Comunidad" 
                onClick={() => onClick("Comunidad")}
                isActive={activeSection === "Comunidad"}
              />
            </NavLink>
          </li>
        </ul>
        <ul>
          <ul className="separacionarriba">
            <li>
              <SidebarConfig icon={confIcon} text="Configuración" />
            </li>
            <li>
              <SidebarConfig icon={ayudaIcon} text="Ayuda" />
            </li>
          </ul>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
