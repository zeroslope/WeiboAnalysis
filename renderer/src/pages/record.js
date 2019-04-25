import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Table, message } from 'antd'
const dialog = window.electron.remote.dialog

const typeFilter = ['微博用户', '微博综合', '微博热门', '微博实时', '微博转发', '微博评论', '微信']
  .map(s => ({
    value: s,
    text: s
  }))

class Record extends Component {
  getHistory = window.electron.remote.require('./getHistory').getHistory || false
  delHistory = window.electron.remote.require('./getHistory').delHistory || false
  openWindow = window.electron.remote.require('./getAnalyize').openWindow || false
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
      <div>
        <a href='javascript:;' onClick={() => this.isExportExcelSuccessful(record.typeOriginal, record.type, record.name)}>导出 </a>
        /
        <a href='javascript:;' onClick={() => this.isDeleteExcelSuccessful(record.typeOriginal, record.type, record.name)}> 删除</a>
      </div>
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
        case '200':
          return null
        default:
          pathname = '/'
          break
      }
      const onClick = () => {
        this.openWindow(pathname)
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
      defaultPath: `${type}-${name}.xlsx`,
      title: '导出',
      buttonLabel: '导出'
    })
    if (filepath) {
      // console.log(filepath)
      const res = this.exportExcel(typeOriginal, name, filepath)
      if (res) {
        message.success('导出成功', 1.5)
      } else {
        message.error('导出失败，请尝试F5刷新页面或者重新启动应用！')
      }
    } else {
      message.info('需要设置导出目录才能导出')
    }
  }

  isDeleteExcelSuccessful (typeOriginal, type, name) {
    try {
      this.delHistory(typeOriginal, name)
      message.success('导出成功', 1.5)
      if (this.getHistory) {
        let history = this.getHistory()
        // console.log(history)
        this.setState({ history })
      }
    } catch (err) {
      message.error('导出失败，请尝试F5刷新页面或者重新启动应用！')
      throw err
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
