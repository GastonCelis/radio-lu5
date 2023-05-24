/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import logo from '../../assets/logo-lu5.svg'
import './sumate.css'
import Boton from '../../components/Boton/Boton';
import useCustomGoogleLogin from '../../hooks/useGoogleLogin';
import { useSelector, useDispatch } from 'react-redux';
import { setRedirectLogin } from '../../app/silices/login/loginSlice';
import { redirectToNewPage } from '../../utils/functions'

const Sumate = () => {
    const dispatch = useDispatch()
    const { statusMessage, redirect } = useSelector(state => state.loginSlice)
    const { googleLogin } = useCustomGoogleLogin()

    useEffect(() => {
        if (statusMessage === 'rejected' && redirect) {
            redirectToNewPage('/registroGoogle');
            dispatch(setRedirectLogin(false))
        }
    }, [statusMessage]);

    return (
        <section className='container-sumate'>
            <div className='main-sumate'>
                <div className='header-sumate'>
                    <img src={logo} alt='Logo LU5' className='logo-sumate'/>
                </div>
                
                <p className='parrafo-sumate'>
                    Accedé a beneficios exclusivos para oyentes, concursos emocionantes y contenido adicional. Unite a nuestra comunidad y disfruta de privilegios únicos.
                </p>

                <section className='seccion-sumate'>
                    <div className='header-seccion'>
                        <h2 className='titulo-seccion'>¿Todavía no sos parte?</h2>
                        <h2 className='subtitulo-seccion'>¡Sumate acá!</h2>
                    </div>

                    <div className='btns1-seccion'>
                        <Boton text={'Registrarse'} path={'/registro'}/>
                        <Boton iconGoogle={true} text={'Iniciar sesión con Google'} onClick={() => googleLogin()}/>
                    </div>

                    <div className='btn2-seccion'>
                        <p className='text-seccion'>¿Ya tenés una cuenta?</p>
                        <Boton text={'Iniciar sesión'} path={'/sesion'}/>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Sumate;