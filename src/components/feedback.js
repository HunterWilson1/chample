import React from 'react';

const Feedback = ({ selectedWord, guessedLetters }) => {
  const matchedLetters = guessedLetters.filter((letter) => selectedWord.includes(letter));
  const incorrectGuesses = guessedLetters.filter((letter) => !selectedWord.includes(letter));

  return (
    <div className="feedback pt-8">
      <div className="row">
        <h3>Correct Guesses:</h3>
        <div className="letter-row">
          {matchedLetters.map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </div>
      </div>
      <div className="row">
        <h3>Incorrect Guesses:</h3>
        <div className="letter-row">
          {incorrectGuesses.map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
