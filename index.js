const xlsx = require('node-xlsx')
// const ExcelJS = require('exceljs');

const workSheetsFromFile = xlsx.parse(`./prod_report_2021.xlsx`);
console.log(workSheetsFromFile[0].data)

// const workbook = new ExcelJS.Workbook();
// workbook.xlsx.readFile('./prod_report_2021.xlsx').then((res) => {
//     console.log(res._worksheets[1]._columns)
// })
