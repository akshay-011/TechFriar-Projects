"use server"
import axios from "axios";

const getWeatherData = async (city:string) => {
    const API_KEY = "7021c06365885aeff7a5fbd2bf7eccd9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&callback=test&appid=${API_KEY}`;
    const response = await axios.get(url);
    console.log(response)
}

export default getWeatherData
