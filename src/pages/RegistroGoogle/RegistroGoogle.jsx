import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo-lu5.svg'
import Boton from '../../components/Boton/Boton';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import '../Registro/registro.css'
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useSelector, useDispatch } from 'react-redux';
import { postRegisterAsync } from '../../app/silices/registro/registroThunk';
import { redirectToNewPage } from '../../utils/functions';
import imgPerfilDefault from '../../assets/foto-perfil.png'

const RegistroGoogle = () => {
    const dispatch = useDispatch()
    const { profileGoogle } = useSelector(state => state.usuarioGoogleSlice)
    const { localidadSeleccionada, ocupacionSeleccionada, provinciaSeleccionada, generoSeleccionado, statusMessage } = useSelector(state => state.registroSlice)
    const [ data, setData ] = useState({ birthDay: '', phone_number: '', dni: '', profile_image: ''})
    const [ validate, setValidate ] = useState(true)
    const [ registerOk, setRegisterOk ] = useState('')

    useEffect(() => {
        loadImage()
    }, []);

    useEffect(()=>{
        if(statusMessage === 'fulfilled'){
            setRegisterOk('si')

            setTimeout(()=>{
                setRegisterOk('')
                redirectToNewPage('/sesion')
            }, 2000)
        }

        if(statusMessage === 'rejected'){
            setRegisterOk('no')

            setTimeout(()=>{
                setRegisterOk('')
            }, 3000)
        }
    }, [statusMessage])

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const loadImage = async () => {
        try {
            const response = await fetch(imgPerfilDefault);
            const blob = await response.blob();
            const base64 = await convertToBase64(blob);
            setData({...data, profile_image: base64});
        } catch (error) {
            console.error(error);
        }
    };

    const handleBirthDay = (event)=>{
        if(event.target.value.length <= 10){
            setData({...data, birthDay: event.target.value})
        }
    }

    const handlePhoneNumber = (event)=>{
        setData({...data, phone_number: event.target.value})
    }

    const handleDni = (event)=>{
        if(event.target.value.length <= 10){
            setData({...data, dni: event.target.value})
        }
    }

    const handleRegister = ()=>{
        if(
            profileGoogle.name.length > 0 && 
            profileGoogle.email.length > 0 &&
            profileGoogle.idGoogle.length > 0 &&
            data.birthDay.length > 0 &&
            ocupacionSeleccionada.length > 0 &&
            data.phone_number.length > 0 &&
            data.dni.length > 0 &&
            generoSeleccionado.length > 0 &&
            localidadSeleccionada.length > 0 &&
            provinciaSeleccionada.length > 0 &&
            data.profile_image.length > 0
        ){
            setValidate(true)
            const profileImage = data.profile_image.split(',')[1]
            const body = {
                full_name: profileGoogle.name,
                email: profileGoogle.email,
                password: profileGoogle.idGoogle,
                birthDay: new Date(data.birthDay).toISOString(),
                profession: ocupacionSeleccionada,
                phone_number: data.phone_number,
                dni: Number(data.dni),
                genre: generoSeleccionado,
                city: localidadSeleccionada,
                province: provinciaSeleccionada,
                profile_image: profileImage
            }
            dispatch(postRegisterAsync(body))
        } else{
            setValidate(false)
        }
    }

    return (
        <section className='container-registro'>
            <div className='main-registro'>
                <div className='header-registro'>
                    <img src={logo} alt='Logo LU5' className='logo-registro' />
                </div>

                <h2 className='titulo-seccion-registro'>Registrarse</h2>

                <form className='seccion-registro'>
                    <div className='inputs-seccion-registro'>
                        <Input type={'date'} placeholder={'Fecha de nacimiento'} value={data.birthDay} color required={true} onChange={handleBirthDay}/>
                        <Input type={'number'} placeholder={'D.N.I'} required={true} onChange={handleDni} value={data.dni} color={true}/>
                        <Input type={'number'} placeholder={'Teléfono'} defaultValue={''} required={true} onChange={handlePhoneNumber}/>
                        <Select placeholder={'Género'} opciones={'genero'} />
                        <Select placeholder={'Ocupación'} opciones={'ocupacion'} />
                        <Select placeholder={'Provincia'} opciones={'provincia'} />
                        <Select placeholder={'Localidad'} opciones={'localidad'} />
                    </div>

                    <div className='link-politicas-container'>
                        <input name='politicas' id='politicas' type='checkbox' className='checkbox-politicas'></input>
                        <label id='politicas' className='link-politicas'>
                            Acepto las políticas de privacidad
                        </label>
                    </div>

                    <div className='btns1-seccion-registro'>
                        {
                            validate === false && <span className='span-error-registro'>¡Datos incompletos!</span>
                        }
                        {
                            registerOk === 'si' && <span className='span-ok-registro'>¡Se registró correctamente!</span>
                        }
                        <Boton text={'Registrarse'} type={2} onClick={handleRegister}/>
                    </div>
                </form>
            </div>
            <Link to={'/'} className='volver-registro'><ArrowBackIosNewIcon sx={{ fontSize: '14px' }} /> <p>Página principal</p></Link>
        </section>
    );
};

export default RegistroGoogle;