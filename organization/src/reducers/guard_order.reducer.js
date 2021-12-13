import { userConstants } from '../constants';
const initialState = { loading: false, error: '' };

export function guard_order(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAGE_LOADING: {
      return { 
        ...state, 
        loading: true 
      };
    }

    case userConstants.GET_ORDER_TEMPLATES_DATA: {
      return {
        ...state,
        orderTemplates: action.payload.data.guard_order_templates
      }
    }

    case userConstants.GET_ORDERS: {
      return {
        ...state,
        guardOrders: action.payload.data.data
      }
    }

    case userConstants.ORDER_DESTROY: {
      let id = action.payload.data.data.id
      return {
        ...state,
        guardOrders: state.guardOrders.filter(item => item.id !== id),
      }
    }

    case userConstants.UPDATE_ORDER: {
      let order = action.payload.data.data
      let updateArray = state.guardOrders.map((el, i) => (
        el.id === order.id ? {...el, order_title: order.order_title}: el
      ))

      return {
        ...state,
        guardOrders: updateArray,
      }
    }


    default:
      return state
  }
}