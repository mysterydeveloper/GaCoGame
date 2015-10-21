 

// Sprite vars //

var s_GaCoMan;
var s_buttons;
var s_background;
var s_forground;


/**
 * Simple sprite class
 * 
 * @param {Image}  img    spritesheet image
 * @param {number} x      x-position in spritesheet
 * @param {number} y      y-position in spritesheet
 * @param {number} width  width of sprite 
 * @param {number} height height of sprite
 */
function Sprite(img, x, y, width, height) {
	this.img = img;
	this.x = x*2;
	this.y = y*2;
	this.width = width*2;
	this.height = height*2;
};
/**
 * Draw sprite to the canvas context
 * 
 * @param  {CanvasRenderingContext2D} ctx context used for drawing
 * @param  {number} x   x-position on canvas to draw from
 * @param  {number} y   y-position on canvas to draw from
 */
Sprite.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height,x, y, this.width, this.height);
};

/**
 * Initate all sprite
 * 
 * @param  {Image} img spritesheet image
 */
function initSprites(img) {
 	s_GaCoMan = [
		new Sprite(img, 156, 115, 17, 12),
		new Sprite(img, 156, 128, 17, 12),
		new Sprite(img, 156, 141, 17, 12)
	];
	s_buttons = {
		Score: new Sprite(img,  79, 191, 40, 14),
		Ok:    new Sprite(img, 119, 191, 40, 14),
		Start: new Sprite(img, 159, 191, 40, 14)
	}
	s_background = new Sprite(img,   0, 0, 138, 114);
	s_background.color = "#70C5CF"; // save background color
	s_forground = new Sprite(img, 138, 0, 112,  56);

	
	
}