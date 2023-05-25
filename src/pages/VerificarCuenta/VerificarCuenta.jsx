/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { redirectToNewPage } from '../../utils/functions';
import { decodeToken } from "react-jwt";
import { postVerificacionAsync } from '../../app/silices/clave/claveThunk';
import { useSelector, useDispatch } from 'react-redux';
import { Audio } from 'react-loader-spinner'

const VerificarCuenta = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramToken = searchParams.get('token');
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const { statusMessageClave } = useSelector(state => state.claveSlice)

    useEffect(() => {
        if (
            paramToken === null ||
            paramToken === undefined ||
            paramToken === '' ||
            paramToken === 'null' ||
            paramToken === 'undefined'
        ) {
            return redirectToNewPage('/')
        }

        setEmail(decodeToken(paramToken).email)
    }, [])

    useEffect(() => {
        if (email !== '') {
            const body = {
                email: email,
                token: paramToken,
            }

            dispatch(postVerificacionAsync({ body }))
        }
    }, [email])

    useEffect(()=>{
        if(statusMessageClave === 'fulfilledVerificacion'){
            setTimeout(()=>{
                redirectToNewPage('/')
            }, 3000)
        }
    }, [statusMessageClave])

    return (
        <section className='container-registro'>
            {
                (statusMessageClave === '' || statusMessageClave === 'pendingVerificacion') &&
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
                    <p>Cambiando contraseña...</p>
                </div>
            }
            {
                statusMessageClave === 'fulfilledVerificacion' && <span className='span-ok-registro'>¡Su cuenta se verificó correctamente!</span>
            }
            {
                statusMessageClave === 'rejectedVerificacion' && <span className='span-error-registro'>¡No se pudo verificar la cuenta intente más tarde!</span>
            }
        </section>
    );
};

export default VerificarCuenta;