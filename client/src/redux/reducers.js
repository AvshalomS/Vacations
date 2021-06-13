import Actions from './actions.config';

const initialState = {
    userInfo: {
        firstName: '',
        lastName: '',
        isLogin: false,
        role: 'Guest',
    },
    vacations: [],
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case Actions.SET_ALL_VACATIONS: {
            return {
                ...state,
                vacations: action.payload
            }
        }
        case Actions.USER_LOGIN: {
            return {
                ...state,
                userInfo: action.payload,
                vacations: []
            }
        }
        case Actions.USER_LOGOUT: {
            return {
                ...state,
                userInfo: action.payload,
                vacations: []
            }
        }
        case Actions.UPDATE_FOLLOW: {
            return {
                ...state,
                vacations: action.payload,
            }
        }
        case Actions.UPDATE_VACATION: {
            return {
                ...state,
                vacations: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}