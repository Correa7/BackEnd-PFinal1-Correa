const express = require('express')
const {Router} = express
const router = new Router()

const ProductManager = require('../products/ProductManager')

router.get('/', (req, res)=>{
    let product = new ProductManager("./src/routes/products/Products.json");
    let products = product.getProducts() 
    res.render('realTimeProducts', {
        products:products,
        style:'realtimeproducts.css',
        title:'RealTimeProducts'
    })
} )




module.exports= router