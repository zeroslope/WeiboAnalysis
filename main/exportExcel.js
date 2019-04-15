// python sql_to_excel.py {type} {key}
const { execSync } = require('child_process')

const exportExcel = (type, key, filepath) => {
  const cmd = `cd ../weibo_scrapy && python sql_to_excel.py ${type} ${key} ${filepath}`
  try {
    execSync(cmd)
    return true
  } catch (err) {
    return false
    // throw err
  }
}

module.exports = exportExcel
