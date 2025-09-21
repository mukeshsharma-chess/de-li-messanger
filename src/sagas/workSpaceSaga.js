import { put } from 'redux-saga/effects';
import fetchApi from '@/services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';

import { ADD_NEW_WORK_SPACE_FAILED, ADD_NEW_WORK_SPACE_RESPONSE, FETCH_WORK_SPACE_FAILED, FETCH_WORK_SPACE_RESPONSE } from '@/redux/types/workSpaceType';
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


// export function* chadhavaDetialSaga({ payload, resolve }) {
//     try {
//         yield put({ type: START_LOADING, isLoading: true })
//         let response = yield api.GetChadhavaDetails(payload);

//         const {data, status} = response;

//         if (status === 200) {
//             yield put({ type: CHADHAVA_DETAILS_DATA_RESPONSE, payload: data })
//             resolve && resolve(response)
//             yield put({ type: RESET_LOADER, isLoading: false })
//         }
//         else {
//             console.log("CHADHAVA_DETAILS_DATA_FAILED", data);
//             yield put({ type: CHADHAVA_DETAILS_DATA_FAILED, payload: data })
//             resolve && resolve(response)
//             yield put({ type: RESET_LOADER, isLoading: false })
//         }
//     } catch (e) {
//         yield put({ type: CHADHAVA_DETAILS_DATA_FAILED, payload: e })

//     }
// }


// export function* updateChadhavaSaga({ payload, resolve }) {
//     try {
//         yield put({ type: START_LOADING, isLoading: true })
//         let response = yield api.UpdeteChadhava(payload);

//         const {data, status} = response;

//         if (status === 200) {
//             yield put({ type: UPDATE_ADD_NEW_WORK_SPACE_REQUEST, payload: data })
//             resolve && resolve(response)
//             yield put({ type: RESET_LOADER, isLoading: false })
//         }
//         else {
//             console.log("UPDATE_CHADHAVA_DATA_FAILED", data);
//             yield put({ type: UPDATE_CHADHAVA_DATA_FAILED, payload: data })
//             resolve && resolve(response)
//             yield put({ type: RESET_LOADER, isLoading: false })
//         }
//     } catch (e) {
//         yield put({ type: UPDATE_CHADHAVA_DATA_FAILED, payload: e })

//     }
// }

// export function* deleteChadhavaSaga({ payload, resolve }) {
//     try {
//         yield put({ type: START_LOADING, isLoading: true })
//         let response = yield api.DeleteChadhava(payload);

//         const {data, status} = response;

//         if (status === 200) {
//             yield put({ type: DELETE_ADD_NEW_WORK_SPACE_REQUEST, payload: data })
//             resolve && resolve(response)
//             yield put({ type: RESET_LOADER, isLoading: false })
//         }
//         else {
//             console.log("DELETE_CHADHAVA_DATA_FAILED", data);
//             yield put({ type: DELETE_CHADHAVA_DATA_FAILED, payload: data })
//             resolve && resolve(response)
//             yield put({ type: RESET_LOADER, isLoading: false })
//         }
//     } catch (e) {
//         yield put({ type: DELETE_CHADHAVA_DATA_FAILED, payload: e })

//     }
// }