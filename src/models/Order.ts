import mongoose from "mongoose";
import z from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     OrderInput:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           example: "userId"
 *           description: The UserId
 *         products:
 *           type: array
 *           items:
 *             properties:
 *               productId: 
 *                 type: string 
 *                 example: "productId"
 *                 description: The productId
 *               quantity:
 *                 type: number
 *                 example: "2"
 *                 description: The quantity
 *           description: The product id and quantity for an Order
 *       required:
 *         - name
 *         - products
 */

export const orderInputSchema = z.strictObject({
  userId: z.string(),
  products: z.array(z.strictObject({
    productId: z.string(),
    quantity: z.number().min(1)
  }))
});

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           example: "userId"
 *           description: The UserId
 *         products:
 *           type: array
 *           items:
 *             properties:
 *               productId: 
 *                 type: string 
 *                 example: "productId"
 *                 description: The productId
 *               quantity:
 *                 type: number
 *                 example: "2"
 *                 description: The quantity
 *           description: The product id and quantity for an Order
 *         total:
 *           type: number
 *           example: "15"
 *           description: The price
 */
const orderSchema = new mongoose.Schema(
  {
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    products:[{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product ID is required']
        },
        quantity:{
            type: Number,
            required: [true, 'Quantity is required']
        }
    }],
    total: {
      type: Number,
      required: [true, 'Total is required']
    }  
  },{
        timestamps: true,
        toObject: {virtuals:true},
    }
);

mongoose.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret: any, options) {
    delete ret.__v;
    delete ret._id;
    return ret;
  }
}); 
export type OrderInput = z.infer<typeof orderInputSchema>;
export default mongoose.model('Order', orderSchema);