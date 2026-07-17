import { type RequestHandler } from 'express';
import Category, { type CategoryInput }  from '../models/Category.ts';

export const getCategories: RequestHandler = async (req, res) => {
  try {
    const categories = (await Category.find());
    res.json(categories);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const createCategory: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body as CategoryInput;
    if (!name )
      return res.status(400).json({ error: 'Category name is required' });
    const found = await Category.findOne({ name });
    if (found) return res.status(400).json({ error: 'Category already exists' });
    const category = await Category.create({ name});
    res.json(category);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getCategoryById: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    
    res.json(category);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const updateCategory: RequestHandler = async (req, res) => {
  try {
    const {
      body,
      params: { id }
    } = req;
    const { name } = body as CategoryInput;
    if (!name)
      return res.status(400).json({ error: 'Category name is required' });
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    category.name = name;
    const newcategory=await category.save();
    res.json(newcategory);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const deleteCategory: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};