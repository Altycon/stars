

export const GameOfLife = {
    canvas: undefined,
    overlayCanvas: undefined,
    resolution: undefined,
    context: undefined,
    overlayContext: undefined,
    fillStyle: 'hsl(180 100% 50%)',
    width: undefined,
    height: undefined,
    columns: undefined,
    rows: undefined,
    gridLength: undefined,
    grid: undefined,
    nextGeneration: undefined,

    setColor(color){

        GameOfLife.context.fillStyle = color;
    },
    loopGrid(callback){
        for(let i = 0; i < GameOfLife.gridLength; i++){
            callback(i);
        }
    },
    buildGrid(){
        GameOfLife.loopGrid((i)=>{
            GameOfLife.grid[i] = 0;
        });
    },
    buildRandomGrid(){
        GameOfLife.loopGrid((i)=>{

            const rand = Math.random() > 0.5 ? 1:0;

            GameOfLife.grid[i] = rand;
            GameOfLife.nextGeneration[i] = rand;
        });
    },
    checkNeighbors(row,col,indx){
        let numberOfNeighbors = 0;
        
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){

                const r = (row + i + GameOfLife.rows) % GameOfLife.rows;
                const c = (col + j + GameOfLife.columns) % GameOfLife.columns;
                const index = r * GameOfLife.columns + c;
                numberOfNeighbors += GameOfLife.grid[index];

            }
        }
        return numberOfNeighbors - GameOfLife.grid[indx];
    },
    update(){
        
        GameOfLife.loopGrid((i)=>{

            const cell = GameOfLife.grid[i];

            const row = Math.floor(i / GameOfLife.columns);
            const column = i % GameOfLife.columns;

            const numberOfNeighbors = GameOfLife.checkNeighbors(row,column,i);

            if((cell & 1) === 1 && (numberOfNeighbors < 2 || numberOfNeighbors > 3)){

                GameOfLife.nextGeneration[i] = 0;

            }else if((cell & 1) === 0 && (numberOfNeighbors & 3) === 3){

                GameOfLife.nextGeneration[i] = 1;

            }

        });

        GameOfLife.loopGrid((i)=>{

            GameOfLife.grid[i] = GameOfLife.nextGeneration[i];

        });
    },
    clearCanvas(){

        GameOfLife.context.clearRect(0,0,GameOfLife.width,GameOfLife.height);
    },
    renderGrid(){
        GameOfLife.clearCanvas();

        GameOfLife.loopGrid((i)=>{

            const row = Math.floor(i / GameOfLife.columns);
            const col = i % GameOfLife.columns;
            const cell = GameOfLife.grid[i];
            
            if(cell === 1){

                GameOfLife.context.fillRect(
                    col * GameOfLife.resolution, 
                    row * GameOfLife.resolution, 
                    GameOfLife.resolution, 
                    GameOfLife.resolution
                );
            }

        });
        
    },
    initialize(canvasElement,resolution = 10){

        GameOfLife.canvas = canvasElement;
        GameOfLife.resolution = resolution;
        GameOfLife.context = canvasElement.getContext('2d');
        GameOfLife.width = canvasElement.width;
        GameOfLife.height = canvasElement.height;

        GameOfLife.columns = Math.floor(GameOfLife.width / GameOfLife.resolution);
        GameOfLife.rows = Math.floor(GameOfLife.height / GameOfLife.resolution);

        GameOfLife.gridLength = GameOfLife.columns * GameOfLife.rows;

        GameOfLife.grid = new Uint8Array(GameOfLife.gridLength);
        GameOfLife.nextGeneration = new Uint8Array(GameOfLife.gridLength);

        GameOfLife.context.fillStyle = GameOfLife.fillStyle;
    }
}

class GameOfLifeOptimized{
    constructor(canvas, offscreen, resolution){
        this.canvas = canvas;
        this.offscreenCanvas = offscreen;
        this.resolution = resolution || 40;
        this.context = this.canvas.getContext('2d');
        this.offContext = this.offscreenCanvas.getContext('2d');
        this.offContext.fillStyle = 'hsl(180 100% 50%)';
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.columns = Math.floor(this.width/this.resolution);
        this.rows = Math.floor(this.height/this.resolution);
        this.gridLength = this.columns*this.rows;
        this.grid = new Uint8Array(this.gridLength);
        this.nextGeneration = new Uint8Array(this.gridLength);

        this.canvas.addEventListener('pointerdown', this.handlePointerDown.bind(this));
    }
    loopGrid(callback){
        for(let i = 0; i < this.gridLength; i++){
            callback(i);
        }
    }
    buildGrid(){
        this.loopGrid((i)=>{
            this.grid[i] = 0;
        });
    }
    buildRandomGrid(){
        this.loopGrid((i)=>{
            this.grid[i] = Math.random() > 0.5 ? 1:0;
        });
    }
    selectGridCell(ev){
        const rect = this.canvas.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;

        const row = Math.floor( y / this.resolution);
        const column = Math.floor( x / this.resolution);

        const index = row * this.columns + column;
        this.grid[index] = !this.grid[index];
    }
   
    handlePointerDown(ev){
        this.selectGridCell(ev);
    }
    checkNeighbors(row,col){
        let numberOfNeighbors = 0;
        
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                const r = (row + i + this.rows) % this.rows;
                const c = (col + j + this.columns) % this.columns;
                const index = r * this.columns + c;
                numberOfNeighbors += this.grid[index];
            }
        }
        return numberOfNeighbors - this.grid[row * this.columns + col];
    }
    update(){
        this.loopGrid((i)=>{
            this.nextGeneration[i] = this.grid[i];
        });
        this.loopGrid((i)=>{
            const cell = this.grid[i];

            const row = Math.floor(i / this.columns);
            const column = i % this.columns;

            const numberOfNeighbors = this.checkNeighbors(row,column);

            if((cell & 1) === 1 && (numberOfNeighbors < 2 || numberOfNeighbors > 3)){
                this.nextGeneration[i] = 0;
            }else if((cell & 1) === 0 && (numberOfNeighbors & 3) === 3){
                this.nextGeneration[i] = 1;
            }
        });
        this.loopGrid((i)=>{
            this.grid[i] = this.nextGeneration[i];
        });
    }
    renderGrid(){
        this.offContext.clearRect(0,0,this.width,this.height);
        this.loopGrid((i)=>{
            const row = Math.floor(i / this.columns);
            const col = i % this.columns;
            const cell = this.grid[i];
            
            if(cell === 1){
                this.offContext.fillRect(
                    col * this.resolution, 
                    row * this.resolution, 
                    this.resolution, 
                    this.resolution
                );
            }
        });
        this.context.clearRect(0,0,this.width,this.height);
        this.context.drawImage(this.offscreenCanvas, 0, 0);
    }
}