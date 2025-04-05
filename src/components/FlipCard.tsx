import { useState } from 'react';

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

const FlipCard = ({ frontContent, backContent, className = '' }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative w-64 h-96 perspective-1000 ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ease-in-out transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 flex items-center justify-center transform-gpu">
          {frontContent}
        </div>
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 flex items-center justify-center rotate-y-180 transform-gpu">
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard; 