import { USER_LOGIN_REQUEST } from '@/redux/types/loginTypes';
import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { userLoginSaga } from './loginSaga';
import { addNewChannelSaga, addNewWrokSpace, deleteMessageToChannelSaga, fetchAllWrokSpace, getChannelMemberSaga, getLatestMessagesChannelSaga, sendMessageToChannelSaga } from './workSpaceSaga';
import { ADD_NEW_CHANNEL_REQUEST, ADD_NEW_WORK_SPACE_REQUEST, FETCH_WORK_SPACE_REQUEST } from '@/redux/types/workSpaceType';
import { ADD_NEW_CHATTING_WITH_CHANNEL_DATA_REQUEST, DELETE_CHATTING_WITH_CHANNEL_DATA_REQUEST, GET_LATEST_MESSAGE_OF_CHANNEL_REQUEST, MEMBER_OF_CHANNEL_REQUEST } from '@/redux/types/chattingWithChannelType';
import { ALL_CONVERSATION_FOR_DM_REQUEST, CONVERSATION_TO_USER_FOR_DM_REQUEST, DELETE_CONVERSATION_FOR_DM_REQUEST, SHOW_CONVERSATION_FOR_DM_REQUEST, START_CONVERSATION_FOR_DM_REQUEST, UPDATE_CONVERSATION_FOR_DM_REQUEST, USER_FOR_DM_REQUEST } from '@/redux/types/directMsgType';
import { allConversationForDmSaga, DMessageToPerticularUserSaga, DeleteDMessageSaga, showConversationForDmSaga, startConverrsationForDmSaga, UpdateDMessageSaga, AllDmUsersSaga } from './directMessageSaga';

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
        takeLatest(ALL_CONVERSATION_FOR_DM_REQUEST, allConversationForDmSaga),
        takeLatest(CONVERSATION_TO_USER_FOR_DM_REQUEST, DMessageToPerticularUserSaga),
        takeLatest(DELETE_CONVERSATION_FOR_DM_REQUEST, DeleteDMessageSaga),
        takeLatest(SHOW_CONVERSATION_FOR_DM_REQUEST, showConversationForDmSaga),
        takeLatest(START_CONVERSATION_FOR_DM_REQUEST, startConverrsationForDmSaga),
        takeLatest(UPDATE_CONVERSATION_FOR_DM_REQUEST, UpdateDMessageSaga),
        takeLatest(USER_FOR_DM_REQUEST, AllDmUsersSaga),

    ]);
}

export default rootSaga;