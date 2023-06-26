import React from 'react';

const WordDisplay = ({ selectedWord, guessedLetters }) => {
  const wordToShow = selectedWord
    .split('')
    .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');

  return (
    <div className="word-display pt-8">
      <h2 className="text-4xl tracking-widest">{wordToShow}</h2>
    </div>
  );
};

export default WordDisplay;
