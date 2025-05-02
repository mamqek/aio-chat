import * as Multer from 'multer';
declare global {
  namespace Express {
    export interface Request {
      file?: Multer.File;
      files?: { [fieldname: string]: Multer.File[] } | Multer.File[];
    }
  }
}
