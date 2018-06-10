const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));


const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O','P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let gameWords = ['RABBIT', 'BUNNY', 'CARROT', 'LETTUCE', 'BURROW', 'FLUFFY', 'FLOPPY', 'LITTER', 'PELLETS'];
let currentWord = gameWords[Math.floor(Math.random() * (gameWords.length))].split("");
let guesses = 8;
let currentLetter = null;
let guessWord = null;
let correctLetters = [];
let allLetters = [];

console.log(currentWord);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    alphabet: alphabet,
    gameWords: gameWords,
    currentWord: currentWord,
    guesses: 8,
    currentLetter: null,
    guessWord: guessWord,
    correctLetters: [],
    allLetters: []
  });
  console.log(currentWord);
});

app.get('/:id', (req, res) => {
  currentLetter = alphabet[req.params.id];
  if (currentWord.indexOf(currentLetter) > -1) {
    correctLetters.push(currentLetter);
  };
  correctLetters = [...new Set(correctLetters)];
  guesses--;
  console.log(guesses);
  res.render('index.ejs', {
    alphabet: alphabet,
    gameWords: gameWords,
    currentWord: currentWord,
    guesses: guesses,
    currentLetter: currentLetter,
    guessWord: guessWord,
    correctLetters: correctLetters,
    allLetters: allLetters.push(currentLetter),
  });
  console.log(guesses);
  console.log('currentLetter:', currentLetter);
  console.log('allLetters:', allLetters);
});

app.listen(PORT, console.log('listening on port', PORT));
