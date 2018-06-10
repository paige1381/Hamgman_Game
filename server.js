const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));


const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O','P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let gameWords = ['RABBIT', 'BUNNY', 'CARROT', 'LETTUCE', 'BURROW', 'FLUFFY', 'FLOPPY', 'LITTER', 'PELLETS']
let currentWord = gameWords[Math.floor(Math.random() * (gameWords.length))].split("");
let guesses = 8;
let currentLetter = null;
let guessWord = null;
let correctLetters = [];

console.log(currentWord);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    alphabet: alphabet,
    currentWord: currentWord,
    guesses: 8,
    currentLetter: currentLetter,
    guessWord: guessWord,
    correctLetters: correctLetters
  });
  console.log(currentWord);
});

app.get('/:id', (req, res) => {
  guesses--;
  res.render('index.ejs', {
    alphabet: alphabet,
    currentWord: currentWord,
    guesses: guesses,
    currentLetter: alphabet[req.params.id],
    guessWord: guessWord,
    correctLetters: correctLetters
  });
});

app.listen(PORT, console.log('listening on port', PORT));
