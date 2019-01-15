import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { defaultColorProfile } from '../utils/ColorProfile'

export default class CanvasVisualizer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: props.columns,
      colorProfile: props.colorProfile,
    }
  }

  render() {
    const { columns, colorProfile } = this.state
    console.log(columns)
    console.log(colorProfile)

    return (
      <div>
        dsadsadsa
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
}
