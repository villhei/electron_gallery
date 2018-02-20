import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import App from 'renderer/App'
import reducer from 'renderer/reducer'
import setupIpc from 'renderer/ipc'
import 'renderer/style.css'

const rootDiv = document.getElementById('root') as HTMLElement
const store = createStore(reducer)

setupIpc(store.dispatch)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootDiv)

