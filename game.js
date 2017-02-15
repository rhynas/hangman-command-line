// Load the NPM Package inquirer
var inquirer = require('inquirer')

// Load the word Constructor
var Word = require('./Word.js');

//Array with words by theme
var musicalInstruments = ['guitar', 'piano', 'violin', 'saxophone', 'trumpet', 'cello', 'accordion', 'clarinet', 'harmonica', 'trombone'];
var musicGenres = ['jazz', 'blues', 'country', 'reggae', 'electronic', 'alternative', 'classical', 'gospel', 'reggaeton', 'hardcore', 'Salsa'];
var olimpicSports = ['archery', 'badminton', 'basketball', 'boxing', 'cycling', 'football', 'diving', 'fencing', 'gymnastics', 'marathon', 'swimming', 'weightlifting', 'volleyball', 'triathlon', 'wrestling'];
var fruits = ['Banana', 'grapefruit', 'mandarin', 'watermelon', 'strawberry', 'cantaloupe', 'dragonfruit', 'coconut', 'cranberry', 'pineapple', 'pomegranite', 'papaya'];

var wordToPlay = "";
var wordObject;
var guessCount = 0;
var maxGuesses = 6;

//Prompt to the user the themes options for selection
function selectTheme(){
    inquirer.prompt([
    {
    type: "list",
    name: "theme",
    message: "Select a Theme: ",
     // choices: ["Bulbasaur", "Squirtle", "Charmander"],
   // new inquirer.Separator()
   choices:["Musical Instruments", "Music Genres", 
            "Olimpic Sports", "Fruits", 
            ]
    },
    ]).then(function(data){
        console.log(data.theme);
        switch(data.theme) {
            case "Musical Instruments":
                wordToPlay = musicalInstruments[Math.floor(Math.random()*musicalInstruments.length)];
                break;
            case "Music Genres":
                wordToPlay = musicGenres[Math.floor(Math.random()*musicGenres.length)];
                 break;
            case "Olimpic Sports":
                wordToPlay = olimpicSports[Math.floor(Math.random()*olimpicSports.length)];
                 break;
            default:
                wordToPlay = fruits[Math.floor(Math.random()*fruits.length)];
                 break;
        }

        wordObject = new Word(wordToPlay);
        console.log(wordToPlay);
        wordObject.init();
        console.log(wordObject.display());
        askLetter();

    });
}

function askLetter(){
    inquirer.prompt([
    {
    type: "input",
    name: "guess",
    message: "What letter do you guess? If you are done then say no."},
    ]).then(function(data){
        // if (data.guess != 'no') {
        if(!wordObject.correctWord()){
            wordObject.updateLetter(data.guess.toLowerCase());

            console.log(wordObject.display());

            askLetter();
        }
        else{

            inquirer.prompt([
            {
                type: "list",
                name: "playAgain",
                message: "Would you like to Play again? ",
                choices:["yes", "no"]
            },
            ]).then(function(play){
                if (play.playAgain == "yes") selectTheme();
            });
            // guessCount++;
            // if(guessCount == maxGuesses){
            //     console.log('You run out of Guesses');
            // }
        }
    });
}

selectTheme();
