import React, { useState } from 'react';
import FlashcardList from './FlashcardList';
import Dashboard from './Dashboard';

const Auth = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [theme, setTheme] = useState('light');

  const handleLogin = (role) => {
    setIsAdmin(role === 'admin');
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 px-4 py-2 rounded ${
          theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600 text-white'
        }`}
      >
        Toggle Theme
      </button>

      
      <h1 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Welcome</h1>
      <button
        onClick={() => handleLogin('admin')}
        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600"
      >
        Admin Login
      </button>
      <button
        onClick={() => handleLogin('user')}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 mt-4"
      >
        User Login
      </button>

      {isAdmin !== null && (
        <div className="container mx-auto p-6">
          {isAdmin ? <Dashboard /> : <FlashcardList />}
        </div>
      )}
    </div>
  );
};

export default Auth;