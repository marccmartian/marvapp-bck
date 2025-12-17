export interface ProjectJson {
    id: string;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string | null; 
    githubUrl: string;
    prodUrl: string;
    status: boolean; 
    isTop: boolean;
    // ... otros campos
}

export interface GetProjectsOptions {
    limit: number;
    lastSerialId?: number | undefined;
    isTop: boolean | undefined;
}

export interface NextCursor {
    lastSerialId: number;
}

export interface ScrollPaginateResponseDto<T> {
    data: ProjectJson[];
    pagination: {
        limit: number;
        nextCursor: NextCursor | null;
        hasNextPage: boolean;
    }
}
