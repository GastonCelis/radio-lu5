import React from 'react';
import logo from '../../assets/logo-lu5.svg'
import Boton from '../../components/Boton/Boton';
import Input from '../../components/Input/Input';
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './inicioSesion.css'
import LoginGoogle from '../../components/LoginGoogle/LoginGoogle';

const InicioSesion = () => {
    return (
        <section className='container-sesion'>
            <div className='main-sesion'>
                <div className='header-sesion'>
                    <img src={logo} alt='Logo LU5' className='logo-sesion'/>
                </div>

                <h2 className='titulo-seccion'>Iniciar sesión</h2>
                
                <section className='seccion-sesion'>
                    <form className='inputs-seccion'>
                        <Input type={'email'} placeholder={'Correo electrónico'} required={true}/>
                        <Input type={'password'} placeholder={'Contraseña'} required={true}/>
                        <div className='link-pwd-container'>
                            <Link className='link-pwd'>Olvidé mi contraseña</Link>
                        </div>
                    </form>

                    <div className='btns1-seccion'>
                        <Boton text={'Iniciar sesión'} type={2} path={'/oyente'}/>
                        <LoginGoogle/>
                        <Link to={'/'} className='volver-registro'><ArrowBackIosNewIcon sx={{fontSize: '14px'}}/> <p>Volver</p></Link>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default InicioSesion;