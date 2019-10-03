import { BoxGeometry, Color, Mesh, MeshBasicMaterial, Vector3 } from 'three';

export class Brick extends Mesh {
  constructor(size: Vector3, position: Vector3, color: Color) {
    super();
    this.geometry = new BoxGeometry(size.x, size.y, size.z);
    this.material = new MeshBasicMaterial({ color });
    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = position.z;
  }
}
