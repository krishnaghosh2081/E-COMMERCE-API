/**
    * @openapi
    * /api/users:
    *   get:
    *     summary: Retrieve a list of users
    *     tags:
    *       - Users
    *     responses:
    *       "200":
    *         description: A list of users
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/User'
    *   post:
    *     summary: Create an User
    *     tags:
    *       - Users
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/UserInput'
    *     responses:
    *       "201":
    *         description: Create an User
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    * /api/users/{id}: 
    *   put:
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true
    *         schema: 
    *           type: string
    *     summary: Update an User
    *     tags:
    *       - Users
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/UserInput'
    *     responses:
    *       "200":
    *         description: Update an User
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *   delete:
    *     parameters:
    *       - name: id
    *         in: path  
    *         required: true
    *         schema: 
    *          type: string
    *     summary: Delete an User
    *     tags:
    *       - Users
    *     responses:
    *       200:
    *         description: Delete an User
    *   get:
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true  
    *         schema: 
    *           type: string
    *     summary: Get an User
    *     tags:
    *       - Users
    *     responses:
    *       "200":
    *         description: Get an User
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    */


import express from "express";
import { z } from "zod";

import {getUsers,createUser,getUserById,updateUser,deleteUser} from "../controllers/user.ts";
import { userInputSchema,userParmSchema } from '../models/User.ts';
import { validateBody } from '../middleware/validateBody.ts';

const api=express.Router();
   
api.route("/").get(getUsers);
api.route("/").post(
  validateBody({
    querySchema: z.object({}),
    bodySchema: userInputSchema,
    paramsSchema: z.object({}),
  }),
  createUser
);

api.route("/:id").get(
  validateBody({
    querySchema: z.object({}),
    bodySchema: z.unknown(),
    paramsSchema: userParmSchema
  }),getUserById);
api.route("/:id").put(
  validateBody({
    querySchema: z.object({}),
    bodySchema: userInputSchema,
    paramsSchema: userParmSchema
  }),updateUser);
api.route("/:id").delete(
  validateBody({
    querySchema: z.object({}),
    bodySchema: z.unknown(),
    paramsSchema: userParmSchema
  }),deleteUser);

export default api;