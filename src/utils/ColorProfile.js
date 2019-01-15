export function getColorFromObject(obj) {
  return `rgb(${obj.r}, ${obj.g}, ${obj.b})`
}

export function newNonFixedValue(currentNonFixedValue, direction) {
  // note that this direction is different from the direction of the profile
  // generating function.
  let newValue = ''
  const oldValue = currentNonFixedValue.toLowerCase()

  if (direction > 0) {
    // B -> R -> G -> B, etc.
    if (oldValue === 'r') {
      newValue = 'g'
    } else if (oldValue === 'g') {
      newValue = 'b'
    } else if (oldValue === 'b') {
      newValue = 'r'
    }
  } else if (direction < 0) {
    // G -> R -> B -> G, etc.
    if (oldValue === 'r') {
      newValue = 'b'
    } else if (oldValue === 'g') {
      newValue = 'r'
    } else if (oldValue === 'b') {
      newValue = 'g'
    }
  }

  return newValue
}

export function defaultColorProfile() {
  // get an array of bytes from 0 to 255
  const iterator = [...Array(256).keys()]

  const profile = {}
  const jumpDirection = 1
  const color = {
    r: 0,
    g: 255,
    b: 255,
  }
  let nonFixedValue = 'b'
  let direction = -1
  const jumpBy = 3

  iterator.forEach((byte) => {
    profile[byte] = getColorFromObject(color)

    color[nonFixedValue] += (jumpBy * direction)

    if (direction > 0) {
      if (color[nonFixedValue] > 255) {
        color[nonFixedValue] = 255
        direction = -1
        nonFixedValue = newNonFixedValue(nonFixedValue, jumpDirection)
      }
    } else if (direction < 0) {
      if (color[nonFixedValue] < 0) {
        color[nonFixedValue] = 0
        direction = 1
        nonFixedValue = newNonFixedValue(nonFixedValue, jumpDirection)
      }
    }
  })

  return profile
}
