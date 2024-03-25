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
    fixCanvas(canvas,parent){
    
        const styleWidth = +getComputedStyle(parent).getPropertyValue('width').slice(0, -2);
        const styleHeight = +getComputedStyle(parent).getPropertyValue('height').slice(0, -2);
        
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
    startLoading(){

        APP.setState('loading');

        document.querySelector('.main-content').classList.add('loading');
    },
    stopLoading(){

        APP.setState('started');

        document.querySelector('.main-content').classList.remove('loading');
    },
    initialize(){

        APP.startLoading();

        setTimeout( ()=> {

            APP.listen();

            APP.stopLoading();
        },3000)
        
        APP.canvas = APP.fixCanvas(
            document.querySelector('.canvas'),
            document.querySelector('.main-content')
        );

        GameOfLife.initialize(APP.canvas, innerWidth < 800 ? 10:5);

        GameOfLife.setColor('hsl(180 100% 50%)');

        GameOfLife.buildRandomGrid();

        

        APP.setAnimation(1);
    }
};

APP.initialize();