var cls = require("./lib/class"),
  url = require("url"),
  wsserver = require("socket.io"),
  //   miksagoConnection = require("websocket-server/lib/ws/connection"),
  //   worlizeRequest = require("websocket").request,
  http = require("http"),
  Utils = require("./utils"),
  _ = require("underscore"),
  BISON = require("bison"),
  WS = {},
  useBison = false;

/**
 * Abstract Server and Connection classes
 */
export class Server {
  constructor(port) {
    this.port = port;
  }

  onConnect(callback) {
    this.connection_callback = callback;
  }

  onError(callback) {
    this.error_callback = callback;
  }

  broadcast(message) {
    throw "Not implemented";
  }

  forEachConnection(callback) {
    _.each(this._connections, callback);
  }

  addConnection(connection) {
    this._connections[connection.id] = connection;
  }

  removeConnection(id) {
    delete this._connections[id];
  }

  getConnection(id) {
    return this._connections[id];
  }
}

export class Connection {
  constructor(id, connection, server) {
    this._connection = connection;
    this._server = server;
    this.id = id;
  }

  onClose(callback) {
    this.close_callback = callback;
  }

  listen(callback) {
    this.listen_callback = callback;
  }

  broadcast(message) {
    throw "Not implemented";
  }

  send(message) {
    throw "Not implemented";
  }

  sendUTF8(data) {
    throw "Not implemented";
  }

  close(logError) {
    console.info(
      "Closing connection to " +
        this._connection.remoteAddress +
        ". Error: " +
        logError
    );
    this._connection.close();
  }
}

export class SocketIOServer extends Server {
  static _connections = {};
  static _counter = 0;
  constructor(port) {
    self = this;
    self.port = port;
    // var app = require("express")();
    var http = require("http").createServer();
    self.io = require("socket.io")(http);

    self.io.on("connection", function (connection) {
      console.info("a user connected");

      connection.remoteAddress = connection.handshake.address.address;

      var c = new WS.socketIOConnection(self._createId(), connection, self);

      if (self.connection_callback) {
        self.connection_callback(c);
      }
      self.addConnection(c);
    });

    self.io.on("error", function (err) {
      console.error(err.stack);
      self.error_callback();
    });

    http.listen(port, function () {
      console.info("listening on *:" + port);
    });
  }

  _createId() {
    return "5" + Utils.random(99) + "" + this._counter++;
  }

  broadcast(message) {
    self.io.emit("message", message);
  }

  onRequestStatus(status_callback) {
    this.status_callback = status_callback;
  }
}

export class SocketIOConnection extends Connection {
  constructor(id, connection, server) {
    var self = this;

    super(id, connection, server);

    // HANDLE DISPATCHER IN HERE
    connection.on("dispatch", function (message) {
      console.log("Received dispatch request");
      self._connection.emit("dispatched", {
        status: "OK",
        host: server.host,
        port: server.port,
      });
    });

    connection.on("message", function (message) {
      console.info("Received: " + message);
      if (self.listen_callback) self.listen_callback(message);
    });

    connection.on("disconnect", function () {
      if (self.close_callback) {
        self.close_callback();
      }
      delete self._server.removeConnection(self.id);
    });
  }

  broadcast(message) {
    throw "Not implemented";
  }

  send(message) {
    this._connection.emit("message", message);
  }

  sendUTF8(data) {
    this.send(data);
  }

  close(logError) {
    console.info("Closing connection to socket" + ". Error: " + logError);
    this._connection.disconnect();
  }
}

export default {
  SocketIOConnection,
  SocketIOServer,
};
