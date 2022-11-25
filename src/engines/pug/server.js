let express = require("express");
let app = express();
const PORT = process.env.PORT || 8083;


const asd = require("../../data/productos.json") 

const Contenedor = require('../../contenedor/contenedor');
const productos = new Contenedor("../../data/productos.json" /*__dirname + "/data/productos.json"*/);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set("views", "./src/views");
app.set("view engine", "pug");



app.get('/', (req, res, next)=> {
    res.render('form.pug', {})
});

app.get('/productos', async(req, res, next)=> {
    const prod = await productos.getAll();
    res.render('productos.pug', {prod})
});

app.post('/productos', async(req, res, next)=> {
    let prod = req.body
    await productos.save(prod)
    res.redirect('/')
});



const connectedServer = app.listen(PORT, ()=> console.log(`Server ON By Carlos Cogliandro------> http://localhost:${PORT}`));

connectedServer.on('Error al conectar ----->', (error) => {console.log(error)});