import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Switch, InputNumber } from 'antd'

class UserForm extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired
    }).isRequired
  }

  render () {
    const { visible, onCancel, onCreate, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        visible={visible}
        title='基于用户ID搜索'
        okText='保存'
        cancelText='取消'
        onCancel={onCancel}
        onOk={onCreate}
        centered
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
              <InputNumber size='small' className='db mt1' min={1} />
            )}
          </Form.Item>
          <Form.Item label='是否爬取图片'>
            {getFieldDecorator('isNeedImage', {
              initialValue: false
            })(
              <Switch className='db mt1' checkedChildren='是' unCheckedChildren='否' />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(UserForm)
