import { put } from 'redux-saga/effects';
import fetchApi from '@/services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';

import { ADD_NEW_CHANNEL_FAILED, ADD_NEW_CHANNEL_RESPONSE, ADD_NEW_WORK_SPACE_FAILED, ADD_NEW_WORK_SPACE_RESPONSE, FETCH_WORK_SPACE_FAILED, FETCH_WORK_SPACE_RESPONSE } from '@/redux/types/workSpaceType';
import { CHATTING_WITH_CHANNEL_DATA_RESPONSE, GET_LATEST_MESSAGE_OF_CHANNEL_FAILED, GET_LATEST_MESSAGE_OF_CHANNEL_RESPONSE, MEMBER_OF_CHANNEL_FAILED, MEMBER_OF_CHANNEL_RESPONSE } from '@/redux/types/chattingWithChannelType';
let api = new fetchApi();

export function* addNewWrokSpace({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.AddNewWorkSpace(payload);

        console.log("addNewWrokSpace", response)
        const {data, status} = response;

        if (status === 200) {
            yield put({ type: ADD_NEW_WORK_SPACE_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("ADD_NEW_WORK_SPACE_FAILED", data);
            yield put({ type: ADD_NEW_WORK_SPACE_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: ADD_NEW_WORK_SPACE_FAILED, payload: e })

    }
}

export function* fetchAllWrokSpace({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetAllWorkSpace(payload);

        const {data, status, message} = response;

        if (message === "List of workspaces") {
            yield put({ type: FETCH_WORK_SPACE_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("FETCH_WORK_SPACE_FAILED", data);
            yield put({ type: FETCH_WORK_SPACE_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: FETCH_WORK_SPACE_FAILED, payload: e })

    }
}


export function* addNewChannelSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.AddNewChannel(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: ADD_NEW_CHANNEL_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("ADD_NEW_CHANNEL_FAILED", data);
            yield put({ type: ADD_NEW_CHANNEL_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: ADD_NEW_CHANNEL_FAILED, payload: e })

    }
}


export function* getChannelMemberSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetChannelMembers(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: MEMBER_OF_CHANNEL_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("MEMBER_OF_CHANNEL_FAILED", data);
            yield put({ type: MEMBER_OF_CHANNEL_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: MEMBER_OF_CHANNEL_FAILED, payload: e })

    }
}

export function* getLatestMessagesChannelSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetLatestMessagesChannel(payload);

        // const {data, status} = response;

        // if (status === 200) {
            yield put({ type: GET_LATEST_MESSAGE_OF_CHANNEL_RESPONSE, payload: response })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        // }
        // else {
        //     console.log("GET_LATEST_MESSAGE_OF_CHANNEL_FAILED", data);
        //     yield put({ type: GET_LATEST_MESSAGE_OF_CHANNEL_FAILED, payload: data })
        //     resolve && resolve(response)
        //     yield put({ type: RESET_LOADER, isLoading: false })
        // }
    } catch (e) {
        yield put({ type: GET_LATEST_MESSAGE_OF_CHANNEL_FAILED, payload: e })

    }
}