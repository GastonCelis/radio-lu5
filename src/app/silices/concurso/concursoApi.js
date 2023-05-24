import axios from 'axios'
import { BACK_URL } from '../../../constants/index'

export const getAllConcursos = (token) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/contests`,
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

export const getConcurso = (token, idUser) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/contests/${idUser}`,
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

export const getConcursosWinners = (token) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/contests/winners`,
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

export const getConcursosOyente = (token, idUsuario) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/contests/my-contests/${idUsuario}`,
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

export const getParticipantesEnConcursos = (token) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/contests/number-participants`,
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

export const postParticipanteConcurso = (body, token) => {
    const data = {
        member_id: body.member_id,
        contest_id: body.contest_id
    } 

    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/contests/participant-in-contest`,
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
                return reject(err)
            });
    });
};

export const postConcurso = (body, token) => {
    const data = {
        title: body.title,
        description: body.description,
        image: body.image,
        end_date: body.end_date,
        advertiser: body.advertiser,
        program: body.program,
        banner_image: body.banner_image,
        aditional_information: body.aditional_information
    }

    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/contests`,
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
                return reject(err)
            });
    });
};

export const patchWinnerConcurso = (body, token) => {
    const data = {
        contest_id: body.contest_id,
        winner_id: body.winner_id,
        contest_state: body.contest_state
    }

    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/contests/state`,
            method: 'PATCH',
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
                return reject(err)
            });
    });
};

export const deleteConcurso = (token, idConcurso) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: `${BACK_URL}/api/v1/contests/${idConcurso}`,
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
                return reject(err)
            });
    });
};