const express = require("express");
const path = require("path");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, "../public")));

// Rota para o index
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/index.html"))
});

router.get("/teste", (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/teste.html"))
});

// Adicione mais rotas aqui, se necessário

app.use("/.netlify/functions/routes", router);

module.exports.handler = serverless(app);
