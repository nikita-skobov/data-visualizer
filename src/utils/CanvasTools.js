export function clearContext(ctx, width, height) {
  ctx.clearRect(0, 0, width, height)
}

export function drawRow(ctx, boxWidth, boxHeight, rowOffset, data) {
  let currentX = 0
  const currentY = rowOffset
  data.forEach((color) => {
    ctx.fillStyle = color
    ctx.fillRect(currentX, currentY, boxWidth, boxHeight)
    currentX += boxWidth
  })
}
