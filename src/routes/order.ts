/**
    * @openapi
    * /api/orders:
    *   get:
    *     summary: Retrieve a list of orders
    *     tags:
    *       - Orders
    *     responses:
    *       200:
    *         description: A list of orders
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
    *       201:
    *         description: Create an Order
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
    *       200:
    *         description: Update an Order
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
    *       200:
    *         description: Get an Order
    *         content:
    *            application/json:
    *                schema:
    *                  $ref: '#/components/schemas/OrderOutput'
    */


import express from "express";

import {getOrders, getOrderById,createOrder,deleteOrder,updateOrder} from "../controllers/order.ts";
import { orderInputSchema } from '../models/Order.ts';
import { validateBody } from '../middleware/validateBody.ts';

const api=express.Router();

   
api.route("/").get(getOrders);
api.route("/").post(validateBody(orderInputSchema),createOrder);

api.route("/:id").get(getOrderById);
api.route("/:id").put(updateOrder);
api.route("/:id").delete(deleteOrder);

export default api;