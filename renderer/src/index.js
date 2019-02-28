import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import '../assets/less/antd-custom.less'
import 'tachyons/css/tachyons.css'
import '../assets/css/style.css'
import App from './App'

import rootReducer from './rootReducer'
const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
)
