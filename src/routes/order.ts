/**
    * @openapi
    * /api/orders:
    *   get:
    *     summary: Retrieve a list of orders
    *     tags:
    *       - Orders
    *     responses:
    *       "200":
    *         description: A list of orders
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/Order'
    *   post:
    *     summary: Create an Order
    *     tags:
    *       - Orders
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/OrderInput'
    *     responses:
    *       "201":
    *         description: Create an Order
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Order'
    * /api/orders/{id}: 
    *   put:
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true
    *         schema: 
    *           type: string
    *     summary: Update an Order
    *     tags:
    *       - Orders
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/OrderInput'
    *     responses:
    *       "200":
    *         description: Update an Order
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Order'
    *   delete:
    *     parameters:
    *       - name: id
    *         in: path  
    *         required: true
    *         schema: 
    *          type: string
    *     summary: Delete an Order
    *     tags:
    *       - Orders
    *     responses:
    *       200:
    *         description: Delete an Order
    *   get:
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true  
    *         schema: 
    *           type: string
    *     summary: Get an Order
    *     tags:
    *       - Orders
    *     responses:
    *       "200":
    *         description: Get an Order
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Order'
    */


import express from "express";

import {getOrders, getOrderById,createOrder,deleteOrder,updateOrder} from "../controllers/order.ts";
import { orderInputSchema ,orderParmSchema} from '../models/Order.ts';
import { validateBody } from '../middleware/validateBody.ts';
import { z } from "zod";


const api=express.Router();

   
api.route("/").get(getOrders);
api.route("/").post(validateBody({
    querySchema: z.object({}),
    bodySchema: orderInputSchema,
    paramsSchema: z.object({}),
  }),createOrder);

api.route("/:id").get(validateBody({
    querySchema: z.object({}),
    bodySchema: z.unknown(),
    paramsSchema: orderParmSchema,
  }),getOrderById);
api.route("/:id").put(validateBody({
    querySchema: z.object({}),
    bodySchema: orderInputSchema,
    paramsSchema: orderParmSchema,
  }),updateOrder);
api.route("/:id").delete(validateBody({
    querySchema: z.object({}),
    bodySchema: z.unknown(),
    paramsSchema: orderParmSchema,
  }),deleteOrder);

export default api;