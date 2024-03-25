import { GameOfLife } from "./game_of_life.js";
import { SpaceTravel } from "./space_travel.js";

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

            APP.animationCallback = ()=>{

                SpaceTravel.animate();
            }

            break;

            case 3:

            

            break;

            case 4:

           

            break;
        }

        console.log(`Animation "${animation}" set.`)

    },
    selectAnimation(event){

        event.preventDefault();

        if(event.target.classList.contains('inactive')) return;
        
        document.querySelectorAll('.animation-options button').forEach( animationButton => {

            if(animationButton.classList.contains('active')){

                animationButton.classList.remove('active');
            }

        });

        APP.setAnimation(+event.target.value);

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
    initializeGameOfLife(){

        GameOfLife.initialize(APP.canvas, innerWidth < 800 ? 4:5);

        GameOfLife.setColor('hsl(180 100% 50%)');

        GameOfLife.buildRandomGrid();
    },
    initializeSpaceTravel(){

        SpaceTravel.initialize(APP.canvas);

    },
    initialize(){

        APP.startLoading();

        setTimeout( ()=> {

            APP.listen();

            document.querySelectorAll('button.inactive').forEach( (button,index) => {

                if(index < 2) button.classList.remove('inactive');
    
            });

            document.querySelector('#AnimationStartButton').classList.remove('inactive');
            document.querySelector('#AnimationStopButton').classList.remove('inactive');

            APP.stopLoading();
        },3000)
        
        APP.canvas = APP.fixCanvas(
            document.querySelector('.canvas'),
            document.querySelector('.main-content')
        );

        APP.initializeGameOfLife();

        APP.initializeSpaceTravel();

        APP.setAnimation(1);
    }
};

APP.initialize();