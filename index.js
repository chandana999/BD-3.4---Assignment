const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cors = require('cors');

app.use(cors());

app.use(express.static('static'));

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];
function addToCart(cart,productId,name,price,quantity){
  let newItem = { productId, name, price, quantity };
  cart.push(newItem);
  return cart;
}
app.get('/cart/add', (req, res) => { 
  let productId = parseInt(req.query.productId);
  let name =  req.query.name;
  let price =  parseInt(req.query.price);
  let quantity =  parseFloat(req.query.quantity);
  let result = addToCart(cart,productId,name,price,quantity);
  res.json(result);
});

function updateToCart(cart,productId,quantity){
  for (let i=0;i<cart.length;i++){
    if (cart[i].productId === productId){
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => { 
  let productId = parseInt(req.query.productId);
  let quantity =  parseFloat(req.query.quantity);
  let result = updateToCart(cart,productId,quantity);
  res.json(cart);
});

function deleteCartByProduct(product,productId){
  return product.productId !== productId;
}
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter(product => deleteCartByProduct(product,productId))
  res.json(result);
});

app.get('/cart', (req, res) => {
  res.json(cart);
});


function  totalQuantity(cart){
  let totalQuantity = 0;
  for (let i=0;i<cart.length;i++){
    totalQuantity = cart[i].quantity + totalQuantity;
  }
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = totalQuantity(cart);
  res.json( {totalQuantity : result});
});


function totalPrice(cart){
  let totalPrice = 0;
  for (let i=0;i<cart.length;i++){
    totalPrice = cart[i].price + totalPrice;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let result = totalPrice(cart);
  res.json({totalPrice : result});
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
