import { Request, Response, NextFunction } from "express";
import { Schema } from "zod";

const wrapValidation = (fn: Function, schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (schema) {
      try {
        let data = {};

        const requestMembers = ["body", "params", "query", "headers"];

        for (const member of requestMembers) {
          data = { ...data, ...req[member] };
        }

       try {
         await schema.parseAsync(data)
         await fn(req, res, next);

       }catch (err:any) { 
        const path =  err.issues.map((error) => error.path)
        const fields = err.issues.map((error) => error.message)
        
        return res.status(400).json({fields})}
      } catch (err: any) {
        next(err);
      }
    } else {
      await fn(req, res, next);
    }
  };
};

export default wrapValidation;
