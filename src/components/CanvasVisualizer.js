import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { defaultColorProfile } from '../utils/ColorProfile'

export default class CanvasVisualizer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: props.data,
      columns: props.columns,
      colorProfile: props.colorProfile,
    }
  }

  componentDidMount() {
    const { canvasNode } = this
    console.log(canvasNode)
  }

  render() {
    const { columns, colorProfile, data } = this.state
    console.log(columns)
    console.log(data)

    const createColorDiv = (str, w, h) => (
      <div style={{ backgroundColor: str, width: w, height: h }} />
    )

    const divArr = []

    data.forEach((key) => {
      divArr.push(createColorDiv(colorProfile[key], '50px', '20px'))
    })

    console.log(divArr)

    return (
      <div>
        <canvas ref={(node) => { this.canvasNode = node }} id="canvas" />
      </div>
    )
  }
}

CanvasVisualizer.defaultProps = {
  colorProfile: defaultColorProfile(),
}

CanvasVisualizer.propTypes = {
  columns: PropTypes.number.isRequired,
  colorProfile: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Uint8Array).isRequired,
}
