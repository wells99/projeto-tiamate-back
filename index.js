// imports gerais
const express = require("express");
const cors = require("cors"); 

const app = express();
const port = 8000;

// imports de rotas
const categoriaRoutes = require("./src/routes/categoriaRoutes");
const leadRoutes = require("./src/routes/leadRoutes");
const unidadeRoutes = require("./src/routes/unidadeRoutes");
const usuarioRoutes = require("./src/routes/usuarioRoutes");
const bannerRoutes = require("./src/routes/bannerRoutes");
const produtoRoutes = require("./src/routes/produtoRoutes");
const picturesRoutes = require("./src/routes/picturesRoutes");
const depoimentosRoutes = require("./src/routes/depoimentosRoutes")
const { login } = require("./src/controllers/usuarioController");
const { rotaProtegida } = require("./src/utils");


// middleware que permite requisições de outros dominios
app.use(cors());
// middleware que traduz o json pra javascript
app.use(express.json());

// rota raiz
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/login", async (req, res) => {
    res.send(await login(req.body));
})

// rotas das entidades

app.use("/banners", bannerRoutes);
app.use("/produtos", produtoRoutes);
app.use('/uploads/banners', express.static('./src/uploads/banners'));
app.use('/uploads/produtos', express.static('./src/uploads/produtos'));
app.use('/uploads/depoimentos', express.static('./src/uploads/depoimentos'));
app.use("/categorias", categoriaRoutes);
app.use("/leads",leadRoutes);
app.use("/unidades",unidadeRoutes);
app.use("/usuarios", rotaProtegida, usuarioRoutes); 
app.use("/pictures",picturesRoutes); 
app.use("/depoimentos",depoimentosRoutes); 

// rota not found
app.use((req, res) => {
    res.status(404).send("Rota não encontrada");
});

// função que aguarda requisições
app.listen(port, () => {
    console.log(`Servidor de pé: http://localhost:${port}`);
});
