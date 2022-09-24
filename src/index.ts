console.log('Hello!')

// const parseBdagTxt = require('../parse_bdag_txt')
// import parseBdagTxt from 'helpers/parse_bdag_txt'

// parseBdagTxt()

// const fs = require('fs')
// const PDFParser = require('pdf2json')

// const pdfFilePath = './words.pdf'

// const pdfParser = new PDFParser()

// pdfParser.on('pdfParser_dataError', (errData) => console.error(errData.parserError))
// pdfParser.on('pdfParser_dataReady', (pdfData) => {
//   fs.writeFile('./bdag.json', JSON.stringify(pdfData))
// })

// pdfParser.loadPDF(pdfFilePath)

// fs.readFile(pdfFilePath, (err, pdfBuffer) => {
//   if (!err) {
//     pdfParser.parseBuffer(pdfBuffer)
//   }
// })

// const fs = require('fs')
// const { PdfReader } = require('pdfreader')

// fs.readFile('./bdag_4.pdf', (err, pdfBuffer) => {
//   // pdfBuffer contains the file content
//   new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
//     if (err) console.error('error:', err)
//     else if (!item) console.warn('end of buffer')
//     else if (item.text) console.log(item.text)
//   })
// })
