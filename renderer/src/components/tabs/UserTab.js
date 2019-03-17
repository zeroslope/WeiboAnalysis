import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserForm from '../form/UserForm'
import { addUser, delUser } from '../../actions/scrapy'
import { Button, Table, Popconfirm } from 'antd'

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
    align: 'center'
  }, {
    title: '项目名称',
    dataIndex: 'username',
    align: 'center'
  }, {
    title: '用户ID',
    dataIndex: 'userId',
    align: 'center'
  }, {
    title: '爬取页码',
    dataIndex: 'pageNumber',
    align: 'center'
  }, {
    title: '是否需要图片',
    dataIndex: 'isNeedImage',
    align: 'center',
    render: isNeedImage => (<span>{isNeedImage ? '是' : '否'}</span>)
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
    text: `大陆开始疯狂拉风萨拉萨了是否离开啊；十分骄傲了；发；发力；司法局；按揭房；
    asfasfasfasfaaaafafas
    asfafasmk;;kasd'ka[pfsa=fasfjafslasnlnsa]
    `
  };

  componentDidMount () {
    if (this.ipcRenderer) {
      console.log('on')
      this.ipcRenderer.on('search-by-user', (event, data) => {
        console.log(data)
        this.setState({ text: this.state.text + data })
      })
    }
  }

  startScrapy = () => {
    this.ipcRenderer.send('search-by-user', this.props.data)
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
        <UserForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <div className='vh-25 overflow-scroll shadow-3 mt3'>
          <pre className='f7'>{this.state.text}</pre>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.user
})

export default connect(mapStateToProps, { submit: addUser, delete: delUser })(UserTab)
