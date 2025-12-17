import { CustomError } from "../../errors/custom-errors";

export class UpdateProjectDto {

    constructor(
        public readonly id: string,
        public readonly title?: string,
        public readonly description?: string,
        public readonly tags?: string[],
        public readonly githubUrl?: string,
        public readonly prodUrl?: string,
        public readonly imageUrl?: string | null
    ){}

    static create(data: {[key: string]: any}): UpdateProjectDto {
        const {id, title, description, tags, githubUrl, prodUrl, imageUrl} = data;
        const updateObject: {[key: string]: any} = {};

        if(!id){
            throw CustomError.badRequest("Missing project ID to update.");
        }

        if(title !== undefined) updateObject.title = title;
        if(description !== undefined) updateObject.description = description;

        if(tags !== undefined) {
            if(!Array.isArray(tags)) {
                throw CustomError.badRequest("tags must be an array.");
            }
            updateObject.tags = tags;
        }

        if (githubUrl !== undefined) updateObject.githubUrl = githubUrl;
        if (prodUrl !== undefined) updateObject.prodUrl = prodUrl;
        if (imageUrl !== undefined) updateObject.imageUrl = imageUrl;

        if(Object.keys(updateObject).length === 0) {
            throw CustomError.badRequest("Nothing to update. Provide at least one field.");
        }

        return new UpdateProjectDto(
            id, updateObject.title, updateObject.description, updateObject.tags, 
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