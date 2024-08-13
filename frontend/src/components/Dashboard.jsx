import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast

const Dashboard = ({ theme }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [flashcards, setFlashcards] = useState([]); // State to hold flashcards
  const navigate = useNavigate(); 

  const handleAddFlashcard = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the flashcards state with the new flashcard
      setFlashcards([...flashcards, { question, answer }]);
      setQuestion('');
      setAnswer('');
      toast.success('Flashcard added successfully'); // Show success toast
    } catch (error) {
      console.error('Error adding flashcard:', error);
      toast.error('Failed to add flashcard'); // Show error toast
    }
  };

  const handleNavigateToFlashcards = () => {
    navigate('/flashcards');
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg mt-10 transition-all duration-300 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800 text-white'}`}>
      <ToastContainer /> {/* Include ToastContainer */}
      <h2 className={`text-3xl font-bold mb-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Admin Dashboard</h2>
      <div className="mb-6">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter Question"
          className={`mb-4 p-3 border rounded-lg w-full transition duration-300 ${theme === 'light' ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700 text-white'}`}
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter Answer"
          className={`mb-4 p-3 border rounded-lg w-full transition duration-300 ${theme === 'light' ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700 text-white'}`}
        />
      </div>
      <button
        onClick={handleAddFlashcard}
        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105"
      >
        Add Flashcard
      </button>

      {/* Button to navigate to FlashcardList */}
      <button
        onClick={handleNavigateToFlashcards}
        className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
      >
        Go to Flashcards
      </button>

      {/* Display the added flashcards */}
      <div className="mt-8">
        <h3 className={`text-2xl font-semibold mb-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Flashcards:</h3>
        <ul className="list-disc pl-5">
          {flashcards.length > 0 ? (
            flashcards.map((flashcard, index) => (
              <li key={index} className={`mb-3 p-4 rounded-lg transition duration-300 ${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white'}`}>
                <strong className="block">Q: {flashcard.question}</strong>
                <strong className="block">A: {flashcard.answer}</strong>
              </li>
            ))
          ) : (
            <li className={`mb-3 ${theme === 'light' ? 'text-black' : 'text-white'}`}>No flashcards added yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
