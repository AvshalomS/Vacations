import authAxios from '../axios/authAxios';

export const getUserService = async (user) => {
    try {
        const { data } = await authAxios.post(`/user/login`, user);
        return data;
    } catch (error) {
        return []
    }
}
export const registerService = async (user) => {
    try {
        const { data } = await authAxios.post(`/user/register`, user);
        return data;
    } catch (error) {
        return []
    }
}
export const getAllVacationsService = async (userId) => {
    try {
        const { data } = await authAxios.get(`/vac/all/${userId}`);
        return data;
    } catch (error) {
        return []
    }
}
export const getChartDataService = async () => {
    try {
        const { data } = await authAxios.get(`/vac/onlyFollowed`);
        return data;
    } catch (error) {
        return []
    }
}
export const addVacationService = async (vacation) => {
    try {
        const { data } = await authAxios.post(`/vac/addNew`, vacation);
        return data;
    } catch (error) {
        return []
    }
}
export const editVacationService = async (vacation) => {
    try {
        const { data } = await authAxios.put(`/vac/update`, vacation);
        return data;
    } catch (error) {
        return []
    }
}
export const deleteVacationService = async (id) => {
    try {
        const { data } = await authAxios.delete(`/vac/${id}`);
        return data;
    } catch (error) {
        return []
    }
}