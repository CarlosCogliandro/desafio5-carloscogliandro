
let express = require("express");
let app = express();
let hbs = require("express-handlebars");
const PORT = process.env.PORT || 8086;

const Contenedor = require('../../contenedor/contenedor');
const productos = new Contenedor("../../data/productos.json" /*__dirname + "/data/productos.json"*/);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.engine("handlebars", hbs.engine());

app.set("views", "./src/views");
app.set("view engine", "handlebars");



app.get('/', (req, res, next)=> {
    res.render('./partials/form', {})
});

app.get('/productos', async(req, res, next)=> {
    const prod = await productos.getAll();
    const length = prod.length > 0 ? true : false
    res.render('./partials/productos', {prod, length})
});

app.post('/productos', async(req, res, next)=> {
    let prod = req.body
    await productos.save(prod)
    res.redirect('/')
});



const connectedServer = app.listen(PORT, ()=> console.log(`Server ON By Carlos Cogliandro------> http://localhost:${PORT}`));

connectedServer.on('Error al conectar ----->', (error) => {console.log(error)});