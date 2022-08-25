const axios = require("axios");
const xl = require('excel4node');

const API_URL = 'https://restcountries.com/v3.1/all';

const wb = new xl.Workbook();
const ws = wb.addWorksheet('Countries List');
const EXCEL_COLUMNS = [
    { key: 'name', value: 'Name'},
    { key: 'capital', value: 'Capital'},
    { key: 'area', value: 'Area'},
    { key: 'currency', value: 'Currencies'},
]


const getCountriesData = async () => {
    try {
        return await axios.get(API_URL)
    } catch (error) {
        console.error(error)
    }
}

