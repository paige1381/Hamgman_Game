const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));


const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O','P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let gameWords = ['RABBIT', 'BUNNY', 'CARROT', 'LETTUCE', 'BURROW', 'FLUFFY', 'FLOPPY', 'LITTER', 'PELLETS'];
let currentWord = gameWords[Math.floor(Math.random() * (gameWords.length))].split("");
let currentLetter = null;
let guesses = 8;
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
  console.log('--- new game ---');
  console.log('gameWords:', gameWords);
  console.log('currentWord:', currentWord);
  console.log('guesses:', guesses);
  console.log('currentLetter:', currentLetter);
  console.log('correctLetters:', correctLetters);
  console.log('allLetters:', allLetters);
});


app.get('/newRound', (req, res) => {
  let index = gameWords.indexOf(currentWord.join(""));
  gameWords.splice(index, 1);
  currentWord = gameWords[Math.floor(Math.random() * (gameWords.length))].split("");
  guesses = 8;
  currentLetter = [];
  correctLetters = [];
  allLetters = [];
  res.render('index.ejs', {
    alphabet: alphabet,
    gameWords: gameWords,
    currentWord: currentWord,
    guesses: guesses,
    currentLetter: currentLetter,
    guessWord: guessWord,
    correctLetters: correctLetters,
    allLetters: allLetters
  });
  console.log('--- new round ---');
  console.log('gameWords:', gameWords);
  console.log('currentWord:', currentWord);
  console.log('guesses:', guesses);
  console.log('currentLetter:', currentLetter);
  console.log('correctLetters:', correctLetters);
  console.log('allLetters:', allLetters);
});



app.get('/:id', (req, res) => {
  currentLetter = alphabet[req.params.id];
  if (currentWord.indexOf(currentLetter) > -1) {
    correctLetters.push(currentLetter);
  };
  correctLetters = [...new Set(correctLetters)];
  guesses--;
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
  console.log('--- new turn ---');
  console.log('gameWords:', gameWords);
  console.log('currentWord:', currentWord);
  console.log('guesses:', guesses);
  console.log('currentLetter:', currentLetter);
  console.log('correctLetters:', correctLetters);
  console.log('allLetters:', allLetters);
});









app.listen(PORT, console.log('listening on port', PORT));
