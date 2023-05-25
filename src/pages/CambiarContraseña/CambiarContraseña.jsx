/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './cambiarContraseña.css'
import Input from '../../components/Input/Input'
import Boton from '../../components/Boton/Boton'
import { redirectToNewPage } from '../../utils/functions';
import { Audio } from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux';
import { setStatusMessageClave } from '../../app/silices/clave/claveSlice';
import { postClaveAsync } from '../../app/silices/clave/claveThunk';

const CambiarContraseña = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramToken = searchParams.get('token');
    const paramEmail = searchParams.get('email');
    const dispatch = useDispatch()
    const { statusMessageClave, loadingClave } = useSelector(state => state.claveSlice)
    const [pass, setPass] = useState({ pass: '', pass2: '' })
    const [valido, setValido] = useState()

    useEffect(() => {
        if (
            paramToken === null ||
            paramToken === undefined ||
            paramToken === '' ||
            paramToken === 'null' ||
            paramToken === 'undefined' ||
            paramEmail === null ||
            paramEmail === undefined ||
            paramEmail === '' ||
            paramEmail === 'null' ||
            paramEmail === 'undefined'
        ) {
            redirectToNewPage('/')
        }
    }, [])

    useEffect(() => {
        if (statusMessageClave === 'fulfilledClave') {
            setValido('si')

            setTimeout(() => {
                setValido()
                setPass({ pass: '', pass2: '' })
                dispatch(setStatusMessageClave(''))
                redirectToNewPage('/sesion')
            }, 3000);
        }

        if (statusMessageClave === 'rejectedClave') {
            dispatch(setStatusMessageClave(''))
            setValido('no')
        }
    }, [statusMessageClave])

    const handleSend = async () => {
        if (pass.pass.length < 6 && pass.pass2.length < 6) {
            return setValido('tamaño')
        }

        if (pass.pass !== pass.pass2) {
            return setValido('distintas')
        }

        const body = {
            email: paramEmail,
            token: paramToken,
            password: pass.pass,
            confirmPassword: pass.pass2
        }

        dispatch(postClaveAsync({ body }))
    }

    const handlePass = (event) => {
        setPass({ ...pass, pass: event.target.value })
    }

    const handlePass2 = (event) => {
        setPass({ ...pass, pass2: event.target.value })
    }

    return (
        <section className='container-cambiar-clave'>
            <h2>Cambio de contraseña</h2>
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
                        <p>Cambiando contraseña...</p>
                    </div>
                    :
                    <>
                        <div className='box-input-cambiar-clave'>
                            <Input type={'password'} placeholder={'Nueva contraseña'} onChange={handlePass} color/>
                            <Input type={'password'} placeholder={'Confirmar contraseña'} onChange={handlePass2} color/>
                        </div>

                        {
                            valido === 'si' && <span className='span-ok-registro'>¡Se cambio la contraseña correctamente!</span>
                        }
                        {
                            valido === 'no' && <span className='span-error-registro'>¡Error al cambiar la contraseña!</span>
                        }
                        {
                            valido === 'tamaño' && <span className='span-error-registro'>¡Las contraseñas deben tener más de 6 caracteres!</span>
                        }
                        {
                            valido === 'distintas' && <span className='span-error-registro'>¡Las contraseñas no coinciden!</span>
                        }
                        <Boton type={2} text={'Confirma cambios'} onClick={handleSend}/>
                    </>
            }
        </section>
    );
};

export default CambiarContraseña;