import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RepostForm from '../form/RepostForm'
import { connect } from 'react-redux'
import { addRepost } from '../../actions/scrapy'

import { Button, Table } from 'antd'

const columns = [{
  title: '索引',
  dataIndex: 'index',
  align: 'center'
}, {
  title: '关键词',
  dataIndex: 'projectName',
  align: 'center'
}, {
  title: '用户ID',
  dataIndex: 'userId',
  align: 'center'
}, {
  title: '转发页码',
  dataIndex: 'pageNumber',
  align: 'center'
}
]

const TabelHeader = ({ onClick }) => (
  <div className='flex justify-between items-center'>
    <h3 className='ma0'>用户转发信息获取</h3>
    <Button type='primary' shape='circle' icon='plus' size='small' onClick={onClick} />
  </div>
)

class KeywordTab extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    submit: PropTypes.func.isRequired
  }

  index = 0
  state = {
    visible: false
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
      values.index = this.index
      this.index++
      this.props.submit(values)
      this.setState({ visible: false })
    })
  }

  saveFormRef = (formRef) => { this.formRef = formRef }

  render () {
    const { data } = this.props
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

const mapStateToProps = (state) => ({
  data: state.repost
})

export default connect(mapStateToProps, { submit: addRepost })(KeywordTab)
