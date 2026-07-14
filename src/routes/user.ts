/**
    * @openapi
    * /api/users:
    *   get:
    *     summary: Retrieve a list of users
    *     tags:
    *       - Users
    *     responses:
    *       200:
    *         description: A list of users
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
    *       201:
    *         description: Create an User
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
    *       200:
    *         description: Update an User
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
    *       200:
    *         description: Get an User
    *         content:
    *            application/json:
    *                schema:
    *                  $ref: '#/components/schemas/UserOutput'
    */



import express from "express";

import {getUsers,createUser,getUserById,updateUser,deleteUser} from "../controllers/user.ts";
import { userInputSchema } from '../models/User.ts';
import { validateBody } from '../middleware/validateBody.ts';

const api=express.Router();

   
api.route("/").get(getUsers);
api.route("/").post(validateBody(userInputSchema),createUser);

api.route("/:id").get(getUserById);
api.route("/:id").put(updateUser);
api.route("/:id").delete(deleteUser);

export default api;