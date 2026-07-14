import express from 'express';
import formidable from 'formidable';
import type { RequestHandler } from 'express';

const app = express();

const formMiddleWare =
  (): RequestHandler =>
  (req, res, next) => {
    
    //console.log('I am in middleware');
    const form =  formidable({
    uploadDir: 'upload/',
    maxFileSize: 100 * 1024 * 1024, // 10MB
    keepExtensions: true,
    filename: function (name, ext, part, form) {
      const { originalFilename } = part;
      // ensure a string is always returned (fallback to a timestamp-based name)
      return originalFilename ? `${Date.now()}-`+originalFilename:`${Date.now()}${ext}`;
    },
    filter: function ({ name, originalFilename, mimetype }) {
      // keep only images
      const valid = mimetype?.includes('image') ?? false;
      if (!valid)
        form.emit('error', 'Invalid file');
    //next('Invalid file');
      return valid;
    },
  });;
    //const body=req.body;
    //console.log('start parse');
     form.parse(req, (err, fields, files) => {
    if (err) {
        console.log(err);
      next(err);
      return;
    }
    
    //console.log('fields:', fields);
   // console.log('files:===', files);
    req.body = fields;
    //console.log("added to body",req.body);
   // const file=files.file;
    //const filePath=Array.isArray(file) ? file[0]?.filepath :undefined;
    //console.log("req.body.file====",filePath);
    req.file=Array.isArray(files.image) ? files.image[0]:undefined;
    //console.log("req.file====",files.file[0]);
   // console.log('parse complete');
    next();
  });
   
  };


export default formMiddleWare;