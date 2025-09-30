export class RegisterUserDto {

    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public password: string
    ){}

    static create(data: Partial<RegisterUserDto>): RegisterUserDto {
        const {name, surname, email, password} = data

        return new RegisterUserDto(name!, surname!, email!, password!);
    }

}