var Letter = require('./Letter.js');

function Word(word){
    this.word = word;
    this.letters = [];
    this.init = function(){
        for (var i=0; i< this.word.length; i++){
            var lett = new Letter(this.word[i]);
            this.letters.push(lett);
        }
    },
    this.display = function(){
        var str = "";
        for (var i=0; i < this.letters.length; i++){
            str = str + " " + this.letters[i].display();
        }

        return str;
    },
    this.updateLetter = function(guess){
        //one way
        var guessed = false;
        for (var i=0; i<this.letters.length; i++){
            if (this.letters[i].letter == guess){
            	this.letters[i].found = true;
            	guessed = true;	
            }
        }
        return guessed;
		// for (var i = 0; i < this.letters.length; i++) {
		// 		if (this.letters[i].letter == guess){
		// 			this.letters[i].found = true;
		// 		}
		// 	}
		
    }
    this.correctWord = function(){
    	for (var i = 0; i < this.letters.length; i++) {
    		if (this.letters[i].found === false) {
    			return false;
    		}
    	}
    	return true;
    }
}

module.exports = Word;
