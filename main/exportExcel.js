// python sql_to_excel.py {type} {key}
const { spawnSync } = require('child_process')
const { join } = require('path')

const exportExcel = (type, key, filepath) => {
  // const cmd = `cd ../weibo_scrapy && python sql_to_excel.py ${type} ${key} ${filepath}`
  try {
    spawnSync('python', ['sql_to_excel.py', type, key, filepath], {
      cwd: join(__dirname, '../weibo_scrapy')
    })
    // execSync(cmd)
    return true
  } catch (err) {
    return false
  }
}

module.exports = exportExcel
