/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './agregarBeneficio.css'
import { useDispatch } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { setNuevoBeneficio, setRefreshNuevoBeneficio, setStatusMessageBenefit } from '../../app/silices/beneficio/beneficioSlice';
import Input from '../Input/Input';
import { postBeneficioAsync } from '../../app/silices/beneficio/beneficioThunk';

const AgregarBeneficio = (props) => {
    const { setAgregar, nuevoBeneficio, statusMessageBenefit, login } = props
    const dispatch = useDispatch()
    const [agregadoOk, setAgregadoOk] = useState()

    useEffect(() => {
        if (statusMessageBenefit === 'fulfilledCreateBeneficios') {
            setAgregadoOk(true)

            setTimeout(() => {
                setAgregar(false)
                setAgregadoOk()
                dispatch(setStatusMessageBenefit(''))
                dispatch(setRefreshNuevoBeneficio())
            }, 2000)
        }

        if (statusMessageBenefit === 'rejectedCreateBeneficios') {
            setAgregadoOk(false)

            setTimeout(() => {
                setAgregadoOk()
                dispatch(setStatusMessageBenefit(''))
            }, 3000)
        }
    }, [statusMessageBenefit])

    const handlerChangeImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result;
            const data64Imagen = base64String.split(',')
            dispatch(setNuevoBeneficio({ image: data64Imagen[1] }))
        };

        reader.readAsDataURL(file);
    }

    const handlerChangeTitulo = (event) => {
        dispatch(setNuevoBeneficio({ title: event.target.value }))
    }

    const handlerChangeFinalizacion = (event) => {
        if(event.target.value.length <= 10){
            dispatch(setNuevoBeneficio({ end_date: event.target.value }))
        }
    }

    const handlerChangeDescuento = (event) => {
        dispatch(setNuevoBeneficio({ discount_code: event.target.value }))
    }

    const handlerChangeInfo = (event) => {
        dispatch(setNuevoBeneficio({ benefit_use: event.target.value, refund_cap: 0 }))
    }

    const discardImage = () => {
        dispatch(setNuevoBeneficio({ image: '' }))
    }

    const discardBeneficio = () => {
        dispatch(setRefreshNuevoBeneficio())
        setAgregar(false)
    }

    const saveData = () => {
        const body = { ...nuevoBeneficio, end_date: new Date(nuevoBeneficio.end_date).toISOString()}
        dispatch(postBeneficioAsync({token: login.token, body}))
    }

    return (
        <section className='container-superior-beneficio-agregar'>
            <div className='container-beneficio-agregar'>
                <div className='boxsuperior-beneficio-agregar'>
                    <div className='box-beneficio-agregar'>
                        <div className='img-input-beneficio-agregar'>
                            {
                                nuevoBeneficio.image === '' ?
                                    <>
                                        <span>Agregar imagen</span>
                                        <div>
                                            <EditIcon sx={{ fontSize: '15px' }} />
                                        </div>
                                        <input type='file' onChange={handlerChangeImage} />
                                    </>
                                    :
                                    <>
                                        <img src={`data:image/jpg;base64,${nuevoBeneficio.image}`} alt='Nuevo beneficio' className='vista-img-agregar-benedicio' />
                                        <div className='box-icon-imagen-agregar-concurso'>
                                            <DeleteForeverIcon onClick={discardImage} />
                                        </div>
                                    </>

                            }
                        </div>
                    </div>
                </div>

                <div className='inbox-beneficio-agregar'>
                    <div>
                        <span className='span-beneficio-agregar'>Título:</span>
                        <Input type='text' placeholder='Título' onChange={handlerChangeTitulo} width={4} value={nuevoBeneficio.title} color />
                    </div>


                    <div>
                        <span className='span-beneficio-agregar'>Fecha de finalización:</span>
                        <Input type='date' placeholder='Finalización' onChange={handlerChangeFinalizacion} width={4} value={nuevoBeneficio.end_date} color />
                    </div>

                    <div>
                        <span className='span-beneficio-agregar'>Código de descuento:</span>
                        <Input type='number' placeholder='Descuento' onChange={handlerChangeDescuento} width={4} value={nuevoBeneficio.discount_code} color />
                    </div>
                </div>

                <div className='boxsuperior2-beneficio-agregar'>
                    <span className='span-beneficio-agregar'>Info Adicional:</span>
                    <textarea className='textarea-beneficio-agregar' onChange={handlerChangeInfo}></textarea>
                </div>
            </div>

            <div className='boxsuperior-botones-beneficio-agregar'>
                {
                    agregadoOk === true && <span className='span-ok-registro'>¡Se agregó el beneficio correctamente!</span>
                }
                {
                    agregadoOk === false && <span className='span-error-registro'>¡No se pudo agregar el beneficio!</span>
                }
                <button className='boton-guardar-beneficio-agregar' onClick={saveData}>
                    <SaveIcon />
                    Guardar
                </button>

                <button className='boton-eliminar-beneficio-agregar' onClick={discardBeneficio}>
                    <DeleteForeverIcon />
                    Descartar
                </button>
            </div>
        </section>
    );
};

export default AgregarBeneficio;