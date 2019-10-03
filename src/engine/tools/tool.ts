
export class TOOLS {

    public static degressToRadians = function (degress: number) {
        return degress * (Math.PI / 180);
    };

    public static randomBetween = function (min: number, max: number) {
        return Math.floor(Math.random() * (+max - +min)) + +min;
    };
}
