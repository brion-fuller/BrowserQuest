import Player from "./player.js";
import Types from "../../shared/js/gametypes.js";

export default class Warrior extends Player {
  constructor(id, name) {
    super(id, name, Types.Entities.WARRIOR);
  }
}
