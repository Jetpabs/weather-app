const weatherPast = document.getElementById('weather-past');

const apiKey = " "
const loc = "las pinas"
const date1 = "2026-02-23"
const date2 = "2026-02-25"

const apiUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + loc + "/" + date1 +  "/" + date2 + "?key=" + apiKey

fetch (apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        
    })

