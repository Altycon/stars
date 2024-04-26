import { TWO_PI,randomNumberBetween } from "./utilities.js";

export const Freaky = {
    totalDots: 1000,
    dots: [],
    dotColor: 'white',
    dotSize: 2,
    triangles: [],
    canvas: undefined,
    context: undefined,
    canvasWidth: undefined,
    canvasHeight: undefined,
    rotatingCanvas: undefined,
    rotatingContext: undefined,
    rotatingCanvasWidth: undefined,
    rotatingCanvasHeight: undefined,

    createDots(){
        for(let i = 0; i < Freaky.totalDots; i++){

            Freaky.dots.push({
                x: randomNumberBetween(0, Freaky.canvasWidth),
                y: randomNumberBetween(0, Freaky.canvasHeight)
            })
        }
    },
    renderCanvasDots(){
        Freaky.context.clearRect(0, 0, Freaky.canvasWidth, Freaky.canvasHeight);
        Freaky.context.fillStyle = Freaky.dotColor;

        for(let i = 0; i < Freaky.totalDots; i++){

            const dot = Freaky.dots[i];

            Freaky.context.beginPath();
            Freaky.context.arc(dot.x, dot.y, Freaky.dotSize, 0, TWO_PI);
            Freaky.context.fill();
        }
    },
    renderRotatingCanvasDots(){
        Freaky.rotatingContext.clearRect(0, 0, Freaky.rotatingCanvasWidth, Freaky.rotatingCanvasHeight);
        Freaky.rotatingContext.fillStyle = Freaky.dotColor;

        for(let i = 0; i < Freaky.totalDots; i++){

            const dot = Freaky.dots[i];

            Freaky.rotatingContext.beginPath();
            Freaky.rotatingContext.arc(dot.x, dot.y, Freaky.dotSize, 0, TWO_PI);
            Freaky.rotatingContext.fill();
        }
    },
    createGrid(){
        // const Columns = canvas.width/divider;
        // const Rows = canvas.height/divider;
        // let temp = 0;
        // let arr = [];
        // for(let i = 0; i < Columns; i++){
        //     let tempArr = [];
        //     for(let j = 0; j < Rows; j++){
        //         if(temp === 0){
        //             tempArr.push(temp);
        //             temp = 1;
        //         }else{
        //             tempArr.push(1);
        //             temp = 0;
        //         }
        //     }
        //     arr.push(tempArr);
        // }
    },
    createTriangles(){
        // const angle1 = 30 * Math.PI/180;
        // const angle2 = -30 * Math.PI/180;

        // for(let col = 0; col < grid.length; col++){
        //     for(let row = 0; row < grid[col].length; row++){
        //         const cell = grid[col][row];
        //         let x = (col * cellSize) + cellSize/2;
        //         let y = (row * cellSize);
                
            
        //         let x2 = x + (cellSize) * Math.sin(angle1);
        //         let y2 = y + (cellSize) * Math.cos(angle1);
        //         let x3 = x + (cellSize) * Math.sin(angle2);
        //         let y3 = y + (cellSize) * Math.cos(angle2);
        //     }
        // }
    },
    renderCanvasTriangle(){

    },
    initialize(canvasElement,rotatingCanvasElement){
        Freaky.canvas = canvasElement;
        Freaky.context = canvasElement.getContext('2d');
        Freaky.canvasWidth = canvasElement.width;
        Freaky.canvasHeight = canvasElement.height;

        Freaky.rotatingCanvas = rotatingCanvasElement;
        Freaky.rotatingContext = rotatingCanvasElement.getContext('2d');
        Freaky.rotatingCanvasWidth = rotatingCanvasElement.width;
        Freaky.rotatingCanvasHeight = rotatingCanvasElement.height;

        Freaky.createDots();

        console.log(Freaky.canvas);
        console.log(Freaky.rotatingCanvas)
    }
}