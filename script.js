document.getElementById('getWeatherButton').addEventListener('click', fetchWeather);

function fetchWeather() {
    // Get the user's input from the text box
    const location = document.getElementById('locationInput').value.trim();
    
    // If no location is entered, use the user's IP-based location
    const query = location ? location : 'auto:ip';
    
    const apiKey = 'd87519acda504093abf153619242908';  // Replace with your weather API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no`;

    // Fetch weather data from the API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Display the fetched weather data
            document.querySelector('.location-name').textContent = data.location.name + ', ' + data.location.region + ', ' + data.location.country;
            document.querySelector('.temperature').textContent = `${data.current.temp_c}°C`;
            document.querySelector('.description').textContent = data.current.condition.text;
            document.querySelector('.humidity').textContent = `Humidity: ${data.current.humidity}%`;
            document.querySelector('.wind-speed').textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Could not retrieve weather data. Please try again later.');
        });
}
