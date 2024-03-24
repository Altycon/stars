

const APP = {

    DPI: devicePixelRatio,
    canvas: undefined,
    context: undefined,
    canvasWidth: undefined,
    canvasHeight: undefined,

    fixCanvas(canvas){
        const main = document.querySelector('.main-content');

        const styleWidth = + getComputedStyle(main).getPropertyValue('width').slice(0, -2);
        const styleHeight = + getComputedStyle(main).getPropertyValue('height').slice(0, -2);
        canvas.setAttribute('width', styleWidth * APP.DPI);
        canvas.setAttribute('height', styleHeight * APP.DPI);
        return canvas;
    },
    initialize(){
        
        APP.canvas = APP.fixCanvas(document.querySelector('.canvas'));

        APP.context = APP.canvas.getContext('2d');

        APP.canvasWidth = APP.canvas.width;
        APP.canvasHeight = APP.canvas.height;
    }
};

document.addEventListener('DOMContentLoaded', APP.initialize);