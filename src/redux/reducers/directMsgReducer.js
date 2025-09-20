import {
    ALL_CONVERSATION_FOR_DM_FAILED,
    ALL_CONVERSATION_FOR_DM_RESPONSE,
    CONVERSATION_TO_USER_FOR_DM_FAILED,
    CONVERSATION_TO_USER_FOR_DM_RESPONSE,
    DELETE_CONVERSATION_FOR_DM_FAILED,
    DELETE_CONVERSATION_FOR_DM_RESPONSE,
    SHOW_CONVERSATION_FOR_DM_FAILED,
    SHOW_CONVERSATION_FOR_DM_RESPONSE,
    START_CONVERSATION_FOR_DM_FAILED,
    START_CONVERSATION_FOR_DM_RESPONSE,
    UPDATE_CONVERSATION_FOR_DM_FAILED,
    UPDATE_CONVERSATION_FOR_DM_RESPONSE,
    USER_FOR_DM_FAILED,
    USER_FOR_DM_RESPONSE
} from "../types/directMsgType";

const initialState = {
    allUser: null,
    allDirectMsg: null,
    dmMessageList: null,
    selectedDMUser: null,
    allConversation: null,

}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case USER_FOR_DM_RESPONSE:
            // console.log("USER_FOR_DM_RESPONSE in reducer", action);
            return { ...state, allUser: action.payload.users }
        case USER_FOR_DM_FAILED:
            return { ...state, allUser: action.action.payload.users }

        case ALL_CONVERSATION_FOR_DM_RESPONSE:
            return { ...state, allConversation: action.payload.conversations, selectedDMUser: action.payload.conversations[0] }
        case ALL_CONVERSATION_FOR_DM_FAILED:
            return { ...state, allConversation: action.payload }

        case START_CONVERSATION_FOR_DM_RESPONSE:

            return { ...state, selectedDMUser: action.payload.conversation }
        case START_CONVERSATION_FOR_DM_FAILED:
            return { ...state, selectedDMUser: action.payload }

        case SHOW_CONVERSATION_FOR_DM_RESPONSE:
            console.log("SHOW_CONVERSATION_FOR_DM_RESPONSE in reducer", action.payload.user_two_id, state.allConversation);
            return {
                ...state,
                allDirectMsg: action.payload,
                dmMessageList: action.payload.messages,
                selectedDMUser: state.allConversation?.find(item => item.user_two_id === action.payload.user_two_id)
            }

        case SHOW_CONVERSATION_FOR_DM_FAILED:
            return { ...state, allDirectMsg: action.payload }

        case CONVERSATION_TO_USER_FOR_DM_RESPONSE:
            return { ...state, isLoading: action.isLoading }
        case CONVERSATION_TO_USER_FOR_DM_FAILED:
            return { ...state, isLoading: action.isLoading }

        case UPDATE_CONVERSATION_FOR_DM_RESPONSE:
            return { ...state, isLoading: action.isLoading }
        case UPDATE_CONVERSATION_FOR_DM_FAILED:
            return { ...state, isLoading: action.isLoading }

        case DELETE_CONVERSATION_FOR_DM_RESPONSE:
            return { ...state, isLoading: action.isLoading }
        case DELETE_CONVERSATION_FOR_DM_FAILED:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }
}

