import { Scene, Vector3 } from "three";
import { GameObject3D } from "../../engine/core/3D/gameObject3D";

export class Neco extends GameObject3D {
    constructor(scene: Scene, position: Vector3, rotation: Vector3, scale: Vector3, isStatic: boolean) {
        super(scene, position, rotation, scale, false, '../meshes/neco/neco.gltf');
    }

    update() {
        super.update();
    }
}