import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import UserForm from '../form/UserForm'

import { Button, Table } from 'antd'

const columns = [{
  title: '索引',
  dataIndex: 'index',
  align: 'center'
}, {
  title: '用户名',
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
}
]

const TabelHeader = ({ onClick }) => (
  <div className='flex justify-between items-center'>
    <h3 className='ma0'>基于用户ID搜索</h3>
    <Button type='primary' shape='circle' icon='plus' size='small' onClick={onClick} />
  </div>
)

class UserTab extends Component {
  index = 0
  state = {
    data: [],
    visible: false
  };

  showModal = () => this.setState({ visible: true })

  handleCancel = () => this.setState({ visible: false })

  handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      form.resetFields()
      values.index = this.index
      this.index++
      this.setState({ data: [...this.state.data, values], visible: false })
    })
  }

  saveFormRef = (formRef) => { this.formRef = formRef }

  render () {
    const { data } = this.state
    return (
      <div>
        <Table
          pagination={false}
          rowKey='index'
          columns={columns}
          dataSource={data}
          size='small'
          title={() => <TabelHeader onClick={this.showModal} />}
          locale={{
            emptyText: '暂无数据'
          }} />
        <UserForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

export default UserTab
