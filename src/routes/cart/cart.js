const CartManager = require('./CartManager')
// const ProductManager = require('src/routes/products/ProductManager.js')
const express = require('express')

const { Router } = express

const router = new Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.post('/', (req,res)=> {
    let path= './src/routes/cart/Cart.json'
    let newCart = new CartManager(path);
    newCart.createCart()
    res.send('New Cart is created!')
})
router.get('/:cId', (req,res)=> {
    let path= './src/routes/cart/Cart.json'
    let getCart = new CartManager(path);

    const cId = req.params.cId
    getCart.getCartById(cId)
    res.send(`GetCart by ID: ${cId}, Cart: ${getCart}`)
})
router.post('/:cId/product/:pId', (req,res)=>{
    
    const cId = req.params.cId
    const pId = parseInt(req.params.pId)
    let path= './src/routes/cart/Cart.json'
    let newAdd = new CartManager(path);
    newAdd.addToCart(cId,pId)
    res.send(`New product on Cart id: ${cId}`)
})


module.exports = router