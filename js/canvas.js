const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
	x: 0,
	y: 0
};

let date = new Date();
let startTime = date.getTime();

//////////////////EVENT LISTENERS

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});



window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	document.querySelector('h1').innerHTML = `${mouse.x}, ${mouse.y}`;
	waves = mouse.x;
});

///////////////// OBJECTS

class Shape{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	update(){

	}

	draw(){

	}
}

class Circle extends Shape{
	constructor(x,y){
		super(x,y);
		this.radius = 5;
	}

	draw(){
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.stroke();
	}

	update(){
		let timeSince = new Date().getTime() - startTime;
		//console.log(timeSince);
		//this.radius = Math.abs(Math.sin((timeSince)/600))*20+10;
		let rigidity = 50;
		//this.y *= Math.sin(timeSince);//Math.sin(this.x/rigidity+(timeSince)/100);
		//console.log(mouse);
		this.x = (this.x + mouse.x/100)%canvas.width;
		this.y = 
	}
}

class MouseFollowingCircle extends Circle{
	constructor(x, y){
		super(x,y);
	}
	draw(){
		context.beginPath();
		context.arc(mouse.x, mouse.y, 50, 0, 2 * Math.PI);
		context.stroke();
	}
}

/////////////// MAIN

let numCircles = canvas.width/500;
let height = canvas.height/2;
let amplitude = 200;
let waves = Math.PI/(numCircles * 50);

let circles = [];

for(let x = 0; x <= canvas.width; x+= numCircles){
	circles.push(new Circle(x, amplitude*Math.sin(waves*x)+height));
}

function animate(){
	window.requestAnimationFrame(animate);
	context.clearRect(0,0,canvas.width, canvas.height);
	for(let c of circles){
		c.draw();
		c.update();
	}
}


animate();