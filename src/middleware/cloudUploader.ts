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
    
    try {
        
        const file = req.body.file as any;
        
        const filepath=file.filepath;
        const fileName=path.parse(file.newFilename);
       
        const uploadRes = await cloudinary.uploader.upload(
              filepath,
              {
                  resource_type: 'auto',
                  folder: 'CloudinaryDemo',
                  allowed_formats: ['jpeg', 'png', 'jpg'],
                  public_id: fileName.name,
              },
              function(error, result) {
                if(error)
                  console.log(error);
                if(result)
                   console.log("File uploaded . Url:",result.secure_url); 
              }
        );
       
        delete req.body['file'];
        req.body.image=uploadRes.secure_url;
        
       await fs.promises.rm(filepath, { force: true });

        next();
    } catch (error) {
        
        next(error);
    }
};



export default cloudUploader;