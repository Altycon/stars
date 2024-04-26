
export const TWO_PI = Math.PI*2;

export function randomNumberBetween(min,max){
    return Math.random() * (max-min)+min;
};

export function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};