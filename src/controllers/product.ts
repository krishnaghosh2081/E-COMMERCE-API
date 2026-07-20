import { type RequestHandler } from 'express';
import Product, { type ProductInput }  from '../models/Product.ts';
import Category from '../models/Category.ts';
import url from 'url';

export  const getProducts: RequestHandler = async (req, res) => {
  try {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    const { categoryId } = query;
    if(categoryId){
        const products = await Product.find({categoryId: categoryId}).populate('categoryId', 'name');
        return res.json(products);
    }
    const products = await Product.find().populate('categoryId', 'name');
    res.json(products);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body as ProductInput;
    if (!name || !description || !price || !categoryId)
      return res.status(400).json({ error: 'name, description, price, and categoryId are required' });
    const category=await Category.findById(categoryId);
    if(!category)
      return res.status(400).json({ error: 'No Category found with given CategoryId' });

    const product = await Product.create({ name, description, price, categoryId });
    const populatedProduct = await product.populate('categoryId', 'name');
    res.json(populatedProduct);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const product = await Product.findById(id).populate('categoryId', 'name');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const {
      body: { name, description, price, categoryId, image },
      params: { id }
    } = req;
    if (!name || !description || !price || !categoryId )
      return res.status(400).json({ error: 'name, description, price, and categoryId are required' });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const category=await Category.findById(categoryId);
    if(!category)
      return res.status(400).json({ error: 'No Category found with given CategoryId' });

    product.name = name;
    product.description = description;
    product.price=price;
    product.categoryId = categoryId;
    product.image=image;
    await product.save();

    const populatedProduct = await product.populate('categoryId', 'name');
    res.json(populatedProduct);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};