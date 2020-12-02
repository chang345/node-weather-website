console.log('client side JS');

const weatherForm = document.querySelector('form');
const locationInput = document.querySelector('input');
const forecastParagraph = document.querySelector('#forecast');
const locationParagraph = document.querySelector('#location');
const errorParagraph = document.querySelector('#error');

weatherForm.addEventListener('submit', (event) => {
  errorParagraph.textContent = '';
  locationParagraph.textContent = '';
  forecastParagraph.textContent = '';
  event.preventDefault();
  const address = locationInput.value;

  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errorParagraph.textContent = data.error;
      } else {
        locationParagraph.textContent = data.location;
        forecastParagraph.textContent = data.forecast;
      }
    });
  });
});
