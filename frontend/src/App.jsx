import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/auth';
import Dashboard from './components/Dashboard';
import FlashcardList from './components/FlashcardList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flashcards" element={<FlashcardList />} />
      </Routes>
    </Router>
  );
};

export default App;
