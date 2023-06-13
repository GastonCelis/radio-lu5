import React, { useState } from 'react';
import './concurso.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { deleteConcursoAsync, patchWinnerConcursoAsync } from '../../app/silices/concurso/concursoThunk';
import Boton from '../Boton/Boton';
import { format } from 'date-fns';
import { Audio } from 'react-loader-spinner'

const Concurso = (props) => {
    const { img, titulo, programa, fechaFinalizacion, info, anunciante, imgBanner, idConcurso, login, statusMessage, concursos, ganadores } = props
    const [eliminar, setEliminar] = useState(false)
    const dispatch = useDispatch()
    const { allUsuarios } = useSelector(state => state.usuarioSlice)
    const concursoSlect = concursos.find(concurso => concurso.id === idConcurso)
    const winner = ganadores.find(ganador => ganador.title === concursoSlect.title)

    const hanlderDelete = () => {
        dispatch(deleteConcursoAsync({ token: login.token, idConcurso }))
        setEliminar(true)
    }

    const handleSelectWinner = () => {
        const randomIndex = Math.floor(Math.random() * allUsuarios.length)
        const userWinner = allUsuarios[randomIndex]
        const body = {
            contest_id: idConcurso,
            winner_id: userWinner.id,
            contest_state: 'ENTREGADO'
        }

        dispatch(patchWinnerConcursoAsync({ body, token: login.token }))
    }

    return (
        <section className={`${eliminar && 'container-beneficio-concurso-hidden'}`}>
            <section className={`container-beneficio-concurso ${eliminar && 'container-beneficio-concurso-hidden'}`}>
                <div className='boxsuperior-beneficio-concurso'>
                    <div className='box-beneficio-concurso'>
                        <img src={`data:image/jpg;base64,${img}`} alt='Concurso / Beneficio LU5' className='img-principal-beneficio-concurso' />

                        <div>
                            <h2 className='titulo-beneficio-concurso'>{titulo}</h2>

                            <div className='inbox-beneficio-concurso'>
                                <span className='span-beneficio-concurso'>Programa que sortea:</span>
                                <p className='parrafo-beneficio-concurso'>{programa}</p>
                            </div>

                            <div>
                                <span className='span-beneficio-concurso'>Fecha de finalización:</span>
                                <p className='parrafo-beneficio-concurso'>{format(new Date(fechaFinalizacion), 'dd-MM-yyyy')}</p>
                            </div>
                        </div>
                    </div>

                    <div className='inbox2-beneficio-concurso'>
                        <h2 className='titulo-beneficio-concurso'>Info Adicional:</h2>
                        <p className='parrafo-beneficio-concurso'>{info}</p>
                    </div>
                </div>

                <div className='boxsuperior2-beneficio-concurso'>
                    <div>
                        <span className='span-beneficio-concurso'>Anunciante:</span>
                        <p className='parrafo-beneficio-concurso'>{anunciante}</p>
                    </div>

                    <div>
                        <h2 className='titulo-beneficio-concurso'>Banner anunciante</h2>
                        <img src={`data:image/jpg;base64,${imgBanner}`} alt='Concurso / Beneficio LU5' className='img-banner-beneficio-concurso' />
                    </div>

                    <button className='boton-eliminar-beneficio-concurso' onClick={hanlderDelete}>
                        <DeleteForeverIcon />
                        Eliminar
                    </button>
                </div>
            </section>
            <div className='selector-ganador-concurso'>
                {
                    winner?.fullName === '' || winner === undefined ?
                        statusMessage === 'pendingPatchWinner' ?
                            <div>
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
                            statusMessage === 'fulfilledPatchWinner' ? <span className='span-ok-registro'>¡Ganador seleccionado correctamente!</span> :
                                statusMessage === 'rejectedPatchWinner' ? <span className='span-error-registro'>¡Error al seleccionar el ganador!</span> :
                                    <Boton type={2} text={'Seleccionar ganador aleatorio'} onClick={handleSelectWinner} />
                        :
                        <h2 className='ganador-concurso-text'>El ganador es: <span>{winner?.fullName}</span></h2>
                }
            </div>
        </section>
    );
};

export default Concurso;