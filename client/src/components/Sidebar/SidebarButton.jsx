import React from 'react';
import userIcon from './Imagenes/user.png'; 

const SidebarButton = () => (
  <div className="usuario-contenedor">
    <div className="boton-usuario">
      <a href="#">
        <button id="icon-usuario">
          <img src={userIcon} alt="Usuario" className="icono-usuario" />
          <span className="usuario">Usuario</span>
        </button>
      </a>
    </div>
  </div>
);

export default SidebarButton;
