/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo-lu5.svg'
import './oyente.css'
import NavBarOyente from '../../components/NavBarOyente/NavBarOyente';
import EditPerfil from '../../components/EditPerfil/EditPerfil';
import HomeOyente from '../../components/HomeOyente/HomeOyente';
import OyenteMobile from './OyenteMobile';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAsync } from '../../app/silices/usuarios/usuarioThunk';
import { setRefreshState, setStatusMessageLogin } from '../../app/silices/login/loginSlice';
import { setRefreshStateGoogle } from '../../app/silices/usuarios/usuarioGoogleSlice';
import { setRefreshStateUser } from '../../app/silices/usuarios/usuarioSlice';
import useCustomGoogleLogin from '../../hooks/useGoogleLogin';
import { redirectToNewPage } from '../../utils/functions';
import { getAllConcursosAsync, getConcursosOyenteAsync } from '../../app/silices/concurso/concursoThunk';
import { getAllBeneficiosAsync } from '../../app/silices/beneficio/beneficioThunk';

const Oyente = () => {
    const [perfil, setPerfil] = useState(false)
    const [isScreenWidth600, setIsScreenWidth600] = useState(false);
    const login = useSelector(state => state.loginSlice)
    const { profile, statusMessage } = useSelector(state => state.usuarioSlice)
    const concurso = useSelector(state => state.concursoSlice)
    const dispatch = useDispatch()
    const { googleLogOut } = useCustomGoogleLogin()
    const [bandera, setBandera] = useState(true)

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth: width } = window;
            setIsScreenWidth600(width <= 600);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        dispatch(getUserAsync({ token: login.token, idUser: login.id }))

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (login.statusMessage === 'rejectedToken' || statusMessage === 'rejectedLogin') {
            googleLogOut()
            dispatch(setRefreshState())
            dispatch(setRefreshStateGoogle())
            dispatch(setRefreshStateUser())
            dispatch(setStatusMessageLogin(''))
            redirectToNewPage('/')
        }

    }, [login.statusMessage, statusMessage])

    useEffect(() => {
        dispatch(getAllConcursosAsync({ token: login.token }))
        dispatch(getAllBeneficiosAsync({ token: login.token }))
        dispatch(getConcursosOyenteAsync({ token: login.token, idUsuario: profile.id }))
    }, [])

    useEffect(() => {
        if (profile.id !== '' && bandera === true) {
            dispatch(getConcursosOyenteAsync({ token: login.token, idUsuario: profile.id }))
            setBandera(false)
        }
    }, [profile.id, bandera])

    useEffect(() => {
        if (concurso.statusMessage === 'pendingParticipanteConcurso' || concurso.statusMessage === 'pendingConcursosOyente') {
            dispatch(getAllConcursosAsync({ token: login.token }))
            dispatch(getAllBeneficiosAsync({ token: login.token }))
            dispatch(getConcursosOyenteAsync({ token: login.token, idUsuario: profile.id }))
        }
    }, [concurso.statusMessage])

    return (
        <section className='container-oyente'>
            {
                isScreenWidth600 ?
                    <>
                        <OyenteMobile setPerfil={setPerfil} profile={profile} />
                    </>
                    :
                    <>
                        <div className='header-sesion'>
                            <img src={logo} alt='Logo LU5' className='logo-sesion' />
                        </div>

                        <div className='box-oyente'>
                            <NavBarOyente perfil={perfil} setPerfil={setPerfil} profile={profile} />
                        </div>

                        <div className={`box2-oyente ${perfil && 'box2-oyente-perfil-home'}`}>
                            {
                                perfil ?
                                    <EditPerfil setPerfil={setPerfil} profile={profile} login={login} statusMessage={statusMessage} />
                                    :
                                    <HomeOyente profile={profile} setPerfil={setPerfil} login={login} />
                            }
                        </div>
                    </>
            }
        </section>
    );
};

export default Oyente;