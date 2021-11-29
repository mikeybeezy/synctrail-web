import { userConstants } from '../constants';
const initialState = { loading: false, error: '' };

export function chat(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAGE_LOADING: {
      return { 
        ...state, 
        loading: false 
      };
    }

    case userConstants.GET_CHAT_USERS: {
      return {
        ...state,
        loading: false,
        chatUsers: action.payload.data.data,
        chatHistory: action.payload.data.chat_history
      }
    }

    case userConstants.CREATE_CONVERSATION: {
      return {
        ...state,
        loading: false,
        channelId: action.payload.data.channel_id
      }
    }

    case userConstants.SENDER_MESSAGE: {
      return {
        ...state,
        loading: false,
        senderMessages: action.payload.data
      }
    }

    case userConstants.GET_CHAT_MESSAGES: {
      return {
        ...state,
        loading: false,
        getMessages: action.payload.data.data,
        particpantsUsers: action.payload.data.particpants_users
      }
    }

    case userConstants.NEW_MESSAGE: {
      let currentMessage = action.payload.data
      const messages = [...state.getMessages,  currentMessage]
      return {
        ...state,
        getMessages: messages
      }
    }
  
    default:
      return state
  }
}