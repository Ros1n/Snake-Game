(function() {
	// initialise necessary global variables
	let myCanvas = document.getElementById('mc'); //please read through introduction of JS-canvas
	let ctx = myCanvas.getContext('2d'); //create cantext instance
	let size = 500, sz = snakeSize = 10, score = 0, snake; //2x resolution for retina screens look
	//let myCanvas.height = myCanvas.width = size * 2, myCanvas.style.width = myCanvas.style.height = size + 'px';
	let direction = newDirection = 1, end = false, length = 4;
	ctx.scale(2, 2); //scale canvas for retina screens

	//put basic elements inside this module
	function bodySnake(x, y){
		ctx.fillStyle = 'green'; //fill color
		//fill a single rectangle with sz x sz and start at (x*sz, y*sz)
		ctx.fillRect(x*sz, y*sz, sz, sz);
		ctx.strokeStyle = 'darkgreen'; // border of the grid
		ctx.strokeRect(x*sz, y*sz, sz, sz);
	}

	function candy(x, y){
		ctx.fillStyle = 'yellow'; //border of candy
		ctx.fillRect(x*sz, y*sz, sz, sz);
		ctx.fillStyle = '#b58900'; // single grid of cnady
		ctx.fillRect(x*sz+1, y*sz+1, sz-2, sz-2);
	}

	//position of candy --> must not repeat with snake
	function createCandy(){
		candy = {
			x: Math.floor((Math.random()*(size/sz))+1), y: Math.floor((Math.random()*(size/sz))+1)
		}
		if (snake.includes(candy)){
			return createCandy();
		}else{
			return candy;
		}
	}

	//main function
	function game(){
		//initialize space/area
		ctx.fillStyle = '#002b36';
		ctx.fillRect(0, 0, size, size); //draw the space/area of game
		ctx.strokeStyle = 'black';
		ctx.strokeRect(0, 0, size, size); //the border of area

		//initialize snake, structure of snake
		snake = [{x: size/2, y: size/2}];
		for (let i = length; i >= 0; i--){
			snake.push( {x:i, y:0} ); //push 5 grids inside array with given coordinate
			bodySnake(i, 0);
		}
		let newHead = {x: snake[0].x, y: snake[0].y};

		//initialize scoreboard 
		let score_text = "Score: " + score;
		ctx.fillStyle = 'blue';
		ctx.font = '40px serif';
		ctx.fillText(score_text, size-5, size-5); //write text at position(w-5, h-5)		

		while (!candy) candy = createCandy();

		if (Math.abs(direction) !== Math.abs(newDirection)){
			direction = newDirection;
		}
		let axis = Math.abs(direction) === 1 ? 'x' : 'y';
		if (direction < 0){
			newHead[axis] -= sz;
		}else{
			newHead[axis] += sz;
		}

		if (candy && candy.x === newHead.x && candy.y === newHead.y){
			candy = null;
			length += sz;
		}

		if (newHead.x < 0) newHead.x = size-1;
		if (newHead.x >= size) newHead.x = 0;
		if (newHead.y < 0) newHead.y = size-1;
		if (newHead.y >= size) newHead.y = 0;
	}

	window.onload = function() {
		setInterval(game, 100);
		window.onkeydown = function(e) {
			newDirection = {37:-1, 38:-2, 39:1, 40:2}[e.keyCode] || newDirection;
		};
	};
})();