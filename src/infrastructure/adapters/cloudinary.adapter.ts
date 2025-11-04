import { v2 as cloudinary, UploadApiOptions, UploadApiResponse, DeleteApiResponse } from 'cloudinary';
import { CustomError } from '../../domain';

type ResourceType = 'image' | 'video' | 'raw';

export class CloudinaryAdapter {

    private readonly folderName: string;

    constructor(
        cloudName: string,
        apiKey: string,
        apiSecret: string,
        folderName: string
    ) {
        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret
        });
        this.folderName = folderName;
    }

    async upload(file: string | Buffer): Promise<UploadApiResponse> {
        try {
            const options: UploadApiOptions = {
                folder: this.folderName,
            };

            const result = await cloudinary.uploader.upload(file as string, options);
            return result;
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw CustomError.internalServer('Could not upload file to Cloudinary');
        }
    }

    async destroy(publicId: string, resourceType: ResourceType = 'image'): Promise<DeleteApiResponse> {
        try {
            const options = {
                resource_type: resourceType
            };
            
            const result = await cloudinary.uploader.destroy(`${this.folderName}/${publicId}`, options);
            
            if (result.result !== 'ok' && result.result !== 'not found') {
                throw new Error(`Cloudinary Error: Failed to destroy file ${publicId}. Result: ${result.result}`);
            }
            
            return result;
        } catch (error) {
            console.error(`Error deleting file ${publicId} from Cloudinary:`, error);
            throw CustomError.internalServer(`Could not delete file with publicId: ${publicId}`);
        }
    }

}