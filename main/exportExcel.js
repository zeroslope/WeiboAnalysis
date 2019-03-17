// python sql_to_excel.py {type} {key}
const { execSync } = require('child_process')

const exportExcel = (type, key) => {
  const cmd = `cd /Users/zeroslope/Documents/fullstack/WeiboAnalysis/weibo_scrapy && /Users/zeroslope/Documents/fullstack/WeiboAnalysis/venv/bin/python /Users/zeroslope/Documents/fullstack/WeiboAnalysis/weibo_scrapy/sql_to_excel.py ${type} ${key}`
  try {
    execSync(cmd)
    return true
  } catch (err) {
    return false
    // throw err
  }
}

module.exports = exportExcel
