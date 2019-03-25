import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserForm from '../form/UserForm'
import { addUser, delUser, setScrapy } from '../../actions/scrapy'
import { Button, Table, Popconfirm, message } from 'antd'

const TabelHeader = ({ add, start }) => (
  <div className='flex justify-between items-center'>
    <h3 className='ma0'>基于用户ID搜索</h3>
    <div>
      <Button type='primary' shape='circle' icon='plus' size='small' onClick={add} />
      <Button type='primary' shape='circle' icon='cloud-download' size='small' className='ml3' onClick={start} />
    </div>
  </div>
)

class UserTab extends Component {
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
    dataIndex: 'username',
    align: 'center'
  }, {
    title: '用户ID',
    dataIndex: 'userId',
    align: 'center',
    width: 300
  }, {
    title: '爬取页码',
    dataIndex: 'pageNumber',
    align: 'center',
    width: 100
  }, {
    title: '是否需要图片',
    dataIndex: 'isNeedImage',
    align: 'center',
    width: 100,
    render: isNeedImage => (<span>{isNeedImage ? '是' : '否'}</span>)
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
    text: ``
  };

  // componentDidMount () {
  //   if (this.ipcRenderer) {
  //     // console.log('on')
  //     this.ipcRenderer.on('search-by-user', (event, data) => {
  //       console.log(data)
  //       this.setState({ text: this.state.text + data })
  //     })
  //   }
  // }

  componentWillUnmount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.removeAllListeners('search-by-user')
    }
  }

  startScrapy = () => {
    if (this.ipcRenderer) {
      this.props.setScrapy(1)
      this.setState({ loading: true })
      // console.log('on')
      this.ipcRenderer.on('search-by-user', (event, data) => {
        console.log(data)
        if (!data.end) {
          this.setState({ text: this.state.text + data.data })
          this.textArea.scrollTop = this.textArea.scrollHeight
        } else {
          this.props.setScrapy(-1)
          this.setState({ loading: false })
          message.info('基于用户ID数据爬取完成')
          this.ipcRenderer.removeAllListeners('search-by-user')
        }
      })
      this.ipcRenderer.send('search-by-user', this.props.data)
    }
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
      <div className='relative' style={{ height: 'calc(100vh - 148px)' }}>
        <Table
          pagination={false}
          rowKey='index'
          columns={this.columns}
          dataSource={data}
          size='small'
          title={() => <TabelHeader add={this.showModal} start={this.startScrapy} />}
          locale={{
            emptyText: '暂无数据'
          }}
          loading={this.state.loading}
          scroll={{ y: window.innerHeight - 140 - 128 - 96 }}
        />
        <UserForm
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
  data: state.user
})

export default connect(mapStateToProps, { submit: addUser, delete: delUser, setScrapy })(UserTab)
