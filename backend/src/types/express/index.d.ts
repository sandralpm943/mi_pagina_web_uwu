import { Multer } from "multer";
import 'express'
declare global {
    namespace Express {
        interface Request {
            file?: Multer.File;
            email?: string 
        }
    }
}
export {}

        
