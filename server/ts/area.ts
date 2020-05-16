import _ from "underscore";
import * as Utils from "./utils";
import Mob from "./mob";

export default class Area {
  id: any;
  x: any;
  y: any;
  width: any;
  height: any;
  world: any;
  entities: any[];
  hasCompletelyRespawned: boolean;
  empty_callback: any;
  nbEntities: any;

  constructor(id, x, y, width, height, world) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.world = world;
    this.entities = [];
    this.hasCompletelyRespawned = true;
  }

  _getRandomPositionInsideArea() {
    var pos = { x: 0, y: 0 },
      valid = false;

    while (!valid) {
      pos.x = this.x + Utils.random(this.width + 1);
      pos.y = this.y + Utils.random(this.height + 1);
      valid = this.world.isValidPosition(pos.x, pos.y);
    }
    return pos;
  }

  removeFromArea(entity) {
    var i = _.indexOf(_.pluck(this.entities, "id"), entity.id);
    this.entities.splice(i, 1);

    if (this.isEmpty() && this.hasCompletelyRespawned && this.empty_callback) {
      this.hasCompletelyRespawned = false;
      this.empty_callback();
    }
  }

  addToArea(entity) {
    if (entity) {
      this.entities.push(entity);
      entity.area = this;
      if (entity instanceof Mob) {
        this.world.addMob(entity);
      }
    }

    if (this.isFull()) {
      this.hasCompletelyRespawned = true;
    }
  }

  setNumberOfEntities(nb) {
    this.nbEntities = nb;
  }

  isEmpty() {
    return !_.any(this.entities, function (entity) {
      return !entity.isDead;
    });
  }

  isFull() {
    return !this.isEmpty() && this.nbEntities === _.size(this.entities);
  }

  onEmpty(callback) {
    this.empty_callback = callback;
  }
}
