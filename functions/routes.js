const express = require("express");
const path = require("path");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

// Definir caminho da pasta pública corretamente
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// ✅ Rota para a página inicial
router.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

router.get("/artigo1", (req, res) => {
    res.sendFile(path.join(publicPath, "assets/site/src/artigos/artigo1.html"));
});

router.get("/artigo2", (req, res) => {
    res.sendFile(path.join(publicPath, "assets/site/src/artigos/artigo2.html"));
});

router.get("/artigo3", (req, res) => {
    res.sendFile(path.join(publicPath, "assets/site/src/artigos/artigo3.html"));
});


// 🔹 Configurar EJS apenas para login
const viewsPathAuths = path.resolve(publicPath, "assets/components/src/auths/");
app.set("view engine", "ejs");
app.set("views", viewsPathAuths);

// ✅ Rota para a página de login (usando EJS)
router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});


app.use("/.netlify/functions/routes", router);

module.exports.handler = serverless(app);
