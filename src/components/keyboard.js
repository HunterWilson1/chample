import React from 'react';

const Keyboard = ({ handleGuess }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <div className="flex flex-wrap gap-2 pt-11 justify-center">
      {alphabet.split('').map((letter, index) => (
        <button
          key={index}
          onClick={() => handleGuess(letter)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;