const express = require('express')
const app = express()

const handlebars = require('express-handlebars');

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
 
app.listen(3000, function(){
	console.log("Server Started");
})