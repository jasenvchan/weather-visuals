const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --OBJECTS--
class Snowflake {
	

	constructor(x){
		this.x = x;
		this.y = 0;
		this.color = '#FFFFFF';
		this.velocity = 1+Math.random() * 3;
		this.size = 3 + Math.random()*10;
		//0 radians is 90 degrees east where north is directly up on the screen
	}

	draw(){
		context.beginPath();
		
		//top to bot
		context.moveTo(this.x, this.y-this.size/2);
		context.lineTo(this.x, this.y + this.size/2);

		//left to right
		context.moveTo(this.x-this.size/2, this.y);
		context.lineTo(this.x+this.size/2, this.y);

		//northwest to southest
		let endX = this.size/2 * Math.cos(Math.PI/4);
		let endY = this.size/2 * Math.sin(Math.PI/4);

		context.moveTo(this.x + endX, this.y + endY);
		context.lineTo(this.x - endX, this.y - endY);

		//northeast to southwest
		context.moveTo(this.x + (this.size/2 * Math.cos(7 * Math.PI/4)), this.y + (this.size/2 * Math.sin(7 * Math.PI/4)));
		context.lineTo(this.x - (this.size/2 * Math.cos(7 * Math.PI/4)), this.y - (this.size/2 * Math.sin(7 * Math.PI/4)));

		//draw it
		context.strokeStyle = "white";
		context.stroke();
	}

	move(){
		this.y += this.velocity;
	}
}

// --MAIN--

const minFlakes = 500;
const maxAdd = 3;
const baseVelocity = 50;


let snowflakes = new Set();

let generateFlake = () => new Snowflake(Math.random()*canvas.width);

function addFlakes(){
	if(snowflakes.size >= minFlakes) return;

	for(let i = 0; i < Math.random() * maxAdd; i++){
		snowflakes.add(generateFlake());
	}
}


function animate(){
	window.requestAnimationFrame(animate);
	context.clearRect(0,0,canvas.width, canvas.height);
	addFlakes();
	for(let flake of snowflakes){
		flake.move();
		if(flake.y > canvas.height || flake.x > canvas.width || flake.x < 0) snowflakes.delete(flake);
		else flake.draw();
	}
}

animate();