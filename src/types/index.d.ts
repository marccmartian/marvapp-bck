interface ValidatedProjectQuery {
    limit?: number;
    lastSerialId?: number;
    isTop?: boolean
}

declare namespace Express {
    export interface Request {
        validatedData: ValidatedProjectQuery
    }
}
