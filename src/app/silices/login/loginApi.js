import axios from 'axios'
import { BACK_URL } from '../../../constants/index'

export const postLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/identity/login`,
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                password: password
            }
        })
            .then(response => response)
            .then(json => {
                return resolve({
                    data: json.data
                });
            })
            .catch(err => {
                console.log(err)
                return reject(err)
            });
    });
};