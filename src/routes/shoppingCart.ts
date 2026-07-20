/**
    * @openapi
    * /api/shoppingCarts:
    *   get:
    *     summary: Retrieve a list of shoppingCarts
    *     tags:
    *       - ShoppingCarts
    *     responses:
    *       "200":
    *         description: A list of shoppingCarts
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/ShoppingCart'
    *   post:
    *     summary: Create an ShoppingCart
    *     tags:
    *       - ShoppingCarts
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/ShoppingCartInput'
    *     responses:
    *       "201":
    *         description: Create an ShoppingCart
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/ShoppingCart'
    * /api/shoppingCarts/{id}: 
    *   put:
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true
    *         schema: 
    *           type: string
    *     summary: Update an ShoppingCart
    *     tags:
    *       - ShoppingCarts
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/ShoppingCartInput'
    *     responses:
    *       "200":
    *         description: Update an ShoppingCart
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/ShoppingCart'
    *   delete:
    *     parameters:
    *       - name: id
    *         in: path  
    *         required: true
    *         schema: 
    *          type: string
    *     summary: Delete an ShoppingCart
    *     tags:
    *       - ShoppingCarts
    *     responses:
    *       200:
    *         description: Delete an ShoppingCart
    *   get:
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true  
    *         schema: 
    *           type: string
    *     summary: Get an ShoppingCart
    *     tags:
    *       - ShoppingCarts
    *     responses:
    *       "200":
    *         description: Get an ShoppingCart
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/ShoppingCart'
    */


import express from "express";

import {getShoppingCarts, getShoppingCartById,createShoppingCart,deleteShoppingCart,updateShoppingCart} from "../controllers/shoppingCart.ts";
import { shoppingCartInputSchema ,shoppingCartParmSchema} from '../models/ShoppingCart.ts';
import { validateBody } from '../middleware/validateBody.ts';
import { z } from "zod";


const api=express.Router();

   
api.route("/").get(getShoppingCarts);
api.route("/").post(validateBody({
    querySchema: z.object({}),
    bodySchema: shoppingCartInputSchema,
    paramsSchema: z.object({}),
  }),createShoppingCart);

api.route("/:id").get(validateBody({
    querySchema: z.object({}),
    bodySchema: z.unknown(),
    paramsSchema: shoppingCartParmSchema,
  }),getShoppingCartById);
api.route("/:id").put(validateBody({
    querySchema: z.object({}),
    bodySchema: shoppingCartInputSchema,
    paramsSchema: shoppingCartParmSchema,
  }),updateShoppingCart);
api.route("/:id").delete(validateBody({
    querySchema: z.object({}),
    bodySchema: z.unknown(),
    paramsSchema: shoppingCartParmSchema,
  }),deleteShoppingCart);

export default api;