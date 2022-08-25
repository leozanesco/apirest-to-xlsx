const axios = require("axios");
const xl = require('excel4node');

const API_URL = 'https://restcountries.com/v3.1/all';
const FILENAME = 'Excel.xlsx';

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

const writeExcel = async () => {
    ws.cell(1, 1, 1, 4, true).string('Countries List')
    EXCEL_COLUMNS.forEach(({ value }, columnIndex) => ws.cell(2, columnIndex +1).string(value))

    const countriesData = await getCountriesData();
    countriesData.data.forEach((element, elementIndex) => {
        const row = {
            name: element.name.common,
            capital: element.capital ?? '-',
            area: element.area ?? '-',
            currency: element.currencies ? Object.keys(element.currencies).join(",") : '-',
        };

        EXCEL_COLUMNS.forEach(({ key }, columnIndex) => {
            if (typeof row[key] === 'number'){
                ws.cell(elementIndex + 3, columnIndex + 1).number(row[key] ? row[key] : 'N/A');
            } else{
                ws.cell(elementIndex + 3, columnIndex + 1).string(row[key] ? row[key] : 'N/A');
            }

    });

    wb.write(FILENAME);
})};

writeExcel();