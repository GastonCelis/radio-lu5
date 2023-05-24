import React, { useState } from 'react';
import './oyenteMobile.css'
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import TarjetaOyente from '../../components/TarjetasOyente/TarjetaOyente';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import imgConcurso from '../../assets/img-test-concurso.png'
import imgCinemark from '../../assets/img-cinemark.png'
import logo from '../../assets/logo-lu5.svg'
import EditPerfil from '../../components/EditPerfil/EditPerfil';
import EditIcon from "@mui/icons-material/Edit";
import useCustomGoogleLogin from '../../hooks/useGoogleLogin';
import { setRefreshState } from '../../app/silices/login/loginSlice';
import { useDispatch } from 'react-redux';
import { redirectToNewPage } from '../../utils/functions';
import { setRefreshStateGoogle } from '../../app/silices/usuarios/usuarioGoogleSlice';
import { setRefreshStateUser } from '../../app/silices/usuarios/usuarioSlice';

const OyenteMobile = (props) => {
    const { setPerfil, profile } = props
    const [opciones, setOpciones] = useState('')
    const { googleLogOut } = useCustomGoogleLogin()
    const dispatch = useDispatch()

    const handleTituloNav = () => {
        if (opciones === 'concursos') return 'Concursos'
        if (opciones === 'mis concursos') return 'Mis Concursos'
        if (opciones === 'beneficios') return 'Beneficios'
        if (opciones === 'perfil') return 'Mi perfil'
    }

    const handlerImgenPerfil = (event) => {

    }

    const handleLogout = ()=>{
        setPerfil(false)
        googleLogOut()
        dispatch(setRefreshState())
        dispatch(setRefreshStateGoogle())
        dispatch(setRefreshStateUser())
        redirectToNewPage('/')
    }

    return (
        <section className='seccion-oyente-mobile'>
            {
                opciones === '' &&
                <>
                    <header className='header-oyente-mobile'>
                        <img src={logo} alt='Logo LU5' className='logo-mobile' />
                        <img src={profile.profileImage} alt="Oyente" className="img-nav-oyente img-nav-oyente-mobile" />
                        <h2>{`Hola ${profile.fullName}!`}</h2>
                    </header>

                    <nav className='nav-mobile-oyente'>
                        <div className='box-botonera-mobile'>
                            <button className='button-nav-oyente-mobile' onClick={() => setOpciones('concursos')}><p>Concursos</p></button>
                            <button className='button-nav-oyente-mobile' onClick={() => setOpciones('mis concursos')}><p>Mis Concursos</p></button>
                            <button className='button-nav-oyente-mobile' onClick={() => setOpciones('beneficios')}><p>Beneficios</p></button>
                        </div>

                        <div className='box-botonera-mobile'>
                            <button className='button-nav-oyente-mobile' onClick={() => setOpciones('perfil')}><p>Mi perfil</p></button>
                            <Link to={'/'} className="opcion-nav-oyente" onClick={handleLogout}>
                                <LogoutIcon sx={{ fontSize: '18px' }} />
                                Cerrar sesión
                            </Link>
                        </div>
                    </nav>
                </>
            }

            {
                (opciones === 'concursos' || opciones === 'mis concursos' || opciones === 'beneficios' || opciones === 'perfil') &&
                <>
                    <header className='header-oyente-mobile-2'>
                        <img src={logo} alt='Logo LU5' className='logo-mobile-2' />

                        <div className='box-header-mobile'>
                            <div className='inbox-header-mobile'>
                                <h2 className='titulo-header-mobile'>{`Hola ${profile.fullName}!`}</h2>
                                <Link to={'/'} className="opcion-nav-oyente opcion-nav-oyente-mobile" onClick={handleLogout}>
                                    <LogoutIcon sx={{ fontSize: '12px' }} />
                                    Cerrar sesión
                                </Link>
                            </div>

                            <img src={profile.profileImage} alt="Oyente" className="img-nav-oyente img-nav-oyente-mobile-2" />
                        </div>
                    </header>
                    <nav className='atras-nav-mobile' onClick={() => setOpciones('')}><ArrowBackIosNewIcon /> <p>{handleTituloNav()}</p></nav>
                </>
            }

            {
                opciones === 'concursos' &&
                <>
                    <TarjetaOyente
                        tipo={'concursos'}
                        titulo={'Showcase | Entradas al cine'}
                        img={imgConcurso}
                        programaSorteo={'Número 1515'}
                        finalizacionConcurso={'15/12/2025'}
                        infoModal={'El concurso se realizará el dd/mm/aaaa a las hh/mm durante el programa <programa 1>. Te enviaremos una notificación cuando el concurso haya sido finalizado.'}
                        fechConcurso={'20/03/2023 - 14:00hs'}
                        nombrePrograma={'Programa 1'}
                        parrafo={'Par de entradas para usar de lunes a viernes en cualquier funcion no estreno.'}
                        imgModalConcurso={imgCinemark}
                    />

                    <TarjetaOyente
                        tipo={'concursos'}
                        titulo={'Showcase | Entradas al cine'}
                        img={imgConcurso}
                        programaSorteo={'Número 1515'}
                        finalizacionConcurso={'15/12/2025'}
                        infoModal={'El concurso se realizará el dd/mm/aaaa a las hh/mm durante el programa <programa 1>. Te enviaremos una notificación cuando el concurso haya sido finalizado.'}
                        fechConcurso={'20/03/2023 - 14:00hs'}
                        nombrePrograma={'Programa 1'}
                        parrafo={'Par de entradas para usar de lunes a viernes en cualquier funcion no estreno.'}
                        imgModalConcurso={imgCinemark}
                        estadoSorteo={'finalizado'}
                    />
                </>
            }

            {
                opciones === 'mis concursos' &&
                <>
                    <TarjetaOyente tipo={'mis concursos'} titulo={'Showcase | Entradas al cine'} img={imgConcurso} estadoMiSorteo={'pendiente'} fechaParticipacion={'10/04/2023'} codigoParticipacion={'123'} resultadoMiSorteo={'pendiente'} />
                    <TarjetaOyente
                        tipo={'mis concursos'}
                        titulo={'Showcase | Entradas al cine'}
                        img={imgConcurso}
                        estadoMiSorteo={'finalizado'}
                        fechaParticipacion={'05/03/2023'}
                        codigoParticipacion={'789'}
                        resultadoMiSorteo={'ganado'}
                        infoModal={'Para retirar tus entradas xxx'}
                        titulo1Modal={'¡Felicidades!'}
                        titulo2Modal={'Ganaste el concurso'}
                        titulo3Modal={'Showcase | Entradas para el cine'}
                    />
                    <TarjetaOyente tipo={'mis concursos'} titulo={'Showcase | Entradas al cine'} img={imgConcurso} estadoMiSorteo={'finalizado'} fechaParticipacion={'05/03/2023'} codigoParticipacion={'987'} resultadoMiSorteo={'perdido'} />
                </>
            }

            {
                opciones === 'beneficios' &&
                <>
                    <TarjetaOyente tipo={'beneficios'} titulo={'Cinemark | 20% de descuento en entradas'} img={imgConcurso} fechaFinBeneficio={'20/04/2024'} usoBeneficio={'cualquier Cinemark Hoyts del país.'} topeReintegro={'$300'} codigoDescuento={'00123'} />
                    <TarjetaOyente tipo={'beneficios'} titulo={'Cinemark | 20% de descuento en entradas'} img={imgConcurso} fechaFinBeneficio={'20/04/2024'} usoBeneficio={'cualquier Cinemark Hoyts del país.'} topeReintegro={'$300'} codigoDescuento={'00456'} />
                    <TarjetaOyente tipo={'beneficios'} titulo={'Cinemark | 20% de descuento en entradas'} img={imgConcurso} fechaFinBeneficio={'20/04/2024'} usoBeneficio={'cualquier Cinemark Hoyts del país.'} topeReintegro={'$300'} codigoDescuento={'00789'} />
                    <TarjetaOyente tipo={'beneficios'} titulo={'Cinemark | 20% de descuento en entradas'} img={imgConcurso} fechaFinBeneficio={'20/04/2024'} usoBeneficio={'cualquier Cinemark Hoyts del país.'} topeReintegro={'$300'} codigoDescuento={'00987'} />
                    <TarjetaOyente tipo={'beneficios'} titulo={'Cinemark | 20% de descuento en entradas'} img={imgConcurso} fechaFinBeneficio={'20/04/2024'} usoBeneficio={'cualquier Cinemark Hoyts del país.'} topeReintegro={'$300'} codigoDescuento={'00654'} />
                </>
            }

            {
                opciones === 'perfil' &&
                <>
                    <div className='editar-foto-perfil-mobile'>
                        <div className='inbox-editar-foto-perfil-mobile'>
                            <EditIcon sx={{ fontSize: '16px' }} />
                            <p>Editar foto de perfil</p>

                            <input type='file' onChange={handlerImgenPerfil} />
                        </div>
                    </div>

                    <EditPerfil setOpciones={setOpciones} />
                </>
            }

        </section>
    );
};

export default OyenteMobile;