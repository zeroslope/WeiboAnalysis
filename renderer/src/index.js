import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import '../assets/less/antd-custom.less'
import 'tachyons/css/tachyons.css'
import '../assets/css/style.css'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

import App from './App'

import rootReducer from './rootReducer'

moment.locale('zh-cn')

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <HashRouter hashType='noslash'>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </LocaleProvider>,
  document.getElementById('root')
)
