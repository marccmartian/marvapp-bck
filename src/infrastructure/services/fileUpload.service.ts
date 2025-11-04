import { CustomError } from "../../domain";
import { CloudinaryAdapter } from "../adapters/cloudinary.adapter";

export class FileUploadService {

    constructor(
        private readonly cloudinaryAdapter: CloudinaryAdapter
    ){}

    async upload(file: Express.Multer.File): Promise<string> {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = `data:${file.mimetype};base64,${b64}`;

        const uploadResult = await this.cloudinaryAdapter.upload(dataURI);
        const newImageUrl = uploadResult.secure_url;

        return newImageUrl;
    }

    async deleteFile(oldImageUrl: string): Promise<void> {        
        const publicId = this.exctractPublicIdFromUrl(oldImageUrl);
        await this.cloudinaryAdapter.destroy(publicId);
    }

    private exctractPublicIdFromUrl(url: string): string {
        const nameArr = url.split("/");
        const name = nameArr[nameArr.length - 1] ?? "";
        const imageParts = name.split(".");
        const imagePublicId = imageParts[0] ?? ""

        if (imagePublicId === "") {
            throw CustomError.internalServer("Could not extract public ID. Invalid resource name in URL.");
        }

        return imagePublicId;
    }

}