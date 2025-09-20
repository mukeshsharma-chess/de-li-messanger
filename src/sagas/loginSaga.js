import { put } from 'redux-saga/effects';
import fetchApi from '@/services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { USER_LOGIN_RESPONSE, USER_LOGIN_FAILED } from '@/redux/types/loginTypes';
import { saveState } from '@/utils/localstorage';
let api = new fetchApi();

export function* userLoginSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.Login(payload);

        console.log("userLoginSaga", response)
        const {data, access_token, user, expires_in, token_type, status} = response;

        if (token_type == "bearer") {
            saveState('token', access_token);
            saveState('tokenType', token_type);
            saveState('user', user);
            saveState('expInToken', expires_in);
            yield put({ type: USER_LOGIN_RESPONSE, payload: user })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("USER_LOGIN_FAILED", data);
            yield put({ type: USER_LOGIN_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: USER_LOGIN_FAILED, payload: e })

    }
}