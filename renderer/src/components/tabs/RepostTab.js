import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RepostForm from '../form/RepostForm'
import { connect } from 'react-redux'
import { addRepost, delRepost } from '../../actions/scrapy'
import { Button, Table, Popconfirm } from 'antd'

const TabelHeader = ({ add, start }) => (
  <div className='flex justify-between items-center'>
    <h3 className='ma0'>用户转发信息获取</h3>
    <div>
      <Button type='primary' shape='circle' icon='plus' size='small' onClick={add} />
      <Button type='primary' shape='circle' icon='cloud-download' size='small' className='ml3' onClick={start} />
    </div>
  </div>
)

class KeywordTab extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    submit: PropTypes.func.isRequired
  }

  ipcRenderer = window.electron.ipcRenderer || false

  columns = [{
    title: '索引',
    dataIndex: 'index',
    align: 'center'
  }, {
    title: '关键词',
    dataIndex: 'projectName',
    align: 'center'
  }, {
    title: '用户ID',
    dataIndex: 'weiboId',
    align: 'center'
  }, {
    title: '转发页码',
    dataIndex: 'pageNumber',
    align: 'center'
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record) => (
      this.props.data.length >= 1
        ? (
          <Popconfirm title='是否需要删除？' cancelText='取消' onConfirm={() => this.handleDelete(record.index)}>
            <a href='javascript:;'>删除</a>
          </Popconfirm>
        ) : null
    )
  }
  ]

  state = {
    index: 0,
    visible: false,
    text: ''
  }

  componentDidMount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.on('search-by-repost', (event, data) => {
        console.log(data)
        this.setState({ text: this.state.text + data })
      })
    }
  }

  componentWillUnmount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.removeAllListeners('search-by-repost')
    }
  }

  startScrapy = () => {
    this.ipcRenderer.send('search-by-repost', this.props.data)
  }

  showModal = () => this.setState({ visible: true })

  handleCancel = () => this.setState({ visible: false })

  handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      form.resetFields()
      const newData = {
        ...values,
        index: this.props.data.length

      }
      this.props.submit(newData)
      this.setState((state, props) => ({
        visible: false,
        index: state.index + 1
      }))
    })
  }

  handleDelete = (index) => {
    console.log(index)
    this.props.delete(index)
  }

  saveFormRef = (formRef) => { this.formRef = formRef }

  render () {
    const { data } = this.props
    return (
      <div>
        <Table
          pagination={false}
          rowKey='index'
          columns={this.columns}
          dataSource={data}
          size='small'
          title={() => <TabelHeader add={this.showModal} start={this.startScrapy} />}
          locale={{
            emptyText: '暂无数据'
          }} />
        <RepostForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <pre>{this.state.text}</pre>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.repost
})

export default connect(mapStateToProps, { submit: addRepost, delete: delRepost })(KeywordTab)
