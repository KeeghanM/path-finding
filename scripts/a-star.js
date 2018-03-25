class Node {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.parent = null

    // G == Cost from start to this node
    this.g = Infinity

    // H == Heuristic from this node to end
    this.h = 0

    // F == total cost to use this node
    this.f = 0
    this.calcF()
  }

  calcF () {
    this.f = this.g + this.h
  }
  calcG (start) {
    // Manhatten distance between the START node and THIS node
    this.g = Math.abs(start.x - this.x) + Math.abs(start.y - this.y)
  }
  calcH (target) {
    // Manhatten distance between THIS node and the TARGET node
    this.h = Math.abs(this.x - target.x) + Math.abs(this.y - target.y)
  }
  getNeighbours (grid) {
    let neighbours = []
    neighbours.push(grid[this.x - 1][this.y])
    neighbours.push(grid[this.x - 1][this.y - 1])
    neighbours.push(grid[this.x - 1][this.y + 1])
    neighbours.push(grid[this.x][this.y - 1])
    neighbours.push(grid[this.x][this.y + 1])
    neighbours.push(grid[this.x + 1][this.y])
    neighbours.push(grid[this.x + 1][this.y - 1])
    neighbours.push(grid[this.x + 1][this.y + 1])
    return neighbours
  }
}

class Grid {
  constructor (w, h) {
    return this.createArray(w, h)
  }

  createArray (w, h) {
	    let arr = new Array(w)
	    for (var i = 0; i < arr.length; i++) {
	    	arr[i] = new Array(h)
	    	for (var j = 0; j < arr[i].length; j++) {
	    		arr[i][j] = new Node(i, j)
	    	}
	    }
	    return arr
  }
}

class AStarPath {
  constructor (arr, sx, sy, tx, ty) {
    this.path = []
    this.grid = arr
    this.start = this.grid[sx][sy]
    this.end = this.grid[tx][ty]

    return this.findPath()
  }

  findPath () {
    let found = false
    let closedSet = []
    let openSet = []

    this.start.calcG(this.start)
    this.start.calcH(this.end)
    this.start.calcF(this.start)
    openSet.push(this.start)

    while (openSet.length > 0) {
      let current = this.lowestF(openSet)
      if (current == this.end) {
        return this.constructPath()
      }

      openSet.splice(current)
      closedSet.push(current)

      for (let n of current.getNeighbours(this.grid)) {
        // Ignore already checked ones
        if (closedSet.includes(n)) {
          continue
        }

        n.calcH(this.end)

        // Discover new ones
        if (!openSet.includes(n)) {
          openSet.push(n)
        }

        let tempG = current.g + this.getDistance(current, n)
        if (tempG > n.g) {
          continue
        }

        n.parent = current
        n.g = tempG
        n.calcF()
      }
    }
  }

  lowestF (set) {
    let lowestF = Infinity
    let lowestNode = null
    for (let node of set) {
      if (node.f < lowestF) {
        lowestF = node.f
        lowestNode = node
      }
    }
    return lowestNode
  }

  getDistance (c, n) {
    return Math.abs(c.x - n.x) + Math.abs(c.y - n.y)
  }

  constructPath () {
    let done = false
    let current = this.end
    this.path.push(current)

    while (!done) {
      current = current.parent
      this.path.push(current)
      if (current == this.start) {
        done = true
      }
    }
    return this.path
  }
}
