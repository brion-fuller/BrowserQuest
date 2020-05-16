import _ from "underscore";
import Memcached from "memcached";

export default class Metrics {
  isReady: boolean;
  config: any;
  client: any;
  ready_callback: any;

  constructor(config) {
    this.config = config;
    this.client = new Memcached(
      config.memcached_host + ":" + config.memcached_port,
      {}
    );
    // this.client.connect();

    // this.isReady = false;

    // this.client.on("connect", function () {
    console.info(
      "Metrics enabled: memcached client connected to " +
        config.memcached_host +
        ":" +
        config.memcached_port
    );
    this.isReady = true;
    if (this.ready_callback) {
      this.ready_callback.apply(this);
    }
    // });
  }

  ready(callback) {
    this.ready_callback = callback.bind(this);
  }

  updatePlayerCounters(worlds, updatedCallback) {
    const numServers = _.size(this.config.game_servers);
    const playerCount = _.reduce(
      worlds,
      function (sum: any, world: any) {
        return sum + world.playerCount;
      },
      0
    );

    if (this.isReady) {
      // Set the number of players on this server
      this.client.set(
        "player_count_" + this.config.server_name,
        playerCount,
        () => {
          // Recalculate the total number of players and set it
          const total_players = _.reduce(
            this.config.game_servers,
            (total: any, server: any) => {
              this.client.get(
                "player_count_" + server.name,
                (error, result) => {
                  const count = result ? parseInt(result) : 0;

                  return total + count;
                }
              );
            },
            0
          );
          this.client.set("total_players", total_players, () => {
            if (updatedCallback) {
              updatedCallback(total_players);
            }
          });
        }
      );
    } else {
      console.error("Memcached client not connected");
    }
  }

  updateWorldDistribution(worlds) {
    this.client.set("world_distribution_" + this.config.server_name, worlds);
  }

  getOpenWorldCount(callback) {
    this.client.get("world_count_" + this.config.server_name, function (
      error,
      result
    ) {
      callback(result);
    });
  }

  getTotalPlayers(callback) {
    this.client.get("total_players", function (error, result) {
      callback(result);
    });
  }
}
