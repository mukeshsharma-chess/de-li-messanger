import { USER_LOGIN_RESPONSE, USER_LOGIN_FAILED } from "../types/loginTypes"


const initialState = {
    user: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case USER_LOGIN_RESPONSE:
            return { ...state, user: action.payload }
        case USER_LOGIN_FAILED:
            return { ...state, user: action.payload }

        default:
            return state
    }
}
