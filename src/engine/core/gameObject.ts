import THREE = require('three');
import { DisplayObject } from "./displayObject";

export class GameObject {

    public displayObject!: DisplayObject;
    public isStatic: boolean = true;

    constructor(isStatic: boolean) {
        this.isStatic = isStatic;
    }

    public rotateY(angle: number) {
        this.displayObject.rotateY(THREE.Math.degToRad(angle));
    }

    public update() {
        this.displayObject.update();
    }
}