import { ALL_CONVERSATION_FOR_DM_REQUEST, DELETE_CONVERSATION_FOR_DM_REQUEST, SHOW_CONVERSATION_FOR_DM_REQUEST, 
    UPDATE_CONVERSATION_FOR_DM_REQUEST, USER_FOR_DM_REQUEST } from "../types/directMsgType"



export const dmParticularConversationAction = (data) => ({
    type: USER_FOR_DM_REQUEST,
    payload: data
})

export const showDMConversationAction = (data) => ({
    type: SHOW_CONVERSATION_FOR_DM_REQUEST,
    payload: data
})

export const fetchAllDMConversationAction = (data) => ({
    type: ALL_CONVERSATION_FOR_DM_REQUEST,
    payload: data
})

export const deleteDMConversationAction = (data) => ({
    type: DELETE_CONVERSATION_FOR_DM_REQUEST,
    payload: data
})

export const updateDMConversationAction = (data) => ({
    type: UPDATE_CONVERSATION_FOR_DM_REQUEST,
    payload: data
})


