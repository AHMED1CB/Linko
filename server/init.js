import fs from "fs";
import connect from "./Mongose/Connection.js";
import dotenv from 'dotenv'
import path from "path";


export default () => {
    dotenv.config()

    // connect to database
    connect();

    // create storage dirs

    const storagePaths = [path.join(process.cwd(), "Storage/photos"), path.join(process.cwd(), "Storage/imgs"), path.join(process.cwd(), "Storage/voices")];


    storagePaths.map(path => {

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }
    })

}