import { v2 as cloudinary } from 'cloudinary';
import type { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const cloudUploader: RequestHandler =
  async(req, res, next) => {
    //console.log('I am in cloudUploader');
    try {
        // req.file may be typed as unknown; cast to string (path/URL) for cloudinary uploader
        //console.log("FilePath:===",req.body.filePath);
        const file = req.file as any;
        console.log("FilePath:===",file.filepath);
        const filepath=file.filepath;
        const fileName=path.parse(file.newFilename);
        //console.log("fileName:===",fileName.name);
        const uploadRes = await cloudinary.uploader.upload(
              filepath,
              {
                  resource_type: 'auto',
                  folder: 'CloudinaryDemo',
                  allowed_formats: ['jpeg', 'png', 'jpg'],
                  public_id: fileName.name,
              },
              function(error, result) {
                  console.log(error);
              }
        );
        //console.log(req.body.firstName);
        //const { firstName, lastName, email } = req.body;
        const name: string = req.body.name?.[0];
        const description: string = req.body.description?.[0];
        const price: string = req.body.price?.[0];
        const categoryId = req.body.categoryId?.[0];
        const image = uploadRes.secure_url;
        const newBody = { name, description, price: Number(price), categoryId, image };
        //console.log("====",newBody);
        req.body = newBody;
        // delete the file from temp dir
       await fs.promises.rm(filepath, { force: true });

        next();
    } catch (error) {
        //console.log(error);
        next(error);
    }
};



export default cloudUploader;