import React, { useState } from 'react';
import './agregarConcurso.css'
import { useDispatch } from 'react-redux';
import { setNuevoConcurso } from '../../app/silices/concurso/concursoSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Input from '../Input/Input';

const AgregarConcurso = (props) => {
    const { setAgregar } = props
    const dispatch = useDispatch()
    const [datos, setDatos] = useState({
        imagen: null,
        imagenBanner: null,
        titulo: '',
        fechaFinalizacion: '',
        anunciante: '',
        programa: '',
        info: ''
    })

    const handlerChangeImage = (event) => {
        setDatos({ ...datos, imagen: URL.createObjectURL(event.target.files[0]) })
    }

    const handlerChangeImageBanner = (event) => {
        setDatos({ ...datos, imagenBanner: URL.createObjectURL(event.target.files[0]) })
    }

    const handlerChangeTitulo = (event) => {
        setDatos({ ...datos, titulo: event.target.value })
    }

    const handlerChangeAnunciante = (event) => {
        setDatos({ ...datos, anunciante: event.target.value })
    }

    const handlerChangePrograma = (event) => {
        setDatos({ ...datos, programa: event.target.value })
    }

    const handlerChangeFinalizacion = (event) => {
        setDatos({ ...datos, fechaFinalizacion: event.target.value })
    }

    const handlerChangeInfo = (event) => {
        setDatos({ ...datos, info: event.target.value })
    }

    const saveData = () => {
        dispatch(setNuevoConcurso(datos))
        setAgregar(false)
    }

    return (
        <section className='container-agregar-concurso'>
            <div className='box-informacion-agregar-concurso'>
                <div className='boxsuperior-agregar-concurso'>
                    <div className='box-agregar-concurso'>
                        <div className='img-input-concurso-agregar'>
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
                                        <img src={datos.imagen} alt='Nuevo concurso' className='img-mini-agregar-concurso' />
                                        <div className='box-icon-imagen-agregar-concurso'>
                                            <DeleteForeverIcon onClick={() => setDatos({ ...datos, imagen: null })} />
                                        </div>
                                    </>
                            }
                        </div>

                        <div className='img-input-banner-concurso-agregar'>
                            {
                                datos.imagenBanner === null ?
                                    <>
                                        <span>Banner anunciante</span>
                                        <div>
                                            <EditIcon sx={{ fontSize: '15px' }} />
                                        </div>
                                        <input type='file' onChange={handlerChangeImageBanner} />
                                    </>
                                    :
                                    <>
                                        <img src={datos.imagenBanner} alt='Nuevo concurso' className='img-banner-agregar-concurso' />
                                        <div className='box-icon-imagen-agregar-concurso'>
                                            <DeleteForeverIcon onClick={() => setDatos({ ...datos, imagenBanner: null })} />
                                        </div>
                                    </>
                            }
                        </div>

                        <div className='inbox-agregar-concurso-titulo'>
                            <div>
                                <span className='span-agregar-concurso'>Título:</span>
                                <Input type='text' placeholder='Título' width={4} valueInput={' '} onChange={handlerChangeTitulo} />
                            </div>

                            <div>
                                <span className='span-agregar-concurso'>Anunciante:</span>
                                <Input type='text' placeholder='Anunciante' width={4} valueInput={' '} onChange={handlerChangeAnunciante} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='boxsuperior2-agregar-concurso'>
                    <div>
                        <div className='inbox-agregar-concurso'>
                            <span className='span-agregar-concurso'>Programa que sortea:</span>
                            <Input type='text' placeholder='Programa' width={4} valueInput={' '} onChange={handlerChangePrograma} />
                        </div>

                        <div>
                            <span className='span-agregar-concurso'>Fecha de finalización:</span>
                            <Input type='date' placeholder='Finalización' width={4} valueInput={' '} onChange={handlerChangeFinalizacion} />
                        </div>
                    </div>

                    <div className='inbox2-agregar-concurso'>
                        <span className='span-agregar-concurso'>Info Adicional:</span>
                        <textarea className='textarea-agregar-concurso' onChange={handlerChangeInfo}></textarea>
                    </div>
                </div>
            </div>

            <div className='box-botones-agregar-concurso'>
                <button className='boton-guardar-agregar-concurso' onClick={saveData}>
                    <SaveIcon />
                    Guardar
                </button>

                <button className='boton-eliminar-agregar-concurso' onClick={() => setAgregar(false)}>
                    <DeleteForeverIcon />
                    Descartar
                </button>
            </div>
        </section>
    );
};

export default AgregarConcurso;