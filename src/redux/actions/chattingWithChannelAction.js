import { GET_LATEST_MESSAGE_OF_CHANNEL_REQUEST, ADD_NEW_CHATTING_WITH_CHANNEL_DATA_REQUEST, CHATTING_WITH_CHANNEL_DETAILS_DATA_REQUEST, 
    DELETE_CHATTING_WITH_CHANNEL_DATA_REQUEST, UPDATE_CHATTING_WITH_CHANNEL_DATA_REQUEST, MEMBER_OF_CHANNEL_REQUEST } from "../types/chattingWithChannelType"


export const getLatestMessageOfParticularChannel = (data) => ({
    type: GET_LATEST_MESSAGE_OF_CHANNEL_REQUEST,
    payload: data
})

export const chattingWithChannelAction = (data) => ({
    type: ADD_NEW_CHATTING_WITH_CHANNEL_DATA_REQUEST,
    payload: data
})

export const fetchchattingDetailAction = (data) => ({
    type: CHATTING_WITH_CHANNEL_DETAILS_DATA_REQUEST,
    payload: data
})

export const deleteChattingWithChannelAction = (data) => ({
    type: DELETE_CHATTING_WITH_CHANNEL_DATA_REQUEST,
    payload: data
})

export const updatedChattingWithChannelAction = (data) => ({
    type: UPDATE_CHATTING_WITH_CHANNEL_DATA_REQUEST,
    payload: data
})

export const membersOfChannelAction = (data) => ({
    type: MEMBER_OF_CHANNEL_REQUEST,
    payload: data
})


