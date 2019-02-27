import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import KeywordForm from '../form/KeywordForm'

import { Button, Table } from 'antd'

const columns = [{
  title: '索引',
  dataIndex: 'index'
}, {
  title: '关键词',
  dataIndex: 'keyWord'
}, {
  title: '搜索方式',
  dataIndex: 'searchOption'
}, {
  title: '爬取页码',
  dataIndex: 'pageNumber'
}, {
  title: '是否需要图片',
  dataIndex: 'isNeedImage',
  render: isNeedImage => (<span>{isNeedImage ? '是' : '否'}</span>)
}
]

const TabelHeader = ({ onClick }) => (
  <div className='flex justify-between items-center'>
    <h3 className='ma0'>基于关键词搜索</h3>
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
        <KeywordForm
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
