import React, { Component } from 'react'

import {
  Row,
  Col,
  Form,
  FormGroup,
  CustomInput,
} from 'reactstrap'

import CanvasVisualizer from './components/CanvasVisualizer'

export default function App() {
  const testSize = 100
  const arr = [...Array(testSize).keys()]
  arr.forEach((key) => {
    arr[key] = Math.floor(Math.random() * 255)
  })

  const testData = new Uint8Array(arr)

  return (
    <Col fluid>
      <Row>
        <Form>
          <FormGroup>
            <CustomInput type="file" label="Choose a file" id="filebrowser" name="customFileBrowser" />
          </FormGroup>
        </Form>
      </Row>
      <Row>
        <CanvasVisualizer data={testData} columns={10} />
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
