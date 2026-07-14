import express, { type RequestHandler } from 'express';
import Order, { type OrderInput }  from '../models/Order.ts';
import User from '../models/User.ts';
import Product from '../models/Product.ts';

export  const getOrders: RequestHandler = async (req, res) => {
  try {
    const orders = await Order.find().populate([
      { path: 'userId', select: 'name email' },
      { path: 'products.productId', select: 'name' }
    ]);
    res.json(orders);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { userId,products } = req.body as OrderInput;
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

    const order = await Order.create({ userId, products, total });
    const populatedOrder = await order.populate([
      { path: 'userId', select: 'name email' },
      { path: 'products.productId', select: 'name' }
    ]);
    res.json(populatedOrder);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getOrderById: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    const populatedOrder = await order.populate([
      { path: 'userId', select: 'name email' },
      { path: 'products.productId', select: 'name' }
    ]);
    res.json(populatedOrder);

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const updateOrder: RequestHandler = async (req, res) => {
  try {
    const {
      body: { userId , products},
      params: { id }
    } = req;
    if (!products || !userId)
      return res.status(400).json({ error: 'name, description, price, and userId are required' });

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const user=await User.findById(userId);
    if(!user)
      return res.status(400).json({ error: 'No User found with given UserId' });

    //update order and calculate total price
    let total = 0;
    for (const obj of products) {
      const { productId, quantity } = obj;
      const product = await Product.findById(productId);
      if (!product)
        return res.status(400).json({ error: 'No product found with given ProductId' });
      total = total + (product.price * quantity);
    }

     order.userId=userId;
     order.products=products;
     order.total=total;
    const newOrder=await order.save();
    const populatedOrder = await newOrder.populate([
      { path: 'userId', select: 'name email' },
      { path: 'products.productId', select: 'name' }
    ]);
    res.json(populatedOrder);

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const deleteOrder: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};