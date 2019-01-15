import React, { Component } from 'react'

import CanvasVisualizer from './components/CanvasVisualizer'

export default function App() {
  return (
    <CanvasVisualizer columns={10} />
  )
}

// export default class App extends Component {
//   render() {
//     return (
//       <CanvasVisualizer columns={10} />
//     )
//   }
// }
