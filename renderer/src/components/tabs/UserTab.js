import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import UserForm from '../form/UserForm'
// import { Table, Modal, Button } from 'antd'

// const columns = [{
//   title: '索引',
//   dataIndex: 'index'
// }, {
//   title: '用户名',
//   dataIndex: 'username'
// }, {
//   title: '用户ID',
//   dataIndex: 'userId'
// }, {
//   title: '爬取页码',
//   dataIndex: 'pageNumber'
// }, {
//   title: '是否需要图片',
//   dataIndex: 'isNeedImage'
// }
// ]

// export class UserTab extends Component {
//   // static propTypes = {

//   // }

//   state = {
//     data: [],
//     visable: false
//   }

//   index = 0

//   submit = data => {
//     data.index = this.index
//     this.index++
//     this.setState({ data: [...this.state.data, data] })
//   }

//   onOk = () => {
//     this.setState({ visable: true })
//   }

//   onCancel = () => {
//     this.setState({ visable: false })
//   }

//   render () {
//     const { data, visable } = this.state
//     return (
//       <React.Fragment>
//         <Table
//           rowKey='index'
//           columns={columns}
//           dataSource={data}
//           size='middle'
//           locale={{
//             emptyText: '暂无数据'
//           }} />

//         <Button type='primary' onClick={this.onOk}>Display a modal dialog at 20px to Top</Button>
//         <Modal
//           visible={visable}
//           onOk={this.onOk}
//           onCancel={this.onCancel}
//         >
//           <UserForm submit={this.submit} />
//         </Modal>
//       </React.Fragment>
//     )
//   }
// }

// export default UserTab

import {
  Button, Modal, Form, Input, Switch, InputNumber
} from 'antd'

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends Component {
    render () {
      const {
        visible, onCancel, onCreate, form
      } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          visible={visible}
          title='基于用户ID搜索'
          okText='保存'
          cancelText='取消'
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout='vertical'>
            <Form.Item label='用户名'>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入微博用户名' }]
              })(
                <Input size='small' className='db mt1 w-10' name='username' />
              )}
            </Form.Item>
            <Form.Item label='用户ID'>
              {getFieldDecorator('userId', {
                rules: [{ required: true, message: '请输入微博用户ID' }]
              })(
                <Input size='small' className='db mt1 w-10' name='userId' />
              )}
            </Form.Item>
            <Form.Item label='爬取页码'>
              {getFieldDecorator('pageNumber', {
                initialValue: 1
              })(
                <InputNumber size='small' className='db mt1' a />
              )}
            </Form.Item>
            <Form.Item label='是否爬取图片'>
              {getFieldDecorator('isNeedImage')(
                <Switch className='db mt1' checkedChildren='是' unCheckedChildren='否' />
              )}
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  }
)

class CollectionsPage extends Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log('Received values of form: ', values)
      form.resetFields()
      this.setState({ visible: false })
    })
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

  render () {
    return (
      <div>
        <Button type='primary' onClick={this.showModal}>New Collection</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

export default CollectionsPage
