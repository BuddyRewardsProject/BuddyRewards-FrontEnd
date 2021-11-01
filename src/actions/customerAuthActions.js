import axios from 'axios';
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import { SET_CUSTOMER } from './types'

export const setCustomer = (customer) => {
    return {
        type: SET_CUSTOMER,
        customer
    }
}

export function login(data) {
    console.log(data)
    return (dispatch) => {
        console.log(dispatch)
        return axios
            .post("/customer/v1/login", data)
            .then((response) => {
                const token = response.data.accessToken;
                localStorage.setItem("customerToken", token);
                setAuthorizationToken(token);
                dispatch(setCustomer(jwt.decode(token)));
            })
            .catch((e) => {
                console.log(e);
            });
    };
}

export function logoutCustomer() {
    return (dispatch) => {
        localStorage.removeItem("customerToken");
        setAuthorizationToken(false);
        dispatch(setCustomer({}));
    };
}