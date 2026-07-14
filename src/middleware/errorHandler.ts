import { type ErrorRequestHandler } from 'express';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    //process.env.NODE_ENV !== 'production' &&
    //    console.log(`\x1b[31m${err.stack}\x1b[0m`);

    const logDir=process.env.LOG_DIR;  
    let fileName='';
    if(logDir)  {
        //console.log(logDir);
        fileName=logDir+'/'+'-%DATE%-error.log';
        //console.log(fileName);
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

transport.on('error', error => {
    // log or handle errors here
    

    if (err instanceof Error) {
    // check if cause property exists, is an object, and has a 'status' property
        if (err.cause && typeof err.cause === 'object' && 'status' in err.cause) {
            statusCode = err.cause.status as number;
        }
        errorMessage = err.message;
    }
    //if(logDir && )
    res.status(statusCode).json({ error: errorMessage });
});


transport.on('rotate', (oldFilename, newFilename) => {
    // do something fun
});

const logger = winston.createLogger({
    transports: [
        transport
    ]
});

//logger.info('Hello World!');
logger.error(statusCode+"-"+errorMessage);
    
};

export default errorHandler;