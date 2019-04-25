/** @jsx jsx */
// import { resolve } from '../helpers'
import { Component } from 'react'
import { jsx, css } from '@emotion/core' // eslint-disable-line
import { Link } from 'react-router-dom'
import Jelly1 from '../../assets/image/jelly1.png'
import Jelly2 from '../../assets/image/jelly2.png'
import iconPng from '../../assets/image/icon.png'
import { Icon } from 'antd'

class Index extends Component {
  render () {
    return (
      <div className='absolute absolute--fill'>
        <img src={Jelly1} css={css`
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 30%;
          z-index: -1;
        `} />
        <img src={Jelly2} css={css`
          display: block;
          position: absolute;
          bottom: 0;
          right: 0;
          width: 30%;
          z-index: -1;
        `} />

        <div css={css`
          position: absolute;
          top: 0.75rem;
          left: 0.5rem;
        `}>
          <span css={css`
            padding-left: 0.75rem;
            font-size: 1.5rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.85);
            text-shadow: 0 12px 20px rgba(255, 255, 255, 0.1);
          `}>Dear, welcome back!</span>
        </div>

        <div className='flex flex-auto justify-between align-center' css={css`
          position: absolute;
          top: 0.75rem;
          right: 6rem;
          width: 256px;
        `}>
          <Icon type='weibo' className='f2' />
          <Icon type='wechat' className='f2' />
          <Icon type='line-chart' className='f2' />
        </div>

        <div css={css`
          position: absolute;
          top: 35%;
          right: 10%;
        `}>
          <h1 className='avenir f2 fw7'>
            群力数据系统
          </h1>

          <Link to='/home'>
            <div className='hover-underline f3' css={css`
              max-width: max-content;
              margin-left: auto;
            `}>
              即刻开始 <Icon type='arrow-right' />
            </div>
          </Link>
        </div>

      </div>
    )
  }
}

export default Index
