import React from 'react'
import { Axis, Chart, Tooltip, Geom } from 'bizcharts'
import DataSet from '@antv/data-set'
import Slider from 'bizcharts-plugin-slider'

function getComponent (data) {
  if (data.length === 0) return null

  let newData = data.map(d => ({
    item: new Date(d.item+':00').getTime(),
    time: d.item+':00',
    value: d.value
  })).sort((a, b) => a.item - b.item)

  const ds = new DataSet({
    state: {
      start: newData[0].item,
      end: newData[newData.length - 1].item
    }
  })

  const dv = ds.createView('origin').source(newData)
  dv.transform({
    type: 'filter',
    callback (obj) {
      const time = obj.item
      return time >= ds.state.start && time <= ds.state.end
    }
  })

  const scale = {
    time: {
      type: 'time',
      tickCount: 8,
      mask: 'YYYY-MM-DD HH'
    },
    value: {
      min: 0
    }
  }

  // eslint-disable-next-line
  let chart

  class SliderChart extends React.Component {
    onChange (obj) {
      const { startValue, endValue } = obj
      ds.setState('start', startValue)
      ds.setState('end', endValue)
    }

    render () {
      return (
        <div>
          <Chart
            height={400}
            data={dv}
            padding={[40, 80, 60, 80]}
            scale={scale}
            onGetG2Instance={g2Chart => {
              g2Chart.animate(false)
              chart = g2Chart
            }}
            forceFit
          >
            <Axis name='value' />
            <Tooltip />
            <Geom
              type='line'
              size={1}
              position='time*value'
            />
          </Chart>
          <div>
            <Slider
              width='auto'
              height={26}
              padding={[0, 80, 0, 80]}
              start={ds.state.start}
              end={ds.state.end}
              xAxis='time'
              yAxis='value'
              scales={{
                time: {
                  type: 'time',
                  tickCount: 8
                }
              }}
              data={dv}
              backgroundChart={{
                type: 'line'
              }}
              onChange={this.onChange.bind(this)}
            />
          </div>
        </div>
      )
    }
  }
  return SliderChart
}

// class LineChart extends Component {
//   cols = {
//     value: {
//       min: 0
//     },
//     item: {
//       range: [0, 1],
//       tickCount: 10
//     }
//   }

//   render () {
//     const data = this.props.data
//     let newData = data.map(d => ({
//       item: new Date(d.item).getTime(),
//       value: d.value
//     })).sort((a, b) => a.item - b.item)
//     console.log('linechart', newData)
//     return (
//       <Chart
//         height={400}
//         data={data}
//         scale={this.cols}
//         padding={[20, 96, 96, 64]}
//         forceFit
//       >
//         <Axis name='item' />
//         <Axis name='value' />
//         <Tooltip
//           crosshairs={{
//             type: 'y'
//           }}
//         />
//         <Geom
//           type='line'
//           position='item*value'
//           size={2}
//           shape={'smooth'}
//         />
//         <Geom
//           type='point'
//           position='item*value'
//           size={1}
//           shape={'circle'}
//           style={{
//             stroke: '#eee',
//             lineWidth: 0.5
//           }}
//         />
//       </Chart>
//     )
//   }
// }

export default getComponent
