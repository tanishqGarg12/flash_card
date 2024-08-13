import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const Flashcard = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  if (!flashcard) {
    return <p>No flashcard data available.</p>;
  }

  return (
    <div className="flex items-center justify-center  p-4">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        {/* Front Card */}
        <div
          className="w-96 h-64 bg-gradient-to-r from-green-300 to-green-500 flex items-center justify-center rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center">{flashcard.question}</h1>
        </div>

        {/* Back Card */}
        <div
          className="w-96 h-64 bg-gradient-to-r from-pink-300 to-pink-500 flex items-center justify-center rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center">{flashcard.answer}</h1>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Flashcard;