import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, InputNumber } from 'antd'

class CommentForm extends Component {
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
        title='评论信息'
        okText='保存'
        cancelText='取消'
        onCancel={onCancel}
        onOk={onCreate}
        centered
      >
        <Form layout='vertical'>
          <Form.Item label='项目名称'>
            {getFieldDecorator('projectName', {
              rules: [{ required: true, message: '请输入项目名称' }]
            })(
              <Input size='small' className='db mt1 w-10' name='projectName' />
            )}
          </Form.Item>
          <Form.Item label='用户ID'>
            {getFieldDecorator('weiboId', {
              rules: [{ required: true, message: '请输入微博用户ID' }]
            })(
              <Input size='small' className='db mt1 w-10' name='userId' />
            )}
          </Form.Item>
          <Form.Item label='转发页码'>
            {getFieldDecorator('pageNumber', {
              initialValue: 1
            })(
              <InputNumber size='small' className='db mt1' min={1} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(CommentForm)
