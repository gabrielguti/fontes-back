import { z } from "zod";

export const userSchema = {
  create: z.object({
    name: z.string({
      required_error: 'Name is required.'
    }).min(4),
    password: z.string({
      required_error: 'Password is required.'
    }).min(6),
    username: z.string({
      required_error: 'Username is required.'
    }).min(4),
  }),
};

export const userLoginSchema = {
  create: z.object({
    username: z.string({
      required_error: 'Name is required.'
    }).min(4),
    password: z.string({
      required_error: 'Password is required.',
      invalid_type_error: 'teste'
    }).min(6),
  }),
}
