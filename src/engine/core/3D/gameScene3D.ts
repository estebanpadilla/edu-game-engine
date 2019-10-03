import { WebGLRenderer, Scene, PCFShadowMap, Vector3, Color, DirectionalLight, Vector2, CameraHelper } from "three";
import { SceneGridDebug } from "../../tools/debuging/sceneGridDebug";
import { CameraControlDebug } from "../../tools/debuging/cameraControlDebug";
import { GameCamera3D } from "./gameCamera3D";
import { GameScene } from "../gameScene";

export class GameScene3D extends GameScene {

    constructor(size: Vector2, cameraPosition: Vector3, isShowingDebug: boolean, background: Color) {
        super(size, isShowingDebug, background);

        this.renderer = new WebGLRenderer({ antialias: true, canvas: document.getElementById('main-canvas') as HTMLCanvasElement });
        this.renderer.setSize(size.x, size.y);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFShadowMap;
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = 2.2;

        this.camera = new GameCamera3D(cameraPosition, 45, size.x / size.y, 0.1, 10000);

        if (this.isShowingDebug) {
            const sceneGridDebug = new SceneGridDebug(this, new Vector3(0, 0, 0), new Vector2(100, 100), false);
            const cameraControlDebug = new CameraControlDebug(this, this.camera, this.renderer.domElement);
        }
    }

    protected update() {
        this.renderer.render(this, this.camera);
        for (let i = 0; i < this.gameObjects.length; i++) {
            const go = this.gameObjects[i];
            if (!go.isStatic) {
                go.update();
            }
        }
    }
}