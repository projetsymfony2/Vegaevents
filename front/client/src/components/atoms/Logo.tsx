import React from 'react';
import logo from '../../assets/logo.png';

const Logo: React.FC = () => (
  <img
    src={logo}
    alt="Logo Vega Events"
    className="h-24 md:h-31 object-contain" 
  />
);

export default Logo;