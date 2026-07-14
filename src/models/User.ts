import mongoose from "mongoose";
import z from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     UserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "John"
 *           description: The Name
 *         email:
 *           type: string
 *           example: "john@example.com"
 *           description: The email
 *         password:
 *           type: string
 *           description: The password
 *       required:
 *         - name
 *         - email
 *         - password
 */

export const userInputSchema = z.strictObject({
  name: z.string().min(2, 'min length is 2 chars'),
  email: z.email(),
  password: z.string().min(6, 'min length is 6 chars')
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email is not valid']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
      minlength: [6, 'Password must be at least 6 characters long']
    }
  }
);

mongoose.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret: any, options) {
    delete ret.__v;
    delete ret._id;
    delete ret.password;
    return ret;
  }
}); 
export type UserInput = z.infer<typeof userInputSchema>;
export default mongoose.model('User', userSchema);