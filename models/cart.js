const { json } = require('express/lib/response');
const fs = require('fs');
const path = require('path');
const Product = require('./product');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart{

   static addProduct(id,prpductPrice){
        fs.readFile(p, (err, fileContent) => {
            let cart = {products:[],totalPrice:0}
            if (!err) {
                cart = JSON.parse(fileContent);
            } 
            const existingProductIndex = cart.products.findIndex(p=>p.id===id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty+1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = {id:id,qty:1};
                cart.products = [...cart.products,updatedProduct];
            }
            cart.totalPrice = cart.totalPrice+ +prpductPrice;
            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
            });
        });
   }

   static deleteProduct(id,productPrice){
    fs.readFile(p, (err, fileContent) => {

        if(err){
            return;
        }

        const updatedCart = {...JSON.parse(fileContent)};
        const product = updatedCart.products.find(p=>p.id===id);
        if(!product){
            return;
        }
        const productQty = product.qty;
        updatedCart.products = updatedCart.products.filter(p=>p.id!==id);
        updatedCart.totalPrice = updatedCart.totalPrice-product.price*productQty;
        fs.writeFile(p,JSON.stringify(updatedCart),(err)=>{
            console.log(err);
        });
    })
   }
}