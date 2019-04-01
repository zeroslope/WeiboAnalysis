import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Table, message } from 'antd'
const BrowserWindow = window.electron.remote.BrowserWindow
const dialog = window.electron.remote.dialog

const join = window.require('path').join

const typeFilter = ['用户抓取', '综合抓取', '热门抓取', '实时抓取', '微博转发', '微博评论']
  .map(s => ({
    value: s,
    text: s
  }))

class Record extends Component {
  getHistory = window.electron.remote.require('./getHistory') || false
  exportExcel = window.electron.remote.require('./exportExcel') || false

  state = {
    history: []
  }

  columns = [{
    title: '索引',
    dataIndex: 'index',
    align: 'center'
  }, {
    title: '类别',
    dataIndex: 'type',
    align: 'center',
    filters: typeFilter,
    onFilter: (value, record) => record.type.indexOf(value) === 0
  }, {
    title: '项目名称',
    dataIndex: 'name',
    align: 'center',
    sorter: (a, b) => a.name.localeCompare(b.name, 'zh-CN')
  }, {
    title: '数据总数',
    dataIndex: 'count',
    align: 'center',
    sorter: (a, b) => a.count - b.count
  }, {
    title: '导出',
    key: 'action',
    align: 'center',
    render: (text, record) => (
      <a href='javascript:;' onClick={() => this.isExportExcelSuccessful(record.typeOriginal, record.type, record.name)}>导出</a>
    )
  }, {
    title: '分析',
    key: 'analyize',
    align: 'center',
    render: (text, record) => {
      let pathname
      // console.log(record.typeOriginal)
      switch (record.typeOriginal) {
        case '-1':
        case '1':
        case '60':
        case '61':
          pathname = `/weibo/${record.typeOriginal}/${record.name}`
          break
        case '100':
          pathname = `/repost/${record.name}`
          break
        case '101':
          pathname = `/comment/${record.name}`
          break
        default:
          pathname = '/'
          break
      }
      const onClick = () => {
        let win = new BrowserWindow({
          width: 800,
          height: 600,
          webPreferences: {
            preload: join(__dirname, '../../../main/preload.js')
          }
        })
        win.on('close', () => { win = null })
        // console.log(window.isDev)
        if (window.isDev) {
          win.loadURL('http://localhost:1234#' + pathname)
        } else {
          // let url = window.require('url').format({
          //   protocol: 'file',
          //   pathname: window.require('path').join(__dirname, `../../../app/index.html`)
          // })
          // console.log(url)
          win.loadFile('app/index.html', {
            hash: pathname
          })
        }
        win.show()
      }
      return (
        <a onClick={onClick}>分析</a>
      )
    }
  }]

  componentDidMount () {
    if (this.getHistory) {
      let history = this.getHistory()
      // console.log(history)
      this.setState({ history })
    }
  }

  isExportExcelSuccessful (typeOriginal, type, name) {
    const filepath = dialog.showSaveDialog({
      defaultPath: `${type}-${name}`,
      title: '导出',
      buttonLabel: '导出'
    })
    if (filepath) {
      const res = this.exportExcel(typeOriginal, name)
      if (res) {
        message.success('导出成功', 1.5)
      } else {
        message.error('导出失败，请尝试F5刷新页面或者重新启动应用！')
      }
    }
  }

  render () {
    return (
      <Layout match={this.props.match}>
        <h2 className='silver ml3 mt3'>历史记录</h2>
        <div className='pa2'>
          <Table
            pagination={{
              simple: true,
              pageSize: 9
            }}
            rowKey='index'
            columns={this.columns}
            dataSource={this.state.history}
            locale={{
              emptyText: '暂无数据'
            }}
          />
        </div>
      </Layout>
    )
  }
}

export default Record
