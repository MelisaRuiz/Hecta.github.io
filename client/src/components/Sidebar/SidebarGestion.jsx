import React, { useState } from 'react';
import flecha from '../imagenes/flecha.png';

const SidebarGestion = ({ icon, text, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleGestion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div class="gestion-contenedor">
      <div class="boton-gestion">
        <a href="#">
          <button id="icon-gestion">
            <img src={icon} alt={text} class="icono-gestion" />
            <span class="gestion">{text}</span>
          </button>
        </a>
        <button id="desplegar" onClick={toggleGestion}>
          <img src={flecha} alt="flecha" class="flecha" />
        </button>
      </div>
      <div class={`contenido-gestion ${isOpen ? '' : 'oculto'}`}>
        {options.map((option, index) => (
          <a href="#" key={index}>{option}</a>
        ))}
      </div>
    </div>
  );
};

export default SidebarGestion;