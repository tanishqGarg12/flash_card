import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/auth';
import Dashboard from './components/Dashboard';
import FlashcardList from './components/FlashcardList';

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className={`app ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} min-h-screen relative`}>
        <button
          onClick={toggleTheme}
          className={`absolute top-4 right-4 px-4 py-2 rounded ${
            theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
        >
          Toggle Theme
        </button>

        {/* "Take You Forward" Button */}
        <button
          onClick={() => window.location.href = '/'}
          className="absolute top-4 left-4 px-6 py-3 border-2 border-blue-500 text-cyan-500 bg-transparent rounded-lg shadow-md hover:bg-blue-50 transition duration-300"
        >
          Take You Forward
        </button>

        <Routes>
          <Route path="/" element={<Auth theme={theme} />} />
          <Route path="/dashboard" element={<Dashboard theme={theme} />} />
          <Route path="/flashcards" element={<FlashcardList theme={theme} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
