 


import { OPEN_WORK_SPACE, SELECT_WORK_SPACE_REQUEST } from "../types/workSpaceType"


export const openWorkSpace = (data) => ({
    type: OPEN_WORK_SPACE,
    payload: data,
})

export const selectedWorkspaceAction = (data) => ({
    type: SELECT_WORK_SPACE_REQUEST,
    payload: data
})

// export const fetchchattingDetailAction = (data) => ({
//     type: CHATTING_WITH_CHANNEL_DETAILS_DATA_REQUEST,
//     payload: data
// })

// export const deleteChattingWithChannelAction = (data) => ({
//     type: DELETE_CHATTING_WITH_CHANNEL_DATA_REQUEST,
//     payload: data
// })