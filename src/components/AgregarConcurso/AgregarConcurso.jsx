/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './agregarConcurso.css'
import { useDispatch, useSelector } from 'react-redux';
import { setNuevoConcurso, setRefreshNuevoConcurso, setStatusMessage } from '../../app/silices/concurso/concursoSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Input from '../Input/Input';
import { postConcursoAsync } from '../../app/silices/concurso/concursoThunk';

const AgregarConcurso = (props) => {
    const { setAgregar, login } = props
    const dispatch = useDispatch()
    const { nuevoConcurso, statusMessage } = useSelector(state => state.concursoSlice)
    const [ agregadoOk, setAgregadoOk ] = useState()

    useEffect(()=>{
        if(statusMessage === 'fulfilledPostConcurso'){
            setAgregadoOk(true)

            setTimeout(()=>{
                setAgregar(false)
                setAgregadoOk()
                dispatch(setStatusMessage(''))
                dispatch(setRefreshNuevoConcurso())
            }, 2000)
        }

        if(statusMessage === 'rejectedPostConcurso'){
            setAgregadoOk(false)

            setTimeout(()=>{
                setAgregadoOk()
                dispatch(setStatusMessage(''))
            }, 3000)
        }
    }, [statusMessage])

    const handlerChangeImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result;
            const data64Imagen = base64String.split(',')
            dispatch(setNuevoConcurso({image: data64Imagen[1]}))
        };

        reader.readAsDataURL(file);
    }

    const handlerChangeImageBanner = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result;
            const data64Imagen = base64String.split(',')
            dispatch(setNuevoConcurso({banner_image: data64Imagen[1]}))
        };

        reader.readAsDataURL(file);
    }

    const handlerChangeTitulo = (event) => {
        dispatch(setNuevoConcurso({title: event.target.value }))
    }

    const handlerChangeAnunciante = (event) => {
        dispatch(setNuevoConcurso({advertiser: event.target.value }))
    }

    const handlerChangePrograma = (event) => {
        dispatch(setNuevoConcurso({program: event.target.value }))
    }

    const handlerChangeFinalizacion = (event) => {
        if(event.target.value.length <= 10){
            dispatch(setNuevoConcurso({end_date: event.target.value }))
        }
    }

    const handlerChangeInfo = (event) => {
        dispatch(setNuevoConcurso({aditional_information: event.target.value, description: event.target.value }))
    }

    const discardImage = ()=>{
        dispatch(setNuevoConcurso({image: ''}))
    }

    const discardImageBanner = ()=>{
        dispatch(setNuevoConcurso({banner_image: ''}))
    }

    const discardConcurso = ()=>{
        dispatch(setRefreshNuevoConcurso())
        setAgregar(false)
    }

    const addConcurso = () => {
        const body = {
            title: nuevoConcurso.title,
            description: nuevoConcurso.description,
            image: nuevoConcurso.image,
            end_date: new Date(nuevoConcurso.end_date).toISOString(),
            advertiser: nuevoConcurso.advertiser,
            program: nuevoConcurso.program,
            banner_image: nuevoConcurso.banner_image,
            aditional_information: nuevoConcurso.aditional_information
        }

        dispatch(postConcursoAsync({body, token: login.token}))
    }

    return (
        <section className='container-agregar-concurso'>
            <div className='box-informacion-agregar-concurso'>
                <div className='boxsuperior-agregar-concurso'>
                    <div className='box-agregar-concurso'>
                        <div className='img-input-concurso-agregar'>
                            {
                                nuevoConcurso.image === '' ?
                                    <>
                                        <span>Agregar imagen</span>
                                        <div>
                                            <EditIcon sx={{ fontSize: '15px' }} />
                                        </div>
                                        <input type='file' onChange={handlerChangeImage} />
                                    </>
                                    :
                                    <>
                                        <img src={`data:image/jpg;base64,${nuevoConcurso.image}`} alt='Nuevo concurso' className='img-mini-agregar-concurso' />
                                        <div className='box-icon-imagen-agregar-concurso'>
                                            <DeleteForeverIcon onClick={discardImage} />
                                        </div>
                                    </>
                            }
                        </div>

                        <div className='img-input-banner-concurso-agregar'>
                            {
                                nuevoConcurso.banner_image === '' ?
                                    <>
                                        <span>Banner anunciante</span>
                                        <div>
                                            <EditIcon sx={{ fontSize: '15px' }} />
                                        </div>
                                        <input type='file' onChange={handlerChangeImageBanner} />
                                    </>
                                    :
                                    <>
                                        <img src={`data:image/jpg;base64,${nuevoConcurso.banner_image}`} alt='Nuevo concurso' className='img-banner-agregar-concurso' />
                                        <div className='box-icon-imagen-agregar-concurso'>
                                            <DeleteForeverIcon onClick={discardImageBanner} />
                                        </div>
                                    </>
                            }
                        </div>

                        <div className='inbox-agregar-concurso-titulo'>
                            <div>
                                <span className='span-agregar-concurso'>Título:</span>
                                <Input type='text' placeholder='Título' width={4} value={nuevoConcurso.title} onChange={handlerChangeTitulo} color/>
                            </div>

                            <div>
                                <span className='span-agregar-concurso'>Anunciante:</span>
                                <Input type='text' placeholder='Anunciante' width={4} value={nuevoConcurso.advertiser} onChange={handlerChangeAnunciante} color/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='boxsuperior2-agregar-concurso'>
                    <div>
                        <div className='inbox-agregar-concurso'>
                            <span className='span-agregar-concurso'>Programa que sortea:</span>
                            <Input type='text' placeholder='Programa' width={4} value={nuevoConcurso.program} onChange={handlerChangePrograma} color/>
                        </div>

                        <div>
                            <span className='span-agregar-concurso'>Fecha de finalización:</span>
                            <Input type='date' placeholder='Finalización' width={4} value={nuevoConcurso.end_date} onChange={handlerChangeFinalizacion} color/>
                        </div>
                    </div>

                    <div className='inbox2-agregar-concurso'>
                        <span className='span-agregar-concurso'>Info Adicional:</span>
                        <textarea className='textarea-agregar-concurso' onChange={handlerChangeInfo}></textarea>
                    </div>
                </div>
            </div>

            <div className='box-botones-agregar-concurso'>
                {
                    agregadoOk === true && <span className='span-ok-registro'>¡Se agregó el concurso correctamente!</span>
                }
                {
                    agregadoOk === false && <span className='span-error-registro'>¡No se pudo agregar el concurso!</span>
                }
                <button className='boton-guardar-agregar-concurso' onClick={addConcurso}>
                    <SaveIcon />
                    Guardar
                </button>

                <button className='boton-eliminar-agregar-concurso' onClick={discardConcurso}>
                    <DeleteForeverIcon />
                    Descartar
                </button>
            </div>
        </section>
    );
};

export default AgregarConcurso;