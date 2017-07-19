const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//make sure there's no semi-colon after the registerPartials line, or it breaks
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => { if (err) {
	console.log('Unable to append to server.log');
	}
	});
	next();
});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		currentYear: new Date().getFullYear(),
		welcomeText: 'Welcome to this site!'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
	   error: 'Oops!  Wrong page.'
	});
});

//app.listen(3000);
app.listen(3000, () => {
	console.log('Server is up on port 3000');
});