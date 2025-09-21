import { USER_LOGIN_REQUEST } from '@/redux/types/loginTypes';
import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { userLoginSaga } from './loginSaga';
import { addNewChannelSaga, addNewWrokSpace, fetchAllWrokSpace, getChannelMemberSaga, getLatestMessagesChannelSaga } from './workSpaceSaga';
import { ADD_NEW_CHANNEL_REQUEST, ADD_NEW_WORK_SPACE_REQUEST, FETCH_WORK_SPACE_REQUEST } from '@/redux/types/workSpaceType';
import { GET_LATEST_MESSAGE_OF_CHANNEL_REQUEST, MEMBER_OF_CHANNEL_REQUEST } from '@/redux/types/chattingWithChannelType';

function* rootSaga() {
    yield all([
        takeLatest(USER_LOGIN_REQUEST, userLoginSaga),
        takeLatest(ADD_NEW_WORK_SPACE_REQUEST, addNewWrokSpace),
        takeLatest(FETCH_WORK_SPACE_REQUEST, fetchAllWrokSpace),
        takeLatest(ADD_NEW_CHANNEL_REQUEST, addNewChannelSaga),
        takeLatest(MEMBER_OF_CHANNEL_REQUEST, getChannelMemberSaga),
        takeLatest(GET_LATEST_MESSAGE_OF_CHANNEL_REQUEST, getLatestMessagesChannelSaga),
        // takeLatest(PUJA_DETAILS_DATA_REQUEST, pujaDetialSaga),
        // takeLatest(UPDATE_PUJA_DATA_REQUEST, updatePujaSaga),
        // takeLatest(DELETE_PUJA_DATA_REQUEST, deletePujaSaga),

    ]);
}

export default rootSaga;