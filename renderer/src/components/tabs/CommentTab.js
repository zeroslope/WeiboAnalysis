import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentForm from '../form/CommentForm'
import { addComment, delComment, setScrapy, delAllComment } from '../../actions/scrapy'
import { Button, Table, Popconfirm, message } from 'antd'

const TabelHeader = ({ add, start, deleteAll }) => (
  <div className='flex justify-between items-center'>
    <h3 className='ma0'>评论信息</h3>
    <div>
      <Button type='primary' shape='circle' icon='plus' size='small' onClick={add} />
      <Button type='primary' shape='circle' icon='cloud-download' size='small' className='ml3' onClick={start} />
      <Popconfirm title='是否要全部删除？' onConfirm={deleteAll}>
        <Button type='primary' shape='circle' icon='delete' size='small' className='ml3' />
      </Popconfirm>
    </div>
  </div>
)

class CommentTab extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    submit: PropTypes.func.isRequired
  }

  ipcRenderer = window.electron.ipcRenderer || false

  columns = [{
    title: '索引',
    dataIndex: 'index',
    align: 'center',
    width: 100
  }, {
    title: '项目名称',
    dataIndex: 'projectName',
    align: 'center'
  }, {
    title: '微博ID',
    dataIndex: 'weiboId',
    align: 'center',
    width: 300
  }, {
    title: '评论页码',
    dataIndex: 'pageNumber',
    align: 'center',
    width: 100
  }, {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 100,
    render: (text, record) => (
      this.props.data.length >= 1
        ? (
          <Popconfirm title='是否需要删除？' onConfirm={() => this.handleDelete(record.index)}>
            <a href='javascript:;'>删除</a>
          </Popconfirm>
        ) : null
    )
  }
  ]

  state = {
    index: 0,
    visible: false,
    loading: false,
    text: ''
  }

  componentWillUnmount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.removeAllListeners('search-by-comment')
    }
  }

  startScrapy = () => {
    if (this.props.data.length === 0) return
    if (this.ipcRenderer) {
      this.props.setScrapy(1)
      this.setState({ loading: true })
      // console.log('on')
      this.ipcRenderer.on('search-by-comment', (event, data) => {
        // console.log(data)
        if (!data.end) {
          let text = this.state.text + data.data
          this.setState({ text: text.slice(-10000) })
          this.textArea.scrollTop = this.textArea.scrollHeight
        } else {
          this.props.setScrapy(-1)
          this.setState({ loading: false })
          message.info('评论数据获取完成')
          this.ipcRenderer.removeAllListeners('search-by-comment')
        }
      })
    }
    this.ipcRenderer.send('search-by-comment', this.props.data)
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
        index: this.state.index
      }
      this.props.submit(newData)
      this.setState((state, props) => ({
        visible: false,
        index: state.index + 1
      }))
    })
  }

  handleDelete = (index) => {
    // console.log(index)
    this.props.delete(index)
  }

  saveFormRef = (formRef) => { this.formRef = formRef }

  render () {
    const { data } = this.props
    return (
      <div className='relative' style={{ height: 'calc(100vh - 148px)' }}>
        <Table
          pagination={false}
          rowKey='index'
          columns={this.columns}
          dataSource={data}
          size='small'
          title={() => <TabelHeader add={this.showModal} start={this.startScrapy} deleteAll={this.props.deleteAll} />}
          locale={{
            emptyText: '暂无数据'
          }}
          loading={this.state.loading}
          scroll={{ y: window.innerHeight - 140 - 128 - 96 }}
        />
        <CommentForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <div className='h4 overflow-scroll shadow-3 mt3 absolute left-0 right-0 bottom-0' ref={input => { this.textArea = input }}>
          <pre className='f7'>{this.state.text}</pre>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.comment
})

export default connect(mapStateToProps, { submit: addComment, delete: delComment, deleteAll: delAllComment, setScrapy })(CommentTab)
