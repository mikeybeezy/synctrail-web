import { userConstants } from '../constants';
const initialState = { loading: false, error: '' };

export function order_template(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAGE_LOADING: {
      return { 
        ...state, 
        loading: true 
      };
    }

    case userConstants.ORDER_TEMPLATES_DATA: {
      return {
        ...state,
        orderTemplates: action.payload.data.data
      }
    }

    case userConstants.NEW_ORDER_TEMPLATES: {
      let currentOrderTemplate = action.payload.data.data
      const orderTemplates = [...state.orderTemplates,  currentOrderTemplate]
      return {
        ...state,
        orderTemplates: orderTemplates,
      }
    }

    case userConstants.ORDER_TEMPLATE_EDIT: {
      return {
        ...state,
        editOrderTemplate: action.payload.data.data
      }
    }

    case userConstants.ORDER_TEMPLATE_UPDATE: {
      let order = action.payload.data.data
      let updateArray = state.orderTemplates.map((el, i) => (
        el.id === order.id ? {...el, order_title: order.order_title}: el
      ))
      return {
        ...state,
        orderTemplates: updateArray,
      }
    }

    case userConstants.ORDER_TEMPLATE_DESTROY: {
      let id = action.payload.data.data.id
      return {
        ...state,
        orderTemplates: state.orderTemplates.filter(item => item.id !== id),
      }
    }

    default:
      return state
  }
}