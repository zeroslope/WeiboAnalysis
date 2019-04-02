const { exec } = require('child_process')

// const typeMapper = {
//   '-1': '用户抓取',
//   '1': '综合抓取',
//   '60': '热门抓取',
//   '61': '实时抓取',
//   '100': '微博转发',
//   '101': '微博评论'
// }

const getWeibo = (type, key) => {
  // console.log(type, key)
  const cmd = `cd /Users/zeroslope/Documents/fullstack/WeiboAnalysis/weibo_scrapy && /Users/zeroslope/Documents/fullstack/WeiboAnalysis/venv/bin/python /Users/zeroslope/Documents/fullstack/WeiboAnalysis/weibo_scrapy/analysis.py ${type} ${key}`
  try {
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          reject(err)
        }
        if (stderr) {
          reject(stderr)
        }
        resolve(stdout)
      })
    })
      .then(stdout => JSON.parse(stdout.toString()))
      .catch(stderr => {
        throw stderr
      })
    // const stdout = execSync(cmd)
    // // console.log(stdout.toString())
    // const data = JSON.parse(stdout.toString())
    // // console.log(data)
    // return data
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  getWeibo
}
