const fs = require('fs');
var _ = require('lodash');
var _c = require('lodash-contrib');

var booksDir = __dirname + '/public/assets/data/books';


var books = {};

initialise();

function initialise() {
	if(_) {
		_ = require('lodash');
	}
	if(_c) {
		_c = require('lodash-contrib');
	}
	
	
	books = fs.readdirSync(booksDir)
		.filter(file => file.endsWith(".json"))
		.reduce(function(bks, file){
				bks[file] = JSON.parse( fs.readFileSync(booksDir + '/' + file, 'UTF-8'));
				return bks;
		}, {});
}


module.exports.filterBooks = function (term) {
	
	return _.chain(books)
	.flatMap(booksCollections => booksCollections)
	.filter(book => 
				_c.strContains(
					_c.lowerCase(book["BOOK NAME"]), 
					_c.lowerCase(term)
				)
			)
	.slice(0, 10)
	.value()
	

};

module.exports.getBook = function (bookName) {
	
	return _.chain(books)
	.flatMap(booksCollections => booksCollections)
	.filter(book => _c.strContains(book["BOOK NAME"], bookName))
	.slice(0, 1)
	.head()
	.value();

};
