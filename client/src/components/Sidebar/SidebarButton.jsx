import React from 'react';
import userIcon from '../imagenes/user.png';

const SidebarButton = () => (
  <div class="usuario-contenedor">
    <div class="boton-usuario">
      <a href="#">
        <button id="icon-usuario">
          <img src={userIcon} alt="Usuario" class="icono-usuario" />
          <span class="usuario">Usuario</span>
        </button>
      </a>
    </div>
  </div>
);

export default SidebarButton;