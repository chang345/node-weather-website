const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b9e8b84a24e5399d679b6227a86af9bb&%20query=${lat},${long}&units=f`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      const { temperature: temp, precip, feelslike, humidity } = body.current;
      const desc = body.current.weather_descriptions[0];
      callback(
        undefined,
        `${desc}. It is currently ${temp} degrees out. It feels like ${feelslike} degrees out. There is a ${precip}% chance of rain and a ${humidity}% of humidity.`
      );
    }
  });
};

module.exports = { forecast };
