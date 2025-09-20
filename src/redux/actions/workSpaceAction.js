import { ADD_NEW_WORK_SPACE_REQUEST, FETCH_WORK_SPACE_REQUEST, OPEN_WORK_SPACE_MODEL, SELECT_WORK_SPACE_REQUEST, SHOW_WORK_SPACE } from "../types/workSpaceType"


export const openWorkSpaceAction = (data) => ({
    type: OPEN_WORK_SPACE_MODEL,
    payload: data,
})

export const addNewWorkSpaceAction = (data) => ({
    type: ADD_NEW_WORK_SPACE_REQUEST,
    payload: data,
})

export const fetchWorkSpaceAction = () => ({
    type: FETCH_WORK_SPACE_REQUEST,
})

export const showWorkSpaceAction = (data) => ({
    type: SHOW_WORK_SPACE,
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