import React, { useState } from "react";
import flechaIcon from './Imagenes/flecha.png'; 
import comunidadIcon from "./Imagenes/rueda.png"; 
import PropTypes from 'prop-types'; 

const SidebarComunidad = ({ text, options = [], onClick, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleComunidad = () => {
    setIsOpen(!isOpen);
    onClick(text); // Notifica al componente padre cuando se selecciona una opción
  };

  const handleFlechaClick = (e) => {
    e.stopPropagation(); // Evita que el clic en la flecha active/desactive el botón principal
    toggleComunidad(); // Mantiene la funcionalidad de desplegar
  };

  return (
    <div className={`comunidad-contenedor boton-contenedor ${isActive ? 'active' : ''}`}>
      <div className="boton-comunidad" onClick={toggleComunidad}>
        <button id="icono-comunidad">
          <img src={comunidadIcon} alt={text} className="icono-comunidad" />
          <span className="comunidad">{text}</span>
        </button>
        <button id="desplegar" onClick={handleFlechaClick} className="desplegar"> {/* Cambiado a className */}
          <img src={flechaIcon} alt="flecha" className="flecha" />
        </button>
      </div>
      <div className={`contenido-comunidad ${isOpen ? '' : 'oculto'}`}>
        {options.map((option, index) => (
          <a href="#" key={index} onClick={() => onClick(option)}>
            {option}
          </a>
        ))}
      </div>
    </div>
  );
};

SidebarComunidad.propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool
};

export default SidebarComunidad;
