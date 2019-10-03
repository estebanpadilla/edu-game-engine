import { Scene, Vector3, BoxHelper, Color, Object3D, SkeletonHelper } from "three";
import { DisplayObject } from "../displayObject";
import { GameScene3D } from "./gameScene3D";
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils';

export class DisplayObject3D extends DisplayObject {

    constructor(scene: Scene, position: Vector3, rotation: Vector3, scale: Vector3, url: string) {
        super(scene, position, rotation, scale, url);
        this.loadMesh(this);
    }

    private loadMesh(go: DisplayObject3D) {
        // Load a glTF resource
        this.loader.load(
            // resource URL
            go.url,
            // called when the resource is loaded
            function (gltf: any) {

                //console.log(go.dumpObject(gltf.scene).join('\n'));

                console.log(gltf);


                go.add(gltf.scene.children[0]);
                //go.scene.add(go);

       
               

                if (gltf['animations'].length > 0) {
                    go.animations = gltf['animations'];
                }


                //go.completeLoad();

                // return;
                
                for (var i = 0; i < gltf.scene.children.length; i++) {
                    if (gltf.scene.children[i].type === 'Mesh') {
                        go.add(gltf.scene.children[i].clone());
                    } else if (gltf.scene.children[i].type === 'Object3D') {

                        //const object3D = gltf.scene.children[i].clone();
                        //object3D.children = [];
                        go.add(gltf.scene.children[i]);

                        // for (var k = 0; k < gltf.scene.children[i].children.length; k++) {

                        //     if (gltf.scene.children[i].children[k].type === 'SkinnedMesh') {
                        //         const skingMesh = SkeletonUtils.clone(gltf.scene.children[i].children[k]);
                        //         object3D.add(skingMesh);

                        //     } else {
                        //         object3D.add(gltf.scene.children[i].children[k].clone());
                        //     }
                        // }

                    } else {
                        for (var j = 0; j < gltf.scene.children[i].children.length; j++) {
                            if (gltf.scene.children[i].children[j].type === 'Mesh') {
                                go.add(gltf.scene.children[i].children[j].clone());
                            }
                        }
                    }
                }



                console.log(go);
                go.completeLoad();
            },
            // called while loading is progressing
            function (xhr: any) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            function (error: any) {

                console.log('An error happened: ' + error);

            }
        );
    }

    protected completeLoad() {
        this.updateTransforms();
        this.scene.add(this);

        if ((<GameScene3D>this.scene).isShowingDebug) {
            this.scene.add(new BoxHelper(this, new Color(0x000000)));
        }
    }

    update() {
        super.update();
    }

    private dumpObject(obj: Object3D, lines: Array<string> = [], isLast = true, prefix = '') {
        const localPrefix = isLast ? '└─' : '├─';
        const t = `${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`;
        lines.push(t);
        const newPrefix = prefix + (isLast ? '  ' : '│ ');
        const lastNdx = obj.children.length - 1;
        obj.children.forEach((child, ndx) => {
            const isLast = ndx === lastNdx;
            this.dumpObject(child, lines, isLast, newPrefix);
        });
        return lines;
    }
}