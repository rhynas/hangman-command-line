// Load the NPM Package inquirer
var inquirer = require('inquirer')

// Load the word Constructor
var Word = require('./Word.js');

//Array with words by theme
var musicalInstruments = ['guitar', 'piano', 'violin', 'saxophone', 'trumpet', 'cello', 'accordion', 'clarinet', 'harmonica', 'trombone'];
var musicGenres = ['jazz', 'blues', 'country', 'reggae', 'electronic', 'alternative', 'classical', 'gospel', 'reggaeton', 'hardcore', 'Salsa'];
var olimpicSports = ['archery', 'badminton', 'basketball', 'boxing', 'cycling', 'football', 'diving', 'fencing', 'gymnastics', 'marathon', 'swimming', 'weightlifting', 'volleyball', 'triathlon', 'wrestling'];
var fruits = ['Banana', 'grapefruit', 'mandarin', 'watermelon', 'strawberry', 'cantaloupe', 'dragonfruit', 'coconut', 'cranberry', 'pineapple', 'pomegranite', 'papaya'];

//Global Variables
var wordToPlay = "";
var wordObject;
var guessCount = 0;
var maxGuesses = 6;

//Prompt to the user the themes options for selection
function selectTheme(){
    console.log('\n')
    console.log('***********************************')
    console.log('*** Welcome to Console Hangman ****')
    console.log('***********************************')
    console.log('\n')
    inquirer.prompt([
    {
        type: "list",
        name: "theme",
        message: "Please select a Theme: ",
        choices:["Musical Instruments", "Music Genres", "Olimpic Sports", "Fruits", ]
    },
    ]).then(function(data){
        //Assignethe word to play based on the selection from the user
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
        //Create a new word object
        wordObject = new Word(wordToPlay);
        console.log(wordToPlay);
        //We initialize the word with character '_'
        wordObject.init();
        console.log(wordObject.display());
        //call a function that ask the user for his guessed letter
        askLetter();

    });
}

function askLetter(){
    if((!wordObject.correctWord()) && (guessCount < maxGuesses)){    
        inquirer.prompt([
        {
            type: "input",
            name: "guess",
            message: "What letter do you guess? "
        },
        ]).then(function(data){
            var guessed = wordObject.updateLetter(data.guess.toLowerCase());
            if(!guessed) guessCount++;
            console.log(wordObject.display());

            askLetter();

        });//end then inquirer
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
   }
}

selectTheme();
