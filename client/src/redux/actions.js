import Actions from './actions.config';
import { getUserService, getAllVacationsService } from '../services/axiosService';

export const userLoginAction = user => {
    return async dispach => {
        try {
            const data = await getUserService(user);
            if (data.token) {
                // if user name and password OK save user in Redux
                const { id, firstName, lastName, role } = data.user
                const userInfo = {
                    userId: id,
                    firstName: firstName,
                    lastName: lastName,
                    isLogin: true,
                    role: role,
                }
                // Save the token and update Redux
                sessionStorage.setItem("token", data.token);
                dispach({ type: Actions.USER_LOGIN, payload: userInfo })
            } else {
                // set Redux isLogin = false Without user data 
                const userInfo = {
                    firstName: '',
                    lastName: '',
                    isLogin: false,
                    role: 'Guest',
                }
                dispach({ type: Actions.USER_LOGIN, payload: userInfo })
            }
        } catch (error) {
            console.log(error)
            const userInfo = {
                firstName: '',
                lastName: '',
                isLogin: false,
                role: 'Guest',
            }
            dispach({ type: Actions.USER_LOGIN, payload: userInfo })
        }
    }
}
export const getAllVacationsAction = userId => {
    return async dispach => {
        try {
            const data = await getAllVacationsService(userId)
            const { vacations } = data
            dispach({ type: Actions.SET_ALL_VACATIONS, payload: vacations })
        } catch (error) {
            console.log(error)
            dispach({ type: Actions.SET_ALL_VACATIONS, payload: [] })
        }
    }
}
export const updateFollowAction = payload => {
    return async dispach => {
        try {
            const { vacationId, followersCount, userId, followed } = payload.res
            const { userInfo } = payload
            let vacations = payload.vac
            const id = await vacations.findIndex(vacation => vacation.id === vacationId)

            vacations[id].followersCount = followersCount
            if (userId === userInfo.userId) { vacations[id].followed = followed }
            dispach({ type: Actions.UPDATE_FOLLOW, payload: vacations })

        } catch (error) {
            console.log(error);
            dispach({ type: Actions.UPDATE_FOLLOW, payload: [] })
        }
    }
}
export const updateVacationAction = payload => {
    return async dispach => {
        try {

            let vacations = payload.vac
            const { id } = payload.res.vacation
            const index = await vacations.findIndex(vacation => vacation.id === parseInt(id))

            vacations[index] = payload.res.vacation
            dispach({ type: Actions.UPDATE_VACATION, payload: vacations })
        } catch (error) {
            console.log(error);
            dispach({ type: Actions.UPDATE_VACATION, payload: [] })
        }
    }
}
export const addVacationAction = payload => {
    return async dispach => {
        try {

            let vacations = payload.vac
            const last = vacations.length - 1
            const { vacation } = payload.res

            if (vacations[last].id !== vacation.id) vacations.push(vacation)
            dispach({ type: Actions.UPDATE_VACATION, payload: vacations })

        } catch (error) {
            console.log(error);
            dispach({ type: Actions.UPDATE_VACATION, payload: [] })
        }
    }
}
export const deleteVacationAction = payload => {
    return async dispach => {
        try {

            let vacations = payload.vac
            const { id } = payload
            const index = await vacations.findIndex(vacation => vacation.id === parseInt(id))

            if (index !== -1) vacations.splice(index, 1)
            dispach({ type: Actions.UPDATE_VACATION, payload: vacations })

        } catch (error) {
            console.log(error);
            dispach({ type: Actions.UPDATE_VACATION, payload: [] })
        }
    }
}