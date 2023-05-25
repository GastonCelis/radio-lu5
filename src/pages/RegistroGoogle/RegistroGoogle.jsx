/* eslint-disable react-hooks/exhaustive-deps */
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
import { DATA_GOOGLE } from '../../constants';
import CloseIcon from '@mui/icons-material/Close';

const RegistroGoogle = () => {
    const [isScreenWidth600, setIsScreenWidth600] = useState(false);
    const dispatch = useDispatch()
    const { profileGoogle } = useSelector(state => state.usuarioGoogleSlice)
    const { localidadSeleccionada, ocupacionSeleccionada, provinciaSeleccionada, generoSeleccionado, statusMessage } = useSelector(state => state.registroSlice)
    const [data, setData] = useState({ birthDay: '', phone_number: '', dni: '', profile_image: '' })
    const [validate, setValidate] = useState(true)
    const [registerOk, setRegisterOk] = useState('')
    const [politicas, setPoliticas] = useState(false)
    const [leerPoliticas, setLeerPoliticas] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth: width } = window;
            setIsScreenWidth600(width <= 600);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        loadImage()

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (statusMessage === 'fulfilled') {
            setRegisterOk('si')

            setTimeout(() => {
                setRegisterOk('')
                redirectToNewPage('/sesion')
            }, 2000)
        }

        if (statusMessage === 'rejected') {
            setRegisterOk('no')

            setTimeout(() => {
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
            setData({ ...data, profile_image: base64 });
        } catch (error) {
            console.error(error);
        }
    };

    const handleBirthDay = (event) => {
        if (event.target.value.length <= 10) {
            setData({ ...data, birthDay: event.target.value })
        }
    }

    const handlePhoneNumber = (event) => {
        setData({ ...data, phone_number: event.target.value })
    }

    const handleDni = (event) => {
        if (event.target.value.length <= 10) {
            setData({ ...data, dni: event.target.value })
        }
    }

    const handlePoliticas = () => {
        setPoliticas(!politicas)
    }


    const handleRegister = () => {
        if (
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
            data.profile_image.length > 0 &&
            politicas === true
        ) {
            setValidate(true)
            const profileImage = data.profile_image.split(',')[1]
            const body = {
                full_name: profileGoogle.name,
                email: profileGoogle.email,
                password: DATA_GOOGLE,
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
        } else {
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
                        <Input type={'date'} placeholder={'Fecha de nacimiento'} value={data.birthDay} color required={true} onChange={handleBirthDay} />
                        <Input type={'number'} placeholder={'D.N.I'} required={true} onChange={handleDni} value={data.dni} color={true} />
                        <Input type={'number'} placeholder={'Teléfono'} defaultValue={''} required={true} onChange={handlePhoneNumber} />
                        <Select placeholder={'Género'} opciones={'genero'} />
                        <Select placeholder={'Ocupación'} opciones={'ocupacion'} />
                        <Select placeholder={'Provincia'} opciones={'provincia'} />
                        <Select placeholder={'Localidad'} opciones={'localidad'} />
                    </div>

                    <div className='link-politicas-container'>
                        <input name='politicas' id='politicas' type='checkbox' className='checkbox-politicas' onClick={handlePoliticas}></input>
                        <label id='politicas' className='link-politicas'>
                            Acepto las políticas de privacidad
                        </label>
                        <label id='politicas' className='link-politicas link-leer-politicas' onClick={() => setLeerPoliticas(true)}>
                            Leer políticas
                        </label>
                    </div>

                    <div className='btns1-seccion-registro'>
                        {
                            validate === false && <span className='span-error-registro'>¡Datos incompletos!</span>
                        }
                        {
                            registerOk === 'si' && <span className='span-ok-registro'>¡Se registró correctamente!</span>
                        }
                        {
                            politicas === false && <span className='span-error-registro'>¡Debe aceptar las políticas de privacidad!</span>
                        }
                        <Boton text={'Registrarse'} type={2} onClick={handleRegister} />
                    </div>
                </form>
            </div>
            <Link to={'/'} className='volver-registro'><ArrowBackIosNewIcon sx={{ fontSize: '14px' }} /> <p>Página principal</p></Link>
            {
                leerPoliticas &&
                <section className='container-politicas'>
                    <div className={`container-politicas-icon ${isScreenWidth600 && 'container-politicas-icon-mobile'}`}>
                        <CloseIcon sx={{ cursor: 'pointer', fontSize: '30px' }} onClick={() => setLeerPoliticas(false)}/>
                    </div>

                    <div className={`container-politicas-div ${isScreenWidth600 && 'container-politicas-div-mobile'}`}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis totam necessitatibus, sit placeat ratione tempora illo omnis facere adipisci, quae dolores! Aut repellendus consectetur deserunt accusamus mollitia repudiandae atque dolores!
                            Ullam veniam laboriosam eveniet officiis eos officia ab, molestias aspernatur ea exercitationem sunt maxime quo quod, corrupti voluptatum quam, ratione quos pariatur. Perspiciatis molestiae atque optio saepe, ea reiciendis! Reprehenderit!
                            Alias soluta eius, placeat iste illum, doloribus praesentium quidem quia aspernatur eum ab assumenda, ipsa modi asperiores illo inventore dolores animi labore. Error, ipsa accusamus deserunt iure numquam laborum reiciendis.
                            Accusamus tempora impedit quidem maxime, rerum nihil quibusdam sit excepturi labore veritatis, similique distinctio quisquam cumque iusto porro totam nisi minima iure. Quia mollitia, quas culpa dignissimos quam possimus ducimus.
                            Fuga obcaecati sint id magnam beatae illum. Tempora debitis sit recusandae pariatur doloribus blanditiis quis omnis, exercitationem, labore maiores rerum enim dolore praesentium! Veniam nam nemo aspernatur doloremque asperiores nobis?
                            Necessitatibus sapiente fuga iste laboriosam possimus? Vitae adipisci pariatur atque quis amet quam non distinctio sint nostrum voluptas laudantium mollitia debitis tempora vel iste quaerat, commodi possimus nulla. Ipsam, aliquam!
                            Numquam saepe a quis provident aperiam nisi sed soluta odio, amet explicabo magnam quisquam animi ullam facere nam laboriosam minima assumenda adipisci ab, nostrum expedita! Sit officia voluptatum qui maxime.
                            Asperiores deserunt quia, quis ab quidem assumenda corporis omnis tempore saepe sed vero laborum porro qui iste consectetur, voluptatem error rem optio tempora, delectus quod nesciunt ducimus totam. Deserunt, ipsum.
                            Minima nostrum tempora aspernatur dolores magnam ipsam veritatis voluptates soluta laudantium animi commodi dolore quae omnis quod temporibus harum nisi placeat, ut fugit ipsum neque. Voluptate atque rem amet sunt.
                            Amet nisi, itaque repellat dicta quos illo assumenda quisquam delectus asperiores, dolor ducimus quas reiciendis recusandae, expedita magni. Dolorem nostrum ad harum soluta consequatur rerum laborum, tempore sunt hic laudantium.
                            Non quo quis quidem architecto, obcaecati dicta deserunt eaque vitae voluptates. Fuga placeat voluptatibus voluptas. Esse suscipit vel omnis aspernatur adipisci in est hic necessitatibus alias, sunt, voluptates veritatis minima?
                            Voluptas, cupiditate obcaecati labore magni sapiente cum quidem eius tempore reiciendis illo tempora tenetur qui praesentium, incidunt, dolorum architecto dignissimos iusto ratione magnam suscipit molestiae esse. Rerum iure quo dicta!
                        </p>
                    </div>
                </section>
            }
        </section>
    );
};

export default RegistroGoogle;