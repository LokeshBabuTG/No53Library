const express = require('express')
const app = express();

const handlebars = require('express-handlebars');

const books = require('./books');

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars({
		layoutsDir: __dirname + '/views/layouts',
		defaultLayout : __dirname +'/views/layouts/index.handlebars'
	})
);

app.use(express.static('public'));
app.use(express.static('images'));


 
app.get('/', function (req, res) {
  res.render('main', {
		isHomePage :  true
  });
});

app.get('/generic', function (req, res) {
  res.render('generic');
});

app.get('/contact', function (req, res) {
  res.render('contact');
});

app.get('/filterBooks', function (req, res) {
	var term = req.query.term;
	var filteredBooks = books.filterBooks(term);
	res.send(filteredBooks);
});

app.get('/searchBooks', function (req, res) {
	var query = req.query.query;
	var searchedBooks = books.searchBooks(query);
	res.render('searchBooks', searchedBooks);
});

app.get('/getBook', async function (req, res) {
	try {
		var bookName = req.query.bookName;
		var book = await books.getBook(bookName);
		res.render('searchBooks', {
			book: book
		});
	} catch (e) {
		console.log(error);
		res.write("error occured" + e);
		return next(error);
	}


});


app.listen(process.env.PORT || 3000, function(){
	console.log("Server Started");
});