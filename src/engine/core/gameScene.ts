import { WebGLRenderer, Scene, PCFShadowMap, Vector3, Color, DirectionalLight, Vector2, Camera } from "three";
import { GameObject } from "./gameObject";
import { GameScene3D } from "./3D/gameScene3D";
import { GameObject3D } from "./3D/gameObject3D";

export class GameScene extends Scene {

    public size!: Vector2;
    public renderer!: WebGLRenderer;
    public camera!: Camera;
    public isShowingDebug: boolean;
    public gameObjects: Array<GameObject>;

    constructor(size: Vector2, isShowingDebug: boolean, background: Color) {
        super();
        this.size = size;
        this.isShowingDebug = isShowingDebug;
        this.background = background;
        this.gameObjects = new Array<GameObject3D>();
    }
}