const { ipcMain } = require('electron')
const { spawn } = require('child_process')
const iconv = require('iconv-lite')
const { join } = require('path')

const channels = ['search-by-keyword', 'search-by-user', 'search-by-repost', 'search-by-comment']

const dataToString = (data) => {
  if (process.platform === 'win32') {
    return iconv.decode(data, 'gbk')
  } else {
    return data.toString()
  }
}

const addListener = () => {
  ipcMain.on('search-by-keyword', (event, args) => {
    let r = args
      .map(arg => {
        const { keyword, searchOption, pageNumber, isNeedImage } = arg
        return `${2},${keyword},${searchOption},${pageNumber},${isNeedImage ? 'True' : 'False'}`
      })
      .join('@_@')
    // console.log(r)
    let child = spawn('python', ['entrypoint.py', 'weibo', r], {
      cwd: join(__dirname, '../weibo_scrapy')
    })
    // child.on('error', console.error)
    child.stdout.on('data', (data) => {
      // console.log('data', dataToString(data))
      event.sender.send('search-by-keyword', {
        end: false,
        data: dataToString(data)
      })
    })
    child.stdout.on('end', () => {
      // console.log('END! ', r)
      event.sender.send('search-by-keyword', {
        end: true
      })
    })
    child.stderr.on('data', (data) => {
      // console.log('error', dataToString(data))
      event.sender.send('search-by-keyword', {
        end: false,
        data: dataToString(data)
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
    let child = spawn('python', ['entrypoint.py', 'weibo', r], {
      cwd: join(__dirname, '../weibo_scrapy')
    })
    // child.on('error', console.error)
    child.stdout.on('data', (data) => {
      // console.log('data', dataToString(data))
      event.sender.send('search-by-user', {
        end: false,
        data: dataToString(data)
      })
    })
    child.stdout.on('end', () => {
      // console.log('END! ', r)
      event.sender.send('search-by-user', {
        end: true
      })
    })
    child.stderr.on('data', (data) => {
      // console.log('error', dataToString(data))
      event.sender.send('search-by-user', {
        end: false,
        data: dataToString(data)
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
    let child = spawn('python', ['entrypoint.py', 'repost', r], {
      cwd: join(__dirname, '../weibo_scrapy')
    })
    // child.on('error', console.error)
    child.stdout.on('data', (data) => {
      // console.log('data', dataToString(data))
      event.sender.send('search-by-repost', {
        end: false,
        data: dataToString(data)
      })
    })
    child.stdout.on('end', () => {
      // console.log('END! ', r)
      event.sender.send('search-by-repost', {
        end: true
      })
    })
    child.stderr.on('data', (data) => {
      // console.log('error', dataToString(data))
      event.sender.send('search-by-repost', {
        end: false,
        data: dataToString(data)
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
    let child = spawn('python', ['entrypoint.py', 'comment', r], {
      cwd: join(__dirname, '../weibo_scrapy')
    })
    // child.on('error', console.error)
    child.stdout.on('data', (data) => {
      // console.log('data', dataToString(data))
      event.sender.send('search-by-comment', {
        end: false,
        data: dataToString(data)
      })
    })
    child.stdout.on('end', () => {
      // console.log('END! ', r)
      event.sender.send('search-by-comment', {
        end: true
      })
    })
    child.stderr.on('data', (data) => {
      // console.log('error', dataToString(data))
      event.sender.send('search-by-comment', {
        end: false,
        data: dataToString(data)
      })
    })
  })

  ipcMain.on('search-by-wechat', (event, args) => {
    let r = args
      .map(arg => {
        const { name, startDate, endDate, stepLength, key } = arg
        return `${name},${startDate},${endDate},${stepLength},${key}`
      })
      .join('@_@')
    // console.log(r)
    let child = spawn('python', ['wechat_public.py', r], {
      cwd: join(__dirname, '../weibo_scrapy')
    })
    // child.on('error', console.error)
    child.stdout.on('data', (data) => {
      // console.log('data', dataToString(data))
      event.sender.send('search-by-wechat', {
        end: false,
        data: dataToString(data)
      })
    })
    child.stdout.on('end', () => {
      // console.log('END! ', r)
      event.sender.send('search-by-wechat', {
        end: true
      })
    })
    child.stderr.on('data', (data) => {
      // console.log('error', dataToString(data))
      event.sender.send('search-by-wechat', {
        end: false,
        data: dataToString(data)
      })
    })
  })
}

const deleteListener = () => {
  for (const channel of channels) {
    // console.log(channel)
    ipcMain.removeAllListeners(channel)
  }
}

module.exports = {
  addListener,
  deleteListener
}
