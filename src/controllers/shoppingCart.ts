import { type RequestHandler } from 'express';
import ShoppingCart, { type ShoppingCartInput }  from '../models/ShoppingCart.ts';
import User from '../models/User.ts';
import Product from '../models/Product.ts';

export  const getShoppingCarts: RequestHandler = async (req, res) => {
  try {
    const shoppingcarts = await ShoppingCart.find().populate([
      { path: 'userId', select: 'name email' },
      { path: 'products.productId', select: 'name image' }
    ]);
    res.json(shoppingcarts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const createShoppingCart: RequestHandler = async (req, res) => {
  try {
    const { userId,products } = req.body as ShoppingCartInput;
    if (!products || !userId)
      return res.status(400).json({ error: 'products and userId are required' });
    const user=await User.findById(userId);
    if(!user)
      return res.status(400).json({ error: 'No User found with given UserId' });
    
    //calculate price
    let total = 0;
    for (const obj of products) {
      const { productId, quantity } = obj;
      //console.log("productId===", productId);
      const product = await Product.findById(productId);
      if (!product)
        return res.status(400).json({ error: 'No product found with given ProductId' });
      total = total + (product.price * quantity);
    }

    const shoppingcart = await ShoppingCart.create({ userId, products, total });
    const populatedShoppingCart = await shoppingcart.populate([
      { path: 'userId', select: 'name email' },
      { path: 'products.productId', select: 'name image' }
    ]);
    res.json(populatedShoppingCart);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getShoppingCartById: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const shoppingcart = await ShoppingCart.findById(id);
    if (!shoppingcart) return res.status(404).json({ error: 'ShoppingCart not found' });
    const populatedShoppingCart = await shoppingcart.populate([
      { path: 'userId', select: 'name email' },
      { path: 'products.productId', select: 'name image' }
    ]);
    res.json(populatedShoppingCart);

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const updateShoppingCart: RequestHandler = async (req, res) => {
  try {
    const {
      body: { userId , products},
      params: { id }
    } = req;
    if (!products || !userId)
      return res.status(400).json({ error: 'name, description, price, and userId are required' });

    const shoppingcart = await ShoppingCart.findById(id);
    if (!shoppingcart) return res.status(404).json({ error: 'ShoppingCart not found' });

    const user=await User.findById(userId);
    if(!user)
      return res.status(400).json({ error: 'No User found with given UserId' });

    //update shoppingcart and calculate total price
    let total = 0;
    for (const obj of products) {
      const { productId, quantity } = obj;
      const product = await Product.findById(productId);
      if (!product)
        return res.status(400).json({ error: 'No product found with given ProductId' });
      total = total + (product.price * quantity);
    }

     shoppingcart.userId=userId;
     shoppingcart.products=products;
     shoppingcart.total=total;
    const newShoppingCart=await shoppingcart.save();
    const populatedShoppingCart = await newShoppingCart.populate([
      { path: 'userId', select: 'name email' },
      { path: 'products.productId', select: 'name image' }
    ]);
    res.json(populatedShoppingCart);

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const deleteShoppingCart: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const shoppingcart = await ShoppingCart.findByIdAndDelete(id);
    if (!shoppingcart) return res.status(404).json({ error: 'ShoppingCart not found' });
    res.json({ message: 'ShoppingCart deleted' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};