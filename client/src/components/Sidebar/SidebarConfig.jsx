import React from 'react';

const SidebarConfig = ({ icon, text }) => (
  <div class="confi-contenedor">
    <div class="boton-confi">
      <a href="#">
        <button id="icon-confi">
          <img src={icon} alt={text} class="icono-confi" />
          <span class="confi">{text}</span>
        </button>
      </a>
    </div>
  </div>
);

export default SidebarConfig;