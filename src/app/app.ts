import { Color, Vector2, Vector3, DirectionalLight } from 'three';
import { DuckScene } from './duckScene';

export class App {

  private scene: DuckScene;

  constructor() {

    //TODO: continue creating gameobject after loading is completed.

    this.scene = new DuckScene(new Vector2(window.innerWidth, window.innerHeight), new Vector3(-8, 4, 7), true, new Color(0xf0f0f0));

    this.update();
  }

  private update() {
    this.scene.update();
    requestAnimationFrame(() => this.update());
  }
}
