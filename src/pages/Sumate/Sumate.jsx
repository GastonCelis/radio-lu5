import React from 'react';
import logo from '../../assets/logo.png'
import './sumate.css'
import Boton from '../../components/Boton/Boton';

const Sumate = () => {
    return (
        <section className='container-sesion'>
            <div className='main-sesion'>
                <div className='header-sesion'>
                    <img src={logo} alt='Logo LU5' className='logo-sesion'/>
                    <h1 className='titulo-sesion'><span className='span-header'>Club</span> de oyentes</h1>
                </div>
                
                <p className='parrafo-sesion'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, voluptate optio expedita eius dolor autem molestiae cumque
                </p>

                <section className='seccion-sesion'>
                    <div className='header-seccion'>
                        <h2 className='titulo-seccion'>¿Todavía no sos parte?</h2>
                        <h2 className='subtitulo-seccion'>¡Sumate acá!</h2>
                    </div>

                    <div className='btns1-seccion'>
                        <Boton text={'Registrarse'} path={'/registro'}/>
                        <Boton text={'Iniciar sesión con Google'} iconGoogle={true}/>
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