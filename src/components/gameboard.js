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

  