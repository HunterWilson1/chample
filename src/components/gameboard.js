import React, { useState } from 'react';
import WordDisplay from './worddisplay';
import Keyboard from './keyboard';
import words from '../data/word';

const GameBoard = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);

  const startNewGame = () => {
    if (words.length === 0) {
      console.error('No words available');
      return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    const newWord = words[randomIndex].toUpperCase();
    setSelectedWord(newWord);
    setGuessedLetters([]);
    setRemainingAttempts(6);
  };

  const handleGuess = (letter) => {
    const uppercaseLetter = letter.toUpperCase();

    if (guessedLetters.includes(uppercaseLetter)) {
      // Letter already guessed
      return;
    }

    setGuessedLetters([...guessedLetters, uppercaseLetter]);

    if (!selectedWord.includes(uppercaseLetter)) {
      // Incorrect guess
      setRemainingAttempts(remainingAttempts - 1);
    }
  };

  const gameWon = () => {
    for (let letter of selectedWord) {
      if (!guessedLetters.includes(letter)) {
        return false;
      }
    }
    return true;
  };

  const gameLost = () => {
    return remainingAttempts === 0;
  };

  const gameEnded = gameWon() || gameLost();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Chample</h1>
        {gameEnded ? (
          <div>
            {gameWon() && (
              <h2 className="text-2xl mb-4">Congratulations! You won!</h2>
            )}
            {gameLost() && (
              <h2 className="text-2xl mb-4">Game Over! You lost!</h2>
            )}
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={startNewGame}
            >
              Start New Game
            </button>
          </div>
        ) : (
          <div>
            <WordDisplay selectedWord={selectedWord} guessedLetters={guessedLetters} />
            <Keyboard handleGuess={handleGuess} />
            <Feedback selectedWord={selectedWord} guessedLetters={guessedLetters} />
            <p className="text-xl mt-4">Remaining Attempts: {remainingAttempts}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
