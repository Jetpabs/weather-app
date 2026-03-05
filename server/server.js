const express = require("express");
const cors = require("cors");
const { getWeatherData } = require('./api');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200,
}));

app.get('/weather', async (req, res) => {
    const loc = req.query.loc;
    const pastDate = req.query.pastDate;
    const futureDate = req.query.futureDate;

    try {
        const data = await getWeatherData(loc, pastDate, futureDate);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});