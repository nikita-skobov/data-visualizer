import React, { Component } from 'react'

import CanvasVisualizer from './components/CanvasVisualizer'

export default function App() {
  const testSize = 100
  const arr = [...Array(testSize).keys()]
  arr.forEach((key) => {
    arr[key] = Math.floor(Math.random() * 255)
  })

  const testData = new Uint8Array(arr)

  return (
    <CanvasVisualizer data={testData} columns={10} />
  )
}

// export default class App extends Component {
//   render() {
//     return (
//       <CanvasVisualizer columns={10} />
//     )
//   }
// }
