const { spawnSync } = require('child_process')
const { join } = require('path')
const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

const getWeibo = (type, key) => {
  // const cmd = `cd ../weibo_scrapy && python3 analysis.py ${type} ${key}`
  try {
    return new Promise((resolve, reject) => {
      try {
        const res = spawnSync('python', ['analysis.py', type, key], {
          cwd: join(__dirname, '../weibo_scrapy')
        })
        if (res.error) {
          reject(res.err)
        }
        resolve(res.stdout)
      } catch (err) {
        reject(err)
      }
    })
      .then(stdout => JSON.parse(stdout.toString()))
      .catch(stderr => {
        throw stderr
      })
  } catch (err) {
    console.log(err)
    throw err
  }
}

const openWindow = (pathname) => {
  let win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })
  win.on('close', () => { win = null })
  // console.log(window.isDev)
  if (isDev) {
    win.loadURL('http://localhost:1234#' + pathname)
  } else {
    win.loadFile('app/index.html', {
      hash: pathname
    })
  }
  win.show()
}

module.exports = {
  getWeibo,
  openWindow
}
