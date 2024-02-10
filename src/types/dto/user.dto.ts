export interface ILoginDTO {
    login: string;
    password: string;
}

export interface IRegistrationDTO extends ILoginDTO {
    confirmPassword: string;
}

export interface IUserDTO {
    id: string;
    login: string;
    createdAt: Date;
    updatedAt: Date;
    
    token?: string;
}

