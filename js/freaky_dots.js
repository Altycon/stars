import { TWO_PI,randomNumberBetween } from "./utilities.js";

export const Freaky = {
    resolution: 10,
    totalDots: 1000,
    dots: [],
    dotColor: 'white',
    dotSize: 2,
    triangles: [],
    grid: undefined,
    gridColumns: undefined,
    gridRows: undefined,
    gridLength: undefined,
    canvas: undefined,
    context: undefined,
    canvasWidth: undefined,
    canvasHeight: undefined,
    rotatingCanvas: undefined,
    rotatingContext: undefined,
    rotatingCanvasWidth: undefined,
    rotatingCanvasHeight: undefined,

    setContextColor(color){

        if(!color) color = Freaky.dotColor;
        if(Freaky.context && Freaky.rotatingContext){
            Freaky.context.fillStyle = color;
            Freaky.rotatingContext.fillStyle = color;
        }
    },
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

        for(let i = 0; i < Freaky.totalDots; i++){

            const dot = Freaky.dots[i];

            Freaky.context.beginPath();
            Freaky.context.arc(dot.x, dot.y, Freaky.dotSize, 0, TWO_PI);
            Freaky.context.fill();
        }
    },
    renderRotatingCanvasDots(){
        Freaky.rotatingContext.clearRect(0, 0, Freaky.rotatingCanvasWidth, Freaky.rotatingCanvasHeight);

        for(let i = 0; i < Freaky.totalDots; i++){

            const dot = Freaky.dots[i];

            Freaky.rotatingContext.beginPath();
            Freaky.rotatingContext.arc(dot.x, dot.y, Freaky.dotSize, 0, TWO_PI);
            Freaky.rotatingContext.fill();
        }
    },
    
    createTriangles(){
        const angle1 = 30 * Math.PI/180;
        const angle2 = -30 * Math.PI/180;

       
    },
    createGrid(){
            
        for(let i = 0; i < Freaky.gridLength; i++){

            Freaky.grid[i] = i % 2 === 0 ? 1:0;
        }
    },
    adjustGridPosition(){

        Freaky.context.translate(
            (Freaky.canvasWidth - (Freaky.gridColumns * Freaky.resolution)) * 0.5,
            (Freaky.canvasHeight - (Freaky.gridRows * Freaky.resolution)) * 0.5
        )

        Freaky.rotatingContext.translate(
            (Freaky.rotatingCanvasWidth - (Freaky.gridColumns * Freaky.resolution)) * 0.5,
            (Freaky.rotatingCanvasHeight - (Freaky.gridRows * Freaky.resolution)) * 0.5
        )
    },
    renderCanvasGrid(){
        
        Freaky.context.clearRect(0, 0, Freaky.canvasWidth, Freaky.canvasHeight);
        
        for(let i = 0; i < Freaky.gridLength; i++){

            const col = i % Freaky.gridColumns;
            const row = Math.floor(i/Freaky.gridColumns);

            const cell = Freaky.grid[i];

            if(cell === 1){
                Freaky.context.fillRect(
                    col * Freaky.resolution,
                    row * Freaky.resolution,
                    Freaky.resolution,
                    Freaky.resolution
                )
            }
            
        }
    },
    renderRotatingCanvasGrid(){
        
        Freaky.rotatingContext.clearRect(0, 0, Freaky.rotatingCanvasWidth, Freaky.rotatingCanvasHeight);
        
        for(let i = 0; i < Freaky.gridLength; i++){

            const col = i % Freaky.gridColumns;
            const row = Math.floor(i/Freaky.gridColumns);

            const cell = Freaky.grid[i];

            if(cell === 1){
                Freaky.rotatingContext.fillRect(
                    col * Freaky.resolution,
                    row * Freaky.resolution,
                    Freaky.resolution,
                    Freaky.resolution
                )
            }
            
        }
    },
    createSquares(){


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

        Freaky.context.fillStyle = Freaky.dotColor;
        Freaky.rotatingContext.fillStyle = Freaky.dotColor;

        Freaky.gridColumns = Math.floor(Freaky.canvasWidth/Freaky.resolution);
        Freaky.gridRows = Math.floor(Freaky.canvasHeight/Freaky.resolution);
        Freaky.gridLength = Freaky.gridColumns * Freaky.gridRows;
        Freaky.grid = new Uint8Array(Freaky.gridLength);

        Freaky.createGrid();
        Freaky.createDots();

    }
}