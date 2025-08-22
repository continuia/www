import axiosInstance from './axiosConfig';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    profilePictureUrl?: string;
    phoneNumber?: string;
}

export const loginApi = async (email: string, password: string): Promise<{ user: User; token: string }> => {
    try {
        const response = await axiosInstance.post('/api/auth/login', { email, password });
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};

export const registerApi = async (email: string, password: string, firstName: string, lastName: string,): Promise<{ user: User; token: string }> => {
    try {
        const response = await axiosInstance.post('/api/social-auth/username-password/register', {
            email,
            password,
            firstName,
            lastName,
        });
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
};

export const fetchUserProfile = async (): Promise<User> => {
    try {
        const response = await axiosInstance.get('/api/auth/me');
        return response.data.data;
    } catch (error: any) {
        throw error.response;
    }
};

export const logoutApi = async (): Promise<void> => {
    try {
        await axiosInstance.post('/api/auth/logout');
    } catch (error: any) {
        throw error.response;
    }
};

// Add other auth APIs similarly (e.g. OTP request, verify, social login, etc.)
