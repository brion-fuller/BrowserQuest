import { promises as fs } from "fs";
import Metrics from "./metrics";
import { SocketIOServer } from "./ws";
import _ from "underscore";
import WorldServer from "./worldserver";
import Player from "./player";

export default async (config) => {
  const server = new SocketIOServer(config.port);
  const metrics = config.metrics_enabled ? new Metrics(config) : null;
  const worlds = _.map(_.range(config.nb_worlds), (i) => {
    const world = new WorldServer(
      "world" + (i + 1),
      config.nb_players_per_world,
      server
    );
    world.run(config.map_filepath);
    if (metrics) {
      world.onPlayerAdded(onPopulationChange);
      world.onPlayerRemoved(onPopulationChange);
    }
    return world;
  });
  let lastTotalPlayers = 0;
  const checkPopulationInterval = setInterval(() => {
    if (metrics && metrics.isReady) {
      metrics.getTotalPlayers((totalPlayers) => {
        if (totalPlayers !== lastTotalPlayers) {
          lastTotalPlayers = totalPlayers;
          _.each(worlds, (world) => {
            world.updatePopulation(totalPlayers);
          });
        }
      });
    }
  }, 1000);
  console.info("Starting BrowserQuest game server...");

  server.onConnect((connection) => {
    var world, // the one in which the player will be spawned
      connect = function () {
        if (world) {
          world.connect_callback(new Player(connection, world));
        }
      };

    if (metrics) {
      metrics.getOpenWorldCount(function (open_world_count) {
        // choose the least populated world among open worlds
        world = _.min(_.first(worlds, open_world_count), function (w) {
          return w.playerCount;
        });
        connect();
      });
    } else {
      // simply fill each world sequentially until they are full
      world = _.detect(worlds, function (world) {
        return world.playerCount < config.nb_players_per_world;
      });
      world.updatePopulation();
      connect();
    }
  });

  server.onError((...args) => {
    console.error(Array.prototype.join.call(args, ", "));
  });

  var onPopulationChange = () => {
    metrics.updatePlayerCounters(worlds, (totalPlayers) => {
      _.each(worlds, (world) => {
        world.updatePopulation(totalPlayers);
      });
    });
    metrics.updateWorldDistribution(getWorldDistribution(worlds));
  };

  server.onRequestStatus(() => {
    return JSON.stringify(getWorldDistribution(worlds));
  });

  if (config.metrics_enabled) {
    metrics.ready(() => {
      onPopulationChange(); // initialize all counters to 0 when the server starts
    });
  }

  process.on("uncaughtException", (e) => {
    console.error("uncaughtException: " + e);
  });
};

const getWorldDistribution = (worlds) => {
  var distribution = [];

  _.each(worlds, (world: any) => {
    distribution.push(world.playerCount);
  });
  return distribution;
};
