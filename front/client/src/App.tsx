import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/pages/Layout';
import Home from './components/pages/Home';
import Animation from './components/pages/Animation';
import AboutAnimation from './components/pages/AboutAnimation';
import AboutEvents from './components/pages/AboutEvents';
import Contact from './components/pages/PageContact';
import Login from './components/pages/Login';
import Backoffice from './components/pages/Backoffice';
import Recrutement from './components/pages/Recrutement'; // Importez le composant Recruitment
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="animation" element={<Animation />} />
          <Route path="aboutanimation" element={<AboutAnimation />} />
          <Route path="aboutevents" element={<AboutEvents />} />
          <Route path="contact" element={<Contact />} />
          <Route path="recrutement" element={<Recrutement />} /> {/* Ajoutez cette ligne */}
        </Route>
        {/* Route pour la page de connexion */}
        <Route path="/login" element={<Login />} />
        <Route path="/backoffice" element={<Backoffice />} />
      </Routes>
    </Router>
  );
};

export default App;