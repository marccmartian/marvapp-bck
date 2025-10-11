import { CustomError } from "../errors/custom-errors"

export class UserEntity {

    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public role: string,
        public status: boolean,
        public avatar?: string | null,
    ){}

    static fromObject(object: {[key: string]: any}): UserEntity {
        const {id, name, surname, email, password, role, status, avatar} = object;    

        if(!id) throw CustomError.badRequest("Missing id");
        if(!name) throw CustomError.badRequest('Missing name');
        if(!surname) throw CustomError.badRequest('Missing surname');
        if(!email) throw CustomError.badRequest('Missing email');
        if(!password) throw CustomError.badRequest('Missing password');
        if(!role) throw CustomError.badRequest('Missing role');
        if(!status === undefined) throw CustomError.badRequest('Missing status');

        return new UserEntity(id, name, surname, email, password, role, status, avatar);
    }

}