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

var style = wb.createStyle({
    font: {
        color: '#4F4F4F',
        size: 16,
        bold: true,
    },
    alignment: {horizontal: 'center'},
});

const writeExcel = async () => {
    ws.cell(1, 1, 1, 4, true).string('Countries List').style(style)
    EXCEL_COLUMNS.forEach(({ value }, columnIndex) => ws.cell(2, columnIndex +1).string(value).style({font: {bold: true, color: '#808080', size: 12}}))

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