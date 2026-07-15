import { type RequestHandler } from 'express';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';


const formMiddleWare = (): RequestHandler =>
  (req, res, next) => {
    const uploadDir = path.join(process.cwd(), 'upload');


    // make sure upload folder exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }


    const form = formidable({
      uploadDir,

      maxFileSize: 100 * 1024 * 1024,

      keepExtensions: true,

      filename: (name, ext, part) => {

        const originalName =
          part.originalFilename ?? `file${ext}`;

        return `${Date.now()}-${originalName}`;
      },


      filter: ({ mimetype }) => {

        const valid =
          mimetype?.startsWith('image/') ?? false;


        return valid;
      },
    });



    form.parse(req, (err, fields, files) => {


      if (err) {
        return next(err);
      }


      try {

        const bodyField = fields.body?.[0];
        //console.log("bodyfield:",bodyField);

        if (!bodyField || typeof bodyField !== 'string') {
          return next(
            new Error('Invalid body field', { cause: { status: 400 } })
          );
        }


        req.body = JSON.parse(bodyField);


        const image = files.image;


        req.body.file =
          Array.isArray(image)
            ? image[0]
            : image;


        next();


      } catch(error) {

        next(error);

      }

    });

};


export default formMiddleWare;