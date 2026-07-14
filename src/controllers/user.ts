import express, { type RequestHandler } from 'express';
import User, { type UserInput }  from '../models/User.ts';

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = (await User.find());
    res.json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body as UserInput;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'name, email, and password are required' });
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const {
      body,
      params: { id }
    } = req;
    const { name, email } = body as UserInput;
    if (!name || !email)
      return res.status(400).json({ error: 'name and email are required' });
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.name = name;
    user.email = email;
    const newUser=await user.save();
    res.json(newUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};