import Entity from "./entity.js";

export default class Chest extends Entity {
  constructor(id, kind) {
    super(id, Types.Entities.CHEST);
  }

  getSpriteName() {
    return "chest";
  }

  isMoving() {
    return false;
  }

  open() {
    if (this.open_callback) {
      this.open_callback();
    }
  }

  onOpen(callback) {
    this.open_callback = callback;
  }
}
