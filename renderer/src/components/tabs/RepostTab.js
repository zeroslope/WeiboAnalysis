import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import RepostForm from '../form/RepostForm'

import { Button, Table } from 'antd'

const columns = [{
  title: '索引',
  dataIndex: 'index'
}, {
  title: '关键词',
  dataIndex: 'projectName'
}, {
  title: '用户ID',
  dataIndex: 'userId'
}, {
  title: '转发页码',
  dataIndex: 'pageNumber'
}
]

const TabelHeader = ({ onClick }) => (
  <div className='flex justify-between items-center'>
    <h3 className='ma0'>用户转发信息获取</h3>
    <Button type='primary' shape='circle' icon='plus' size='small' onClick={onClick} />
  </div>
)

class KeywordTab extends Component {
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
        <RepostForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

export default KeywordTab
