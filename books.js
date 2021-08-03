const path = require('path');
const fs = require('fs');
var _ = require('lodash');
var _c = require('lodash-contrib');

var booksDir = __dirname + '\\public\\assets\\data\\books';

function initialise() {
	if(_) {
		_ = require('lodash');
	}
	if(_c) {
		_c = require('lodash-contrib');
	}
}


module.exports.filterBooks = function (term) {
	var _ = require('lodash');
	var _c = require('lodash-contrib');
	initialise();
	
	
	var books = {};
	
    fs.readdirSync(booksDir)
	.filter(file => file.endsWith(".json"))
	.forEach(function (file) {
		books[file] = 
			JSON.parse(
				fs.readFileSync(booksDir + '\\' + file, 'UTF-8')
			);
	});
	
	books = _.chain(books).flatMap(booksCollections => booksCollections).filter(book => _c.strContains(_c.lowerCase(book["BOOK NAME"]), term)).slice(0, 10).value()
	
	
	return books;
};

module.exports.getBook = function (bookName) {
	var _ = require('lodash');
	var _c = require('lodash-contrib');
	initialise();
	
	
	var books = {};
	
    fs.readdirSync(booksDir)
	.filter(file => file.endsWith(".json"))
	.forEach(function (file) {
		books[file] = 
			JSON.parse(
				fs.readFileSync(booksDir + '\\' + file, 'UTF-8')
			);
	});
	
	var book = 
	_.chain(books)
	.flatMap(booksCollections => booksCollections)
	.filter(book => _c.strContains(book["BOOK NAME"], bookName))
	.slice(0, 1)
	.head()
	.value()
	
	
	return book;
};
