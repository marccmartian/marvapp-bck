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

    public switchStatus(): void {
        this._status = !this._status;
        this.touch();
    }

    public swtichTop() {
        this._isTop = !this._isTop;
        this.touch();
    }

    public touch() {
        this.updatedAt = new Date();
    }

    static fromObject(object: {[key: string]: any}): ProjectEntity {
        const {id, title, description, keywords, imageUrl, githubUrl, prodUrl, status, isTop, createdAt, updatedAt} = object;

        if(!id) throw CustomError.internalServer("Project entity mapping error: Missing ID");

        return new ProjectEntity(
            id, title, description, keywords,
            imageUrl, githubUrl, prodUrl,
            status, isTop,
            new Date(createdAt), new Date(updatedAt)
        );
    }

}