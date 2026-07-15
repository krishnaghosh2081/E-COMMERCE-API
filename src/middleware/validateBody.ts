import type { ZodType } from 'zod';
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod/v4';

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
        next(new Error('Invalid body:' + z.prettifyError(result.error), { cause: { status: 400 } }));
      }

      if (!query.success ) {
        next(new Error('Invalid query parameter:' + z.prettifyError(query.error), { cause: { status: 400 } }));
      }

      if (!param.success) {
        next(new Error('Invalid path parameter:' + z.prettifyError(param.error) , { cause: { status: 400 } }));
      }

      req.body = result.data;
      next();
  };
};