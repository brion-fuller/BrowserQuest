export const Messages = {
  HELLO: 0,
  WELCOME: 1,
  SPAWN: 2,
  DESPAWN: 3,
  MOVE: 4,
  LOOTMOVE: 5,
  AGGRO: 6,
  ATTACK: 7,
  HIT: 8,
  HURT: 9,
  HEALTH: 10,
  CHAT: 11,
  LOOT: 12,
  EQUIP: 13,
  DROP: 14,
  TELEPORT: 15,
  DAMAGE: 16,
  POPULATION: 17,
  KILL: 18,
  LIST: 19,
  WHO: 20,
  ZONE: 21,
  DESTROY: 22,
  HP: 23,
  BLINK: 24,
  OPEN: 25,
  CHECK: 26,
};

export const Entities = {
  WARRIOR: 1,

  // Mobs
  RAT: 2,
  SKELETON: 3,
  GOBLIN: 4,
  OGRE: 5,
  SPECTRE: 6,
  CRAB: 7,
  BAT: 8,
  WIZARD: 9,
  EYE: 10,
  SNAKE: 11,
  SKELETON2: 12,
  BOSS: 13,
  DEATHKNIGHT: 14,

  // Armors
  FIREFOX: 20,
  CLOTHARMOR: 21,
  LEATHERARMOR: 22,
  MAILARMOR: 23,
  PLATEARMOR: 24,
  REDARMOR: 25,
  GOLDENARMOR: 26,

  // Objects
  FLASK: 35,
  BURGER: 36,
  CHEST: 37,
  FIREPOTION: 38,
  CAKE: 39,

  // NPCs
  GUARD: 40,
  KING: 41,
  OCTOCAT: 42,
  VILLAGEGIRL: 43,
  VILLAGER: 44,
  PRIEST: 45,
  SCIENTIST: 46,
  AGENT: 47,
  RICK: 48,
  NYAN: 49,
  SORCERER: 50,
  BEACHNPC: 51,
  FORESTNPC: 52,
  DESERTNPC: 53,
  LAVANPC: 54,
  CODER: 55,

  // Weapons
  SWORD1: 60,
  SWORD2: 61,
  REDSWORD: 62,
  GOLDENSWORD: 63,
  MORNINGSTAR: 64,
  AXE: 65,
  BLUESWORD: 66,
};

export const Orientations = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};
export const getWeaponRank = (weaponKind) => {
  return rankedWeapons.indexOf(weaponKind);
};

export const getArmorRank = (armorKind) => {
  return rankedArmors.indexOf(armorKind);
};

export const isPlayer = (kind) => {
  return kinds.getType(kind) === "player";
};

export const isMob = (kind) => {
  return kinds.getType(kind) === "mob";
};

export const isNpc = (kind) => {
  return kinds.getType(kind) === "npc";
};

export const isCharacter = (kind) => {
  return isMob(kind) || isNpc(kind) || isPlayer(kind);
};

export const isArmor = (kind) => {
  return kinds.getType(kind) === "armor";
};

export const isWeapon = (kind) => {
  return kinds.getType(kind) === "weapon";
};

export const isObject = (kind) => {
  return kinds.getType(kind) === "object";
};

export const isChest = (kind) => {
  return kind === Entities.CHEST;
};

export const isItem = (kind) => {
  return isWeapon(kind) || isArmor(kind) || (isObject(kind) && !isChest(kind));
};

export const isHealingItem = (kind) => {
  return kind === Entities.FLASK || kind === Entities.BURGER;
};

export const isExpendableItem = (kind) => {
  return (
    isHealingItem(kind) ||
    kind === Entities.FIREPOTION ||
    kind === Entities.CAKE
  );
};

export const getKindFromString = (kind) => {
  if (kind in kinds) {
    return kinds[kind][0];
  }
};

export const getKindAsString = (kind) => {
  for (var k in kinds) {
    if (kinds[k][0] === kind) {
      return k;
    }
  }
};

export const forEachKind = (callback) => {
  for (var k in kinds) {
    callback(kinds[k][0], k);
  }
};

export const forEachArmor = (callback) => {
  forEachKind(function (kind, kindName) {
    if (isArmor(kind)) {
      callback(kind, kindName);
    }
  });
};

export const forEachMobOrNpcKind = (callback) => {
  forEachKind(function (kind, kindName) {
    if (isMob(kind) || isNpc(kind)) {
      callback(kind, kindName);
    }
  });
};

export const forEachArmorKind = (callback) => {
  forEachKind(function (kind, kindName) {
    if (isArmor(kind)) {
      callback(kind, kindName);
    }
  });
};

export const getOrientationAsString = (orientation) => {
  switch (orientation) {
    case Orientations.LEFT:
      return "left";
      break;
    case Orientations.RIGHT:
      return "right";
      break;
    case Orientations.UP:
      return "up";
      break;
    case Orientations.DOWN:
      return "down";
      break;
  }
};

export const getRandomItemKind = (item) => {
  var all = [...this.rankedWeapons, ...this.rankedArmors],
    forbidden = [Entities.SWORD1, Entities.CLOTHARMOR],
    itemKinds = all.filter((item) => forbidden.indexOf(item) === -1),
    i = Math.floor(Math.random() * itemKinds.length);

  return itemKinds[i];
};

export const getMessageTypeAsString = (type) => {
  var typeName;
  Object.entries(Messages).forEach(function ([name, value]) {
    if (value === type) {
      typeName = name;
    }
  });
  if (!typeName) {
    typeName = "UNKNOWN";
  }
  return typeName;
};
export const rankedWeapons = [
  Entities.SWORD1,
  Entities.SWORD2,
  Entities.AXE,
  Entities.MORNINGSTAR,
  Entities.BLUESWORD,
  Entities.REDSWORD,
  Entities.GOLDENSWORD,
];
export const rankedArmors = [
  Entities.CLOTHARMOR,
  Entities.LEATHERARMOR,
  Entities.MAILARMOR,
  Entities.PLATEARMOR,
  Entities.REDARMOR,
  Entities.GOLDENARMOR,
];

var kinds = {
  warrior: [Entities.WARRIOR, "player"],

  rat: [Entities.RAT, "mob"],
  skeleton: [Entities.SKELETON, "mob"],
  goblin: [Entities.GOBLIN, "mob"],
  ogre: [Entities.OGRE, "mob"],
  spectre: [Entities.SPECTRE, "mob"],
  deathknight: [Entities.DEATHKNIGHT, "mob"],
  crab: [Entities.CRAB, "mob"],
  snake: [Entities.SNAKE, "mob"],
  bat: [Entities.BAT, "mob"],
  wizard: [Entities.WIZARD, "mob"],
  eye: [Entities.EYE, "mob"],
  skeleton2: [Entities.SKELETON2, "mob"],
  boss: [Entities.BOSS, "mob"],

  sword1: [Entities.SWORD1, "weapon"],
  sword2: [Entities.SWORD2, "weapon"],
  axe: [Entities.AXE, "weapon"],
  redsword: [Entities.REDSWORD, "weapon"],
  bluesword: [Entities.BLUESWORD, "weapon"],
  goldensword: [Entities.GOLDENSWORD, "weapon"],
  morningstar: [Entities.MORNINGSTAR, "weapon"],

  firefox: [Entities.FIREFOX, "armor"],
  clotharmor: [Entities.CLOTHARMOR, "armor"],
  leatherarmor: [Entities.LEATHERARMOR, "armor"],
  mailarmor: [Entities.MAILARMOR, "armor"],
  platearmor: [Entities.PLATEARMOR, "armor"],
  redarmor: [Entities.REDARMOR, "armor"],
  goldenarmor: [Entities.GOLDENARMOR, "armor"],

  flask: [Entities.FLASK, "object"],
  cake: [Entities.CAKE, "object"],
  burger: [Entities.BURGER, "object"],
  chest: [Entities.CHEST, "object"],
  firepotion: [Entities.FIREPOTION, "object"],

  guard: [Entities.GUARD, "npc"],
  villagegirl: [Entities.VILLAGEGIRL, "npc"],
  villager: [Entities.VILLAGER, "npc"],
  coder: [Entities.CODER, "npc"],
  scientist: [Entities.SCIENTIST, "npc"],
  priest: [Entities.PRIEST, "npc"],
  king: [Entities.KING, "npc"],
  rick: [Entities.RICK, "npc"],
  nyan: [Entities.NYAN, "npc"],
  sorcerer: [Entities.SORCERER, "npc"],
  agent: [Entities.AGENT, "npc"],
  octocat: [Entities.OCTOCAT, "npc"],
  beachnpc: [Entities.BEACHNPC, "npc"],
  forestnpc: [Entities.FORESTNPC, "npc"],
  desertnpc: [Entities.DESERTNPC, "npc"],
  lavanpc: [Entities.LAVANPC, "npc"],

  getType: function (kind) {
    return kinds[getKindAsString(kind)][1];
  },
};
