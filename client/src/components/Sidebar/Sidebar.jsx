import React, { useState } from 'react';
import SidebarButton from './SidebarButton';
import SidebarGestion from './SidebarGestion';
import SidebarConfig from './SidebarConfig';
import './Sidebar.css';

import lineas from '../imagenes/lineas.png'; // Icono de menú
import ruedaIcon from '../imagenes/rueda.png'; // Icono de gestión
import grafIcon from '../imagenes/graf.png'; // Icono de administración
import confIcon from '../imagenes/conf.png'; // Icono de configuración
import ayudaIcon from '../imagenes/interrogacion.png'; // Icono de ayuda

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div class={`sidebar ${isMinimized ? 'minisidebar' : ''}`}>
      <div class="nombre">
        <span>Hecta</span>
        <button id="linea" onClick={toggleSidebar}>
          <img src={lineas} alt="Menu" />
        </button>
      </div>

      <nav>
        <ul class="separacion">
          <li>
            <SidebarButton />
          </li>
        </ul>
        <ul class="separacionabajo">
          <li>
            <SidebarGestion
              icon={ruedaIcon}
              text="Gestión"
              options={['Opción 1', 'Opción 2']}
            />
          </li>
          <li>
            <SidebarGestion
              icon={grafIcon}
              text="Administración"
              options={['Opción 1', 'Opción 2']}
            />
          </li>
          <li>
            <SidebarGestion
              icon={ruedaIcon}
              text="Comunidad"
              options={['Opción 1', 'Opción 2']}
            />
          </li>
        </ul>
        <ul>
          <li>
            <SidebarConfig icon={confIcon} text="Configuración" />
          </li>
          <li>
            <SidebarConfig icon={ayudaIcon} text="Ayuda" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;