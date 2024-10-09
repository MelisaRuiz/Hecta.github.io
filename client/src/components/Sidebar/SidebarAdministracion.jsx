import React, { useState } from 'react';
import administracionIcon from './Imagenes/graf.png';
import flechaIcon from './Imagenes/flecha.png';
import PropTypes from 'prop-types';

const SidebarAdministracion = ({ text, options = [], onClick, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAdministracion = () => {
    setIsOpen(!isOpen);
    onClick(text); // Notifica al componente padre cuando se selecciona una opción
  };

  const handleFlechaClick = (e) => {
    e.stopPropagation(); // Evita que el clic en la flecha active/desactive el botón principal
    toggleAdministracion(); // Mantiene la funcionalidad de desplegar
  };

  return (
    <div className={`administracion-contenedor boton-contenedor ${isActive ? 'active' : ''}`}>
      <div className="boton-administracion" onClick={toggleAdministracion}>
        <button id="icono-administracion">
          <img src={administracionIcon} alt={text} className="icono-administracion" />
          <span className="administracion">{text}</span>
        </button>
        <button id="desplegar" onClick={handleFlechaClick} className="desplegar"> {/* Cambiado a className */}
          <img src={flechaIcon} alt="flecha" className="flecha" />
        </button>
      </div>
      <div className={`contenido-administracion ${isOpen ? '' : 'oculto'}`}>
        {options.map((option, index) => (
          <a href="#" key={index} onClick={() => onClick(option)}>
            {option}
          </a>
        ))}
      </div>
    </div>
  );
};

SidebarAdministracion.propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool // Controla el estado activo
};

export default SidebarAdministracion;
