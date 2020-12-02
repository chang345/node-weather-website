const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Sang Chang',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Sang Chang',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'How can I help you?',
    title: 'Help',
    name: 'Sang Chang',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.',
    });
  }

  const location = req.query.address;
  geocode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('not_found', {
    title: '404',
    message: 'Help article not found',
    name: 'Sang Chang',
  });
});

app.get('*', (req, res) => {
  res.render('not_found', {
    title: '404',
    message: 'Page not found',
    name: 'Sang Chang',
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
