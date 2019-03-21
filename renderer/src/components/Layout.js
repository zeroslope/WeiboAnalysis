import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Layout, Icon, Menu } from 'antd'
const { Content, Sider } = Layout

class LayoutComponent extends Component {
  state = {
    collapsed: true,
    isScrapying: this.props.isScrapying
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }

  componentWillReceiveProps (props) {
    this.setState({ isScrapying: props.isScrapying })
  }

  render () {
    const { children, match } = this.props
    const { isScrapying } = this.state
    return (
      <Layout className='min-vh-100 ant-layout-has-sider'>
        <Sider
          theme='dark'
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          collapsedWidth={64}
          width={128}
          className='fixed left-0 vh-100'
          disabled={isScrapying > 0}
        >
          <Menu theme='dark' defaultSelectedKeys={[match.path]} mode='inline'>
            <Menu.Item key='/'>
              <Link to='/'>
                <div>
                  <Icon type='cloud-download' />
                  <span>数据爬取</span>
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item key='/record' disabled={isScrapying}>
              <Link to='/record'>
                <div>
                  <Icon type='profile' />
                  <span>查询记录</span>
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item key='/setting' disabled={isScrapying}>
              <Link to='/setting'>
                <div>
                  <Icon type='setting' />
                  <span>代理设置</span>
                </div>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='min-vh-100' style={{
          marginLeft: this.state.collapsed ? '64px' : '128px',
          transition: 'background 0.3s, margin-left 0.2s'
        }}>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  isScrapying: state.control.isScrapying
})

export default connect(mapStateToProps)(LayoutComponent)
