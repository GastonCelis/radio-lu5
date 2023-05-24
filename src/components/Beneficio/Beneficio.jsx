import React, { useState } from 'react';
import './beneficio.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { deleteBeneficioAsync } from '../../app/silices/beneficio/beneficioThunk';
import { useDispatch } from 'react-redux';

const Beneficio = (props) => {
    const { img, titulo, codigoDescuento, fechaFinalizacion, info, login, idBeneficio } = props
    const [eliminar, setEliminar] = useState(false)
    const dispatch = useDispatch()

    const hanlderDelete = ()=>{
        dispatch(deleteBeneficioAsync({token: login.token, idBeneficio}))
        setEliminar(true)
    }

    return (
        <section>
            <section className={`container-beneficio-vista ${eliminar && 'container-beneficio-vista-hidden'}`}>
                <div className='boxsuperior-beneficio-vista'>
                    <div className='box-beneficio-vista'>
                        <img src={img} alt='Concurso / Beneficio LU5' className='img-principal-beneficio-vista' />

                        <div>
                            <h2 className='titulo-beneficio-vista'>{titulo}</h2>

                            <div>
                                <span className='span-beneficio-vista'>Fecha de finalización:</span>
                                <p className='parrafo-beneficio-vista'>{fechaFinalizacion}</p>
                            </div>

                            
                            <div className='inbox-beneficio-vista'>
                                <span className='span-beneficio-vista'>Código de descuento:</span>
                                <p className='parrafo-beneficio-vista'>{codigoDescuento}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='boxsuperior2-beneficio-vista'>
                    <div className='inbox2-beneficio-vista'>
                        <h2 className='titulo-beneficio-vista'>Info Adicional:</h2>
                        <p className='parrafo-beneficio-vista'>{info}</p>
                    </div>

                    <button className='boton-eliminar-beneficio-vista' onClick={hanlderDelete}>
                        <DeleteForeverIcon />
                        Eliminar
                    </button>
                </div>
            </section>
        </section>
    );
};

export default Beneficio;