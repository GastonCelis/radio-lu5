/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './vistaConcursos.css'
import NavBarConcursos from './NavBarConcursos/NavBarConcursos';
import TablaConcursos from './TablaConcursos/TablaConcursos';
import Concurso from '../../Concurso/Concurso';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AgregarConcurso from '../../AgregarConcurso/AgregarConcurso';
import { useDispatch, useSelector } from 'react-redux';
import { Audio } from 'react-loader-spinner'
import { getAllConcursosAsync, getConcursosWinnersAsync } from '../../../app/silices/concurso/concursoThunk';
import { setStatusMessage } from '../../../app/silices/concurso/concursoSlice';
import { format } from 'date-fns';
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'
import isEqual from 'date-fns/isEqual'

const VistaConcursos = (props) => {
    const { login } = props
    const [opcionNav, setOpcionNav] = useState('vigentes')
    const [agregar, setAgregar] = useState(false)
    const { concursos, statusMessage, ganadores } = useSelector(state => state.concursoSlice)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllConcursosAsync({ token: login.token }))
        dispatch(getConcursosWinnersAsync({ token: login.token }))
    }, [])

    useEffect(() => {
        if (statusMessage === 'fulfilledPostConcurso' || statusMessage === 'fulfilledPatchWinner') {
            setTimeout(() => {
                dispatch(getAllConcursosAsync({ token: login.token }))
                dispatch(setStatusMessage(''))
            }, 2500);
        }
    }, [statusMessage])

    const handlerTitulo = () => {
        if (opcionNav === 'vigentes' || opcionNav === 'agregar') return 'Concursos vigentes'
        if (opcionNav === 'finalizados') return 'Concursos finalizados'
        if (opcionNav === 'ganadores') return 'Ganadores'
    }

    const filterFinalizados = concursos.filter(concurso => isBefore(new Date(concurso.endDate), new Date()))

    const filterVigentes = concursos.filter(concurso => isAfter(new Date(concurso.endDate), new Date()) || isEqual(new Date(concurso.endDate), new Date()))

    const matchGanadoresFinalizados = filterFinalizados.map(concurso =>{
        const findGanador = ganadores.find(ganador => ganador.title === concurso.title)
        return{
            ...concurso,
            winner: findGanador?.fullName
        }
    })

    return (
        <section>
            <NavBarConcursos opcion={opcionNav} setOpcion={setOpcionNav} />

            <h2 className='titulo-vista-concursos-admin'>{handlerTitulo()}</h2>

            {
                statusMessage === 'pendingAllConcursos' ?
                    <div className='box-loader'>
                        <Audio
                            height="80"
                            width="80"
                            radius="9"
                            color="red"
                            ariaLabel="Cargando..."
                            wrapperStyle
                            wrapperClass
                        />
                        <p>Cargando...</p>
                    </div>
                    :
                    (opcionNav === 'vigentes' && agregar === false) &&
                    <>
                        <div className='boton-agregar-concurso-admin'>
                            <button onClick={() => setAgregar(true)}>
                                <AddBoxIcon />
                                Agregar Concurso
                            </button>
                        </div>

                        {
                            filterVigentes.map((concurso, index) =>
                                <Concurso key={index}
                                    idConcurso={concurso.id}
                                    img={concurso.image}
                                    titulo={concurso.title}
                                    programa={concurso.program}
                                    fechaFinalizacion={concurso.endDate}
                                    info={concurso.aditionalInformation}
                                    anunciante={concurso.advertiser}
                                    imgBanner={concurso.bannerImage}
                                    tipo={'concurso'}
                                    login={login}
                                    statusMessage={statusMessage}
                                />
                            )
                        }
                    </>
            }

            {
                (opcionNav === 'vigentes' && agregar === true) &&
                <AgregarConcurso setAgregar={setAgregar} login={login} />
            }

            {
                statusMessage === 'pendingAllConcursos' ?
                <div className='box-loader'>
                    <Audio
                        height="80"
                        width="80"
                        radius="9"
                        color="red"
                        ariaLabel="Cargando..."
                        wrapperStyle
                        wrapperClass
                    />
                    <p>Cargando...</p>
                </div>
                :
                opcionNav === 'finalizados' &&
                <TablaConcursos columna1={'Concurso'} columna2={'Finalización'} columna3={'Anunciante'} columna4={'Ganador'} arrayInfo={matchGanadoresFinalizados} infoColumna4None={true} />
            }

            {
                statusMessage === 'pendingAllConcursos' ?
                <div className='box-loader'>
                    <Audio
                        height="80"
                        width="80"
                        radius="9"
                        color="red"
                        ariaLabel="Cargando..."
                        wrapperStyle
                        wrapperClass
                    />
                    <p>Cargando...</p>
                </div>
                :
                opcionNav === 'ganadores' &&
                <section>
                    <table className='container-table-vistas-admin'>
                        <thead>
                            <tr className='header-table-vistas'>
                                <th>Nombre y Apellido</th>
                                <th>Concurso</th>
                                <th className={'hidden-boder-right'}>Finalización</th>
                            </tr>
                        </thead>

                        <thead className='header-table-vistas-hidden'>
                            <tr>
                                <th>Nombre y Apellido</th>
                                <th>Concurso</th>
                                <th>Finalización</th>
                            </tr>
                        </thead>

                        <thead className='header-table-vistas-hidden'>
                            <tr>
                                <th>Nombre y Apellido</th>
                                <th>Concurso</th>
                                <th>Finalización</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                ganadores.map((info, index) =>
                                    <tr className='body-table-vistas' key={index}>
                                        <td>{info.fullName}</td>
                                        <td>{info.title}</td>
                                        <td>{format(new Date(info.endDate), 'dd-MM-yyyy')}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </section>
            }
        </section>
    );
};

export default VistaConcursos;