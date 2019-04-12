import React from 'react'

export const Text = ({ children }) => (
  <span className='f7'>{children}</span>
)

export const userMapper = {
  '-1': '普通用户',
  '0': '橙V',
  '1': '蓝V'

  // '0': '名人',
  // '1': '政府',
  // '2': '企业',
  // '3': '媒体',
  // '4': '校园',
  // '5': '网站',
  // '6': '应用',
  // '7': '团体(机构)',
  // '8': '待审企业',
  // '200': '初级达人',
  // '220': '中高级达人',
  // '400': '已故V用户'
}

export const typeMapper = {
  '-1': '用户抓取分析',
  '1': '综合抓取分析',
  '60': '热门抓取分析',
  '61': '实时抓取分析',
  '100': '用户转发分析',
  '101': '用户评论分析',
  '200': '微信'
}
