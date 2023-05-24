/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './editPerfil.css'
import Input from '../Input/Input';
import Select from '../Select/Select';
import Boton from '../Boton/Boton'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useSelector, useDispatch } from 'react-redux';
import { capitalizeFirstLetter } from '../../utils/functions';
import { putUserAsync } from '../../app/silices/usuarios/usuarioThunk';
import { setProfileuUsuario, setStatusMessage } from '../../app/silices/usuarios/usuarioSlice';

const EditPerfil = (props) => {
    const { setPerfil, profile, login, statusMessage } = props
    const dispatch = useDispatch()
    const [isScreenWidth600, setIsScreenWidth600] = useState(false);
    const { profileGoogle } = useSelector(state => state.usuarioGoogleSlice)
    const { localidadSeleccionada, ocupacionSeleccionada, provinciaSeleccionada, generoSeleccionado } = useSelector(state => state.registroSlice)
    const [ dataPass, setDataPass ] = useState({pass1: '', pass2: ''})
    const [ passLength, setPassLength ] = useState(true)
    const [ validPass, setValidPass ] = useState(true)
    const [ validMail, setValidMail ] = useState(true)
    const [ validate, setValidate ] = useState()

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth: width } = window;
            setIsScreenWidth600(width <= 600);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(()=>{
        if(statusMessage === 'updateFulfilled'){
            setValidate(true)

            setTimeout(()=>{
                dispatch(setStatusMessage(''))
                setValidate()
                setPerfil(false)
            }, 2000)
        }

        if(statusMessage === 'updateRejected'){
            setValidate(false)

            setTimeout(()=>{
                dispatch(setStatusMessage(''))
                setValidate()
            }, 3000)
        }
    }, [statusMessage])

    useEffect(()=>{
        if(dataPass.pass1 === dataPass.pass2 && dataPass.pass1 !== '' && dataPass.pass2 !== ''){
            dispatch(setProfileuUsuario({password: dataPass.pass1}))
        }
    }, [dataPass.pass1, dataPass.pass2])

    const handleFullName = (event)=>{
        dispatch(setProfileuUsuario({fullName: event.target.value}))
    }

    const handleEmail = (event)=>{
        if(event.target.value.includes("@") && event.target.value.includes(".")){
            setValidMail(true)
        } else{
            setValidMail(false)
        }

        dispatch(setProfileuUsuario({email: event.target.value}))
    }

    const handlePassword = (event)=>{
        setDataPass({...dataPass, pass1: event.target.value})

        if(event.target.value !== dataPass.pass2){
            setValidPass(false)
        } else{
            setValidPass(true)
        }

        if(event.target.value.length < 6){
            setPassLength(false)
        } else{
            setPassLength(true)
        }
    }

    const handlePassword2 = (event)=>{
        setDataPass({...dataPass, pass2: event.target.value})

        if(dataPass.pass1 !== event.target.value){
            setValidPass(false)
        } else{
            setValidPass(true)
        }

        if(event.target.value.length < 6){
            setPassLength(false)
        } else{
            setPassLength(true)
        }
    }

    const handleBirthDay = (event)=>{
        if(event.target.value.length <= 10){
            dispatch(setProfileuUsuario({birthDay: event.target.value}))
        }
    }

    const handlePhoneNumber = (event)=>{
        dispatch(setProfileuUsuario({phoneNumber: event.target.value}))
    }

    const handleDni = (event)=>{
        if(event.target.value.length <= 10){
            dispatch(setProfileuUsuario({dni: event.target.value}))
        }
    }

    const handleSaveChange = ()=>{
        const body = {
            full_name: capitalizeFirstLetter(profile.fullName),
            email: profile.email,
            password: profile.password,
            birthDay: new Date(profile.birthDay).toISOString(),
            profession: ocupacionSeleccionada === '' ? profile.profession : ocupacionSeleccionada,
            phone_number: profile.phoneNumber,
            dni: profile.dni,
            genre: generoSeleccionado === '' ? profile.genre : generoSeleccionado,
            city: localidadSeleccionada === '' ? profile.city : localidadSeleccionada,
            province: provinciaSeleccionada === '' ? profile.province : provinciaSeleccionada,
            profile_image: profile.profileImage,
        }

        if(passLength && validPass){
            dispatch(putUserAsync({token: login.token, idUser: login.id, body}))
        }
    }

    return (
        <div className='container-perfil-oyente'>
            <form className='container-box-perfil-oyente'>
                <div className='box-inputs-perfil-oyente'>
                    {
                        profileGoogle.idGoogle === '' &&
                        <>
                            <Input type={'text'} placeholder={'Nombre y apellido'} value={profile.fullName} width={isScreenWidth600 ? '' : 2} onChange={handleFullName} color/>
                            <Input type={'email'} placeholder={'Email'} value={profile.email} width={isScreenWidth600 ? '' : 2} onChange={handleEmail} color/>
                        </>
                    }
                    <Input type={'date'} placeholder={'Fecha de nacimiento'} value={profile.birthDay} onChange={handleBirthDay} color/>
                    <Input type={'number'} placeholder={'D.N.I'} value={profile.dni} onChange={handleDni} color/>
                    <Input type={'number'} placeholder={'Teléfono'} value={profile.phoneNumber} onChange={handlePhoneNumber} color/>
                    <Select opciones={'genero'} genero={profile.genre} color />
                    <Select opciones={'provincia'} provincia={profile.province} color />
                    <Select opciones={'localidad'} localidad={profile.city} color />
                    <Select opciones={'ocupacion'} ocupacion={profile.profession} color />
                </div>

                {
                    profileGoogle.idGoogle === '' &&
                    <>
                        <p className='texto-perfil-oyente'>Modificar contraseña</p>
                        <div className='box-inputs-perfil-oyente'>
                            <Input type={'password'} placeholder={'Nueva contraseña'} color onChange={handlePassword}/>
                            <Input type={'password'} placeholder={'Confirmar contraseña'} color onChange={handlePassword2}/>
                        </div>
                    </>
                }

                <div className='botones-perfil-oyente'>
                    {
                        validate === true && <span className='span-ok-registro'>¡Se guardaron los cambios correctamente!</span>
                    }
                    {
                        validate === false && <span className='span-error-registro'>¡No se guardaron los cambios, datos incompletos o incorrectos!</span>
                    }
                    {
                        validMail === false && <span className='span-error-registro'>¡El email tiene un formato incorrecto!</span>
                    }
                    {
                        passLength === false && <span className='span-error-registro'>¡La contraseña debe tener más de 6 caracteres!</span>
                    }
                    {
                        validPass === false && <span className='span-error-registro'>¡Las contraseñas no coinciden!</span>
                    }
                    <Boton type={2} text={'Confirmar cambios'} onClick={handleSaveChange}/>
                    {
                        !isScreenWidth600 &&
                        <div className='box-volver-perfil' onClick={() => setPerfil(false)}>
                            <NavigateBeforeIcon sx={{ fontSize: '17px' }} />
                            <p className='texto-volver-perfil'>
                                Volver a la página principal
                            </p>
                        </div>
                    }
                </div>
            </form>
        </div>
    );
};

export default EditPerfil;