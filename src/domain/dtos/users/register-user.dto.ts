import { CustomError } from "../../errors/custom-errors";

export class RegisterUserDto {

    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
    ){}

    static create(data: { [key: string]: any }): RegisterUserDto {
        const {name, surname, email, password} = data;

        if(!name || !surname || !email || !password) {
            throw CustomError.internalServer("Missing required fields for DTO creation.");
        }

        return new RegisterUserDto(name, surname, email, password);
    }

}