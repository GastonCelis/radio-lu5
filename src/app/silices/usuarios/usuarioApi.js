import axios from 'axios'
import { BACK_URL } from '../../../constants/index'

export const getUserGoogle = (token) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
        })
            .then(response => response)
            .then(json => {
                return resolve({
                    data: json.data
                });
            })
            .catch(err => {
                return reject(err.response)
            });
    });
};

export const getUser = (token, idUser) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/members/${idUser}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
        })
            .then(response => response)
            .then(json => {
                return resolve({
                    data: json.data
                });
            })
            .catch(err => {
                return reject(err.response)
            });
    });
};

export const getAllUsers = (token) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/members`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
        })
            .then(response => response)
            .then(json => {
                return resolve({
                    data: json.data
                });
            })
            .catch(err => {
                return reject(err.response)
            });
    });
};

export const putUser = (token, idUser, body) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/members/${idUser}`,
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
            data: body
        })
            .then(response => response)
            .then(json => {
                return resolve({
                    data: json.data
                });
            })
            .catch(err => {
                console.log(err)
                return reject(err.response)
            });
    });
};