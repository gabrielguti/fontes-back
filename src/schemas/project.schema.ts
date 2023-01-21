import { z } from "zod";

export const projectSchema = {
  create: z.object({
    title: z.string({
      required_error: 'Title is required.'
    }),
    zip_code: z.number({
      required_error: 'Zip code is required'
    }),
    cost: z.number({
      required_error: 'Cost is required.'
    }),
    done: z.boolean({
      required_error: 'Done is required.'
    }),
    deadline: z.string({
      required_error: 'Deadline is required.'
    }),
  }),
};

export const projectSchemaToPut = {
  create: z.object({
    title: z.string({
      required_error: 'Title is required.'
    }),
    zip_code: z.number({
      required_error: 'Zip code is required'
    }),
    cost: z.number({
      required_error: 'Cost is required.'
    }),
    deadline: z.string({
      required_error: 'Deadline is required.'
    }),
  }),
}
