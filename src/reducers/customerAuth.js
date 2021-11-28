import { SET_CUSTOMER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated: false,
    customer: {}
}

const customerAuth = (state = initialState, action = {}) => {
    switch (action.type) {
      case SET_CUSTOMER:
        return {
          isAuthenticated: !isEmpty(action.customer),
          customer: action.customer,
        };
      default:
        return state;
    }
}

export default customerAuth;