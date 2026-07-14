import mongoose from "mongoose";
import z from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     CategoryInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Product Category"
 *           description: The Name
 *       required:
 *         - name
 */

export const categoryInputSchema = z.strictObject({
  name: z.string().min(2, 'min length is 3 chars')
});

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category Name name is required'],
      trim: true
    }
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
export type CategoryInput = z.infer<typeof categoryInputSchema>;
export default mongoose.model('Category', categorySchema);