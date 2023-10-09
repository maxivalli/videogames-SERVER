const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env

conn.sync({ force: true }).then(() => {
  // Una vez que la sincronización se haya completado (y se haya forzado la recreación de tablas si es necesario), iniciar el servidor.
  server.listen(3001, () => {
    console.log(`Server listening at PORT: ${PORT}`); 
  });
});
