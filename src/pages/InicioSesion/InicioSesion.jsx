/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import logo from '../../assets/logo-lu5.svg'
import Boton from '../../components/Boton/Boton';
import Input from '../../components/Input/Input';
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './inicioSesion.css'
import useCustomGoogleLogin from '../../hooks/useGoogleLogin';
import { redirectToNewPage } from '../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { setRedirectLogin } from '../../app/silices/login/loginSlice';
import { postLoginAsync } from '../../app/silices/login/loginThunk';
import { getUserAsync } from '../../app/silices/usuarios/usuarioThunk';

const InicioSesion = () => {
    const { googleLogin } = useCustomGoogleLogin()
    const dispatch = useDispatch()
    const { statusMessage, redirect, token, id } = useSelector(state => state.loginSlice)
    const [ data, setData ] = useState({email: '', password: ''})
    const [ vacio, setVacio ] = useState(false)

    useEffect(() => {
        if (statusMessage === 'rejected' && redirect) {
            redirectToNewPage('/registroGoogle');
            dispatch(setRedirectLogin(false))
        }
    }, [statusMessage]);

    useEffect(()=>{
        if(token.length > 0 && id.length > 0){
            dispatch(getUserAsync({token: token, idUser: id}))
        }
    }, [token, id])

    const handleChangeEmail = (event)=>{
        setData({...data, email: event.target.value})
    }

    const handleChangePassword = (event)=>{
        setData({...data, password: event.target.value})
    }

    const handleLogin = ()=>{
        if(data.email.length === 0 || data.password.length === 0){
            return setVacio(true)
        }
        dispatch(postLoginAsync({email: data.email, password: data.password}))
        setVacio(false) 
    }

    return (
        <section className='container-sesion'>
            <div className='main-sesion'>
                <div className='header-sesion'>
                    <img src={logo} alt='Logo LU5' className='logo-sesion'/>
                </div>

                <h2 className='titulo-seccion'>Iniciar sesión</h2>
                
                <section className='seccion-sesion'>
                    <form className='inputs-seccion'>
                        <Input type={'email'} placeholder={'Correo electrónico'} color required={true} onChange={handleChangeEmail}/>
                        <Input type={'password'} placeholder={'Contraseña'} color required={true} onChange={handleChangePassword}/>
                        <div className='link-pwd-container'>
                            <Link to={'/solicitudClave'} className='link-pwd'>Olvidé mi contraseña</Link>
                        </div>
                    </form>

                    <div className='btns1-seccion'>
                        <span className={`span-error-inicio-sesion ${vacio && 'span-error-inicio-sesion-view'}`}>!Datos incompletos¡</span>
                        <Boton text={'Iniciar sesión'} type={2} onClick={handleLogin}/>
                        <Boton iconGoogle={true} text={'Iniciar sesión con Google'} onClick={() => googleLogin()}/>
                        <Link to={'/'} className='volver-registro'><ArrowBackIosNewIcon sx={{fontSize: '14px'}}/> <p>Página principal</p></Link>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default InicioSesion;