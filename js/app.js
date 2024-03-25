import { GameOfLife } from "./game_of_life.js";

const APP = {

    state: 'started',
    DPI: devicePixelRatio,
    canvas: undefined,
    context: undefined,
    canvasWidth: undefined,
    canvasHeight: undefined,
    animationId: undefined,
    animationTime: undefined,
    animationCallback: undefined,

    setState(state){

        APP.state = state;

    },
    setAnimation(animation){

        switch(animation){

            case 1:

            APP.animationCallback = ()=>{

                GameOfLife.update();
    
                GameOfLife.renderGrid();
            }

            break;

            case 2:

            break;
        }

    },
    selectAnimation(event){

        event.preventDefault();
        
        document.querySelectorAll('.animation-options button').forEach( animationButton => {

            if(animationButton.classList.contains('active')){

                animationButton.classList.remove('active');
            }

        });

        APP.setAnimation(event.target.value);

        event.target.classList.add('active');

    },
    stopAnimation(event){

        event.preventDefault();

        APP.setState('stopped');

        APP.animationId = undefined;

    },
    startAnimation(event){

        event.preventDefault();

        APP.setState('started');

        APP.animate();

    },
    listen(){

        document.querySelectorAll('.animation-options button').forEach( animationButton => {

            animationButton.addEventListener('click', APP.selectAnimation);

        });

        document.querySelector('#AnimationStartButton').addEventListener('click', APP.startAnimation);
        document.querySelector('#AnimationStopButton').addEventListener('click', APP.stopAnimation);

    },
    fixCanvas(canvas){
        const main = document.querySelector('.main-content');

        const styleWidth = + getComputedStyle(main).getPropertyValue('width').slice(0, -2);
        const styleHeight = + getComputedStyle(main).getPropertyValue('height').slice(0, -2);
        canvas.setAttribute('width', styleWidth * APP.DPI);
        canvas.setAttribute('height', styleHeight * APP.DPI);
        return canvas;
    },
    renderText(text,x,y,color){

        APP.context.fillStyle = color;
        APP.context.font = '30px sans-serif';
        APP.context.textAlign = 'center';
        APP.context.fillText(text, x, y);
    },
    animate(){

        APP.animationTime = performance.now();

        function loop(timestamp){

            const delta = timestamp - APP.animationTime;

            APP.animationCallback();

            if(APP.state === 'stopped'){

                cancelAnimationFrame(APP.animationId);

            }else{

                APP.animationTime = timestamp;

                requestAnimationFrame(loop);
            }
        }

        APP.animationId = requestAnimationFrame(loop);

        console.log(APP.animationId)
    },
    initialize(){
        
        APP.canvas = APP.fixCanvas(document.querySelector('.canvas'));

        // APP.context = APP.canvas.getContext('2d');

        // APP.canvasWidth = APP.canvas.width;
        // APP.canvasHeight = APP.canvas.height;

        // APP.renderText('This is new', APP.canvasWidth*0.5, APP.canvasHeight*0.5,'red');

        GameOfLife.initialize(APP.canvas);

        GameOfLife.setColor('hsl(180 100% 50%)');

        GameOfLife.buildRandomGrid();

        APP.listen();

        APP.setAnimation(1);
    }
};

document.addEventListener('DOMContentLoaded', APP.initialize);