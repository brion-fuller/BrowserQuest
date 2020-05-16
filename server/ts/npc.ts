import Entity from "./entity";

export default class Npc extends Entity {
  id: any;
  constructor(id, kind, x, y) {
    super(id, "npc", kind, x, y);
  }
}
