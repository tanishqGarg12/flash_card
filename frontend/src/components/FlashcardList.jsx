import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Flashcard from './Flashcard';
// import {Button} from "../shad/Button"

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Add the useNavigate hook

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/flashcards');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const deleteCard = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/flashcards/${id}`, {
        method: 'DELETE',
      });
      setFlashcards(flashcards.filter(card => card.id !== id));
      if (currentIndex >= flashcards.length - 1) {
        setCurrentIndex(flashcards.length - 2);
      }
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const editCard = async (id, updatedCard) => {
    try {
      await fetch(`http://localhost:5000/api/flashcards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCard),
      });
      setFlashcards(flashcards.map(card => (card.id === id ? updatedCard : card)));
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  const handleBackToHome = () => {
    navigate('/'); // Navigate to the root (home) page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center mt-6">
      {flashcards.length > 0 ? (
        <>
          <Flashcard flashcard={flashcards[currentIndex]} />
          <div className="mt-2 flex space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
              onClick={prevCard}
              disabled={flashcards.length === 0}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
              onClick={nextCard}
              disabled={flashcards.length === 0}
            >
              Next
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
              onClick={() => deleteCard(flashcards[currentIndex].id)}
            >
              Delete
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600"
              onClick={() => editCard(flashcards[currentIndex].id, { question: 'New Question', answer: 'New Answer' })}
            >
              Edit
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
              onClick={handleBackToHome}
            >
              Back to dashboard
            </button>
          </div>
        </>
      ) : (
        <p>No flashcards available.</p>
      )}
    </div>
  );
};

export default FlashcardList;
