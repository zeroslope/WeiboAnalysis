const { ipcMain } = require('electron')
const { spawn } = require('child_process')

const channels = ['search-by-keyword', 'search-by-user', 'search-by-repost', 'search-by-comment']

const addListener = () => {
  ipcMain.on('search-by-keyword', (event, args) => {
    console.log(args)
    let r = args
      .map(arg => {
        const { keyword, searchOption, pageNumber, isNeedImage } = arg
        return `${2},${keyword},${searchOption},${pageNumber},${isNeedImage ? 'True' : 'False'}`
      })
      .join('@_@')
    // console.log(r)
    let child = spawn('/Users/zeroslope/Documents/fullstack/WeiboAnalysis/venv/bin/python', ['/Users/zeroslope/Documents/fullstack/WeiboAnalysis/weibo_scrapy/entrypoint.py', 'weibo', r], {
      cwd: '/Users/zeroslope/Documents/fullstack/WeiboAnalysis/weibo_scrapy'
    })
    // child.on('error', console.error)
    child.stdout.on('data', (data) => {
      console.log('data', data.toString())
      event.sender.send('search-by-keyword', {
        end: false,
        data: data.toString()
      })
    })
    child.stdout.on('end', () => {
      console.log('END! ', r)
      event.sender.send('search-by-keyword', {
        end: true
      })
    })
    child.stderr.on('data', (data) => {
      console.log('error', data.toString())
      event.sender.send('search-by-keyword', {
        end: false,
        data: data.toString()
      })
    })
  })

  ipcMain.on('search-by-user', (event, args) => {
    let r = args
      .map(arg => {
        const { username, userId, pageNumber, isNeedImage } = arg
        return `${1},${username},${userId},${pageNumber},${isNeedImage ? 'True' : 'False'}`
      })
      .join('@_@')
    // console.log(r)
    let child = spawn('/Users/zeroslope/Documents/fullstack/WeiboAnalysis/venv/bin/python', ['/Users/zeroslope/Documents/fullstack/WeiboAnalysis/weibo_scrapy/entrypoint.py', 'weibo', r], {
      cwd: '/Users/zeroslope/Documents/fullstack/WeiboAnalysis/weibo_scrapy'
    })
    // child.on('error', console.error)
    child.stdout.on('data', (data) => {
      console.log('data', data.toString())
      event.sender.send('search-by-user', {
        end: false,
        data: data.toString()
      })
    })
    child.stdout.on('end', () => {
      console.log('END! ', r)
      event.sender.send('search-by-user', {
        end: true
      })
    })
    child.stderr.on('data', (data) => {
      console.log('error', data.toString())
      event.sender.send('search-by-user', {
        end: false,
        data: data.toString()
      })
    })
  })

  ipcMain.on('search-by-repost', (event, args) => {
    let r = args
      .map(arg => {
        const { projectName, weiboId, pageNumber } = arg
        return `${projectName},${weiboId},${pageNumber}`
      })
      .join('@_@')
    // console.log(r)
    let child = spawn('/Users/zeroslope/Documents/fullstack/WeiboAnalysis/venv/bin/python', ['/Users/zeroslope/Documents/fullstack/WeiboAnalysis/weibo_scrapy/entrypoint.py', 'repost', r], {
      cwd: '/Users/zeroslope/Documents/fullstack/WeiboAnalysis/weibo_scrapy'
    })
    // child.on('error', console.error)
    child.stdout.on('data', (data) => {
      console.log('data', data.toString())
      event.sender.send('search-by-repost', {
        end: false,
        data: data.toString()
      })
    })
    child.stdout.on('end', () => {
      console.log('END! ', r)
      event.sender.send('search-by-repost', {
        end: true
      })
    })
    child.stderr.on('data', (data) => {
      console.log('error', data.toString())
      event.sender.send('search-by-repost', {
        end: false,
        data: data.toString()
      })
    })
  })

  ipcMain.on('search-by-comment', (event, args) => {
    let r = args
      .map(arg => {
        const { projectName, weiboId, pageNumber } = arg
        return `${projectName},${weiboId},${pageNumber}`
      })
      .join('@_@')
    // console.log(r)
    let child = spawn('/Users/zeroslope/Documents/fullstack/WeiboAnalysis/venv/bin/python', ['/Users/zeroslope/Documents/fullstack/WeiboAnalysis/weibo_scrapy/entrypoint.py', 'comment', r], {
      cwd: '/Users/zeroslope/Documents/fullstack/WeiboAnalysis/weibo_scrapy'
    })
    // child.on('error', console.error)
    child.stdout.on('data', (data) => {
      console.log('data', data.toString())
      event.sender.send('search-by-comment', {
        end: false,
        data: data.toString()
      })
    })
    child.stdout.on('end', () => {
      console.log('END! ', r)
      event.sender.send('search-by-comment', {
        end: true
      })
    })
    child.stderr.on('data', (data) => {
      console.log('error', data.toString())
      event.sender.send('search-by-comment', {
        end: false,
        data: data.toString()
      })
    })
  })
}

const deleteListener = () => {
  for (const channel of channels) {
    console.log(channel)
    ipcMain.removeAllListeners(channel)
  }
}

module.exports = {
  addListener,
  deleteListener
}
