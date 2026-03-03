const button = document.getElementById('fetch-button');
const cityInput = document.getElementById('city-input');

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
        console.log(data);

        function updateWeatherSection(containerId, dayIndex) {
            const container = document.getElementById(containerId);
            const day = data.days[dayIndex];

            const mapping = {
                '.loc': data.resolvedAddress,
                '.date': day.datetime,
                '.temp': `Temperature: ${day.temp}°C`,
                '.icon': `Icon: ${day.icon}`,
                '.cond': `Conditions: ${day.conditions}`,
                '.wind': `Wind Speed: ${day.windspeed} km/h`,
                '.precip': `Precipitation Probability: ${day.precipprob}%`
            };

            Object.entries(mapping).forEach(([selector, value]) => {
                container.querySelector(selector).textContent = value;
            });
        }
        updateWeatherSection('weather-past', 0);
        updateWeatherSection('weather-present', 1);
        updateWeatherSection('weather-future', 2);

        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.classList.remove('hidden');


    } catch (err) {
        console.error(err);
    }
}

button.addEventListener("click", fetchWeather);

cityInput.addEventListener("keypress", event => {
  if (event.key === "Enter") {
    fetchWeather();
  }
});