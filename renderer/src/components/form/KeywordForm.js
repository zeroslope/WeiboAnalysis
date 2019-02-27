import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Input, InputNumber, Form, Select, Modal } from 'antd'

const Option = Select.Option

// class KeywordForm extends Component {
//   ipcRenderer = window.electron.ipcRenderer || false
//   state = {
//     pageNumber: 1,
//     keyWord: '',
//     searchOption: '1',
//     isNeedImage: false
//   }

//   componentDidMount () {
//     if (this.ipcRenderer) {
//       this.ipcRenderer.on('search-by-keyword', (event, data) => {
//         window.alert(data)
//       })
//     }
//   }

//   componentWillUnmount () {
//     if (this.ipcRenderer) {
//       this.ipcRenderer.removeAllListeners('search-by-keyword')
//     }
//   }

//   handleChange = e => this.setState({ [e.target.name]: e.target.value })

//   handleSearchChange = val => this.setState({ searchOption: val })

//   handlePageNumberChange = val => this.setState({ pageNumber: val })

//   handleImageSwitch = (checked, e) => this.setState({ isNeedImage: checked })

//   handleSubmit = () => {
//     if (this.ipcRenderer) {
//       const { pageNumber, keyWord, isNeedImage, searchOption } = this.state
//       this.ipcRenderer.send('search-by-keyword', {
//         type: '2',
//         pageNumber,
//         keyWord,
//         isNeedImage,
//         searchOption
//       })
//     }
//   }

//   render () {
//     const { pageNumber, keyWord, isNeedImage, searchOption } = this.state
//     return (
//       <div className='pv2 ph3'>
//         <h2 className='silver'>基于关键词搜索</h2>
//         {/** 第一位：type = 2   第二位：关键词    第三位：1-综合 60-热门 61-实时  第四位：页码 第五位：是否要图片 */}
//         <div>
//           <div>
//             <Text className='f6'>关键词</Text>
//             <Input size='small' className='db mt1 w-10' value={keyWord} name='keyWord' onChange={this.handleChange} />
//           </div>
//           <div className='mt2'>
//             <Text>搜索方式</Text>
//             <Select size='small' defaultValue='1' value={searchOption} className='db mt1 f7' style={{ width: 120 }} onChange={this.handleSearchChange}>
//               <Option value='1'>综合</Option>
//               <Option value='60'>热门</Option>
//               <Option value='61'>实时</Option>
//             </Select>
//           </div>
//           <div className='mt2'>
//             <Text>爬取页码</Text>
//             <InputNumber size='small' className='db mt1' value={pageNumber} onChange={this.handlePageNumberChange} />
//           </div>
//           <div className='mt2'>
//             <Text>是否爬取图片</Text>
//             <Switch className='db mt1' checkedChildren='是' unCheckedChildren='否' checked={isNeedImage} onChange={this.handleImageSwitch} />
//           </div>
//           <Button size='small'
//             className='ba mt3 ph2 f7 white link bg-animate bg-transparent hover-black hover-bg-white b'
//             onClick={this.handleSubmit}
//           >
//             提交
//           </Button>
//         </div>
//       </div>
//     )
//   }
// }

// export default KeywordForm

class KeywordForm extends Component {
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
        title='基于关键词搜索'
        okText='保存'
        cancelText='取消'
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout='vertical'>
          <Form.Item label='关键词'>
            {getFieldDecorator('keyWord', {
              rules: [{ required: true, message: '请输入微博用户名' }]
            })(
              <Input size='small' className='db mt1 w-10' name='username' />
            )}
          </Form.Item>
          <Form.Item label='搜索方式'>
            {getFieldDecorator('searchOption', {
              initialValue: '1'
            })(
              <Select size='small' className='db mt1 f7' style={{ width: 120 }}>
                <Option value='1'>综合</Option>
                <Option value='60'>热门</Option>
                <Option value='61'>实时</Option>
              </Select>
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
            {getFieldDecorator('isNeedImage')(
              <Switch className='db mt1' checkedChildren='是' unCheckedChildren='否' />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(KeywordForm)
