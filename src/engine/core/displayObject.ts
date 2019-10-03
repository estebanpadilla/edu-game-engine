import { Scene, Vector3, Group, AnimationClip, AnimationMixer } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import THREE = require('three');

export class DisplayObject extends Group {

    public loader: GLTFLoader = new GLTFLoader();
    public scene: Scene;
    public url!: string;
    public animations!: Array<AnimationClip>;
    public mixer!: AnimationMixer;
    public clock = new THREE.Clock();

    protected _position!: Vector3;
    protected _rotation!: Vector3;
    protected _scale!: Vector3;

    constructor(scene: Scene, position: Vector3, rotation: Vector3, scale: Vector3, url: string) {
        super();
        this.url = url;
        this.scene = scene;
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
        this.animations = new Array<AnimationClip>();

    }

    public updateTransforms() {
        this.rotation.set(THREE.Math.degToRad(this._rotation.x), THREE.Math.degToRad(this._rotation.y), THREE.Math.degToRad(this._rotation.z));
        this.position.set(this._position.x, this._position.y, this._position.z);
        this.scale.set(this._scale.x, this._scale.y, this._scale.z);

        //Temp, run animation on object
        if (this.animations.length > 0) {
            this.mixer = new THREE.AnimationMixer(this);
            this.mixer.clipAction(this.animations[0]).play();
        }
        console.log(this);
    }

    public update() {
        if (this.animations.length > 0) {
            var delta = this.clock.getDelta();
            this.mixer.update(delta);
        }
    }
}