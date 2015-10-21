// Game vars //
var canvas;
var ctx;
var width;
var height;
var frames = 0;
var score = 0;
var best = localStorage.getItem("best") || 0;

// State vars //
var currentstate;
var states = {
	Splash: 0, Game: 1, Score: 2
}

// Game objects //

/**
 * The MAN
 */
var man = {

	x: 60,
	y: 0,

	frame: 0,
	velocity: 0,
	animation: [0, 1, 2, 1], // animation sequence

	rotation: 0,
	radius: 12,

	gravity: 0.25,
	_fly: 4.6,

	/**
	 * Makes the man fly
	 */
	fly: function() {
		this.velocity = -this._fly;
	},

	/**
	 * Update sprite animation and position of man
	 */
	update: function() {
		// make sure animation updates and plays faster in gamestate
		var n = currentstate === states.Splash ? 10 : 5;
		this.frame += frames % n === 0 ? 1 : 0;
		this.frame %= this.animation.length;

		// in splash state make man hover up and down and set
		// rotation to zero
		if (currentstate === states.Splash) {

			this.y = height - 280 + 5*Math.cos(frames/10);
			this.rotation = 0;

			this.velocity += this.gravity;
			this.y += this.velocity;

			if (this.y >= height ) {
				this.y = height ;
			}

			
		}
	},

	/**
	 * Draws man with rotation/tansformation to canvas ctx
	 * 
	 * @param  {CanvasRenderingContext2D} ctx the context used for
	 *                                        drawing
	 */
	draw: function(ctx) {

		var n = this.animation[this.frame];
		// draws the man with center in origo
		s_GaCoMan[n].draw(ctx, -s_GaCoMan[n].width/2, -s_GaCoMan[n].height/2);

	}
}


/**
 * Called on mouse or touch press. Update and change state
 * depending on current game state.
 * 
 * @param  {MouseEvent/TouchEvent} evt tho on press event
 */
function onpress(evt) {

	switch (currentstate) {

		// change state and update man velocity
		case states.Splash:
			currentstate = states.Game;
			man.fly();
			break;

		// update man velocity
		case states.Game:
			man.fly();
			break;

		// change state if event within okbtn bounding box
		case states.Score:
			// get event position
			var mx = evt.offsetX, my = evt.offsetY;

			if (mx == null || my == null) {
				mx = evt.touches[0].clientX;
				my = evt.touches[0].clientY;
			}

			// check if within
			if (okbtn.x < mx && mx < okbtn.x + okbtn.width &&
				okbtn.y < my && my < okbtn.y + okbtn.height
			) {
				currentstate = states.Splash;
				score = 0;
			}
			break;

	}
}

/**
 * Starts and initiate the game
 */
function main() {
	// create canvas and set width/height
	canvas = document.createElement("canvas");

	width = window.innerWidth;
	height = window.innerHeight;

	var evt = "touchstart";
	if (width >= 500) {
		width  = 320;
		height = 480;
		canvas.style.border = "1px solid #000";
		evt = "mousedown";
	}

	// listen for input event
	document.addEventListener(evt, onpress);

	canvas.width = width;
	canvas.height = height;
	if (!(!!canvas.getContext && canvas.getContext("2d"))) {
		alert("Your browser doesn't support HTML5, please update to latest version");
	}
	ctx = canvas.getContext("2d");
	currentstate = states.Splash;
	// append canvas to document
	document.body.appendChild(canvas);

	// initate graphics and okbtn
	var img = new Image();
	img.onload = function() {
		initSprites(this);
		ctx.fillStyle ="blue";
		run();
	}
	img.src = "res/sheet.png";

}

/**
 * Starts and update gameloop
 */
function run() {
	var loop = function() {
		update();
		render();
		window.requestAnimationFrame(loop, canvas);
	}
	window.requestAnimationFrame(loop, canvas);
}

/**
 * Update man position
 */
function update() {
	frames++;

	if (currentstate == states.Score) {
		
	} else {
		// set best score to maximum score
		best = Math.max(best, score);
		localStorage.setItem("best", best);
	}
	if (currentstate === states.Game) {
		
	}

	man.update();
}

/**
 * Draws man and assets to the canvas
 */
function render() {
	// draw background color
	ctx.fillRect(0, 0, width, height);
	man.draw(ctx);
	var width2 = width/2; // center of canvas

	if (currentstate === states.Splash) {
		// draw splash text and sprite to canvas
		

	}
	if (currentstate === states.Score) {
		// draw gameover text and score board
		
		// draw score and best inside the score board
		

	} else {
		// draw score to top of canvas
		

	}
}

// start and run the game
main();