import { put } from 'redux-saga/effects';
import fetchApi from '@/services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import {
    ALL_CONVERSATION_FOR_DM_RESPONSE, ALL_CONVERSATION_FOR_DM_FAILED, CONVERSATION_TO_USER_FOR_DM_RESPONSE, CONVERSATION_TO_USER_FOR_DM_FAILED,
    DELETE_CONVERSATION_FOR_DM_RESPONSE, DELETE_CONVERSATION_FOR_DM_FAILED, SHOW_CONVERSATION_FOR_DM_RESPONSE, SHOW_CONVERSATION_FOR_DM_FAILED,
    START_CONVERSATION_FOR_DM_RESPONSE, START_CONVERSATION_FOR_DM_FAILED, UPDATE_CONVERSATION_FOR_DM_RESPONSE, UPDATE_CONVERSATION_FOR_DM_FAILED,
    USER_FOR_DM_RESPONSE, USER_FOR_DM_FAILED,
    
} from '@/redux/types/directMsgType';

let api = new fetchApi();

export function* allConversationForDmSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetAllDmConversations(payload);
        
        console.log("allConversationForDmSaga", response);

        const { conversation, status } = response;

        if (status === 200) {
            yield put({ type: ALL_CONVERSATION_FOR_DM_RESPONSE, payload: conversation })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: ALL_CONVERSATION_FOR_DM_FAILED, payload: response })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: ALL_CONVERSATION_FOR_DM_FAILED, payload: e })

    }
}

export function* DMessageToPerticularUserSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.DMessageToPerticularUser(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: CONVERSATION_TO_USER_FOR_DM_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: CONVERSATION_TO_USER_FOR_DM_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: CONVERSATION_TO_USER_FOR_DM_FAILED, payload: e })

    }
}

export function* DeleteDMessageSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.DeleteDMessage(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: DELETE_CONVERSATION_FOR_DM_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("DELETE_CONVERSATION_FOR_DM_FAILED", data);
            yield put({ type: DELETE_CONVERSATION_FOR_DM_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: DELETE_CONVERSATION_FOR_DM_FAILED, payload: e })

    }
}


export function* showConversationForDmSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.ShowDirectMessage(payload);

        const {conversation, status} = response;

        if (status === 200) {
            yield put({ type: SHOW_CONVERSATION_FOR_DM_RESPONSE, payload: conversation })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: SHOW_CONVERSATION_FOR_DM_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: SHOW_CONVERSATION_FOR_DM_FAILED, payload: e })

    }
}

export function* startConverrsationForDmSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })

        let response = yield api.startConverrsationForDm(payload);

        const { conversation, status } = response;

        if (status === 200) {
            yield put({ type: START_CONVERSATION_FOR_DM_RESPONSE, payload: conversation })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })                 
        } else {    
            yield put({ type: START_CONVERSATION_FOR_DM_FAILED, payload: conversation })
            resolve && resolve(response)
        }   

        yield put({ type: RESET_LOADER, isLoading: false })

    } catch (e) {
        yield put({ type: START_CONVERSATION_FOR_DM_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* UpdateDMessageSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.UpdateDMessage(payload);

        // console.log("addNewWrokSpace", response)
        const {data, status} = response;

        if (status === 200) {
            yield put({ type: UPDATE_CONVERSATION_FOR_DM_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("UPDATE_CONVERSATION_FOR_DM_FAILED", data);
            yield put({ type: UPDATE_CONVERSATION_FOR_DM_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: UPDATE_CONVERSATION_FOR_DM_FAILED, payload: e })

    }
}

export function* AllDmUsersSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })

        let response = yield api.GetAllDmUsers();

        const { users, status } = response;

        if (status === 200) {
            yield put({ type: USER_FOR_DM_RESPONSE, payload: users })
        } else {
            yield put({ type: USER_FOR_DM_FAILED, payload: response })
        }

        resolve && resolve(response)
        yield put({ type: RESET_LOADER, isLoading: false })

    } catch (e) {
        console.log("ERROR", e);

        yield put({ type: USER_FOR_DM_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}