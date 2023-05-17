const express = require('express')
const app = express()
const PORT = 8080 || process.env.PORT 

// Public Folder
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))

// Routes
const routesProducts = require('./routes/products/products.route')
app.use('/products', routesProducts)
const routesCart = require('./routes/cart/cart.route') 
app.use('/cart', routesCart)
const routesRealTime = require('./routes/realTimeProduct/realTimeProduct.route')
app.use('/realTimeProducts', routesRealTime)

// Handlebars
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

// Sockets set
const {Server} = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = new Server(server)

// Importamos productManager
const ProductManager = require('./routes/products/ProductManager')

io.on('connection', (socket)=>{
    console.log('New User connected')
    socket.emit('wellcome','Wellcome new User') 

    // Comunicacion con realTimeProduct.js
    socket.on('addProduct' ,(data)=>{
        let product = new ProductManager("./src/routes/products/Products.json");
        product.addProduct(data)
        let newData = product.getProducts()
        io.sockets.emit('newData', newData)

    })
    socket.on('delProduct',(data)=>{
        let {id} =data
        let pId = parseInt(id)
        let product = new ProductManager("./src/routes/products/Products.json");
        product.deleteProduct(pId)
        let newData = product.getProducts()
        io.sockets.emit('newData', newData)
    })
})

app.get('/', (req,res)=> {
    const data={
        title:'ecommerce backend',
        message:'Ecommerce backend  Index',
        style:'style.css'
    }
    res.render('index', data)
})

server.listen(PORT, ()=>{console.log('Server is runing on port 8080')})

