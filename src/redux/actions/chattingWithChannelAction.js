import { CHATTING_WITH_CHANNEL_DATA_REQUEST, ADD_NEW_CHATTING_WITH_CHANNEL_DATA_REQUEST, CHATTING_WITH_CHANNEL_DETAILS_DATA_REQUEST, DELETE_CHATTING_WITH_CHANNEL_DATA_REQUEST } from "../types/chattingWithChannelType"


export const fetchChattingDataWithChannel = (date) => ({
    type: CHATTING_WITH_CHANNEL_DATA_REQUEST,
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

// export const updateChadhavaAction = (data) => ({
//     type: UPDATE_CHADHAVA_DATA_REQUEST,
//     payload: data
// })
