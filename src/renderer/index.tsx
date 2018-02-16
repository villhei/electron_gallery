import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from 'renderer/App'

const rootDiv = document.getElementById('root') as HTMLElement

ReactDOM.render(<App />, rootDiv)
