let width = 10;
let height = 10;
let start = {x:3,y:4};
let end = {x:8,y:7};

// Generate the world array and fill it with 0's (empty)
let world = createArray(width,height);
fill(world,0);

// Create obstacles
// TODO

// A-STAR
let path = aStarPath(world,start,end);

// log(path);

function aStarPath(arr,start,end){
	// Set of nodes already evaluated (currently none)
	let closedSet = new Array();

	// The set of currently discovered nodes that are not evaluated yet.
	let openSet = new Array();
    // Initially, only the start node is known.
	openSet.push(start);

	// For each node, which node it can most efficiently be reached from.
	let cameFrom = createArray(arr.length,arr[0].length);

	// The cost of getting to each node
	// This begins at infinity and will slowly work down
	let gScore = createArray(arr.length,arr[0].length);
	fill(gScore,Infinity);
	// The score of start->start is 0
	gScore[start.x][start.y] = 0;

	// For each node, the total cost of getting from the start node to the goal
    // by passing by that node. That value is partly known, partly heuristic.
    let fScore = createArray(arr.length,arr[0].length);
	fill(gScore,Infinity);
	// For the first node, that value is completely heuristic.
	fScore[start.x][start.y] = heuristicCalculation(start,end);

	// While we still have things to evaluate,
	// we should.... evaluate them!
	while(openSet.length>0){

	}



}

function heuristicCalculation(node,target) {
	// Using manhattan distance, with a cost of 1
	return Math.abs(node.x - target.x)+Math.abs(node.y - target.y);
}

// HELPER FUNCTIONS
function log(x) {
	window.console.log(x);
}
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
function fill(a,x){
	for (var i = a.length - 1; i >= 0; i--) {
		for (var j = a[i].length - 1; j >= 0; j--) {
			a[i][j] = x;
		}
	}
}