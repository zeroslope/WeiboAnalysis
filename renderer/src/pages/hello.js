/** @jsx jsx */
// import { resolve } from '../helpers'
import { Component } from 'react'
import { jsx, css } from '@emotion/core' // eslint-disable-line
import { Link } from 'react-router-dom'
import Jelly1 from '../../assets/image/jelly1.png'
import Jelly2 from '../../assets/image/jelly2.png'
import icon from '../../assets/image/wwww.png'
import Version from '../../assets/image/version.png'
import good from '../../assets/image/good.png'
import { Icon } from 'antd'
import Name from '../../assets/image/name.png'

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
        <img src={good} css={css`
          display: block;
          position: absolute;
          bottom: 8%;
          right: 8%;
          z-index: 0;
          width: 200px;
        `} />
        <img src={Version} css={css`
          display: block;
          position: absolute;
          top: 1rem;
          right: 2rem;
          height: 2rem;
          z-index: 0;
        `} />
        <img src={icon} css={css`
          display: block;
          position: absolute;
          left: 1rem;
          bottom: 3rem;
          z-index: 0;
        `} />

        <div css={css`
          position: absolute;
          top: 40%;
          right: 10%;
          transform: translate(0, -50%);
        `}>
          <img src={ Name } css={css`
            width: 280px;
            margin-bottom: 16px;
          `} />

          <Link to='/home'>
            <div className='hover-underline f4 fw6' css={css`
              max-width: max-content;
              margin-left: auto;
              color: #0033ff;
            `}>
              <i>即刻开始</i> <Icon type='arrow-right' />
            </div>
          </Link>
        </div>

        <div css={css`
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
        `}>
          群力传媒内部单机版
        </div>

      </div>
    )
  }
}

export default Index
