const { spawnSync } = require('child_process')
const { join } = require('path')

const typeMapper = {
  '-1': '用户抓取',
  '1': '综合抓取',
  '60': '热门抓取',
  '61': '实时抓取',
  '100': '微博转发',
  '101': '微博评论',
  '200': '微信'
}

const getHistory = () => {
  try {
    let spawnRes = spawnSync('python', ['history_record.py', 'get'], {
      cwd: join(__dirname, '../weibo_scrapy')
    })
    const stdout = spawnRes.stdout
    const data = JSON.parse(stdout.toString())
    let index = 1
    let res = []
    for (const key of Object.keys(data)) {
      let items = data[key]
      res = res.concat(
        items.map(item => ({
          index: index++,
          name: item.key,
          typeOriginal: item.type,
          count: parseInt(item.count),
          type: typeMapper[item.type]
        }))
      )
    }
    return res
  } catch (err) {
    throw err
  }
}

const delHistory = (type, name) => {
  // const cmd = `cd ../weibo_scrapy && python history_record.py del ${type} ${name}`
  try {
    spawnSync('python', ['history_record.py', 'del', type, name], {
      cwd: join(__dirname, '../weibo_scrapy')
    })
  } catch (err) {
    throw err
  }
}

module.exports = {
  getHistory,
  delHistory
}
