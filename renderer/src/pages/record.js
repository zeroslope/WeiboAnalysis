import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Table, message } from 'antd'

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
      <a href='javascript:;' onClick={() => this.isExportExcelSuccessful(record.typeOriginal, record.name)}>导出</a>
    )
  }]

  componentDidMount () {
    if (this.getHistory) {
      let history = this.getHistory()
      // console.log(history)
      this.setState({ history })
    }
  }

  isExportExcelSuccessful (type, name) {
    const res = this.exportExcel(type, name)
    if (res) {
      message.success('导出成功', 1.5)
    } else {
      message.error('导出失败，请尝试F5刷新页面或者重新启动应用！')
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
