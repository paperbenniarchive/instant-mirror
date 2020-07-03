require('dotenv').config()
const rp = require('request-promise')
const $ = require('cheerio')

const { download } = require('./utils/download')

const base = 'http://instantos.surge.sh/'

rp(base)
  .then(function (html) {
    $('a', html).each((i, elm) => {
      const attribute = elm.attribs.href
      if (attribute.startsWith('.') || attribute.startsWith('http')) return
      download(base + attribute, attribute, () => {
        console.log('a')
      })
    })
  })
  .catch(function (err) {
    console.error(err)
  })
