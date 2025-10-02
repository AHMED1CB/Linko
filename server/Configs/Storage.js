import { randomInt } from "crypto";
import multer from "multer";
import path from 'path'

const userPhotosStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null , path.join('Storage' , 'photos'))
    },
    filename: (req,file,cb) => {
        const extension = path.extname(file.originalname)
        const name =  'user-img' + "-" + Date.now() + randomInt(9999) + extension ; 
        cb(null,name)
    }
});
 

export const uploadPhoto = multer({storage : userPhotosStorage})