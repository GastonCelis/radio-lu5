/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './oyenteMobile.css'
import TarjetaOyente from '../../components/TarjetasOyente/TarjetaOyente';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import logo from '../../assets/logo-lu5.svg'
import EditPerfil from '../../components/EditPerfil/EditPerfil';
import EditIcon from "@mui/icons-material/Edit";
import useCustomGoogleLogin from '../../hooks/useGoogleLogin';
import { setRefreshState, setStatusMessageLogin } from '../../app/silices/login/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { redirectToNewPage } from '../../utils/functions';
import { setRefreshStateGoogle } from '../../app/silices/usuarios/usuarioGoogleSlice';
import { setRefreshStateUser, setProfileuUsuario } from '../../app/silices/usuarios/usuarioSlice';
import { format } from 'date-fns';

const OyenteMobile = (props) => {
    const { setPerfil, profile } = props
    const [opciones, setOpciones] = useState('concursos')
    const { googleLogOut } = useCustomGoogleLogin()
    const dispatch = useDispatch()
    const login = useSelector(state => state.loginSlice)
    const user = useSelector(state => state.usuarioSlice)
    const { concursos, statusMessage, concursosOyente } = useSelector(state => state.concursoSlice)
    const { beneficios } = useSelector(state => state.beneficioSlice)
    const newOrderConcursos = []

    useEffect(() => {
        if (login.statusMessage === 'rejectedToken' || user.statusMessage === 'rejectedLogin') {
            googleLogOut()
            dispatch(setRefreshState())
            dispatch(setRefreshStateGoogle())
            dispatch(setRefreshStateUser())
            dispatch(setStatusMessageLogin(''))
            redirectToNewPage('/')
        }

    }, [login.statusMessage, user.statusMessage])

    const sortedConcursos = [...concursos].sort((a, b) => {
        if (a.contestState === 'ENTREGADO' && b.contestState !== 'ENTREGADO') {
            return 1;
        } else if (a.contestState !== 'ENTREGADO' && b.contestState === 'ENTREGADO') {
            return -1;
        } else {
            return 0;
        }
    });

    concursos.forEach(data => {
        const findConcurso = concursosOyente?.find(info => info.id === data.id)

        if (data.contestState === 'ENTREGADO') {
            return newOrderConcursos.push(data)
        }

        if (data.contestState !== 'ENTREGADO') {
            if (findConcurso === undefined) {
                return newOrderConcursos.unshift(data)
            } else {
                return newOrderConcursos.push(data)
            }
        }
    })

    const handleTituloNav = () => {
        if (opciones === 'concursos') return 'Concursos'
        if (opciones === 'mis concursos') return 'Mis Concursos'
        if (opciones === 'beneficios') return 'Beneficios'
        if (opciones === 'perfil') return 'Mi perfil'
    }

    const handleResultConcurso = (isWinner, contestState) => {
        if (isWinner === false && contestState === 'ENTREGADO') {
            return 'perdido'
        }

        if (isWinner === false && contestState === 'PENDIENTE') {
            return 'pendiente'
        }

        if (isWinner === true && contestState === 'ENTREGADO') {
            return 'ganado'
        }
    }

    const hanlderChangeImage = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result;
            const data64Imagen = base64String.split(',')
            dispatch(setProfileuUsuario({ profileImage: data64Imagen[1] }))
        };

        reader.readAsDataURL(file);
    }

    return (
        <section className='seccion-oyente-mobile'>
            {
                opciones === '' &&
                <>
                    <header className='header-oyente-mobile'>
                        <img src={logo} alt='Logo LU5' className='logo-mobile' />
                        <img src={`data:image/jpg;base64,${profile.profileImage}`} alt="Oyente" className="img-nav-oyente img-nav-oyente-mobile" />
                        <h2>{`Hola ${profile.fullName}!`}</h2>
                    </header>

                    <nav className='nav-mobile-oyente'>
                        <div className='box-botonera-mobile'>
                            <button className='button-nav-oyente-mobile' onClick={() => setOpciones('concursos')}><p>Concursos</p></button>
                            <button className='button-nav-oyente-mobile' onClick={() => setOpciones('mis concursos')}><p>Mis Concursos</p></button>
                            <button className='button-nav-oyente-mobile' onClick={() => setOpciones('beneficios')}><p>Beneficios</p></button>
                        </div>

                        <div className='box-botonera-mobile box-botonera-mobile-perfil'>
                            <button className='button-nav-oyente-mobile' onClick={() => setOpciones('perfil')}><p>Mi perfil</p></button>
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
                            </div>

                            <img src={`data:image/jpg;base64,${profile.profileImage}`} alt="Oyente" className="img-nav-oyente img-nav-oyente-mobile-2" />
                        </div>
                    </header>
                    <nav className='atras-nav-mobile' onClick={() => setOpciones('')}><ArrowBackIosNewIcon /> <p>{handleTituloNav()}</p></nav>
                </>
            }


            {
                opciones === 'concursos' &&
                newOrderConcursos.map((concurso, index) =>
                    <TarjetaOyente
                        key={index}
                        tipo={'concursos'}
                        titulo={concurso.title}
                        img={`data:image/jpg;base64,${concurso.image}`}
                        programaSorteo={concurso.program}
                        finalizacionConcurso={format(new Date(concurso.endDate), 'dd-MM-yyyy')}
                        infoModal={concurso.aditionalInformation}
                        nombrePrograma={concurso.program}
                        parrafo={concurso.description}
                        imgModalConcurso={`data:image/jpg;base64,${concurso.bannerImage}`}
                        estadoSorteo={concurso.contestState}
                        login={login}
                        idConcurso={concurso.id}
                        statusMessage={statusMessage}
                        concursosOyente={concursosOyente}
                    />
                )
            }

            {
                opciones === 'mis concursos' &&
                concursosOyente.map((concurso, index) =>
                    <TarjetaOyente
                        key={index}
                        tipo={'mis concursos'}
                        titulo={concurso.title}
                        img={`data:image/jpg;base64,${concurso.image}`}
                        estadoMiSorteo={concurso.contestState}
                        fechaParticipacion={format(new Date(concurso.participateDate), 'dd-MM-yyyy')}
                        resultadoMiSorteo={handleResultConcurso(concurso.isWinner, concurso.contestState)}
                        infoModal={concurso.description}
                    />
                )
            }

            {
                opciones === 'beneficios' &&
                beneficios.map((beneficio, index) =>
                    <TarjetaOyente
                        key={index}
                        tipo={'beneficios'}
                        titulo={beneficio.title}
                        img={`data:image/jpg;base64,${beneficio.image}`}
                        fechaFinBeneficio={format(new Date(beneficio.endDate), 'dd-MM-yyyy')}
                        usoBeneficio={beneficio.benefitUse}
                        codigoDescuento={beneficio.discountCode}
                    />
                )
            }

            {
                opciones === 'perfil' &&
                <>
                    <div className='editar-foto-perfil-mobile'>
                        <div className='inbox-editar-foto-perfil-mobile'>
                            <EditIcon sx={{ fontSize: '16px' }} />
                            <p>Editar foto de perfil</p>

                            <input type='file' onChange={hanlderChangeImage} />
                        </div>
                    </div>

                    <EditPerfil setPerfil={setPerfil} profile={profile} login={login} statusMessage={user.statusMessage} />
                </>
            }

        </section>
    );
};

export default OyenteMobile;