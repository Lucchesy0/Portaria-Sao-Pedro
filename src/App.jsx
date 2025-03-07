import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import AddVisit from './pages/AddVisit';
import EditVisit from './pages/EditVisit';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      {/* Cabeçalho fixo */}
      <Header />
      
      {/* Conteúdo principal */}
      <main className="main-content">
        <Routes>
          {/* Rotas principais */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddVisit />} />
          <Route path="/edit/:id" element={<EditVisit />} />

          {/* Rota para página não encontrada */}
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </main>

      {/* Rodapé fixo */}
      <Footer />
    </Router>
  );
}

export default App;
