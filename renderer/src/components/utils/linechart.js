import React, { Component } from 'react'
import { Axis, Chart, Tooltip, Geom } from 'bizcharts'

class LineChart extends Component {
  cols = {
    value: {
      min: 0
    },
    item: {
      range: [0, 1],
      tickCount: 10
    }
  }

  render () {
    const data = this.props.data
    return (
      <Chart
        height={400}
        data={data}
        scale={this.cols}
        padding={[20, 48, 96, 64]}
        forceFit
      >
        <Axis name='item' />
        <Axis name='value' />
        <Tooltip
          crosshairs={{
            type: 'y'
          }}
        />
        <Geom
          type='line'
          position='item*value'
          size={2}
          shape={'smooth'}
        />
        <Geom
          type='point'
          position='item*value'
          size={2}
          shape={'circle'}
          style={{
            stroke: '#eee',
            lineWidth: 1
          }}
        />
      </Chart>
    )
  }
}

export default LineChart
