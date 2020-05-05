import _ from "underscore";
import { LootMove, Move, Chat } from "./message.js";
import Utils from "./utils.js";
import Properties from "./properties.js";
import * as Formulas from "./formulas.js";
import { FormatChecker, check } from "./format.js";
import Types from "../../shared/js/gametypes.js";
import Character from "./character.js";

export default class Player extends Character {
  constructor(connection, worldServer) {
    super(connection.id, "player", Types.Entities.WARRIOR, 0, 0, "");

    var self = this;

    this.server = worldServer;
    this.connection = connection;

    this.hasEnteredGame = false;
    this.isDead = false;
    this.haters = {};
    this.lastCheckpoint = null;
    this.formatChecker = new FormatChecker();
    this.disconnectTimeout = null;

    this.connection.listen(function (message) {
      var action = parseInt(message[0]);

      console.debug("Received: " + message);
      if (!check(message)) {
        self.connection.close(
          "Invalid " +
            Types.getMessageTypeAsString(action) +
            " message format: " +
            message
        );
        return;
      }

      if (!self.hasEnteredGame && action !== Types.Messages.HELLO) {
        // HELLO must be the first message
        self.connection.close("Invalid handshake message: " + message);
        return;
      }
      if (
        self.hasEnteredGame &&
        !self.isDead &&
        action === Types.Messages.HELLO
      ) {
        // HELLO can be sent only once
        self.connection.close("Cannot initiate handshake twice: " + message);
        return;
      }

      self.resetTimeout();

      if (action === Types.Messages.HELLO) {
        var name = Utils.sanitize(message[1]);

        // If name was cleared by the sanitizer, give a default name.
        // Always ensure that the name is not longer than a maximum length.
        // (also enforced by the maxlength attribute of the name input element).
        self.name = name === "" ? "lorem ipsum" : name.substr(0, 15);

        self.kind = Types.Entities.WARRIOR;
        self.equipArmor(message[2]);
        self.equipWeapon(message[3]);
        self.orientation = Utils.randomOrientation();
        self.updateHitPoints();
        self.updatePosition();

        self.server.addPlayer(self);
        self.server.enter_callback(self);

        self.send([
          Types.Messages.WELCOME,
          self.id,
          self.name,
          self.x,
          self.y,
          self.hitPoints,
        ]);
        self.hasEnteredGame = true;
        self.isDead = false;
      } else if (action === Types.Messages.WHO) {
        message.shift();
        self.server.pushSpawnsToPlayer(self, message);
      } else if (action === Types.Messages.ZONE) {
        self.zone_callback();
      } else if (action === Types.Messages.CHAT) {
        var msg = Utils.sanitize(message[1]);

        // Sanitized messages may become empty. No need to broadcast empty chat messages.
        if (msg && msg !== "") {
          msg = msg.substr(0, 60); // Enforce maxlength of chat input
          self.broadcastToZone(new Chat(self, msg), false);
        }
      } else if (action === Types.Messages.MOVE) {
        if (self.move_callback) {
          var x = message[1],
            y = message[2];

          if (self.server.isValidPosition(x, y)) {
            self.setPosition(x, y);
            self.clearTarget();

            self.broadcast(new Move(self));
            self.move_callback(self.x, self.y);
          }
        }
      } else if (action === Types.Messages.LOOTMOVE) {
        if (self.lootmove_callback) {
          self.setPosition(message[1], message[2]);

          var item = self.server.getEntityById(message[3]);
          if (item) {
            self.clearTarget();

            self.broadcast(new LootMove(self, item));
            self.lootmove_callback(self.x, self.y);
          }
        }
      } else if (action === Types.Messages.AGGRO) {
        if (self.move_callback) {
          self.server.handleMobHate(message[1], self.id, 5);
        }
      } else if (action === Types.Messages.ATTACK) {
        var mob = self.server.getEntityById(message[1]);

        if (mob) {
          self.setTarget(mob);
          self.server.broadcastAttacker(self);
        }
      } else if (action === Types.Messages.HIT) {
        var mob = self.server.getEntityById(message[1]);
        if (mob) {
          var dmg = Formulas.dmg(self.weaponLevel, mob.armorLevel);

          if (dmg > 0) {
            mob.receiveDamage(dmg, self.id);
            self.server.handleMobHate(mob.id, self.id, dmg);
            self.server.handleHurtEntity(mob, self, dmg);
          }
        }
      } else if (action === Types.Messages.HURT) {
        var mob = self.server.getEntityById(message[1]);
        if (mob && self.hitPoints > 0) {
          self.hitPoints -= Formulas.dmg(mob.weaponLevel, self.armorLevel);
          self.server.handleHurtEntity(self);

          if (self.hitPoints <= 0) {
            self.isDead = true;
            if (self.firepotionTimeout) {
              clearTimeout(self.firepotionTimeout);
            }
          }
        }
      } else if (action === Types.Messages.LOOT) {
        var item = self.server.getEntityById(message[1]);

        if (item) {
          var kind = item.kind;

          if (Types.isItem(kind)) {
            self.broadcast(item.despawn());
            self.server.removeEntity(item);

            if (kind === Types.Entities.FIREPOTION) {
              self.updateHitPoints();
              self.broadcast(self.equip(Types.Entities.FIREFOX));
              self.firepotionTimeout = setTimeout(function () {
                self.broadcast(self.equip(self.armor)); // return to normal after 15 sec
                self.firepotionTimeout = null;
              }, 15000);
              self.send(HitPoints(self.maxHitPoints).serialize());
            } else if (Types.isHealingItem(kind)) {
              var amount;

              switch (kind) {
                case Types.Entities.FLASK:
                  amount = 40;
                  break;
                case Types.Entities.BURGER:
                  amount = 100;
                  break;
              }

              if (!self.hasFullHealth()) {
                self.regenHealthBy(amount);
                self.server.pushToPlayer(self, self.health());
              }
            } else if (Types.isArmor(kind) || Types.isWeapon(kind)) {
              self.equipItem(item);
              self.broadcast(self.equip(kind));
            }
          }
        }
      } else if (action === Types.Messages.TELEPORT) {
        var x = message[1],
          y = message[2];

        if (self.server.isValidPosition(x, y)) {
          self.setPosition(x, y);
          self.clearTarget();

          self.broadcast(Teleport(self));

          self.server.handlePlayerVanish(self);
          self.server.pushRelevantEntityListTo(self);
        }
      } else if (action === Types.Messages.OPEN) {
        var chest = self.server.getEntityById(message[1]);
        if (chest && chest instanceof Chest) {
          self.server.handleOpenedChest(chest, self);
        }
      } else if (action === Types.Messages.CHECK) {
        var checkpoint = self.server.map.getCheckpoint(message[1]);
        if (checkpoint) {
          self.lastCheckpoint = checkpoint;
        }
      } else {
        if (self.message_callback) {
          self.message_callback(message);
        }
      }
    });

    this.connection.onClose(function () {
      if (self.firepotionTimeout) {
        clearTimeout(self.firepotionTimeout);
      }
      clearTimeout(self.disconnectTimeout);
      if (self.exit_callback) {
        self.exit_callback();
      }
    });

    this.connection.sendUTF8("go"); // Notify client that the HELLO/WELCOME handshake can start
  }

  destroy() {
    var self = this;

    this.forEachAttacker(function (mob) {
      mob.clearTarget();
    });
    this.attackers = {};

    this.forEachHater(function (mob) {
      mob.forgetPlayer(self.id);
    });
    this.haters = {};
  }

  getState() {
    var basestate = this._getBaseState(),
      state = [this.name, this.orientation, this.armor, this.weapon];

    if (this.target) {
      state.push(this.target);
    }

    return basestate.concat(state);
  }

  send(message) {
    this.connection.send(message);
  }

  broadcast(message, ignoreSelf) {
    if (this.broadcast_callback) {
      this.broadcast_callback(
        message,
        ignoreSelf === undefined ? true : ignoreSelf
      );
    }
  }

  broadcastToZone(message, ignoreSelf) {
    if (this.broadcastzone_callback) {
      this.broadcastzone_callback(
        message,
        ignoreSelf === undefined ? true : ignoreSelf
      );
    }
  }

  onExit(callback) {
    this.exit_callback = callback;
  }

  onMove(callback) {
    this.move_callback = callback;
  }

  onLootMove(callback) {
    this.lootmove_callback = callback;
  }

  onZone(callback) {
    this.zone_callback = callback;
  }

  onOrient(callback) {
    this.orient_callback = callback;
  }

  onMessage(callback) {
    this.message_callback = callback;
  }

  onBroadcast(callback) {
    this.broadcast_callback = callback;
  }

  onBroadcastToZone(callback) {
    this.broadcastzone_callback = callback;
  }

  equip(item) {
    return EquipItem(this, item);
  }

  addHater(mob) {
    if (mob) {
      if (!(mob.id in this.haters)) {
        this.haters[mob.id] = mob;
      }
    }
  }

  removeHater(mob) {
    if (mob && mob.id in this.haters) {
      delete this.haters[mob.id];
    }
  }

  forEachHater(callback) {
    _.each(this.haters, function (mob) {
      callback(mob);
    });
  }

  equipArmor(kind) {
    this.armor = kind;
    this.armorLevel = Properties.getArmorLevel(kind);
  }

  equipWeapon(kind) {
    this.weapon = kind;
    this.weaponLevel = Properties.getWeaponLevel(kind);
  }

  equipItem(item) {
    if (item) {
      console.debug(this.name + " equips " + Types.getKindAsString(item.kind));

      if (Types.isArmor(item.kind)) {
        this.equipArmor(item.kind);
        this.updateHitPoints();
        this.send(HitPoints(this.maxHitPoints).serialize());
      } else if (Types.isWeapon(item.kind)) {
        this.equipWeapon(item.kind);
      }
    }
  }

  updateHitPoints() {
    this.resetHitPoints(Formulas.hp(this.armorLevel));
  }

  updatePosition() {
    if (this.requestpos_callback) {
      var pos = this.requestpos_callback();
      this.setPosition(pos.x, pos.y);
    }
  }

  onRequestPosition(callback) {
    this.requestpos_callback = callback;
  }

  resetTimeout() {
    clearTimeout(this.disconnectTimeout);
    this.disconnectTimeout = setTimeout(
      this.timeout.bind(this),
      1000 * 60 * 15
    ); // 15 min.
  }

  timeout() {
    this.connection.sendUTF8("timeout");
    this.connection.close("Player was idle for too long");
  }
}
