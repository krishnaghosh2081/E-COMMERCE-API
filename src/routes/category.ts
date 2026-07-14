/**
    * @openapi
    * /api/categories:
    *   get:
    *     summary: Retrieve a list of categoriess
    *     tags:
    *       - Categories
    *     responses:
    *       "200":
    *         description: A list of categoriess
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/Category'
    *   post:
    *     summary: Create a Category
    *     tags:
    *       - Categories
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/CategoryInput'
    *     responses:
    *       "201":
    *         description: Create a Category
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Category'
    * /api/categories/{id}: 
    *   put:
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true
    *         schema: 
    *           type: string
    *     summary: Update a Category
    *     tags:
    *       - Categories
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/CategoryInput'
    *     responses:
    *       "200":
    *         description: Update a Category
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Category'
    *   delete:
    *     parameters:
    *       - name: id
    *         in: path  
    *         required: true
    *         schema: 
    *          type: string
    *     summary: Delete a Category
    *     tags:
    *       - Categories
    *     responses:
    *       200:
    *         description: Delete a Category
    *   get:
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true  
    *         schema: 
    *           type: string
    *     summary: Get a Category
    *     tags:
    *       - Categories
    *     responses:
    *       "200":
    *         description: Get a Category
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Category'
    */

import express from "express";

import {getCategories,getCategoryById,createCategory,deleteCategory,updateCategory} from "../controllers/category.ts";
import { categoryInputSchema } from '../models/Category.ts';
import { validateBody } from '../middleware/validateBody.ts';

const api=express.Router();

   
api.route("/").get(getCategories);
api.route("/").post(validateBody(categoryInputSchema),createCategory);

api.route("/:id").get(getCategoryById);
api.route("/:id").put(updateCategory);
api.route("/:id").delete(deleteCategory);

export default api;