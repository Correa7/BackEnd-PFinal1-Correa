const express = require('express')
const app = express()
const uuid4 = require('uuid4')

const url=8080
app.listen(url, ()=>{console.log('Server is runing on port 8080')})

const routesProducts = require('./routes/products/products')
app.use('/products', routesProducts)

const routesCart = require('./routes/cart/cart')
app.use('/cart', routesCart)
app.use('/static', express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))

app.get('/', (req,res)=> {
    res.send('Index')
   })