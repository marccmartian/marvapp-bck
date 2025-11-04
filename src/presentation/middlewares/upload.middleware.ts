import { MulterFileAdapter } from "../../infrastructure";

const multerAdapter = new MulterFileAdapter();
export const uploadMiddleware = multerAdapter.getUpload();