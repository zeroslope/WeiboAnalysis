import React, { Component } from 'react'
import { Axis, Chart, Tooltip, Geom, Coord, Legend, Label } from 'bizcharts'
import DataSet from '@antv/data-set'
const { DataView } = DataSet

class Pie extends Component {
  render () {
    const data = this.props.data
    const dv = new DataView()
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    })
    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100).toFixed(2) + '%'
          return val
        }
      }
    }
    return (
      <Chart
        height={400}
        data={dv}
        scale={cols}
        padding={[80, 100, 80, 80]}
        forceFit
      >
        <Coord type='theta' radius={0.80} />
        <Axis name='percent' />
        {/* <Legend
          position='right'
          offsetY={-400 / 2 + 120}
          offsetX={-100}
        /> */}
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>'
        />
        <Geom
          type='intervalStack'
          position='percent'
          color='item'
          tooltip={[
            'item*percent',
            (item, percent) => {
              percent = (percent * 100).toFixed(2) + '%'
              return {
                name: item,
                value: percent
              }
            }
          ]}
          style={{
            lineWidth: 1,
            stroke: '#fff'
          }}
        >
          <Label
            content='percent'
            formatter={(val, item) => {
              return item.point.item + ': ' + val
            }}
          />
        </Geom>
      </Chart>
    )
  }
}

export default Pie
