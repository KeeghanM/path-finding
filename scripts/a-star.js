class Node {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.parent = null
    this.obstacle = false

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
	let rowLimit = grid.length-1;
	let columnLimit = grid[0].length-1;

	let i = this.x
	let j = this.y

	for(var x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
	    for(var y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
	      if(x !== i || y !== j) {
	        neighbours.push(grid[x][y])
	      }
	    }
	  }

    return neighbours
  }
  setObstacle(bool) {
	this.obstacle = bool
  }
}

class Grid {
  constructor (w, h) {
    this.grid = this.createArray(w, h)
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

  createObstacles(x){
  	for (var i = 0; i < x; i++) {
  		let randX = Math.floor(Math.random() * this.grid.length)
  		let randY = Math.floor(Math.random() * this.grid[randX].length)
  		this.grid[randX][randY].setObstacle(true)
  	}
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
        if(n.obstacle){
        	tempG = Infinity
        }
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
      if (node.f <= lowestF) {
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
