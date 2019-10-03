import { Vector2, Vector3, Color, DirectionalLight } from "three";
import { GameScene3D } from "../engine/core/3D/gameScene3D";
import { Duck } from "./gameObjects/duck";
import { Avocado } from "./gameObjects/avocado";
import { Bag } from "./gameObjects/bag";
import { Monkey } from "./gameObjects/monkey";
import THREE = require('three');
import { Car } from "./gameObjects/car";
import { Rocket } from "./gameObjects/rocket";
import { Ball } from "./gameObjects/ball";
import { Neco } from "./gameObjects/neco";
import { Robot } from "./gameObjects/robot";
import { Falito } from "./gameObjects/falito";

export class DuckScene extends GameScene3D {

    private duck!: Duck;
    private avocado!: Avocado;
    private bag!: Bag;
    private monkey!: Monkey;
    private car!: Car;
    private rocket!: Rocket;
    private ball!: Ball;
    private neco!: Neco;
    private robot!: Robot;
    private falito!: Falito;
    private angle: number = 0.2;

    constructor(size: Vector2, cameraPosition: Vector3, isShowingDebug: boolean, background: Color) {
        super(size, cameraPosition, isShowingDebug, background);

        this.duck = new Duck(this, new Vector3(-2, 0, -1), new Vector3(0, 0, 0), new Vector3(1, 1, 1), false);
        this.avocado = new Avocado(this, new Vector3(0, -6.25, 0), new Vector3(0, 0, 0), new Vector3(5, 5, 5), false);
        this.bag = new Bag(this, new Vector3(1, -2.8, 1), new Vector3(0, 0, 0), new Vector3(2, 2, 2), false);
        this.monkey = new Monkey(this, new Vector3(2, 1.2, -4), new Vector3(0, 0, 0), new Vector3(1, 1, 1), false);
        this.car = new Car(this, new Vector3(3, 0, 0), new Vector3(0, 90, 0), new Vector3(0.01, 0.01, 0.01), false);
        this.ball = new Ball(this, new Vector3(-2, 0, 2), new Vector3(0, 0, 0), new Vector3(0.1, 0.1, 0.1), false);

        //this.neco = new Neco(this, new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(1, 1, 1), false);
        //this.robot = new Robot(this, new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(1, 1, 1), false);
        this.falito = new Falito(this, new Vector3(4, 0, -4), new Vector3(0, 0, 0), new Vector3(10, 10, 10), false);


        const light = new DirectionalLight(0xffffff, 1);
        light.color.setHSL(0.1, 1, 0.95);
        light.position.set(-1, 1.75, 1);
        light.position.multiplyScalar(30);
        this.add(light);

        var ambientLight = new THREE.AmbientLight(0x404040);
        this.add(ambientLight);
    }

    update() {
        super.update();
        this.monkey.rotateY(this.angle);
        this.duck.displayObject.rotateY(THREE.Math.degToRad(-this.angle));
    }
}