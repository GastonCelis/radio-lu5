import React, { useState } from 'react';
import './agregarBeneficio.css'
import { useDispatch } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { setNuevoBeneficio } from '../../app/silices/beneficio/beneficioSlice';
import Input from '../Input/Input';

const AgregarBeneficio = (props) => {
    const { setAgregar } = props
    const dispatch = useDispatch()
    const [datos, setDatos] = useState({
        imagen: null,
        titulo: '',
        fechaFinalizacion: '',
        codigoDescuento: '',
        info: ''
    })

    const handlerChangeImage = (event) => {
        setDatos({ ...datos, imagen: URL.createObjectURL(event.target.files[0]) })
    }

    const handlerChangeTitulo = (event) => {
        setDatos({ ...datos, titulo: event.target.value })
    }

    const handlerChangeFinalizacion = (event) => {
        setDatos({ ...datos, fechaFinalizacion: event.target.value })
    }

    const handlerChangeDescuento = (event) => {
        setDatos({ ...datos, codigoDescuento: event.target.value })
    }

    const handlerChangeInfo = (event) => {
        setDatos({ ...datos, info: event.target.value })
    }

    const saveData = () => {
        dispatch(setNuevoBeneficio(datos))
        setAgregar(false)
    }

    return (
        <section className='container-superior-beneficio-agregar'>
            <div className='container-beneficio-agregar'>
                <div className='boxsuperior-beneficio-agregar'>
                    <div className='box-beneficio-agregar'>
                        <div className='img-input-beneficio-agregar'>
                            {
                                datos.imagen === null ?
                                    <>
                                        <span>Agregar imagen</span>
                                        <div>
                                            <EditIcon sx={{ fontSize: '15px' }} />
                                        </div>
                                        <input type='file' onChange={handlerChangeImage} />
                                    </>
                                    :
                                    <>
                                        <img src={datos.imagen} alt='Nuevo beneficio' className='vista-img-agregar-benedicio' />
                                        <div className='box-icon-imagen-agregar-concurso'>
                                            <DeleteForeverIcon onClick={() => setDatos({ ...datos, imagen: null })} />
                                        </div>
                                    </>

                            }
                        </div>
                    </div>
                </div>

                <div className='inbox-beneficio-agregar'>
                    <div>
                        <span className='span-beneficio-agregar'>Título:</span>
                        <Input type='text' placeholder='Título' onChange={handlerChangeTitulo} width={4} valueInput={' '} />
                    </div>


                    <div>
                        <span className='span-beneficio-agregar'>Fecha de finalización:</span>
                        <Input type='date' placeholder='Finalización' onChange={handlerChangeFinalizacion} width={4} valueInput={' '} />
                    </div>

                    <div>
                        <span className='span-beneficio-agregar'>Código de descuento:</span>
                        <Input type='text' placeholder='Descuento' onChange={handlerChangeDescuento} width={4} valueInput={' '} />
                    </div>
                </div>

                <div className='boxsuperior2-beneficio-agregar'>
                    <span className='span-beneficio-agregar'>Info Adicional:</span>
                    <textarea className='textarea-beneficio-agregar' onChange={handlerChangeInfo}></textarea>
                </div>
            </div>

            <div className='boxsuperior-botones-beneficio-agregar'>
                <button className='boton-guardar-beneficio-agregar' onClick={saveData}>
                    <SaveIcon />
                    Guardar
                </button>

                <button className='boton-eliminar-beneficio-agregar' onClick={() => setAgregar(false)}>
                    <DeleteForeverIcon />
                    Descartar
                </button>
            </div>
        </section>
    );
};

export default AgregarBeneficio;