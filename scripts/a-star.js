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
    let width = grid.length
    let height = grid[0].length

    let north = grid[this.x][this.y - 1]
    let northEast = grid[this.x + 1][this.y - 1]
    let northWest = grid[this.x - 1][this.y - 1]
    let east = grid[this.x + 1][this.y]
    let west = grid[this.x - 1][this.y]
    let south = grid[this.x][this.y + 1]
    let southEast = grid[this.x + 1][this.y + 1]
    let southWest = grid[this.x - 1][this.y + 1]

    if(north){
    	neighbours.push(north)
    }
    if(northEast){
    	neighbours.push(northEast)
    }
    if(northWest){
    	neighbours.push(northWest)
    }
    if(east){
    	neighbours.push(east)
    }
    if(west){
    	neighbours.push(west)
    }
    if(south){
    	neighbours.push(south)
    }
    if(southEast){
    	neighbours.push(southEast)
    }
    if(southWest){
    	neighbours.push(southWest)
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
      // if(current.obstacle){
      // 	continue
      // }
      if (current == this.end) {
        return this.constructPath()
      }

      openSet.splice(current)
      closedSet.push(current)

      window.console.log(current)
      for (let n of current.getNeighbours(this.grid)) {
        // Ignore already checked ones
        window.console.log(n)
        if (closedSet.includes(n)) {
          continue
        }

        n.calcH(this.end)

        // Discover new ones
        if (!openSet.includes(n)) {
          openSet.push(n)
        }

        let tempG = current.g + this.getDistance(current, n)
        if (tempG > n.g || n.obstacle == true) {
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
