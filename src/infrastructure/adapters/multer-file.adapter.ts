import multer, { Multer } from 'multer';

interface MulterOptions {
    allowedMimeTypes?: string[];
    maxFileSize?: number;
}

export class MulterFileAdapter {

    constructor(private options: MulterOptions = {}) {}

    getUpload(): Multer {
        const allowedMimeTypes = this.options.allowedMimeTypes || ['image/jpeg', 'image/png', 'image/jpg'];
        const maxBytes = this.options.maxFileSize || 5 * 1024 * 1024;

        return multer({
            storage: multer.memoryStorage(),
            fileFilter: (req, file, cb) => {
                if (allowedMimeTypes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error("Formato de archivo no soportado. Solo se permiten imágenes JPG/JPEG/PNG."));
                }
            },
            limits: {
                fieldSize: maxBytes
            }
        });
    }

}