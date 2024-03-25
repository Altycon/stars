

export const SpaceTravel = {

    totalStars: 250,
    starSpeed: 10,
    stars: undefined,
    canvas: undefined,
    context: undefined,
    canvasWidth: undefined,
    canvasHeight: undefined,

    randomRange(min,max,bool){

        if(bool){

            return Math.floor(Math.random()*(max - min) + min);
        }
        
        return Math.random()*(max - min) + min;
    },
    createStar(){

        const angle = SpaceTravel.randomRange(0,360);
        const distance = SpaceTravel.randomRange(0,SpaceTravel.canvasWidth*0.5);
        const sx = distance * Math.cos(angle);
        const sy = distance * Math.sin(angle);
        const x = sx;
        const y = sy;
        const vx = SpaceTravel.randomRange(-1,1);
        const vy = SpaceTravel.randomRange(-1,1);
        const radius = SpaceTravel.randomRange(1,2);
        const hue = SpaceTravel.randomRange(30,40,true);
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

    },
    createStars(){

        let arr = [];

        for(let i = 0; i < SpaceTravel.totalStars; i++){

            arr.push(SpaceTravel.createStar());
        }

        return arr;

    },
    updateStar(star){

        if(star.startPosition.x < -SpaceTravel.canvasWidth/2 || star.startPosition.y < -SpaceTravel.canvasHeight/2 || 
            star.startPosition.x > SpaceTravel.canvasWidth/2 || star.startPosition.y > SpaceTravel.canvasHeight/2){

            star.radius = SpaceTravel.randomRange(0,1,true);
            star.distance = SpaceTravel.randomRange(100,SpaceTravel.canvasWidth*0.5);
            star.startPosition.x = star.distance * Math.cos(star.angle);
            star.startPosition.y = star.distance * Math.sin(star.angle);
            star.position.x = star.startPosition.x;
            star.position.y = star.startPosition.y;
        }
        star.opacity = star.opacity + 0.01;
        star.radius = star.radius + 0.05;
        star.distance = star.distance + SpaceTravel.starSpeed;
        star.startPosition.x = star.distance/3 * Math.cos(star.angle);
        star.startPosition.y = star.distance/3 * Math.sin(star.angle);
        star.position.x = star.distance * Math.cos(star.angle);
        star.position.y = star.distance * Math.sin(star.angle);
    },
    renderStar(star){

        SpaceTravel.context.beginPath();
        SpaceTravel.context.moveTo(star.startPosition.x, star.startPosition.y);
        SpaceTravel.context.lineTo(star.position.x, star.position.y);
        SpaceTravel.context.arc(star.position.x, star.position.y, star.radius, 0, Math.PI*2);
        SpaceTravel.context.fillStyle = '#fff';
        SpaceTravel.context.strokeStyle = star.color;
        SpaceTravel.context.stroke();
        SpaceTravel.context.fill();
    },
    animate(){

        SpaceTravel.context.save();
        SpaceTravel.context.translate(SpaceTravel.canvasWidth/2,SpaceTravel.canvasHeight/2);

        SpaceTravel.context.clearRect(
            -SpaceTravel.canvasWidth/2,
            -SpaceTravel.canvasHeight/2,
            SpaceTravel.canvasWidth,
            SpaceTravel.canvasHeight
        );

        for(let i = 0; i < SpaceTravel.stars.length; i++){

            SpaceTravel.updateStar(SpaceTravel.stars[i]);
            SpaceTravel.renderStar(SpaceTravel.stars[i]);

        }
        SpaceTravel.context.restore();
    },
    initialize(canvasElement){

        SpaceTravel.canvas = canvasElement;
        SpaceTravel.context = canvasElement.getContext('2d');
        SpaceTravel.canvasWidth = canvasElement.width;
        SpaceTravel.canvasHeight = canvasElement.height;

        SpaceTravel.stars = SpaceTravel.createStars();

    }
};
