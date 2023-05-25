import React, { useState } from 'react';
import './concurso.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { deleteConcursoAsync, patchWinnerConcursoAsync } from '../../app/silices/concurso/concursoThunk';

const Concurso = (props) => {
    const { img, titulo, programa, fechaFinalizacion, info, anunciante, imgBanner, idConcurso, login, statusMessage } = props
    const [eliminar, setEliminar] = useState(false)
    const dispatch = useDispatch()
    const { allUsuarios } = useSelector(state => state.usuarioSlice)
    const [userSlected, setUserSlected] = useState('')

    const hanlderDelete = () => {
        dispatch(deleteConcursoAsync({ token: login.token, idConcurso }))
        setEliminar(true)
    }

    const handleSelectWinner = (event) => {
        const findUser = allUsuarios.find(user => user.fullName === event.target.value)
        findUser ? setUserSlected(findUser) : setUserSlected('')
    }

    const handleWinner = () => {
        const body = {
            contest_id: idConcurso,
            winner_id: userSlected.id,
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
                                <p className='parrafo-beneficio-concurso'>{fechaFinalizacion}</p>
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
                <label htmlFor="winner">Seleccione al ganador:</label>
                <input
                    type="text"
                    id="winner"
                    list="winners-list"
                    placeholder="Usuarios..."
                    className='input-selector-ganador-concurso'
                    onChange={handleSelectWinner}
                />
                <datalist id="winners-list">
                    {allUsuarios.map((user) => (
                        <option key={user.fullName} value={user.fullName} />
                    ))}
                </datalist>
                {
                    statusMessage !== 'fulfilledPatchWinner' && statusMessage !== 'rejectedPatchWinner' &&
                    <button className={`button-selector-ganador-concurso ${userSlected === '' && 'button-selector-ganador-concurso-disabled'}`} onClick={handleWinner}>Guardar elección</button>
                }
                {
                    statusMessage === 'fulfilledPatchWinner' && <span className='span-ok-registro'>¡Ganador seleccionado correctamente!</span>
                }
                {
                    statusMessage === 'rejectedPatchWinner' && <span className='span-error-registro'>¡Error al seleccionar el ganador!</span>
                }
            </div>
        </section>
    );
};

export default Concurso;