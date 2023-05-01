import React, { useState } from 'react';
import logo from '../../assets/logo.png'
import './oyente.css'
import NavBarOyente from '../../components/NavBarOyente/NavBarOyente';
import PerfilOyente from '../../components/PerfilOyente/PerfilOyente';
import HomeOyente from '../../components/HomeOyente/HomeOyente';

const Oyente = () => {
    const [perfil, setPerfil] = useState(false)

    return (
        <section className='container-oyente'>
            <div className='header-sesion'>
                <img src={logo} alt='Logo LU5' className='logo-sesion'/>
                <h1 className='titulo-sesion'><span className='span-header'>Club</span> de oyentes</h1>
            </div>

            <div className='box-oyente'>
                <NavBarOyente perfil={perfil} setPerfil={setPerfil}/>
            </div>

            <div className='box2-oyente'>
                {   
                    perfil ?
                    <PerfilOyente setPerfil={setPerfil}/>
                    :
                    <HomeOyente/>
                }
            </div>
        </section>
    );
};

export default Oyente;