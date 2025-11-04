import { CustomError } from "../errors/custom-errors";

export class ProjectEntity {

    constructor(
        public readonly id: string,
        public title: string,
        public description: string,
        public keywords: string[],
        public imageUrl: string | null,
        public githubUrl: string,
        public prodUrl: string,
        private _status: boolean,
        private _isTop: boolean,
        public readonly createdAt: Date,
        public updatedAt: Date,
    ){}

    public get status(): boolean {
        return this._status;
    }

    public get isTop(): boolean {
        return this._isTop;
    }

    public toogleStatus(): void {
        this._status = !this._status;
        this.touch();
    }

    public toogleIsTop() {
        this._isTop = !this._isTop;
        this.touch();
    }

    public touch() {
        this.updatedAt = new Date();
    }

    static fromObject(object: {[key: string]: any}): ProjectEntity {
        const {id, title, description, keywords, imageUrl, githubUrl, prodUrl, status, isTop, createdAt, updatedAt} = object;

        if(!id || !title || !description || !keywords || !githubUrl || !prodUrl || status === undefined || isTop === undefined || !createdAt || !updatedAt) {
            throw CustomError.internalServer("Project entity mapping error: Missing one or more required fields.");
        } 

        return new ProjectEntity(
            id, title, description, keywords,
            imageUrl, githubUrl, prodUrl,
            status, isTop,
            new Date(createdAt), new Date(updatedAt)
        );
    }

    public toJson() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            keywords: this.keywords,
            imageUrl: this.imageUrl, 
            githubUrl: this.githubUrl,
            prodUrl: this.prodUrl,
            status: this.status, 
            isTop: this.isTop,
            // createdAt: this.createdAt.toISOString(),
            // updatedAt: this.updatedAt.toISOString(),
        };
    }

}