import { PerspectiveCamera, Vector3 } from "three";

export class GameCamera3D extends PerspectiveCamera {

    constructor(position: Vector3, fov?: number, aspect?: number, near?: number, far?: number) {
        super(fov, aspect, near, far);
        this.position.set(position.x, position.y, position.z);
        this.lookAt(new Vector3(0, 0, 0));
    }
}