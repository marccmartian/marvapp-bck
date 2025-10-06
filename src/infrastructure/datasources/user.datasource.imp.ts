import { UserDatasource } from "../../domain/datasources/user.datasource";
import { RegisterUserDto } from "../../domain/dtos/users/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";

export class UserDatasourceImp implements UserDatasource {

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {name, surname, email, password} = registerUserDto;
        const user = new UserEntity( 
            "13q4fasdv",
            name,
            surname,
            email,
            password,
            ["USER_ROLE"],
            true
        );
        
        return await user;

    }

}