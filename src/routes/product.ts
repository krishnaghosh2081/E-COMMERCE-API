/**
    * @openapi
    * /api/products:
    *   get:
    *     parameters:
    *       - name: categoryId
    *         in: query
    *         schema: 
    *           type: string
    *     summary: Retrieve a list of products
    *     tags:
    *       - Products
    *     responses:
    *       "200":
    *         description: A list of products
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/Product'
    *   post:
    *     summary: Create a Product
    *     tags:
    *       - Products
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/ProductInput'
    *     responses:
    *       "201":
    *         description: Create a Product
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Product'
    * /api/products/{id}: 
    *   put:
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true
    *         schema: 
    *           type: string
    *     summary: Update a Product
    *     tags:
    *       - Products
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/ProductInput'
    *     responses:
    *       "200":
    *         description: Update a Product
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Product'
    *   delete:
    *     parameters:
    *       - name: id
    *         in: path  
    *         required: true
    *         schema: 
    *          type: string
    *     summary: Delete a Product
    *     tags:
    *       - Products
    *     responses:
    *       200:
    *         description: Delete a Product
    *   get:
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true  
    *         schema: 
    *           type: string
    *     summary: Get a Product
    *     tags:
    *       - Products
    *     responses:
    *       "200":
    *         description: Get a Product
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Product'
    */


import express from "express";

import {getProducts,createProduct,updateProduct,getProductById,deleteProduct} from "../controllers/product.ts";
import { productInputSchema } from '../models/Product.ts';
import { validateBody } from '../middleware/validateBody.ts';

const api=express.Router();

   
api.route("/").get(getProducts);
api.route("/:categoryId").get(getProducts);
api.route("/").post(validateBody(productInputSchema),createProduct);

api.route("/:id").get(getProductById);
api.route("/:id").put(updateProduct);
api.route("/:id").delete(deleteProduct);

export default api;