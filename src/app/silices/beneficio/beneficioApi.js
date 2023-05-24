import axios from 'axios'
import { BACK_URL } from '../../../constants/index'

export const getAllBeneficios = (token) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/benefits`,
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

export const postBeneficio = (token, body) => {
    const data = {
        title: body.title,
        image: body.image,
        end_date: body.end_date,
        benefit_use: body.benefit_use,
        refund_cap: body.refund_cap,
        discount_code: body.discount_code
    }

    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/benefits`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
            data: data
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

export const deleteBeneficio = (token, idBeneficio) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/benefits/${idBeneficio}`,
            method: 'DELETE',
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