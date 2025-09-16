import { USER_LOGIN_REQUEST } from '@/redux/types/loginTypes';
import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { userLoginSaga } from './loginSaga';

function* rootSaga() {
    yield all([
        takeLatest(USER_LOGIN_REQUEST, userLoginSaga),
        // takeLatest(ADD_NEW_PUJA_DATA_REQUEST, addNewPujaSaga),
        // takeLatest(PUJA_DETAILS_DATA_REQUEST, pujaDetialSaga),
        // takeLatest(UPDATE_PUJA_DATA_REQUEST, updatePujaSaga),
        // takeLatest(DELETE_PUJA_DATA_REQUEST, deletePujaSaga),

    ]);
}

export default rootSaga;