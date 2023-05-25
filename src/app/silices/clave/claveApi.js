import axios from 'axios'
import { BACK_URL } from '../../../constants/index'

export const postClave = async (body) => {
    const data = {
        email: body.email,
        token: body.token,
        password: body.password,
        confirmPassword: body.confirmPassword
    }

    const request = await axios({
            url: `${BACK_URL}/api/v1/identity/reset-password`,
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            data: data
        })
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response
        });

    return request
};

export const postClaveEmail = async (email) => {
    const request = await axios({
            url: `${BACK_URL}/api/v1/identity/forgot-password?email=${email}`,
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
        })
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response
        });

    return request
};

export const postVerificacion = async (body) => {
    const data = {
        email: body.email,
        token: body.token,
    }

    const request = await axios({
            url: `${BACK_URL}/api/v1/identity/verify`,
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            data: data
        })
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response
        });

    return request
};