export class LoginUserDto {

    constructor(
        public email: string,
        public password: string
    ){}

    static create(data: Partial<LoginUserDto>): LoginUserDto {
        const {email, password} = data;
        return new LoginUserDto(email!, password!);
    }

}