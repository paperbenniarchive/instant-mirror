require('dotenv').config()
const rp = require('request-promise')
const $ = require('cheerio')

const { download } = require('./utils/download')

const base = 'http://instantos.surge.sh/'

const minutes = 15; var minutesInMs = minutes * 60 * 1000
setInterval(function () {
  rp(base)
    .then(function (html) {
      $('a', html).each((i, elm) => {
        const attribute = elm.attribs.href
        if (attribute.startsWith('.') || attribute.startsWith('http')) return
        download(base + attribute, attribute, () => {
          console.log('Downloaded: ' + attribute)
        })
      })
    })
    .catch(function (err) {
      console.error(err)
    })
}, minutesInMs)
