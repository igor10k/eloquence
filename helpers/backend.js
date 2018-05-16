/* global XMLHttpRequest */
import cheerio from 'cheerio-without-node-native'

const API_URL = 'https://www.multitran.ru/c/m.exe'

function parseResponse (response) {
  const $ = cheerio.load(response)

  const tables = $('#translation ~ table')
  const rows = $('> tr', tables.eq(0))

  const result = []
  let current = -1

  rows.each(function (i, row) {
    const cols = $(row).children()

    if (cols.length === 1) {
      current++
      result.push({
        spelling: cols.eq(0).find('a').first().text().trim(),
        class: cols.eq(0).find('em').first().text().trim(),
        dictionaries: []
      })
    } else {
      result[current].dictionaries.push({
        name: cols.eq(0).text().trim(),
        translations: cols.eq(1).text().trim()
      })
    }
  })

  return result
}

export function fetchTranslationsData (word, lang) {
  const languagesMap = {
    en: 1,
    de: 3,
    fr: 4,
    es: 5,
    it: 23
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', function () {
      resolve(parseResponse(xhr.responseText))
    })

    xhr.addEventListener('error', function () {
      reject(new Error(xhr.responseText))
    })

    xhr.open('GET', `${API_URL}?s=${word}&l1=${languagesMap[lang]}`)
    xhr.send()
  })
}
