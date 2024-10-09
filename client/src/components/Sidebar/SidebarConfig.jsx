import React from 'react';

const SidebarConfig = ({ icon, text }) => (
  <div className="confi-contenedor">
    <div className="boton-confi">
      <a href="#">
        <button id="icon-confi">
          <img src={icon} alt={text} className="icono-confi" />
          <span className="confi">{text}</span>
        </button>
      </a>
    </div>
  </div>
);

export default SidebarConfig;
