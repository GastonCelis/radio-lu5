import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo-lu5.svg'
import './oyente.css'
import NavBarOyente from '../../components/NavBarOyente/NavBarOyente';
import EditPerfil from '../../components/EditPerfil/EditPerfil';
import HomeOyente from '../../components/HomeOyente/HomeOyente';
import OyenteMobile from './OyenteMobile';


const Oyente = () => {
    const [perfil, setPerfil] = useState(false)
    const [isScreenWidth600, setIsScreenWidth600] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth: width } = window;
            setIsScreenWidth600(width <= 600);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className='container-oyente'>
            {
                isScreenWidth600 ?
                    <>
                        <OyenteMobile setPerfil={setPerfil} />
                    </>
                    :
                    <>
                        <div className='header-sesion'>
                            <img src={logo} alt='Logo LU5' className='logo-sesion' />
                        </div>
                        
                        <div className='box-oyente'>
                            <NavBarOyente perfil={perfil} setPerfil={setPerfil} />
                        </div>

                        <div className={`box2-oyente ${perfil && 'box2-oyente-perfil-home'}`}>
                            {
                                perfil ?
                                    <EditPerfil setPerfil={setPerfil} />
                                    :
                                    <HomeOyente />
                            }
                        </div>
                    </>
            }
        </section>
    );
};

export default Oyente;