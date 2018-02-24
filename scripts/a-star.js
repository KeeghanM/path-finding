let width = 10;
let height = 10;
let start = {x:3,y:4};
let end = {x:8,y:7};

// Generate the world array and fill it with 0's (empty)
let world = createArray(width,height);
fill(world,0);

// Mark the start (1) and end (2 positions)
world[start.x][start.y] = 1;
world[end.x][end.y] = 2;

// A-STAR






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