import * as Utils from "./utils";
import _ from "underscore";
import * as http from "http";
import * as socketio from "socket.io";
/**
 * Abstract Server and Connection classes
 */
export class Server {
  port: number;
  _connections: any;
  connection_callback: Function;
  error_callback: Function;

  constructor(port) {
    this.port = port;
    this._connections = {};
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
  _connection: any;
  _server: any;
  id: string;
  close_callback: Function;
  listen_callback: Function;

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
  _connections: any = {};
  _counter: any = 0;
  io: any;
  status_callback: Function;

  constructor(port) {
    super(port);
    var server = http.createServer();
    this.io = socketio(server);

    this.io.on("connection", (connection) => {
      console.info("a user connected");

      connection.remoteAddress = connection.handshake.address.address;

      var c = new SocketIOConnection(connection.id, connection, this);

      if (this.connection_callback) {
        this.connection_callback(c);
      }
      this.addConnection(c);
    });

    this.io.on("error", (err) => {
      console.error(err.stack);
      this.error_callback();
    });

    server.listen(port, () => {
      console.info("listening on *:" + port);
    });
  }

  broadcast(message) {
    this.io.emit("message", message);
  }

  onRequestStatus(status_callback) {
    this.status_callback = status_callback;
  }
}

export class SocketIOConnection extends Connection {
  constructor(id, connection, server) {
    super(id, connection, server);

    // HANDLE DISPATCHER IN HERE
    connection.on("dispatch", (message) => {
      console.log("Received dispatch request");
      this._connection.emit("dispatched", {
        status: "OK",
        host: server.host,
        port: server.port,
      });
    });

    connection.on("message", (message) => {
      console.info("Received: " + message);
      if (this.listen_callback) this.listen_callback(message);
    });

    connection.on("disconnect", () => {
      if (this.close_callback) {
        this.close_callback();
      }
      this._server.removeConnection(this.id);
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
