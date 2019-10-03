import { Scene, Vector3 } from "three";
import { GameObject3D } from "../../engine/core/3D/gameObject3D";
import { TweenMax, Power2 } from "gsap";


export class Car extends GameObject3D {
    constructor(scene: Scene, position: Vector3, rotation: Vector3, scale: Vector3, isStatic: boolean) {
        super(scene, position, rotation, scale, false, '../meshes/car/car_02.gltf');
        //TODO: Request mesh from GameLoadManager instead of loading meshes here
        //var gsap: TweenMax = TweenMax.from(this.displayObject.position, 2, { x: position.x, z: position.z, ease: Power2.easeInOut });
    }

    update() {
        super.update();
    }
}