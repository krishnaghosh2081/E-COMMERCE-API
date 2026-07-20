import { type ErrorRequestHandler } from 'express';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';
import path from 'path';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    
        let logDir=process.env.LOG_DIR;  

        if(!logDir){
         logDir = path.join(process.cwd(), 'log');
        
        
            // make sure log folder exists
            if (!fs.existsSync(logDir)) {
              fs.mkdirSync(logDir);
            }
        }
        let fileName='';
        if(logDir)  {
            fileName=logDir+'/'+'-%DATE%-error.log';
        }
        const transport: DailyRotateFile = new DailyRotateFile({
            filename: fileName,
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        });
        let errorMessage = 'Internal server error';
        let statusCode = 500;


        if (err instanceof Error) {
        // check if cause property exists, is an object, and has a 'status' property
            if (err.cause && typeof err.cause === 'object' && 'status' in err.cause) {
                statusCode = err.cause.status as number;
            }
            errorMessage = err.message;
        }

    const logger = winston.createLogger({
        transports: [
            transport
        ]
    });

    logger.error(statusCode+"-"+errorMessage);
    return  res.status(statusCode).json({ error: errorMessage });
};

export default errorHandler;