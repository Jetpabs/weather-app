async function getWeatherData(loc, pastDate, futureDate) {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}/${pastDate}/${futureDate}?key=${apiKey}`;

    const response = await fetch(apiUrl);

    

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data;
}

module.exports = { getWeatherData };