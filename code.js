document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('locationForm');
    const locationInput = document.getElementById('locationInput');
    const weatherResult = document.getElementById('weatherResult');
    const loading = document.getElementById('loading');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      weatherResult.innerHTML = '';
      loading.style.display = 'block';
  
      const location = locationInput.value;
      const unit = document.querySelector('input[name="unit"]:checked').value;
  
      try {
        const weatherData = await getWeatherData(location, unit);
        displayWeather(weatherData, unit);
      } catch (error) {
        weatherResult.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
      } finally {
        loading.style.display = 'none';
      }
    });
  
    async function getWeatherData(location, unit) {
      const apiKey = 'YOUR_VISUAL_CROSSING_API_KEY';
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${apiKey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    }
  
    function displayWeather(data, unit) {
      const temperature = unit === 'metric' ? `${data.currentConditions.temp} °C` : `${data.currentConditions.temp} °F`;
      const conditions = data.currentConditions.conditions;
      weatherResult.innerHTML = `
        <h2>Weather in ${data.address}</h2>
        <p>Temperature: ${temperature}</p>
        <p>Conditions: ${conditions}</p>
      `;
  
      updateBackground(conditions);
    }
  
    function updateBackground(conditions) {
      let backgroundColor;
      if (conditions.toLowerCase().includes('sunny')) {
        backgroundColor = '#f7b733';
      } else if (conditions.toLowerCase().includes('rain')) {
        backgroundColor = '#2c3e50';
      } else if (conditions.toLowerCase().includes('cloud')) {
        backgroundColor = '#bdc3c7';
      } else {
        backgroundColor = '#ecf0f1';
      }
      document.body.style.backgroundColor = backgroundColor;
    }
  });
  