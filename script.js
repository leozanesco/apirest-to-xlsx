const axios = require("axios");

const API_URL = 'https://restcountries.com/v3.1/all';

const getCountriesData = async () => {
    try {
        return await axios.get(API_URL)
    } catch (error) {
        console.error(error)
    }
}