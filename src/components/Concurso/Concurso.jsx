import React, { useState } from 'react';
import './concurso.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Concurso = (props) => {
    const { img, titulo, programa, fechaFinalizacion, info, anunciante, imgBanner } = props
    const [eliminar, setEliminar] = useState(false)

    const hanlderDelete = ()=>{
        setEliminar(true)
    }

    return (
        <section>
            <section className={`container-beneficio-concurso ${eliminar && 'container-beneficio-concurso-hidden'}`}>
                <div className='boxsuperior-beneficio-concurso'>
                    <div className='box-beneficio-concurso'>
                        <img src={img} alt='Concurso / Beneficio LU5' className='img-principal-beneficio-concurso' />

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
                        <img src={imgBanner} alt='Concurso / Beneficio LU5' className='img-banner-beneficio-concurso' />
                    </div>

                    <button className='boton-eliminar-beneficio-concurso' onClick={hanlderDelete}>
                        <DeleteForeverIcon />
                        Eliminar
                    </button>
                </div>
            </section>
        </section>
    );
};

export default Concurso;