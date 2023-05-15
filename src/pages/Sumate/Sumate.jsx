import React from 'react';
import logo from '../../assets/logo-lu5.svg'
import './sumate.css'
import Boton from '../../components/Boton/Boton';
import LoginGoogle from '../../components/LoginGoogle/LoginGoogle';

const Sumate = () => {
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
                        <LoginGoogle/>
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