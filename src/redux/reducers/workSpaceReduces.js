import { CHATTING_WITH_CHANNEL_DATA_RESPONSE, CHATTING_WITH_CHANNEL_DATA_FAILED, 
    ADD_NEW_CHATTING_WITH_CHANNEL_DATA_RESPONSE, ADD_NEW_CHATTING_WITH_CHANNEL_DATA_FAILED, 
    CHATTING_WITH_CHANNEL_DETAILS_DATA_RESPONSE,
    CHATTING_WITH_CHANNEL_DETAILS_DATA_FAILED} from "../types/chattingWithChannelType"
import { ADD_NEW_WORK_SPACE_FAILED, ADD_NEW_WORK_SPACE_RESPONSE, FETCH_WORK_SPACE_FAILED, FETCH_WORK_SPACE_RESPONSE, OPEN_WORK_SPACE_MODEL, SHOW_WORK_SPACE } from "../types/workSpaceType"


const initialState = {
    allWorkSpace: null,
    addNewWorkSpace: null,
    allChannel: null,
    allChattingData: null,
    selectedChannel: null,
    chattingList: null, 
    openAddWorkSpace: false, 
    showWorkSpaceModel: false, 
}


export default function reducer(state = initialState, action) {
    switch (action.type) {

        case ADD_NEW_WORK_SPACE_RESPONSE:
            return { ...state, addNewWorkSpace: action.payload }
        case ADD_NEW_WORK_SPACE_FAILED:
            return { ...state, addNewWorkSpace: action.payload }

        case FETCH_WORK_SPACE_RESPONSE:
            return { ...state, allWorkSpace: action.payload }
        case FETCH_WORK_SPACE_FAILED:
            return { ...state, allWorkSpace: action.payload }

        case CHATTING_WITH_CHANNEL_DATA_RESPONSE:
            return { ...state, allChattingData: action.payload }
        case CHATTING_WITH_CHANNEL_DATA_FAILED:
            return { ...state, allChattingData: action.payload }

        case ADD_NEW_CHATTING_WITH_CHANNEL_DATA_RESPONSE:
            return { ...state, addedChadhava: action.payload }
        case ADD_NEW_CHATTING_WITH_CHANNEL_DATA_FAILED:
            return { ...state, addedChadhava: action.payload }

        case CHATTING_WITH_CHANNEL_DETAILS_DATA_RESPONSE:
            return { ...state, chadhavaDetail: action.payload }
        case CHATTING_WITH_CHANNEL_DETAILS_DATA_FAILED:
            return { ...state, chadhavaDetail: action.payload }

        case OPEN_WORK_SPACE_MODEL:
            return { ...state, openAddWorkSpace: action.payload }

        case SHOW_WORK_SPACE:
            return { ...state, showWorkSpaceModel: action.payload }

        default:
            return state
    }
}
