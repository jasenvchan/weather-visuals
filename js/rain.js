const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --OBJECTS--
class Raindrop {
	

	constructor(x){
		this.x = x;
		this.y = 0;
		this.color = '#C7C7C7';
		this.velocity = 25;
		this.dropSize = 25;
		this.angle = 0.45*Math.PI+Math.random()*Math.PI*0.1; //0 radians is 90 degrees east where north is directly up on the screen
	}

	draw(){
		context.beginPath();
		context.moveTo(this.x, this.y);
		let endX = this.x + this.dropSize * Math.cos(this.angle);
		let endY = this.y + this.dropSize * Math.sin(this.angle);
		context.lineTo(endX, endY);
		context.strokeStyle = "gray";
		context.stroke();
	}

	move(){
		this.x += this.velocity * Math.cos(this.angle);
		this.y += this.velocity * Math.sin(this.angle);
	}

	updateValue(valueName, value){
		if(typeof this[`${valueName}`] !== typeof value) throw "Unable to update value: type mismatch";

		this[`${valueName}`] = value;
	}

}

// --MAIN--

const minDrops = 100;
const maxAdd = 3;

let raindrops = new Set();

let generateDrop = () => new Raindrop(Math.random()*canvas.width);

function addDrops(){
	if(raindrops.size >= minDrops) return;

	for(let i = 0; i < Math.random() * maxAdd; i++){
		raindrops.add(generateDrop());
	}
}


function animate(){
	window.requestAnimationFrame(animate);
	context.clearRect(0,0,canvas.width, canvas.height);
	addDrops();
	for(let drop of raindrops){
		drop.move();
		if(drop.y > canvas.height || drop.x > canvas.width || drop.x < 0) raindrops.delete(drop);
		else drop.draw();
	}
}

animate();