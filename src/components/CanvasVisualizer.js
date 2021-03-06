import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { defaultColorProfile } from '../utils/ColorProfile'

import { drawRow, clearContext } from '../utils/CanvasTools'

export default class CanvasVisualizer extends Component {
  constructor(props) {
    super(props)

    // this.brain = props.brain
    // this.brain.store('CanvasVisualizer', this)
    window.CanvasVisualizer = this

    this.state = {
      data: props.data,
      columns: props.columns,
      colorProfile: props.colorProfile,
      boxWidth: props.boxWidth,
      boxHeight: props.boxHeight,
      rows: [],
      canvasWidth: 0,
      canvasHeight: 0,
    }

    this.makeRows = this.makeRows.bind(this)
    this.recalculateCanvasDimensions = this.recalculateCanvasDimensions.bind(this)
    this.rebuildCanvas = this.rebuildCanvas.bind(this)

    const rows = this.makeRows()
    this.state.rows = rows
    const { canvasHeight, canvasWidth } = this.recalculateCanvasDimensions(rows)
    this.state.canvasHeight = canvasHeight
    this.state.canvasWidth = canvasWidth

    // setInterval(() => {
    //   console.log('changing state')

    //   const testSize = Math.floor(Math.random() * 30000) + 10
    //   const arr = [...Array(testSize).keys()]
    //   arr.forEach((key) => {
    //     arr[key] = Math.floor(Math.random() * 255)
    //   })

    //   const testData = new Uint8Array(arr)

    //   const rows = this.makeRows();
    //   console.log('GOT ROWS');
    //   ({ canvasHeight, canvasWidth } = this.recalculateCanvasDimensions(rows))
    //   console.log('GOT CANVAS DIMS:')
    //   console.log(canvasHeight, canvasWidth)

    //   this.setState({ data: testData, rows, canvasHeight, canvasWidth })
    // }, 15000)
  }

  componentDidMount() {
    this.componentDidUpdate()
  }

  componentDidUpdate() {
    const { canvasNode } = this
    this.ctx = canvasNode.getContext('2d')
    const { canvasHeight, canvasWidth, boxHeight, boxWidth, rows } = this.state
    clearContext(this.ctx, canvasWidth, canvasHeight)

    let rowOffset = 0
    rows.forEach((row) => {
      drawRow(this.ctx, boxWidth, boxHeight, rowOffset, row)
      rowOffset += boxHeight
    })
  }

  recalculateCanvasDimensions(rows) {
    const { columns, boxWidth, boxHeight } = this.state
    const canvasWidth = columns * boxWidth
    const canvasHeight = rows.length * boxHeight

    return { canvasWidth, canvasHeight }
  }

  rebuildCanvas() {
    const { data } = this.state
    const rows = this.makeRows()
    const { canvasHeight, canvasWidth } = this.recalculateCanvasDimensions(rows)

    this.setState({ data, rows, canvasHeight, canvasWidth })
  }

  changeColumns(newColCount) {
    this.setState((prevState) => {
      const tempState = prevState
      tempState.columns = newColCount
      return tempState
    }, () => {
      this.rebuildCanvas()
    })
  }

  changeData(newData) {
    this.setState((prevState) => {
      const tempState = prevState
      tempState.data = newData
      return tempState
    }, () => {
      this.rebuildCanvas()
    })
  }

  makeRows() {
    const { data, columns, colorProfile } = this.state
    const rows = [[]]
    let currentRowIndex = 0

    data.forEach((key) => {
      if (rows[currentRowIndex].length >= columns) {
        currentRowIndex += 1
        rows.push([])
      }

      rows[currentRowIndex].push(colorProfile[key])
    })

    return rows
  }

  render() {
    const {
      canvasHeight,
      canvasWidth,
    } = this.state

    return (
      <div>
        <canvas width={canvasWidth} height={canvasHeight} ref={(node) => { this.canvasNode = node }} id="canvas" />
      </div>
    )
  }
}

CanvasVisualizer.defaultProps = {
  colorProfile: defaultColorProfile,
  boxWidth: 10,
  boxHeight: 10,
}

CanvasVisualizer.propTypes = {
  boxWidth: PropTypes.number,
  boxHeight: PropTypes.number,
  columns: PropTypes.number.isRequired,
  colorProfile: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Uint8Array).isRequired,
  brain: PropTypes.instanceOf(Object).isRequired,
}
