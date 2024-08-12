import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div className="flip-card-container">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div
          className="front"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ width: '300px', height: '200px', background: '#d7fbda', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
        >
          <h1>This is the front card</h1>
        </div>

        <div
          className="back"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ width: '300px', height: '200px', background: '#fbd7f8', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
        >
          <h1>This is the back card</h1>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default FlipCard;