/* global XMLHttpRequest */
import cheerio from 'cheerio-without-node-native'

const API_URL = 'https://www.multitran.ru/c/m.exe'

function buildTranslations ($, rows) {
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

  return {
    translations: result
  }
}

function buildCorrections ($, row) {
  return {
    corrections: $('td', row).eq(1).text().trim().split('; ')
  }
}

function parseResponse (response) {
  const $ = cheerio.load(response)

  const table = $('a[name="phrases"]').prev()
  const rows = $('> tr', table)

  if (rows.length === 1) {
    return buildCorrections($, rows)
  } else {
    return buildTranslations($, rows)
  }
}

let xhr

export function fetchTranslationsData (word, lang) {
  const languagesMap = {
    en: 1,
    de: 3,
    fr: 4,
    es: 5,
    it: 23
  }

  if (xhr) {
    xhr.abort()
  }

  return new Promise((resolve, reject) => {
    xhr = new XMLHttpRequest()
    xhr.addEventListener('load', function () {
      resolve(parseResponse(xhr.responseText))
      xhr = null
    })

    xhr.addEventListener('error', function () {
      reject(new Error(xhr.responseText))
      xhr = null
    })

    xhr.open('GET', `${API_URL}?s=${word}&l1=${languagesMap[lang]}`)
    xhr.send()
  })
}
