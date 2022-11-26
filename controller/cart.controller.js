const { cart } = require("../model");
const Cart = require("../model/Cart");
const Products = require("../model/product");

let createCart = async (req, res, next) => {
  //let cart = req.body
  try {
    await Cart.create({ const: 0 });
    res.status(200).json({
      message: "Cart created",
    });
  } catch (err) {
    res.status(401).json({
      message: "Some interal error happened",
    });
  }
};

let updateCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  let cartToUpdate = await Cart.findByPk(cartId);
  if (cartToUpdate) {
    let productsToAdd = await Products.findAll({
      where: {
        id: req.body.ProductIds,
      },
    });

    if (productsToAdd) {
      await cartToUpdate.setProducts(productsToAdd);
      console.log("Product added");
      let totalCost = 0;
      let productsSelected = [];
      let products = await cartToUpdate.getProducts();
      for (i = 0; i < products.length; i++) {
        totalCost = totalCost + products[i].price;
        productsSelected.push({
          id: products[i].id,
          name: products[i].name,
          cost: products[i].price,
        });
      }

      res.status(200).json({
        id: cartToUpdate.id,
        productsSelected,
        totalCost,
      });
    }
  }
};

let getCart = async (req, res, next) => {
  let cart = await Cart.findByPk(req.params.cartId);
  let totalCost = 0;
  let productsSelected = [];
  let products = await cart.getProducts();
  for (i = 0; i < products.length; i++) {
    totalCost = cost + products[i].cost;
    productsSelected.push({
      id: products[i].id,
      name: products[i].name,
      cost: products[i].cost,
    });
  }
};

module.exports = { createCart, updateCart, getCart };
