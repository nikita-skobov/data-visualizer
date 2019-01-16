/* global FileReader */
import React, { Component } from 'react'

import {
  Row,
  Col,
  Form,
  FormGroup,
  CustomInput,
  Input,
} from 'reactstrap'

import CanvasVisualizer from './components/CanvasVisualizer'

export default function App() {
  const testSize = 10000
  const arr = [...Array(testSize).keys()]
  arr.forEach((key) => {
    arr[key] = Math.floor(Math.random() * 255)
  })

  const testData = new Uint8Array(arr)

  const defaultColumnCount = 35

  const handleFile = (e) => {
    e.preventDefault()
    const { target } = e
    const { files } = target
    const [file] = files

    const reader = new FileReader()
    reader.onload = (res) => {
      const { result } = res.target
      const uArr = new Uint8Array(result)
      window.CanvasVisualizer.changeData(uArr)
    }
    reader.readAsArrayBuffer(file)
  }

  const handleColChange = (e) => {
    e.preventDefault()
    const { target } = e
    const { value } = target
    const newColCount = parseInt(value, 10)
    console.log(newColCount)
    window.CanvasVisualizer.changeColumns(newColCount)
  }


  return (
    <Col fluid>
      <Row>
        <Form>
          <FormGroup>
            <CustomInput onChange={handleFile} type="file" label="Choose a file" id="filebrowser" name="customFileBrowser" />
          </FormGroup>
          <Input type="number" defaultValue={defaultColumnCount} onChange={handleColChange} placeholder="Change Column Count" />
        </Form>
      </Row>
      <Row>
        <CanvasVisualizer boxWidth={2} boxHeight={2} data={testData} columns={defaultColumnCount} />
      </Row>
    </Col>
  )
}

// export default class App extends Component {
//   render() {
//     return (
//       <CanvasVisualizer columns={10} />
//     )
//   }
// }
