import axiosInstance from './axiosConfig';

export const joinTheInitiative: any = async (data: any): Promise<void> => {
    try {
        const response = await axiosInstance.post(`/joinTheInitiative`, data);
        return response.data;
    } catch (error: any) {
        throw error.response
    }
};