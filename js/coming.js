

function randomNumberBetween(min,max){
    return Math.random() * (max-min)+min;
}
function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


export const Coming = {
    totalStars: 1000,
    stars: [],
    canvas: undefined,
    context: undefined,
    canvasWidth: undefined,
    canvasHeight: undefined,

    isTouchingEdge(position,radius){
        return (position.x - radius*0.5 < -Coming.canvasWidth/2 || position.y + radius < -Coming.canvasHeight/2 ||
                position.x + radius*0.5 > Coming.canvasWidth/2 || position.y - radius > Coming.canvasHeight/2)
    },
    createStar(){

        const angle = randomNumberBetween(0,360) * Math.PI/180;
        const x = randomNumberBetween(-Coming.canvasWidth/2,Coming.canvasWidth/2) * Math.cos(angle);
        const y = randomNumberBetween(-Coming.canvasHeight/2, Coming.canvasHeight/2) * Math.sin(angle);
        
        const position = {x: x, y: y};
        const radius = 1;
        const speed = 5;
        const velocity = { x: randomNumberBetween(-speed, speed) * 2, y: randomNumberBetween(-speed, speed) * 2};
        const hue = randomNumberBetween(1,360).toFixed(2);
        const saturation = 100;
        const lightness = 50;
        const opacity = 0.8;
        const color = `hsl(${hue} ${saturation}% ${lightness}% / ${opacity})`;

        return {
            position,
            radius,
            velocity,
            color
        }
    },
    createStars(){

        for(let i = 0; i < Coming.totalStars; i++){

            Coming.stars.push(Coming.createStar());
        }
    },
    update(){
        for(let i = 0; i < Coming.totalStars; i++){

            const star = Coming.stars[i];

            if(Coming.isTouchingEdge(star.position,star.radius)){
                star.radius++;
                star.position.x = 0;
                star.position.y = 0;
            }
            star.position.x += star.velocity.x;
            star.position.y += star.velocity.y;

            if(star.radius > 50){
                star.color = `hsl(0 0% 100% / 0.5)`;
            }
            if(star.radius > 100){
                star.radius = 1;
            }
           
        }

    },
    render(){

        for(let i = 0; i < Coming.totalStars; i++){

            const star = Coming.stars[i];

            Coming.context.fillStyle = star.color;
            Coming.context.beginPath();
            Coming.context.arc(star.position.x, star.position.y, star.radius, 0, Math.PI*2);
            Coming.context.fill();
        }
    },
    animate(){
        Coming.context.save();
        Coming.context.translate(Coming.canvasWidth/2,Coming.canvasHeight/2);

        Coming.context.clearRect(
            -Coming.canvasWidth/2,
            -Coming.canvasHeight/2,
            Coming.canvasWidth,
            Coming.canvasHeight
        );

        Coming.update();
        Coming.render();
        
        Coming.context.restore();
    },
    initialize(canvasElement){

        Coming.canvas = canvasElement;
        Coming.context = canvasElement.getContext('2d');
        Coming.canvasWidth = canvasElement.width;
        Coming.canvasHeight = canvasElement.height;

        Coming.createStars();
    }
}