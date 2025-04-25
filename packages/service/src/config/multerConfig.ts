import multer from 'multer';
import fs from 'fs';
import { getConfigVariable } from './config.server.js';

const uploadDir = getConfigVariable('UPLOAD_DIR');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// For in-memory storage (files will be stored in req.file(s) as Buffer):
export const upload = multer({
    storage: multer.memoryStorage(),
});

// Or for disk storage, for example:
export const uploadDisk = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir); // Make sure this directory exists
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + '-' + file.originalname);
        },
    }),
});