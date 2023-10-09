
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");


const routes = require("./routes/index.js");


require("./db.js");


const server = express();


server.name = "API";

// Configurar middleware para el manejo de datos en el cuerpo de las solicitudes.
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));

// Configurar middleware para el manejo de cookies.
server.use(cookieParser());

// Configurar middleware para el registro de solicitudes en la consola.
server.use(morgan("dev"));

// Configurar middleware para permitir peticiones desde un origen específico.
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


server.use("/", routes);

// Middleware para capturar errores.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  
  // Registrar el error en la consola.
  console.error(err);

  // Enviar una respuesta de error al cliente.
  res.status(status).send(message);
});

module.exports = server;
