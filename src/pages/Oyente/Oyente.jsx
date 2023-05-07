import React, { useState } from 'react';
import logo from '../../assets/logo-lu5.svg'
import './oyente.css'
import NavBarOyente from '../../components/NavBarOyente/NavBarOyente';
import EditPerfil from '../../components/EditPerfil/EditPerfil';
import HomeOyente from '../../components/HomeOyente/HomeOyente';

const Oyente = () => {
    const [perfil, setPerfil] = useState(false)

    return (
        <section className='container-oyente'>
            <div className='header-sesion'>
                <img src={logo} alt='Logo LU5' className='logo-sesion'/>
            </div>

            <div className='box-oyente'>
                <NavBarOyente perfil={perfil} setPerfil={setPerfil}/>
            </div>

            <div className={`box2-oyente ${perfil && 'box2-oyente-perfil-home'}`}>
                {   
                    perfil ?
                    <EditPerfil setPerfil={setPerfil}/>
                    :
                    <HomeOyente/>
                }
            </div>
        </section>
    );
};

export default Oyente;