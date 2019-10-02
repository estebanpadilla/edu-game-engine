import { Scene, Vector3 } from "three";
import { DisplayObject } from "../displayObject";

export class GameObject2D extends DisplayObject {
    constructor(scene: Scene, position: Vector3, rotation: Vector3, scale: Vector3, isStatic: boolean, url: string) {
        super(scene, position, rotation, scale, url);
    }
}