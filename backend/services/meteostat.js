import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.METEOSTAT_API_KEY;

export const getWeatherData = async (station, start, end) => {
    try {
        const url = `https://meteostat.p.rapidapi.com/stations/daily`;

        const response = await axios.get(url, {
            params: { station, start, end },
            headers: {
                'X-RapidAPI-Key': apiKey,             
                'X-RapidAPI-Host': 'meteostat.p.rapidapi.com' 
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}