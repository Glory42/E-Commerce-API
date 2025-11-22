export type UserRole = 'user' | 'admin';

export interface UserDTO {
    id: string,
    email: string,
    password: string,
    username: string,
    phone: number,
    role: UserRole,
    shipping_adress?: string;
    city?: string;
    postal_code?: number;
}
export interface ValidateUserDTO {
    email: string,
    password: string,
    username: string,
    phone: number,
}

export interface CreateUserDTO {
    id?: string,
    email: string,
    password: string,
    username: string,
    phone: number,
    role: UserRole,
}

export interface UpdateUserDTO {
    email?: string,
    password?: string,
    phone?: number,
    username?: string,
    role?: UserRole,
}

export interface ProfileDTO {
    username: string
    created_at: string
}