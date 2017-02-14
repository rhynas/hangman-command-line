var Letter = require('./Letter.js');

function Word (word){
	this.word = word;
	this.letters = [];
	this.init = function(){
		for (var i=0; i < this.word.length; i++){
			var lett = new Letter(this.word[i]);
			this.letters.push(lett);
		}
	},
	this.display = function(){
		var str ="";
		for (var i = 0; i < this.letters.length; i++) {
			str = str + this.letters[i];
		}
		return str;
	},
	this.updateLetter = funtion(guess){
		//doesn't work with 2 equal letters
		// var index = this.word.indexOf(guess);
		// if(index > -1) this.letters[index].found = true;

		for (var i = 0; i < this.letters.length; i++) {
			if (this.letters[i].letter == guess){
				this.letters[i].found = true;
			}
		// }
	}


}
