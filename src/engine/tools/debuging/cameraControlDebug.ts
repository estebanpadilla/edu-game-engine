import { Camera, Vector3, CameraHelper, Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import THREE = require('three');
import { GameScene3D } from '../../core/3D/gameScene3D';
import { GameCamera3D } from '../../core/3D/gameCamera3D';

export class CameraControlDebug {

    private scene: GameScene3D;
    private gameCamera: Camera;
    private debugCamera!: Camera;
    private center: HTMLElement;
    private orbitControls: OrbitControls;
    private isOnDebugMode: boolean;
    private isOnX: boolean;
    private isOnY: boolean;
    private isOnZ: boolean;
    private enabled: boolean;
    private cameraText!: HTMLElement;
    private helper!: CameraHelper;

    constructor(scene: GameScene3D, camera: Camera, center: HTMLElement) {
        this.scene = scene;
        this.gameCamera = camera;
        this.center = center;
        this.isOnDebugMode = true;
        this.isOnX = false;
        this.isOnY = false;
        this.isOnZ = false;
        this.enabled = false;

        this.debugCamera = new GameCamera3D(new Vector3(5, 5, 5), 45, this.scene.size.x / this.scene.size.y, 0.1, 10000);

        //this.scene.camera = this.debugCamera;
        this.orbitControls = new OrbitControls(this.debugCamera, center);
        this.orbitControls.addEventListener('change', this.onOrbitControlChange.bind(this));
        this.orbitControls.enabled = this.enabled;
        //this.helper = new CameraHelper(this.camera);
        //this.scene.add(this.helper);
        const cameraHelper = new CameraHelper(this.gameCamera);
        this.scene.add(cameraHelper);

        this.addButtons();
        this.updateCameraText();
    }

    public onOrbitControlChange() {
        this.updateCameraText();
    }

    private moveCamera(keyCode: number) {
        if (this.enabled) {
            switch (keyCode) {
                case 37:
                    if (this.isOnX) {
                        this.scene.camera.position.z += 1;
                    } else if (this.isOnY) {
                        this.scene.camera.position.x -= 1;
                    } else if (this.isOnZ) {
                        this.scene.camera.position.x -= 1;
                    }
                    break;
                case 38:
                    if (this.isOnX) {
                        this.scene.camera.position.x -= 1;
                    } else if (this.isOnY) {
                        this.scene.camera.position.z += 1;
                    } else if (this.isOnZ) {
                        this.scene.camera.position.z -= 1;
                    }
                    break;
                case 39:
                    if (this.isOnX) {
                        this.scene.camera.position.z -= 1;
                    } else if (this.isOnY) {
                        this.scene.camera.position.x += 1;
                    } else if (this.isOnZ) {
                        this.scene.camera.position.x += 1;
                    }
                    break;
                case 40:
                    if (this.isOnX) {
                        this.scene.camera.position.x += 1;
                    } else if (this.isOnY) {
                        this.scene.camera.position.z -= 1;
                    } else if (this.isOnZ) {
                        this.scene.camera.position.z += 1;
                    }
                    break;
                default:
                    break;
            }

            this.updateCameraText();
        }
    }

    private addButtons() {

        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '10px';
        container.style.left = '20px';
        container.style.width = '150px';
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        container.style.border = 'solid';
        container.style.borderColor = 'white';
        container.style.borderWidth = '2px';
        document.body.appendChild(container);

        var ypos = 10;
        const title = document.createElement('p');
        title.innerText = 'Cemera Settings';
        title.style.position = 'absolute';
        title.style.color = 'white';
        title.style.left = '20px';
        title.style.top = ypos + 'px';
        container.appendChild(title);

        ypos += 20;
        const xBtn = document.createElement('button');
        xBtn.style.left = '5px';
        xBtn.style.top = ypos + 'px';
        xBtn.style.backgroundColor = 'red';
        xBtn.classList.add('debugButton');
        container.appendChild(xBtn);

        const yBtn = document.createElement('button');
        yBtn.style.left = '55px';
        yBtn.style.top = ypos + 'px';
        yBtn.style.backgroundColor = '#7EFF00';
        yBtn.classList.add('debugButton');
        container.appendChild(yBtn);

        const zBtn = document.createElement('button');
        zBtn.style.left = '105px';
        zBtn.style.top = ypos + 'px';
        zBtn.style.backgroundColor = 'blue';
        zBtn.classList.add('debugButton');
        container.appendChild(zBtn);

        ypos += 30;
        const upBtn = document.createElement('button');
        upBtn.innerText = 'UP';
        upBtn.style.left = '45px';
        upBtn.style.top = ypos + 'px';
        upBtn.classList.add('debugButton');
        container.appendChild(upBtn);

        ypos += 30;
        const rightBtn = document.createElement('button');
        rightBtn.innerText = '<-';
        rightBtn.style.left = '20px';
        rightBtn.style.top = ypos + 'px';
        rightBtn.classList.add('debugButton');
        container.appendChild(rightBtn);

        const leftBtn = document.createElement('button');
        leftBtn.innerText = '->';
        leftBtn.style.left = '80px';
        leftBtn.style.top = ypos + 'px';
        leftBtn.classList.add('debugButton');
        container.appendChild(leftBtn);

        ypos += 30;
        const downBtn = document.createElement('button');
        downBtn.innerText = 'Down';
        downBtn.style.left = '40px';
        downBtn.style.top = ypos + 'px';
        downBtn.classList.add('debugButton');
        container.appendChild(downBtn);

        ypos += 30;
        const debugCameraBtn = document.createElement('button');
        debugCameraBtn.innerText = 'Debug Camera';
        debugCameraBtn.style.left = '10px';
        debugCameraBtn.style.top = ypos + 'px';
        debugCameraBtn.classList.add('debugButton');
        container.appendChild(debugCameraBtn);

        ypos += 30;
        const gameCameraBtn = document.createElement('button');
        gameCameraBtn.innerText = 'Game Camera';
        gameCameraBtn.style.left = '10px';
        gameCameraBtn.style.top = ypos + 'px';
        gameCameraBtn.classList.add('debugButton');
        container.appendChild(gameCameraBtn);

        ypos += 30;
        container.style.height = ypos + 'px';

        ypos += 5;
        this.cameraText = document.createElement('p');
        this.cameraText.innerHTML = 'Camera Text';
        this.cameraText.style.position = 'absolute';
        this.cameraText.style.fontSize = '14px';
        this.cameraText.style.color = 'black';
        this.cameraText.style.top = ypos + 'px';
        this.cameraText.style.left = '0px';
        this.cameraText.style.width = '200px';
        this.cameraText.style.height = 'auto';
        container.appendChild(this.cameraText);

        xBtn.addEventListener('click', this.onXBtn.bind(this), false);
        yBtn.addEventListener('click', this.onYBtn.bind(this), false);
        zBtn.addEventListener('click', this.onZBtn.bind(this), false);

        upBtn.addEventListener('click', this.onUpBtn.bind(this), false);
        downBtn.addEventListener('click', this.onDownBtn.bind(this), false);
        rightBtn.addEventListener('click', this.onRightBtn.bind(this), false);
        leftBtn.addEventListener('click', this.onLeftBtn.bind(this), false);

        debugCameraBtn.addEventListener('click', this.onDebugCameraBtn.bind(this), false);
        gameCameraBtn.addEventListener('click', this.onGameCameraBtn.bind(this), false);
    }

    private onXBtn() {

        if (this.enabled) {
            this.scene.camera.position.x = 15;
            this.scene.camera.position.z = 0;
            this.scene.camera.position.y = 2;
            this.scene.camera.rotation.x = 0;
            this.scene.camera.rotation.y = THREE.Math.degToRad(90);
            this.scene.camera.rotation.z = 0;

            this.isOnX = true;
            this.isOnY = false;
            this.isOnZ = false;

            this.updateCameraText();
        }
    }

    private onYBtn() {
        if (this.enabled) {
            this.scene.camera.position.x = 0;
            this.scene.camera.position.z = 0;
            this.scene.camera.position.y = 15;

            this.scene.camera.rotation.x = THREE.Math.degToRad(-90);
            this.scene.camera.rotation.y = 0;
            this.scene.camera.rotation.z = 0;

            this.isOnX = false;
            this.isOnY = true;
            this.isOnZ = false;

            this.updateCameraText();
        }
    }

    private onZBtn() {
        if (this.enabled) {
            this.isOnX = false;
            this.isOnY = false;
            this.isOnZ = true;

            this.scene.camera.position.x = 0;
            this.scene.camera.position.z = 15;
            this.scene.camera.position.y = 2;

            this.scene.camera.rotation.x = 0;
            this.scene.camera.rotation.y = 0;
            this.scene.camera.rotation.z = 0;

            this.updateCameraText();
        }
    }

    private onUpBtn() {
        this.moveCamera(38);
    }

    private onDownBtn() {
        this.moveCamera(40);
    }

    private onRightBtn() {
        this.moveCamera(37);
    }

    private onLeftBtn() {
        this.moveCamera(39);
    }

    private updateCameraText() {
        var text = '<b>Position:</b>' + '<br/>';
        text += '<b>x:</b>' + this.scene.camera.position.x + '<br/>';
        text += '<b>y:</b>' + this.scene.camera.position.y + '<br/>';
        text += '<b>z:</b>' + this.scene.camera.position.z + '<br/>';
        text += '<b>Rotation:</b>' + '<br/>';
        text += '<b>x:</b>' + Math.floor(THREE.Math.radToDeg(this.scene.camera.rotation.x)) + '<br/>';
        text += '<b>y:</b>' + Math.floor(THREE.Math.radToDeg(this.scene.camera.rotation.y)) + '<br/>';
        text += '<b>z:</b>' + Math.floor(THREE.Math.radToDeg(this.scene.camera.rotation.z));
        this.cameraText.innerHTML = text;
    }

    private onDebugCameraBtn() {

        this.enabled = true;
        this.orbitControls.enabled = this.enabled;
        this.scene.camera = this.debugCamera;
        this.updateCameraText();
    }

    private onGameCameraBtn() {
        this.enabled = false;
        this.orbitControls.enabled = this.enabled;
        this.scene.camera = this.gameCamera;
        this.updateCameraText();
    }
}
