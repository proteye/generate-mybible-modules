const fs = require('fs')
const readline = require('readline')

const bdagTxtPath = './bdag_4.txt'
const bdagJsonPath = './bdag_4.json'

const firstLineIndex = 8212
const wordsCount = 8138
const newPageSign = 'A'
const indeclRegex = /(.+)(⟦.+⟧)(.+)/i
const pageNumberRegex = /^[0-9]+$/i
const rtl = '‫'
const ltr = '‬'

const parseBdagTxt = async () => {
  //   fs.readFile(bdagTxtPath, (err, data) => {
  //     if (!err) {
  //       console.log('data', data.length)
  //     }
  //   })

  const fileStream = fs.createReadStream(bdagTxtPath)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let index = -1
  let count = 0
  let topic = ''
  let transcription = ''
  let description = ''
  let items = [] // [{ topic: '', transcription: '', description: '' }]

  for await (const line of rl) {
    index += 1

    if (index < firstLineIndex) {
      continue
    }

    const trimmedLine = line.trim().replaceAll(rtl, '').replaceAll(ltr, '')
    const regexResult = indeclRegex.exec(trimmedLine)

    if (count === wordsCount && line.includes(newPageSign)) {
      items.push({ topic, transcription, description })
      break
    }

    if (regexResult && regexResult.length > 3 && topic !== regexResult[1]) {
      count += 1
      if (topic !== '') {
        items.push({ topic, transcription, description })
      }
      topic = regexResult && regexResult[1] ? regexResult[1].trim() : ''
      transcription = regexResult && regexResult[2] ? regexResult[2].trim() : ''
      description = regexResult && regexResult[3] ? regexResult[3].trim() : ''
      continue
    }

    if (trimmedLine && !line.includes(newPageSign) && !pageNumberRegex.test(trimmedLine)) {
      description += ' ' + trimmedLine
    }
  }

  fs.writeFileSync(bdagJsonPath, JSON.stringify(items))

  return true
}

// module.exports = parseBdagTxt
export default parseBdagTxt
