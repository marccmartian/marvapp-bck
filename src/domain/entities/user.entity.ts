import { UserRole } from "../enums/user-role.enum";
import { CustomError } from "../errors/custom-errors"

export class UserEntity {

    constructor(
        public readonly id: string,
        public name: string,
        public surname: string,
        public readonly email: string,
        public readonly password: string,
        private _role: UserRole,
        public avatar: string | null,
        private _isEmailValidated: boolean,
        public readonly createdAt: Date,
        public updatedAt: Date,
    ) { }
    
    public get isEmailValidated(): boolean {
        return this._isEmailValidated;
    }

    public get role(): UserRole {
        return this._role;
    }

    public validateEmail(): void {
        if(this._isEmailValidated){
            throw CustomError.badRequest("BUSINESS_RULE_VIOLATION: Email is already validated.");
        }
        this._isEmailValidated = true;
        this.touch();
    }

    public assignRole(newRole: UserRole): void {
        if(this._role === newRole) return;
        this._role = newRole;
        this.touch();
    }

    public touch() {
        this.updatedAt = new Date();
    }
    
    static createNew(data: {[key: string]: any}): UserEntity {
        const { name, surname, email, password } = data;
        const defaultRole: UserRole = UserRole.viewer; 
        const defaultStatus: boolean = false;
        
        return new UserEntity(
            "pendingId",
            name, 
            surname, 
            email, 
            password,
            defaultRole, 
            null,
            defaultStatus,
            new Date(), 
            new Date(), 
        );
    }

    static fromObject(object: {[key: string]: any}): UserEntity {        
        const {id, name, surname, email, password, role, avatar, isEmailValidated, createdAt, updatedAt} = object;    

        if(!id) throw CustomError.internalServer("Entity mapping error: Missing ID");

        if (!Object.values(UserRole).includes(role as UserRole)) {
            throw CustomError.internalServer(`Entity mapping error: Invalid role value: ${role}`);
        }

        return new UserEntity(
            id,
            name,
            surname,
            email,
            password,
            role as UserRole,
            avatar,
            isEmailValidated,
            new Date(createdAt),
            new Date(updatedAt),
        );
    }

}