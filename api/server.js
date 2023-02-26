const express = require("express");
const server = express();
const projectsRouter = require("../api/projects/projects-router");

server.use(express.json());
// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send("Başlıyruuuz");
});

module.exports = server;
