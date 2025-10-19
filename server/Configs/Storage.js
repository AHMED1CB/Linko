import { randomInt } from "crypto";
import multer from "multer";
import path from 'path'
import fs from 'fs';


const storagePath = path.join(process.cwd(), "Storage/photos");


if (!fs.existsSync(storagePath)){
    fs.mkdirSync(storagePath)
}

const userPhotosStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null , storagePath)
    },
    filename: (req,file,cb) => {
        const extension = path.extname(file.originalname)
        const name =  'user-img' + "-" + Date.now() + randomInt(9999) + extension ; 
        cb(null,name)
    }
});
 

export const uploadPhoto = multer({storage : userPhotosStorage})