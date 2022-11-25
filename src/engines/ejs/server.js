
let express = require("express");
let app = express();
const PORT = process.env.PORT || 8081;

const Contenedor = require('../../contenedor/contenedor');
const productos = new Contenedor("../../data/productos.json" /*__dirname + "/data/productos.json"*/);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set("views", "./src/views");
app.set("view engine", "ejs");



app.get('/', (req, res, next)=> {
    res.render('inicio', {})
});

app.get('/productos', async(req, res, next)=> {
    const prod = await productos.getAll();
    res.render('productos', {prod})
});

app.post('/productos', async(req, res, next)=> {
    let prod = req.body
    await productos.save(prod)
    res.redirect('/')
});




const connectedServer = app.listen(PORT, ()=> console.log(`Server ON By Carlos Cogliandro------> http://localhost:${PORT}`));

connectedServer.on('Error al conectar ----->', (error) => {console.log(error)});