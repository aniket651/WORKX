const dotenv = require('dotenv');
dotenv.config({path : './config.env'});



var app = require("./app");
var debug = require("debug")("backend:server");
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3003;
app.set("port", port);
  // Create HTTP server.
  // Listen on provided port, on all network interfaces.
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
  
  process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  
  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
  });
/**
 * Normalize a port into a number, string, or false.
 */

// function normalizePort(val) {
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

/**
 * Event listener for HTTP server "error" event.
 */

// function onError(error) {
//   if (error.syscall !== "listen") {
//     throw error;
//   }

//   var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case "EACCES":
//       console.error(bind + " requires elevated privileges");
//       process.exit(1);
//       break;
//     case "EADDRINUSE":
//       console.error(bind + " is already in use");
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
//   debug("Listening on " + bind);
// }
