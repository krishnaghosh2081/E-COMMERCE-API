import mongoose,{Types} from "mongoose";
import z from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     ShoppingCartInput:
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
 *           description: The product id and quantity for an ShoppingCart
 *       required:
 *         - name
 *         - products
 */

export const shoppingCartInputSchema = z.strictObject({
  userId: z.string().refine((value) => Types.ObjectId.isValid(value), {
      message: 'Invalid userId'
    }),
  products: z.array(z.strictObject({
    productId: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid productId'
      }),
    quantity: z.number().min(1)
  }))
});

export const shoppingCartParmSchema = z.strictObject({
  id: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid id'
  })
});

/**
 * @openapi
 * components:
 *   schemas:
 *     ShoppingCart:
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
 *               image:
 *                 type: string
 *                 example: "image link"
 *                 description: The product image
 *           description: The product id ,image and quantity for an ShoppingCart
 *         total:
 *           type: number
 *           example: "15"
 *           description: The price
 */
const shoppingCartSchema = new mongoose.Schema(
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
export type ShoppingCartInput = z.infer<typeof shoppingCartInputSchema>;
export default mongoose.model('ShoppingCart', shoppingCartSchema);