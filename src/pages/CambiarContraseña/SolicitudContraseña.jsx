/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';
import Boton from '../../components/Boton/Boton';
import { redirectToNewPage } from '../../utils/functions';
import { Audio } from 'react-loader-spinner'
import { postClaveEmailAsync } from '../../app/silices/clave/claveThunk';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusMessageClave } from '../../app/silices/clave/claveSlice';

const SolicitudContraseña = () => {
    const dispatch = useDispatch()
    const { statusMessageClave, loadingClave } = useSelector(state => state.claveSlice)
    const [email, setEmail] = useState('')
    const [valido, setValido] = useState()

    useEffect(() => {
        if (statusMessageClave === 'fulfilledEmail') {
            setValido(true)

            setTimeout(() => {
                setValido()
                setEmail('')
                dispatch(setStatusMessageClave(''))
                redirectToNewPage('/')
            }, 3000);
        }

        if (statusMessageClave === 'rejectedEmail') {
            dispatch(setStatusMessageClave(''))
            setValido(false)
        }
    }, [statusMessageClave])

    const handleSend = async () => {
        dispatch(postClaveEmailAsync({ email }))
    }

    const onChangeMail = (event) => {
        setEmail(event.target.value)
    }

    return (
        <section className='container-cambiar-clave'>
            <h2>Solicitud para cambio de contraseña</h2>

            {
                loadingClave ?
                    <div className='loader-solicitud-clave'>
                        <Audio
                            height="80"
                            width="80"
                            radius="9"
                            color="red"
                            ariaLabel="Cargando..."
                            wrapperStyle
                            wrapperClass
                        />
                        <p>Enviando solicitud...</p>
                    </div>
                    :
                    <>
                        <div className='box-input-cambiar-clave'>
                            <Input type={'email'} placeholder={'Ingrese su email'} onChange={onChangeMail} value={email} color />
                        </div>

                        {
                            valido === true && <span className='span-ok-registro'>¡Enviamos un email a su casilla para cambiar la contraseña!</span>
                        }
                        {
                            valido === false && <span className='span-error-registro'>¡Error al enviar la solicitud, verifique el email!</span>
                        }

                        <Boton type={2} text={'Solicitar cambio de contraseña'} onClick={handleSend} />
                    </>
            }
        </section>
    );
};

export default SolicitudContraseña;