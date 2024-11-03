// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Gallery from './components/Gallery';
import UserStats from './components/UserStats';
import './App.css'; // Add your styles here

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>FomoMon: Catch Them All!</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/gallery">Pokémon Gallery</a>
            <a href="/stats">Your Stats</a>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/stats" element={<UserStats />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
