
import {
    Scene,
    Vector3,
    Vector2,
    GridHelper,
    AxesHelper,
    Mesh,
    PlaneBufferGeometry,
    MeshPhongMaterial,
    Color
} from 'three';

import { TOOLS } from '../tool';


export class SceneGridDebug {

    private scene: Scene;
    private position: Vector3;
    private size: Vector2;
    private isShowingGround: boolean;

    constructor(scene: Scene, position: Vector3, size: Vector2, isShowingGround: boolean) {
        this.scene = scene;
        this.position = position;
        this.size = size;
        this.isShowingGround = isShowingGround;
        this.start();
    }

    private start() {
        const axesHelper = new AxesHelper(5);
        this.scene.add(axesHelper);

        const helper = new GridHelper(this.size.x, this.size.y, new Color(0x555753), new Color(0xD3D7CF));
        helper.position.x = this.position.x;
        helper.position.y = this.position.y;
        helper.position.z = this.position.z;
        this.scene.add(helper);

        if (this.isShowingGround) {
            const groundMesh = new Mesh(
                new PlaneBufferGeometry(this.size.x, this.size.y),
                new MeshPhongMaterial({
                    color: 0xffffff,
                    depthWrite: false
                })
            )

            groundMesh.rotation.x = TOOLS.degressToRadians(-90);
            groundMesh.receiveShadow = true;
            this.scene.add(groundMesh);
        }
    }
}
