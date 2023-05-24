/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './admin.css'
import NavBarAdmin from '../../components/NavBarAdmin/NavBarAdmin';
import VistasAdmin from '../../components/VistasAdmin/VistasAdmin';
import { useSelector, useDispatch } from 'react-redux';
import { setRefreshState, setStatusMessageLogin } from '../../app/silices/login/loginSlice';
import { setRefreshStateGoogle } from '../../app/silices/usuarios/usuarioGoogleSlice';
import { setRefreshStateUser } from '../../app/silices/usuarios/usuarioSlice';
import useCustomGoogleLogin from '../../hooks/useGoogleLogin';
import { redirectToNewPage } from '../../utils/functions';
import { getUserAsync } from '../../app/silices/usuarios/usuarioThunk';

const Admin = () => {
    const [opcion, setOpcion] = useState('concursos')
    const { statusMessage, token, id } = useSelector(state => state.loginSlice)
    const dispatch = useDispatch()
    const { googleLogOut } = useCustomGoogleLogin()

    useEffect(() => {
        dispatch(getUserAsync({ token: token, idUser: id }))
    }, []);

    useEffect(()=>{
        if(statusMessage === 'rejectedToken'){
            googleLogOut()
            dispatch(setRefreshState())
            dispatch(setRefreshStateGoogle())
            dispatch(setRefreshStateUser())
            dispatch(setStatusMessageLogin(''))
            redirectToNewPage('/')
        }

    }, [statusMessage])

    return (
        <main className='container-admin'>
            <section className='box-section-nav-admin'>
                <NavBarAdmin opcion={opcion} setOpcion={setOpcion}/>
            </section>

            <section className='box-section-vistas-admin'>
                <VistasAdmin opcion={opcion}/>
            </section>
        </main>
    );
};

export default Admin;