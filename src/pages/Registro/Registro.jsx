/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo-lu5.svg'
import Boton from '../../components/Boton/Boton';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import './registro.css'
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from 'react-redux';
import { postRegisterAsync } from '../../app/silices/registro/registroThunk';
import imgPerfilDefault from '../../assets/foto-perfil.png'
import { capitalizeFirstLetter } from '../../utils/functions';
import { redirectToNewPage } from '../../utils/functions';
import CloseIcon from '@mui/icons-material/Close';
import useCustomGoogleLogin from '../../hooks/useGoogleLogin';
import { setRedirectLogin } from '../../app/silices/login/loginSlice'

const Registro = () => {
    const [isScreenWidth600, setIsScreenWidth600] = useState(false);
    const dispatch = useDispatch()
    const { localidadSeleccionada, ocupacionSeleccionada, provinciaSeleccionada, generoSeleccionado, statusMessage } = useSelector(state => state.registroSlice)
    const login = useSelector(state => state.loginSlice)
    const [data, setData] = useState({ full_name: '', email: '', password: '', password2: '', birthDay: '', phone_number: '', dni: '', profile_image: '' })
    const [validPass, setValidass] = useState({ passLength: true, passOk: true })
    const [validMail, setValidMail] = useState(true)
    const [validate, setValidate] = useState(true)
    const [registerOk, setRegisterOk] = useState('')
    const [politicas, setPoliticas] = useState(false)
    const [leerPoliticas, setLeerPoliticas] = useState(false)
    const { googleLogin } = useCustomGoogleLogin()

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

    useEffect(() => {
        if (login.statusMessage === 'rejected' && login.redirect) {
            redirectToNewPage('/registroGoogle');
            dispatch(setRedirectLogin(false))
        }
    }, [login.statusMessage]);

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

    const handleFullName = (event) => {
        setData({ ...data, full_name: event.target.value })
    }

    const handleEmail = (event) => {
        if (event.target.value.includes("@") && event.target.value.includes(".")) {
            setValidMail(true)
        } else {
            setValidMail(false)
        }

        setData({ ...data, email: event.target.value })
    }

    const handlePassword = (event) => {
        setData({ ...data, password: event.target.value })

        if (event.target.value.length < 6) {
            setValidass({ ...validPass, passLength: false })
        } else {
            setValidass({ ...validPass, passLength: true })
        }
    }

    const handlePassword2 = (event) => {
        setData({ ...data, password2: event.target.value })

        if (event.target.value.length < 6) {
            setValidass({ ...validPass, passLength: false })
        } else {
            setValidass({ ...validPass, passLength: true })
        }
    }

    const handleBirthDay = (event) => {
        if (event.target.value.length <= 10) {
            setData({ ...data, birthDay: event.target.value })
        }
    }

    const handlePhoneNumber = (event) => {
        if (event.target.value.length <= 13) {
            setData({ ...data, phone_number: event.target.value })
        }
    }

    const handleDni = (event) => {
        if (event.target.value.length <= 8) {
            setData({ ...data, dni: event.target.value })
        }
    }

    const handlePoliticas = () => {
        setPoliticas(!politicas)
    }

    const handleRegister = () => {
        if (data.password !== data.password2) {
            setValidass({ ...validPass, passOk: false })
        } else {
            setValidass({ ...validPass, passOk: true })

            if (
                data.full_name.length > 0 &&
                data.email.length > 0 &&
                data.password.length > 0 &&
                data.birthDay.length > 0 &&
                ocupacionSeleccionada.length > 0 &&
                data.phone_number.length > 0 &&
                data.dni.length > 0 &&
                generoSeleccionado.length > 0 &&
                localidadSeleccionada.length > 0 &&
                provinciaSeleccionada.length > 0 &&
                data.profile_image.length > 0 &&
                validMail &&
                politicas === true
            ) {
                setValidate(true)
                const arrayName = data.full_name.split(' ')
                const transformName = arrayName.map((element) =>
                    capitalizeFirstLetter(element)
                )
                const profileImage = data.profile_image.split(',')[1]
                const body = {
                    full_name: transformName.join(" "),
                    email: data.email,
                    password: data.password,
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
                        <div>
                            <Input type={'text'} placeholder={'Nombre y apellido'} defaultValue={''} required={true} width={isScreenWidth600 ? '' : 2} onChange={handleFullName} />
                            {
                                (validate === false && data.full_name.length === 0) && <span className='span-error-registro'>¡Datos incompletos!</span>
                            }
                        </div>

                        <div>
                            <Input type={'email'} placeholder={'Email'} defaultValue={''} required={true} width={isScreenWidth600 ? '' : 2} onChange={handleEmail} />
                            {
                                (validate === false && data.email.length === 0) && <span className='span-error-registro'>¡Datos incompletos!</span>
                            }
                            {
                                validMail === false && <span className='span-error-registro'>¡El email ingresado esta incompleto o incorrecto!</span>
                            }
                        </div>

                        <div>
                            <Input type={'date'} placeholder={'Fecha de nacimiento'} value={data.birthDay} color required={true} onChange={handleBirthDay} />
                            {
                                (validate === false && data.birthDay.length === 0) && <span className='span-error-registro'>¡Datos incompletos!</span>
                            }
                        </div>

                        <div>
                            <Input type={'number'} placeholder={'D.N.I'} required={true} onChange={handleDni} value={data.dni} color={true} />
                            {
                                (validate === false && data.dni.length === 0) && <span className='span-error-registro'>¡Datos incompletos!</span>
                            }
                        </div>

                        <div>
                            <Input type={'number'} placeholder={'Teléfono'} defaultValue={''} value={data.phone_number} required={true} onChange={handlePhoneNumber} />
                            {
                                (validate === false && data.phone_number.length === 0) && <span className='span-error-registro'>¡Datos incompletos!</span>
                            }
                        </div>

                        <div>
                            <Select placeholder={'Género'} opciones={'genero'} />
                            {
                                (validate === false && generoSeleccionado.length === 0) && <span className='span-error-registro'>¡Datos incompletos!</span>
                            }
                        </div>

                        <div>
                            <Select placeholder={'Provincia'} opciones={'provincia'} />
                            {
                                (validate === false && provinciaSeleccionada.length === 0) && <span className='span-error-registro'>¡Datos incompletos!</span>
                            }
                        </div>

                        <div>
                            <Select placeholder={'Localidad'} opciones={'localidad'} />
                            {
                                (validate === false && localidadSeleccionada.length === 0) && <span className='span-error-registro'>¡Datos incompletos!</span>
                            }
                        </div>

                        <div>
                            <Select placeholder={'Ocupación'} opciones={'ocupacion'} />
                            {
                                (validate === false && ocupacionSeleccionada.length === 0) && <span className='span-error-registro'>¡Datos incompletos!</span>
                            }
                        </div>
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

                    {
                        politicas === false && <span className='span-error-registro span-error-registro-politicas'>¡Debe aceptar las políticas de privacidad!</span>
                    }

                    <div className='inputs-seccion-registro'>
                        <Input type={'password'} placeholder={'Contraseña'} defaultValue={''} required={true} onChange={handlePassword} />
                        <Input type={'password'} placeholder={'Repetir contraseña'} defaultValue={''} required={true} onChange={handlePassword2} />
                    </div>

                    <div className='btns1-seccion-registro'>
                        {
                            validPass.passLength === false && <span className='span-error-registro'>¡La contraseña debe tener más de 6 caracteres!</span>
                        }
                        {
                            validPass.passOk === false && <span className='span-error-registro'>¡Las contraseñas no coinciden!</span>
                        }
                        {
                            registerOk === 'no' && <span className='span-error-registro'>{`¡El usuario con el email ${data.email} ya existe!`}</span>
                        }
                        {
                            registerOk === 'si' && <span className='span-ok-registro'>¡Se registró correctamente!</span>
                        }
                        <Boton text={'Registrarse'} type={2} onClick={handleRegister} />
                        <Boton text={'Registrarse con Google'} iconGoogle={true} onClick={() => googleLogin()} />
                    </div>
                </form>
            </div>
            <Link to={'/'} className='volver-registro'><ArrowBackIosNewIcon sx={{ fontSize: '14px' }} /> <p>Página principal</p></Link>
            {
                leerPoliticas &&
                <section className='container-politicas'>
                    <div className={`container-politicas-icon ${isScreenWidth600 && 'container-politicas-icon-mobile'}`}>
                        <CloseIcon sx={{ cursor: 'pointer', fontSize: '30px' }} onClick={() => setLeerPoliticas(false)} />
                    </div>

                    <div className={`container-politicas-div ${isScreenWidth600 && 'container-politicas-div-mobile'}`}>
                        <p>
                            <p className='span-politicas-titulo'>Política de privacidad y de Protección de Datos Personales</p>
                            <hr />
                            <br />
                            Para una mejor experiencia, mientras utiliza nuestro Servicio, le solicitaremos que nos proporcione cierta información de identificación personal. La información que solicitamos será retenida por nosotros y utilizada como se describe en esta política de privacidad.

                            Lea esto minuciosamente

                            Este documento indica cómo lu5am.com utilizará y protegerá sus datos personales. Mientras navega en este sitio web. Usted ha aceptado automáticamente las normas de uso, protección y seguridad aquí mencionadas.

                            Protección y Seguridad de sus Datos Personales

                            La seguridad de los datos personales es prioritario para lu5am.com
                            Este sitio web hará todo lo que esté a su alcance para ofrecer el más alto nivel de seguridad utilizando tecnología avanzada. Adherimos a los requerimientos de la Ley Nacional de Protección de Datos Personales, N° 25.326 y sus normas complementarias.

                            Su privacidad

                            Lu5am.com respeta su privacidad. Toda la información que el lector nos proporcione se tratará con el mayor cuidado y con la mayor seguridad posible, y sólo se utilizará de acuerdo con los límites establecidos en este documento.

                            Cómo se reúne la información

                            Lu5am.com únicamente reúne sus datos personales cuando usted los proporciona en forma directa y con su consentimiento expreso e informado.

                            Cómo lu5am.com utilizará su información

                            La información que nos proporcione será utilizada para: habilitar su participación en promociones, premios o concursos en línea., expandir ofertas de comercialización, para publicar productos y servicios que podrían ser de su interés, para personalizar y mejorar nuestros servicios y para fines estadísticos de este sitio web

                            Al registrarse en el club de oyentes de lu5am.com EL USUARIO deberá brindar información personal, prestando su consentimiento para que la misma sea almacenada directamente en una BASE DE DATOS, encontrándose protegida electrónicamente, utilizando los mecanismos de seguridad informática de protección de la información más completos y eficaces para mantenerla en total confidencialidad, conforme a la Ley Nº 25.326 de Hábeas Data, no obstante lo cual, EL USUARIO puede solicitar la eliminación o modificación de los mismos en el órgano de control de la citada norma, Dirección Nacional de Protección de Datos Personales, dependiente del Ministerio de Justicia, Seguridad y Derechos Humanos Sarmiento 1118, 5to. Piso (CP1041aax); tel. 4383-8510/12/13/15; www.jus.gov.ar/datospersonales/ - infodnpdpa@jus.gov.ar..

                            Lu5am.com se reserva el derecho a modificar la presente política para adaptarla a novedades legislativas o jurisprudenciales así como a prácticas de la industria. En dichos supuestos, anunciará en esta página los cambios introducidos con razonable antelación a su puesta en práctica.

                            Mediante el presente, toda persona que se registra en lu5am.com (en adelante USUARIO) y vuelque información respecto de su nombre, domicilio, sexo, fecha de nacimiento, documento nacional de identidad, ocupación, teléfono, dirección de correo electrónico y/o, presta su consentimiento para que dicha información sea almacenada directamente en una BASE DE DATOS de propiedad de lu5am.com.

                            El Usuario garantiza que los Datos Personales facilitados a lu5am.com son veraces y se hace responsable de comunicar a ésta cualquier modificación en los mismos.

                            Se deja expresamente aclarado que ciertos Servicios prestados por éste sitio u otros sitios vinculados pueden contener Condiciones Particulares con previsiones específicas en materia de protección de Datos Personales.

                            Los Datos Personales serán incorporados a una base de datos que es de titularidad de lu5am.com (la "Base").

                            EL USUARIO presta su consentimiento para que lu5am.com realice operaciones y procedimientos sistemáticos, electrónicos o no, que permitan la recolección, conservación, ordenación, almacenamiento, modificación, evaluación, bloqueo, cesión y en general, el procesamiento de sus DATOS PERSONALES (en adelante TRATAMIENTO DE DATOS PERSONALES).

                            La finalidad de la recogida y tratamiento de los Datos Personales es la que se detalla a continuación:

                            Para habilitar su participación en promociones, premios o concursos en línea.

                            Para el desarrollo de nuevos productos y servicios que satisfagan las necesidades del Usuario
                            .
                            Para contactarse, vía mail o telefónicamente, con el Usuario a fin de relevar opiniones sobre los contenidos de lu5am.com,  la programación de LU5, y de cualquier de los productos digitales relacionados con la emisora.

                            LU5 ha adoptado los niveles de seguridad de protección de los Datos Personales legalmente requeridos, y ha instalado todos los medios y medidas técnicas a su alcance para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los Datos Personales facilitados por el usuario. Ello no obstante, el Usuario debe ser consciente de que las medidas de seguridad en Internet no son inexpugnables. Por tal motivo, debe tener presente que siempre que divulguen voluntariamente información personal online, ésta puede ser recogida y utilizada por otros. Por lo tanto, si bien ponemos nuestro mayor esfuerzo por proteger su información personal, lu5 no será responsable por la difusión de los datos personales de nuestros visitantes efectuada por fuentes ajenas a ésta ni será responsable por los daños y perjuicios que la misma genere.
                            El Usuario tiene reconocidos los derechos de acceso, cancelación, rectificación y oposición, así como tienen reconocido el derecho a ser informados de los permisos de acceso realizados contactándose con lu5 a través del correo electrónico lu5@lu5am.com.ar .

                            El Usuario podrá ejercer su derecho de retiro o bloqueo total o parcial de su nombre en nuestra base de datos, mediante solicitud formal enviada al mail lu5@lu5am.com.ar.
                        </p>
                    </div>
                </section>
            }
        </section>
    );
};

export default Registro;