const log = console.log;

const BackgroundCanvas = document.getElementById('BackgroundCanvas');
BackgroundCanvas.width = innerWidth;
BackgroundCanvas.height = innerHeight;
const BackCtx = BackgroundCanvas.getContext('2d');
//log(BackCtx)
const bcw = BackgroundCanvas.width;
const bch = BackgroundCanvas.height;
//log(bcw,bch)
BackCtx.translate(bcw/2,bch/2);

const canvas = document.getElementById('canvas');
canvas.width = 200;
canvas.height = 200;
ctx = canvas.getContext('2d');
const cw = canvas.width;
const ch = canvas.height;
ctx.translate(cw/2,ch/2);

let Stars;
const Total_Stars = 150;
const StarSpeed = 20;

let Sun;
const SunRadius = 100;
const SunCellCount = 1500;
const SunCellSpeed = 0.5;


// make it look like your moving forward through space while Sun fly by

const randomRange = (min,max, bool) => bool ? Math.floor(Math.random()*(max - min) + min) : Math.random()*(max - min) + min;

const createStar = ()=>{
    const angle = randomRange(0,360);
    const distance = randomRange(0,bcw);
    const sx = distance * Math.cos(angle);
    const sy = distance * Math.sin(angle);
    const x = sx;
    const y = sy;
    const vx = randomRange(-1,1); // should this be -1 or 1 ? OR a number between -1 and 1 ?
    const vy = randomRange(-1,1);
    const radius = randomRange(0,2);
    const hue = randomRange(30,40,true);
    const saturation = 100;
    const lightness = 60;
    const opacity = 0;
    const color = `hsl(${hue} ${saturation}% ${lightness}% / ${opacity})`;
    return {
        startPosition: {x: sx, y: sy},
        position: {x: x, y: y},
        velocity: {x: vx, y: vy},
        radius: radius,
        color: color,
        angle: angle,
        distance: distance,
        opacity: opacity
    }
}

const createStars = (count)=>{
    let arr = [];
    for(let i = 0; i < count; i++){
        arr.push(createStar());
    }
    return arr;
}

const renderStar = (ctx,star)=>{
    ctx.beginPath();
    ctx.moveTo(star.startPosition.x, star.startPosition.y);
    ctx.lineTo(star.position.x, star.position.y);
    ctx.arc(star.position.x, star.position.y, star.radius, 0, Math.PI*2);
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = star.color;
    ctx.stroke();
    ctx.fill();
}
const updateStar = (star)=>{
    if(star.startPosition.x < -bch/2 || star.startPosition.y < -bch/2 || star.startPosition.x > bch/2 || star.startPosition.y > bch/2){
        star.radius = randomRange(0,2);
        star.distance = randomRange(SunRadius,bcw);
        star.startPosition.x = star.distance * Math.cos(star.angle);
        star.startPosition.y = star.distance * Math.sin(star.angle);
        star.position.x = star.startPosition.x;
        star.position.y = star.startPosition.y;
    }
    star.opacity = star.opacity + 0.01;
    star.radius = star.radius + 0.1;
    star.distance = star.distance + StarSpeed;
    star.startPosition.x = star.distance/3 * Math.cos(star.angle);
    star.startPosition.y = star.distance/3 * Math.sin(star.angle);
    star.position.x = star.distance * Math.cos(star.angle);
    star.position.y = star.distance * Math.sin(star.angle);
}

function createSunCell(){
    const angle = randomRange(0,360);
    const distance = randomRange(0,SunRadius);
    const x = distance * Math.cos(angle);
    const y = distance * Math.sin(angle);
    const vx = randomRange(-SunCellSpeed,SunCellSpeed); // should this be -1 or 1 ? OR a number between -1 and 1 ?
    const vy = randomRange(-SunCellSpeed,SunCellSpeed);
    const radius = randomRange(1,2,true);
    const hue = randomRange(30,40);
    const saturation = 100;
    const lightness = 50;
    const opacity = 1;
    const color = `hsl(${hue} ${saturation}% ${lightness}% / ${opacity})`;
    return {
        position: {x: x, y: y},
        velocity: {x: vx, y: vy},
        radius: radius,
        color: color
    }
}

function renderSunCell(ctx,star){
    ctx.beginPath();
    ctx.arc(star.position.x, star.position.y, star.radius, 0, Math.PI*2);
    ctx.fillStyle = star.color;
    ctx.shadowColor = 'hsl(60 100% 50% / .8)';
    ctx.shadowBlur = 5;
    ctx.fill();
}

function updateSunCell(cell){
    /*
        Collision inside cirular boundary - code and explanation
        http://rectangleworld.com/blog/archives/358
        -Dan ?
    */
    const boundaryRadius = SunRadius;
    const boundaryRadiusSquared = boundaryRadius*boundaryRadius;
    const radiusSquared = (cell.position.x * cell.position.x) + (cell.position.y * cell.position.y);

    if(radiusSquared > boundaryRadiusSquared){
        //find intersection point with circle. simple method: midpoint
        let exitX = (0 + cell.position.x)/2;
        let exitY = (0 + cell.position.y)/2;

        //scale to proper radius
        const exitRadius = Math.sqrt((exitX * exitX) + (exitY  *exitY));
        exitX *= boundaryRadius/exitRadius;
        exitY *= boundaryRadius/exitRadius;

        //place particle there
        cell.position.x = exitX;
        cell.position.y = exitY;

        const twiceProjectionFactor = 2 * ((exitX * cell.velocity.x) + (exitY * cell.velocity.y)) / boundaryRadiusSquared;

        vx = cell.velocity.x - twiceProjectionFactor * exitX;
        vy = cell.velocity.y - twiceProjectionFactor * exitY;
        cell.velocity.x = vx;
        cell.velocity.y = vy;
    }

    cell.position.x = cell.position.x + cell.velocity.x;
    cell.position.y = cell.position.y + cell.velocity.y;
}

function createSun(count){
    let arr = [];
    for(let i = 0; i < count; i++){
        arr.push(createSunCell());
    }
    return arr;
}

let interval; 
function startAnimation(){
    //BackgroundCanvas.style.display = 'block';
    document.getElementById('canvas').style.animation = 'scaleSun 20s linear forwards';
    animateStars();
}
function animateStars(){
    BackCtx.clearRect(-bcw/2,-bch/2,bcw,bch);
    for(let j = 0; j < Stars.length; j++){
        updateStar(Stars[j]);
        renderStar(BackCtx, Stars[j]);
    }
    requestAnimationFrame(animateStars)
}

function animate(){
    
    ctx.clearRect(-cw/2,-ch/2,cw,ch);
    
    for(let i = 0; i < Sun.length; i++){
        updateSunCell(Sun[i]);
        renderSunCell(ctx, Sun[i]);
    }

    requestAnimationFrame(animate);
}

function init(){
    Stars = createStars(Total_Stars);
    log(Stars)
    Sun = createSun(SunCellCount);
    canvas.addEventListener('click', startAnimation)
    animate();
}
init();