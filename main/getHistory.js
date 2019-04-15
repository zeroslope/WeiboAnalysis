const { execSync } = require('child_process')

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
  const cmd = `cd ../weibo_scrapy && python history_record.py get`
  try {
    const stdout = execSync(cmd)
    const data = JSON.parse(stdout.toString())
    let index = 1
    let res = []
    for (const key of Object.keys(data)) {
      // console.log(key)
      let items = data[key]
      // console.log(items)
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
  const cmd = `cd ../weibo_scrapy && python history_record.py del ${type} ${name}`
  try {
    execSync(cmd)
  } catch (err) {
    throw err
  }
}

module.exports = {
  getHistory,
  delHistory
}
