import { ValidateUserDTO } from '../types/User.js';

export const validateUser = ({ email, password, username, phone}: ValidateUserDTO) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }
    if (password.length < 8) {
        throw new Error('Password must be longer than 7 characters');
    }
    if (!username || username.length < 3) {
        throw new Error('User name must be greater than 3 characters');
    }
    return true;
}