import { Spawn, Despawn } from "./message";
import * as Utils from "./utils";

export default class Entity {
  id: any;
  type: any;
  kind: any;
  x: any;
  y: any;

  constructor(id, type, kind, x, y) {
    this.id = id;
    this.type = type;
    this.kind = kind;
    this.x = x;
    this.y = y;
  }

  destroy() {}

  _getBaseState() {
    return [parseInt(this.id), this.kind, this.x, this.y];
  }

  getState() {
    return this._getBaseState();
  }

  spawn() {
    return new Spawn(this);
  }

  despawn() {
    return new Despawn(this.id);
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getPositionNextTo(entity) {
    var pos = null;
    if (entity) {
      pos = {};
      // This is a quick & dirty way to give mobs a random position
      // close to another entity.
      var r = Utils.random(4);

      pos.x = entity.x;
      pos.y = entity.y;
      if (r === 0) pos.y -= 1;
      if (r === 1) pos.y += 1;
      if (r === 2) pos.x -= 1;
      if (r === 3) pos.x += 1;
    }
    return pos;
  }
}
