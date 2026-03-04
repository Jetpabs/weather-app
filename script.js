const button = document.getElementById('fetch-button');
const cityInput = document.getElementById('loc-input');

const apiKey = ""

// Get current date and calculate past and future dates
let currentDate = new Date();

let pastDate = new Date();
pastDate.setDate(currentDate.getDate() - 1);

let futureDate = new Date();
futureDate.setDate(currentDate.getDate() + 1);

function formatLocalISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

currentDate = formatLocalISO(currentDate);
pastDate = formatLocalISO(pastDate);
futureDate = formatLocalISO(futureDate);


const fetchWeather = async () => {
    try {
        const loc = cityInput.value.trim();
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}/${pastDate}/${futureDate}?key=${apiKey}`;
        const res = await fetch (apiUrl);

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        // Log entire data for debugging
        console.log(data);

        // Function to update weather section based on day index
        function updateWeatherSection(containerId, dayIndex) {
            const container = document.getElementById(containerId);
            const day = data.days[dayIndex];

            const formattedDate = new Date(day.datetime).toLocaleDateString("en-US", {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });

            // Convert Fahrenheit to Celsius and format to 1 decimal place
            const toCelsius = f => ((f - 32) * 5 / 9).toFixed(1);

            // Input weather data into the container elements
            const mapping = {
                '.loc': data.resolvedAddress,
                '.date': formattedDate,
                '.temp': `${toCelsius(day.temp)}°C`,
                '.cond': `${day.conditions}`,
                '.wind': `Wind Speed: ${day.windspeed} km/h`,
                '.precip': `Precipitation Probability: ${day.precipprob}%`
            };

            // Update the weather icon
            const iconImg = container.querySelector('.icon');
            if (iconImg) {
            iconImg.src = `images/${day.icon}.svg`;
            iconImg.alt = day.icon;
            }

            Object.entries(mapping).forEach(([selector, value]) => {
                container.querySelector(selector).textContent = value;
            });
        }

        // Update past, present, and future weather sections
        updateWeatherSection('weather-past', 0);
        updateWeatherSection('weather-present', 1);
        updateWeatherSection('weather-future', 2);

        // Show the weather container
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.classList.remove('hidden');


    } catch (err) {
        console.error(err);
    }
}

// Add event listeners for button click and Enter key press
button.addEventListener("click", fetchWeather);

cityInput.addEventListener("keypress", event => {
  if (event.key === "Enter") {
    fetchWeather();
  }
});