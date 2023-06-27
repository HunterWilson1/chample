import React, { useState, useEffect } from 'react';
import WordDisplay from './worddisplay';
import Keyboard from './keyboard';
import words from '../data/word';
import Feedback from './feedback';
import Confetti from 'react-confetti';

const GameBoard = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    startNewGame(); // Start a new game when the component mounts
  }, []);

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
    setIsGameWon(false);
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

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.1,
    duration: 2000,
    delay: 0,
    colors: ['#ffffff'],
  };

  useEffect(() => {
    if (gameWon()) {
      setIsGameWon(true);
    }
  }, [selectedWord, guessedLetters]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 pb-8">Chample</h1>
        <div>
          <h2 className="text-2xl mb-4">How It Works:</h2>
          <p className="text-lg mb-8">
            Welcome to Chample! The goal of the game is to guess the hidden League of legend champion by selecting letters from the on-screen keyboard.
            You have 6 attempts to guess the word correctly. Each incorrect guess will reduce the remaining attempts by 1.
            If you guess all the letters of the word correctly within the given attempts, you win the game!
            But be careful, if you run out of attempts before guessing the word, you lose the game.
          </p>
        </div>
        {gameEnded ? (
          <div>
            {gameWon() && (
              <>
                <h2 className="text-2xl mb-4">Congratulations! You won!</h2>
                <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                  gravity={0.1}
                  recycle={false}
                  numberOfPieces={200}
                  tweenDuration={2000}
                  confettiSource={{ x: window.innerWidth / 2, y: 0 }}
                  initialVelocityX={5}
                  initialVelocityY={20}
                  colors={['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#8B00FF']}
                  shapes={['star']}
                />
              </>
            )}
            {gameLost() && (
              <h2 className="text-2xl mb-4">
                Game Over! You lost!
                <br />
                The champion was: {selectedWord}
              </h2>
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
