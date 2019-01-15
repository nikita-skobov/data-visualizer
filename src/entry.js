/* global document */
import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const reactContainer = document.getElementById('react-container')

ReactDOM.render(<App />, reactContainer)
