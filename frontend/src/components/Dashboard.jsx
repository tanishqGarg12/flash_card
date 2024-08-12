import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate(); 

  const handleAddFlashcard = async () => {
    try {
      await fetch('http://localhost:5000/api/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer }),
      });
      setQuestion('');
      setAnswer('');
      navigate('/flashcards'); 
      alert('Flashcard added successfully');
    } catch (error) {
      console.error('Error adding flashcard:', error);
      alert('Failed to add flashcard');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
      />
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Answer"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
      />
      <button
        onClick={handleAddFlashcard}
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
      >
        Add Flashcard
      </button>
    </div>
  );
};

export default Dashboard;
