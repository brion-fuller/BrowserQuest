import Area from "./area";
import _ from "underscore";
import * as Types from "../../shared/ts/gametypes";
import { random } from "./utils";
import Mob from "./mob";

export default class MobArea extends Area {
  nb: any;
  kind: any;
  respawns: any[];

  constructor(id, nb, kind, x, y, width, height, world) {
    super(id, x, y, width, height, world);
    this.nb = nb;
    this.kind = kind;
    this.respawns = [];
    this.setNumberOfEntities(this.nb);

    //this.initRoaming();
  }

  spawnMobs() {
    for (var i = 0; i < this.nb; i += 1) {
      this.addToArea(this._createMobInsideArea());
    }
  }

  _createMobInsideArea() {
    var k = Types.getKindFromString(this.kind),
      pos = this._getRandomPositionInsideArea(),
      mob = new Mob(
        parseInt("1" + this.id + "" + k + "" + this.entities.length),
        k,
        pos.x,
        pos.y
      );

    mob.onMove(this.world.onMobMoveCallback.bind(this.world));

    return mob;
  }

  respawnMob(mob, delay) {
    var self = this;

    this.removeFromArea(mob);

    setTimeout(function () {
      var pos = self._getRandomPositionInsideArea();

      mob.x = pos.x;
      mob.y = pos.y;
      mob.isDead = false;
      self.addToArea(mob);
      self.world.addMob(mob);
    }, delay);
  }

  initRoaming(mob) {
    var self = this;

    setInterval(function () {
      _.each(self.entities, function (mob) {
        var canRoam = random(20) === 1,
          pos;

        if (canRoam) {
          if (!mob.hasTarget() && !mob.isDead) {
            pos = self._getRandomPositionInsideArea();
            mob.move(pos.x, pos.y);
          }
        }
      });
    }, 500);
  }

  createReward() {
    var pos = this._getRandomPositionInsideArea();

    return { x: pos.x, y: pos.y, kind: Types.Entities.CHEST };
  }
}
