import React, { useState } from 'react';
import FlashcardList from './FlashcardList';
import Dashboard from './Dashboard';

const Auth = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  const handleLogin = (role) => {
    setIsAdmin(role === 'admin');
  };

  if (isAdmin === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Welcome</h1>
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
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {isAdmin ? <Dashboard /> : <FlashcardList />}
    </div>
  );
};

export default Auth;
