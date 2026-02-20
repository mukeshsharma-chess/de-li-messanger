import { USER_LOGIN_REQUEST } from '@/redux/types/loginTypes';
import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { userLoginSaga } from './loginSaga';
import { addNewChannelSaga, addNewWrokSpace, deleteMessageToChannelSaga, fetchAllWrokSpace, getChannelMemberSaga, getLatestMessagesChannelSaga, sendMessageToChannelSaga } from './workSpaceSaga';
import { ADD_NEW_CHANNEL_REQUEST, ADD_NEW_WORK_SPACE_REQUEST, FETCH_WORK_SPACE_REQUEST } from '@/redux/types/workSpaceType';
import { ADD_NEW_CHATTING_WITH_CHANNEL_DATA_REQUEST, DELETE_CHATTING_WITH_CHANNEL_DATA_REQUEST, GET_LATEST_MESSAGE_OF_CHANNEL_REQUEST, MEMBER_OF_CHANNEL_REQUEST } from '@/redux/types/chattingWithChannelType';

function* rootSaga() {
    yield all([
        takeLatest(USER_LOGIN_REQUEST, userLoginSaga),
        takeLatest(ADD_NEW_WORK_SPACE_REQUEST, addNewWrokSpace),
        takeLatest(FETCH_WORK_SPACE_REQUEST, fetchAllWrokSpace),
        takeLatest(ADD_NEW_CHANNEL_REQUEST, addNewChannelSaga),
        takeLatest(MEMBER_OF_CHANNEL_REQUEST, getChannelMemberSaga),
        takeLatest(GET_LATEST_MESSAGE_OF_CHANNEL_REQUEST, getLatestMessagesChannelSaga),
        takeLatest(ADD_NEW_CHATTING_WITH_CHANNEL_DATA_REQUEST, sendMessageToChannelSaga),
        takeLatest(DELETE_CHATTING_WITH_CHANNEL_DATA_REQUEST, deleteMessageToChannelSaga),


    ]);
}

export default rootSaga;