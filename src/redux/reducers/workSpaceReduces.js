import {
    GET_LATEST_MESSAGE_OF_CHANNEL_RESPONSE, GET_LATEST_MESSAGE_OF_CHANNEL_FAILED, SET_VIEW_MODE,
    ADD_NEW_CHATTING_WITH_CHANNEL_DATA_RESPONSE, ADD_NEW_CHATTING_WITH_CHANNEL_DATA_FAILED,
    CHATTING_WITH_CHANNEL_DETAILS_DATA_RESPONSE,
    CHATTING_WITH_CHANNEL_DETAILS_DATA_FAILED,
    MEMBER_OF_CHANNEL_RESPONSE,
    MEMBER_OF_CHANNEL_FAILED
} from "../types/chattingWithChannelType"
import { ADD_NEW_WORK_SPACE_FAILED, ADD_NEW_WORK_SPACE_RESPONSE, FETCH_WORK_SPACE_FAILED, FETCH_WORK_SPACE_RESPONSE, OPEN_WORK_SPACE_MODEL, 
    SELECT_WORK_SPACE_REQUEST, SET_SELECTED_CHANNEL, SHOW_WORK_SPACE } from "../types/workSpaceType"


const initialState = {
    viewMode: "channel",
    allWorkSpace: null,
    addNewWorkSpace: null,
    allChannel: null,
    selectedChannel: null,
    selectedWorkSpace: null,
    chattingList: null,
    openAddWorkSpace: false,
    showWorkSpaceModel: false,
    channelMembers: false,
}


export default function reducer(state = initialState, action) {
    switch (action.type) {

        case FETCH_WORK_SPACE_RESPONSE:
            return { ...state, allWorkSpace: action.payload, selectedWorkSpace : action.payload[0], 
                allChannel: action.payload[0].channels, selectedChannel: action.payload[0].channels[0] }
        case FETCH_WORK_SPACE_FAILED:
            return { ...state, allWorkSpace: action.payload }


        case SELECT_WORK_SPACE_REQUEST: {
            const selectedWS = state.allWorkSpace?.find(
                (item) => item.id === action.payload
            );

            return {
                ...state,
                selectedWorkSpace: selectedWS || null,
                allChannel: selectedWS?.channels || [],
                selectedChannel: selectedWS?.channels?.[0] || null,
            };
        }
        
        case "SET_VIEW_MODE":
            return { ...state, viewMode: action.payload }

        case SET_SELECTED_CHANNEL:
            return { 
                ...state, 
                selectedChannel: action.payload,
                chattingList: []
            }

        case ADD_NEW_WORK_SPACE_RESPONSE:
            return { ...state, addNewWorkSpace: action.payload }
        case ADD_NEW_WORK_SPACE_FAILED:
            return { ...state, addNewWorkSpace: action.payload }

        case GET_LATEST_MESSAGE_OF_CHANNEL_RESPONSE:
            return { ...state, chattingList: action.payload }
        case GET_LATEST_MESSAGE_OF_CHANNEL_FAILED:
            return { ...state, chattingList: action.payload }

        case ADD_NEW_CHATTING_WITH_CHANNEL_DATA_RESPONSE:
            return { ...state, addedChadhava: action.payload }
        case ADD_NEW_CHATTING_WITH_CHANNEL_DATA_FAILED:
            return { ...state, addedChadhava: action.payload }

        case CHATTING_WITH_CHANNEL_DETAILS_DATA_RESPONSE:
            return { ...state, chadhavaDetail: action.payload }
        case CHATTING_WITH_CHANNEL_DETAILS_DATA_FAILED:
            return { ...state, chadhavaDetail: action.payload }

        case MEMBER_OF_CHANNEL_RESPONSE:
            return { ...state, channelMembers: action.payload }
        case MEMBER_OF_CHANNEL_FAILED:
            return { ...state, channelMembers: action.payload }

        case OPEN_WORK_SPACE_MODEL:
            return { ...state, openAddWorkSpace: action.payload }

        case SHOW_WORK_SPACE:
            return { ...state, showWorkSpaceModel: action.payload }

        default:
            return state
    }
}
