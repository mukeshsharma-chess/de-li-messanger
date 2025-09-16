import { USER_LOGIN_REQUEST } from "../types/loginTypes"


// export const requestPujaDataAction = (date) => ({
//     type: PUJA_DATA_REQUEST,
// })

export const userLoginAction = (data) => ({
    type: USER_LOGIN_REQUEST,
    payload: data
})


