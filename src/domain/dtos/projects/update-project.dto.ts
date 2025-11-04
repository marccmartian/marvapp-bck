import { CustomError } from "../../errors/custom-errors";

export class UpdateProjectDto {

    constructor(
        public readonly id: string,
        public readonly title?: string,
        public readonly description?: string,
        public readonly keywords?: string[],
        public readonly githubUrl?: string,
        public readonly prodUrl?: string,
        public readonly imageUrl?: string | null
    ){}

    static create(data: {[key: string]: any}): UpdateProjectDto {
        const {id, title, description, keywords, githubUrl, prodUrl, imageUrl} = data;
        const updateObject: {[key: string]: any} = {};

        if(!id){
            throw CustomError.badRequest("Missing project ID to update.");
        }

        if(title !== undefined) updateObject.title = title;
        if(description !== undefined) updateObject.description = description;

        if(keywords !== undefined) {
            if(!Array.isArray(keywords)) {
                throw CustomError.badRequest("Keywords must be an array.");
            }
            updateObject.keywords = keywords;
        }

        if (githubUrl !== undefined) updateObject.githubUrl = githubUrl;
        if (prodUrl !== undefined) updateObject.prodUrl = prodUrl;
        if (imageUrl !== undefined) updateObject.imageUrl = imageUrl;

        if(Object.keys(updateObject).length === 0) {
            throw CustomError.badRequest("Nothing to update. Provide at least one field.");
        }

        return new UpdateProjectDto(
            id, updateObject.title, updateObject.description, updateObject.keywords, 
            updateObject.githubUrl, updateObject.prodUrl, updateObject.imageUrl
        );
    }

    // artificio para enviar a actualizar solo la data que tiene un valor
    public toUpdatePayload(): { [key: string]: any } {
        const {id, ...updateData} = this;
        const payload: { [key: string]: any } = {};

        for(const key in updateData){
            const value = updateData[key as keyof typeof updateData];
            if(value !== undefined) {
                payload[key] = value;
            }
        }

        return payload;
    }

}