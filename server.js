const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// const url = require('url');

app.use(express.static('public'));


const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O','P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let gameWords = ['RABBIT', 'BUNNY', 'CARROT', 'LETTUCE', 'BURROW', 'FLUFFY', 'FLOPPY', 'LITTER', 'PELLETS'];
let currentWord = gameWords[Math.floor(Math.random() * (gameWords.length))].split("");
let currentLetter = null;
let guesses = 8;
let guessWord = null;
let correctLetters = [];
let allLetters = [];
let link = null;


app.get('/', (req, res) => {
  gameWords = ['RABBIT', 'BUNNY', 'CARROT', 'LETTUCE', 'BURROW', 'FLUFFY', 'FLOPPY', 'LITTER', 'PELLETS'];
  currentWord = gameWords[Math.floor(Math.random() * (gameWords.length))].split("");
  currentLetter = null;
  guesses = 8;
  guessWord = null;
  correctLetters = [];
  allLetters = [];
  link = null;
   res.render('index.ejs', {
    alphabet: alphabet,
    gameWords: gameWords,
    currentWord: currentWord,
    guesses: guesses,
    currentLetter: currentLetter,
    guessWord: guessWord,
    correctLetters: correctLetters,
    allLetters: allLetters,
    link: link
  });
});


app.get('/newRound', (req, res) => {
  let index = gameWords.indexOf(currentWord.join(""));
  gameWords.splice(index, 1);
  currentWord = gameWords[Math.floor(Math.random() * (gameWords.length))].split("");
  guesses = 8;
  currentLetter = [];
  correctLetters = [];
  allLetters = [];
  link = null;
  res.render('index.ejs', {
    alphabet: alphabet,
    gameWords: gameWords,
    currentWord: currentWord,
    guesses: guesses,
    currentLetter: currentLetter,
    guessWord: guessWord,
    correctLetters: correctLetters,
    allLetters: allLetters,
    link: link
  });
});


app.get('/share', (req, res) => {
  link = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('index.ejs', {
    alphabet: alphabet,
    gameWords: gameWords,
    currentWord: currentWord,
    guesses: guesses,
    currentLetter: currentLetter,
    guessWord: guessWord,
    correctLetters: correctLetters,
    allLetters: allLetters,
    link: link
  });
});


app.get('/undo', (req, res) => {
  guesses++;
  let undoLetter = allLetters.pop();
  let index = correctLetters.indexOf(undoLetter);
  if (index >= 0) {
    correctLetters.splice(index, 1);
  }
  currentLetter = allLetters[allLetters.length - 1];
  link = null;
  res.render('index.ejs', {
    alphabet: alphabet,
    gameWords: gameWords,
    currentWord: currentWord,
    guesses: guesses,
    currentLetter: currentLetter,
    guessWord: guessWord,
    correctLetters: correctLetters,
    allLetters: allLetters,
    link: link
  });
});


app.get('/:id', (req, res) => {
  currentLetter = alphabet[req.params.id];
  if (currentWord.indexOf(currentLetter) > -1) {
    correctLetters.push(currentLetter);
  };
  correctLetters = [...new Set(correctLetters)];
  allLetters.push(currentLetter);
  guesses -= 1;
  link = null;
  res.render('index.ejs', {
    alphabet: alphabet,
    gameWords: gameWords,
    currentWord: currentWord,
    guesses: guesses,
    currentLetter: currentLetter,
    guessWord: guessWord,
    correctLetters: correctLetters,
    allLetters: allLetters,
    link: link
  });
});



app.listen(PORT, console.log('listening on port', PORT));
