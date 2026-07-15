import mongoose,{Types} from "mongoose";
import z from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     ProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Phone"
 *           description: The Name
 *         description:
 *           type: string
 *           example: "Product description"
 *           description: Product description
 *         price:
 *           type: number
 *           description: The price
 *         categoryId:
 *           type: string
 *           description: The categoryId
 *           example: "6a54c738a14d1d5196f5e475" 
 *       required:
 *         - name
 *         - description
 *         - price
 *         - categoryId
 */

export const productInputSchema = z.strictObject({
  name: z.string().min(2, 'min length is 2 chars'),
  description: z.string().min(2, 'min length is 2 chars'),
  price: z.number(),
  image: z.string(),
  categoryId: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid categoryId'
  })
});

export const productParmSchema = z.strictObject({
  id: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid id'
  })
});

export const productQuerySchema = z.strictObject({
  categoryId: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid categoryId param'
  }).optional()
});

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The Name
 *         description:
 *           type: string
 *           description: The Name
 *         price:
 *           type: number
 *           description: The price
 *         image:
 *           type: string
 *           description: Product Image
 *         categoryId:
 *           type: string
 *           description: The categoryId
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category ID is required']
    },
    image: {
      type: String
    }
  },{
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
export type ProductInput = z.infer<typeof productInputSchema>;
export default mongoose.model('Product', productSchema);