export const mousePosition = {
  x: 0,
  y: 0,
}

document.addEventListener('mousemove', (event) => {
  mousePosition.x = event.x;
  mousePosition.y = event.y;
})