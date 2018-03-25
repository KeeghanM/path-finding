let world
let path
let start = new Node(1, 1)
let end
let cellSize

function setup () {
  let worldWidth = 10
  let worldHeight = 10
  end = new Node(8, 8)

  // Generate the world array and fill it with 0's (empty)
  world = new Grid(worldWidth, worldHeight) // TODO: Add Obstacles
  // Calculate Path
  path = new AStarPath(world, start.x, start.y, end.x, end.y)

  createCanvas(400, 400)
  background('#aaa')
  cellSize = width / worldWidth
}

function draw () {
  for (var i = 0; i < world.length; i++) {
    for (var j = 0; j < world[i].length; j++) {
      let node = world[i][j]
      stroke(0)
      strokeWeight(3)
      fill(255)
      if (node.x == start.x && node.y == start.y) {
        fill(0, 255, 0)
      }
      if (node.x == end.x && node.y == end.y) {
        fill(0, 0, 255)
      }
      rect(node.x * cellSize, node.y * cellSize, cellSize, cellSize)
    }
  }

  for (var i = 1; i < path.length - 1; i++) {
    fill(150)
    rect(path[i].x * cellSize, path[i].y * cellSize, cellSize, cellSize)
  }
}

function mousePressed () {
  let x = Math.round(winMouseX / cellSize) - 1
  let y = Math.round(winMouseY / cellSize) - 1
  end = new Node(x, y)
  window.console.log(end)
  path = new AStarPath(world, start.x, start.y, end.x, end.y)
}

function clamp (num, min, max) {
  return num <= min ? min : num >= max ? max : num
}
