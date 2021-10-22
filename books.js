const fs = require('fs');
var _ = require('lodash');
var _c = require('lodash-contrib');
const axios = require('axios');

var booksDir = __dirname + '/public/assets/data/books';
var googleScriptsUrl = "https://script.google.com/macros/s/AKfycbxsiPYOsGJDdQSUx35-xGgG560XPAw2OUytLfaUkjFo9ZrC-I9e3GCDscPCPv8dPKev9g/exec?method=";


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
	.value();
	

};

module.exports.getBook = async function (bookName) {

	try {
		const response = await axios.get(googleScriptsUrl + 'getBook&bookName=' + bookName);
		return response.data;
	} catch (e) {
		console.log(error);
	}

};
