import axios from 'axios'
import { BACK_URL } from '../../../constants/index'

export const postRegister = (body) => {
    const data = {
        full_name: body.full_name,
        email: body.email,
        password: body.password,
        birthDay: body.birthDay,
        profession: body.profession,
        phone_number: body.phone_number,
        dni: body.dni,
        genre: body.genre,
        city: body.city,
        province: body.province,
        profile_image: body.profile_image
    }

    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/members/register`,
            method: 'POST',
            headers: {
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
                return reject(err)
            });
    });
};