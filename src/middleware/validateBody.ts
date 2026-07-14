import type { ZodType } from 'zod';
import type { Request, Response, NextFunction } from 'express';

type Schema = {
  querySchema: ZodType<any>;
  bodySchema: ZodType<any>;
  paramsSchema: ZodType<any>;
};

export const validateBody = ({ querySchema, bodySchema, paramsSchema }: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const query=    querySchema.safeParse(req.query); 

    const result=   bodySchema.safeParse(req.body);
    //console.log(req.params);
    const param=    paramsSchema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({ message: 'Invalid body', errors: result.error.issues });
    }

    if (!query.success ) {
      return res.status(400).json({ message: 'Invalid query parameter', errors: query.error.issues });
    }

    if (!param.success) {
      return res.status(400).json({ message: 'Invalid path parameter', errors: param.error.issues });
    }

    req.body = result.data;
    next();
  };
};