import { Scene, Vector3 } from "three";
import { GameObject } from '../gameObject';
import { DisplayObject3D } from '../3D/displayObject3D';
import { GameScene3D } from "./gameScene3D";

export class GameObject3D extends GameObject {

    constructor(scene: Scene, position: Vector3, rotation: Vector3, scale: Vector3, isStatic: boolean, url: string) {
        super(isStatic);
        this.displayObject = new DisplayObject3D(scene, position, rotation, scale, url);
        (<GameScene3D>scene).gameObjects.push(this);
    }

    update() {
        super.update();
    }
}