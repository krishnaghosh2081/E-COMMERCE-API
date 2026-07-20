import connectDB from './db/index.ts';
import express from "express";
import cors from "cors";
import user from "./routes/user.ts";
import category from "./routes/category.ts";
import product from "./routes/product.ts";
import order from "./routes/order.ts";
import shoppingCart from "./routes/shoppingCart.ts";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import errorHandler from './middleware/errorHandler.ts';


const app = express();
connectDB();
const port = process.env.PORT || 3000;
const url=process.env.URL || `http://localhost:${port}`;

// middleware
app.use(express.json());
app.use(cors());


/**Add Swagger API Documentation */

   const swaggerOptions = {
       swaggerDefinition: {
           openapi: '3.0.0',
           info: {
               title: 'My API',
               version: '1.0.0',
               description: 'API documentation using Swagger',
           },
           servers: [
               {
                   url: `${url}`,
               },
           ],
       },
       apis: ['./src/routes/*.ts', './src/models/*.ts','./routes/*.js', './models/*.js'], // Path to your API docs
   };

   const swaggerDocs = swaggerJSDoc(swaggerOptions);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get("/", (_req, res) => {
  res.send("Hello Wellcome to ECommerce API");
});

app.use("/api/users", user);
app.use("/api/categories", category);
app.use("/api/products", product);
app.use("/api/orders", order);
app.use("/api/shoppingCarts", shoppingCart);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example e-commerce app listening on port ${port}`);
});