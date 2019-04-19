import React, { Component } from 'react'
import { Chart, Geom, Coord, Shape } from 'bizcharts'
import cloud from '../../../assets/image/circle.jpeg'
import DataSet from '@antv/data-set'

function getTextAttrs (cfg) {
  return Object.assign(
    {},
    cfg.style,
    {
      fillOpacity: cfg.opacity,
      fontSize: cfg.origin._origin.size,
      rotate: cfg.origin._origin.rotate,
      text: cfg.origin._origin.text,
      textAlign: 'center',
      fontFamily: cfg.origin._origin.font,
      fill: cfg.color,
      textBaseline: 'Alphabetic'
    }
  )
}

// 给point注册一个词云的shape
Shape.registerShape('point', 'cloud', {
  drawShape (cfg, container) {
    const attrs = getTextAttrs(cfg)
    return container.addShape('text', {
      attrs: Object.assign(attrs, {
        x: cfg.x,
        y: cfg.y
      })
    })
  }
})

const scale = {
  x: {
    nice: false
  },
  y: {
    nice: false
  }
}

class Wordcloud extends Component {
  constructor () {
    super()
    this.state = {
      dv: null
    }
  }
  componentDidMount () {
    const dv = new DataSet.View().source(this.props.data)
    const range = dv.range('value')
    const min = range[0]
    const max = range[1]
    const imageMask = new window.Image()
    imageMask.crossOrigin = ''
    imageMask.src = cloud

    imageMask.onload = () => {
      dv.transform({
        type: 'tag-cloud',
        fields: ['x', 'value'],
        imageMask,
        size: [640, 320],
        font: 'Verdana',
        padding: 0,
        timeInterval: 5000,

        rotate () {
          let random = ~~(Math.random() * 4) % 4
          if (random === 2) {
            random = 0
          }
          return random * 90 // 0, 90, 270
        },

        fontSize (d) {
          if (d.value) {
            const divisor = (max - min) !== 0 ? (max - min) : 1
            return ((d.value - min) / divisor) * (48 - 16) + 16
          }
          return 0
        }
      })

      this.setState({
        dv
      })
    }
  }

  render () {
    const { dv } = this.state
    if (!dv) return null

    return (
      <div className='center' style={{
        width: '640px'
      }}>
        <Chart
          width={640}
          height={320}
          data={dv}
          scale={scale}
          padding={0}
          forceFit
        >
          <Coord reflect='y' />
          <Geom
            type='point'
            position='x*y'
            color='x'
            shape='cloud'
            // tooltip='value*category'
          />
        </Chart>
      </div>
    )
  }
}

export default Wordcloud
