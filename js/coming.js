const log = console.log;

const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const cw = canvas.width;
const ch = canvas.height;
ctx.translate(canvas.width/2,canvas.height/2);

function random(min,max){
    return Math.random() * (max-min)+min;
}
function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    randomVelocity(min,max){
        return new Vector(random(min,max),random(min,max));
    }
    add(position){
        return new Vector(this.x + position.x, this.y + position.y);
    }
    getDistance(position){

    }
}

class Star{
    constructor(x,y){
        this.startPosition = new Vector(x,y);
        this.position = new Vector(x,y);
        this.radius = 1;
        this.speed = 5;
        this.velocity = new Vector(random(-this.speed, this.speed), random(-this.speed, this.speed));
        this.velocity.x * 2;
        this.velocity.y * 2; 
        this.hue = random(1,360).toFixed(2);
        this.saturation = 100;
        this.lightness = 50;
        this.opacity = 1;
        this.color = `hsl(${this.hue} ${this.saturation}% ${this.lightness}% / ${this.opacity})`;
    }
    isTouchingEdge(){
        return (this.position.x - this.radius/2 < -cw/2 || this.position.y - this.radius/2 < -ch/2 ||
                this.position.x + this.radius/2 > cw/2 || this.position.y + this.radius/2 > ch/2)
    }
    update(){
        if(this.isTouchingEdge()){
            //this.position = new Vector(random(-cw/2, cw/2), random(-ch/2, ch/2));
            this.radius++;
            //this.position = this.startPosition;
            this.position = new Vector(0,0);
        };
        this.position = this.position.add(this.velocity);
    }
    render(ctx){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}


function createStars(count){
    let arr = [];
    for(let i = 0; i < count; i++){
        let angle = random(0,360) * Math.PI/180;
        let x1 = random(-cw/2,cw/2);
        let y1 = random(-ch/2, ch/2);
        let x = x1 + 0 * Math.cos(angle);
        let y = y1 + 0 * Math.sin(angle);
        arr.push(new Star(x,y));
    }
    return arr;
}
function renderStars(stars){
    for(let i = 0; i < stars.length; i++){
        stars[i].update();
        stars[i].render(ctx);
    }
}

let star;
let stars;
function init(){

    stars  = createStars(1000);
    //log(stars)

    star = new Star(0,0);
    //log(star)
    star.render(ctx);
    animate();
    
}




//setInterval(fanimate, 1000);
let lastTime;
function animate(time){
    if(lastTime != null){
        const delta = time - lastTime;

        ctx.clearRect(-canvas.width/2,-canvas.height/2, canvas.width, canvas.height);
        star.update();
        star.render(ctx);

        renderStars(stars);
    }
    lastTime = time;
    requestAnimationFrame(animate)
}


function fanimate(){
    ctx.clearRect(-canvas.width/2,-canvas.height/2, canvas.width, canvas.height);
    star.update();
    star.render(ctx);
}
document.addEventListener('DOMContentLoaded', init);