import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, DatePicker, InputNumber } from 'antd'

const { RangePicker } = DatePicker

class WechatPublicForm extends Component {
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
        title='微信公众号'
        okText='保存'
        cancelText='取消'
        onCancel={onCancel}
        onOk={onCreate}
        centered
      >
        <Form layout='vertical'>
          <Form.Item label='微信公众号'>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '微信公众号' }]
            })(
              <Input size='small' className='db w-10' name='name' />
            )}
          </Form.Item>
          <Form.Item label='开始日期-结束日期'>
            {getFieldDecorator('dateRange', {
              rules: [{ required: true, message: '请输入开始日期' }]
            })(
              <RangePicker size='small' />
            )}
          </Form.Item>
          <Form.Item label='步长'>
            {getFieldDecorator('stepLength', {
              initialValue: 1
            })(
              <InputNumber size='small' className='db' min={1} max={30} />
            )}
          </Form.Item>
          <Form.Item label='新榜 key'>
            {getFieldDecorator('key', {
              rules: [{ required: true, message: '请输入新榜提供的key' }]
            })(
              <Input size='small' className='db w-40' name='key' />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(WechatPublicForm)
