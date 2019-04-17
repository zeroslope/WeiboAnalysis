const { spawnSync } = require('child_process')
const { join } = require('path')

const getWeibo = (type, key) => {
  // const cmd = `cd ../weibo_scrapy && python analysis.py ${type} ${key}`
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
      // exec(cmd, (err, stdout, stderr) => {
      //   if (err) {
      //     reject(err)
      //   }
      //   if (stderr) {
      //     reject(stderr)
      //   }
      //   resolve(stdout)
      // })
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

module.exports = {
  getWeibo
}
