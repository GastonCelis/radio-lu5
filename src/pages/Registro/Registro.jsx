import React, { useState, useEffect} from 'react';
import logo from '../../assets/logo-lu5.svg'
import Boton from '../../components/Boton/Boton';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import './registro.css'
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Registro = () => {
    const [isScreenWidth600, setIsScreenWidth600] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth: width } = window;
            setIsScreenWidth600(width <= 600);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className='container-registro'>
            <div className='main-registro'>
                <div className='header-registro'>
                    <img src={logo} alt='Logo LU5' className='logo-registro'/>
                </div>

                <h2 className='titulo-seccion-registro'>Registrarse</h2>
                
                <form className='seccion-registro'>
                    <div className='inputs-seccion-registro'>
                        <Input type={'text'} placeholder={'Nombre y apellido'} required={true} width={isScreenWidth600 ? '' : 2}/>
                        <Input type={'email'} placeholder={'Email'} required={true} width={isScreenWidth600 ? '' : 2}/>
                        <Input type={'date'} placeholder={'Fecha de nacimiento'} required={true}/>
                        <Select placeholder={'Género'} opciones={'genero'}/>
                        <Select placeholder={'Ocupación'} opciones={'ocupacion'}/>
                        <Input type={'number'} placeholder={'D.N.I'} required={true}/>
                        <Select placeholder={'Provincia'} opciones={'provincia'}/>
                        <Select placeholder={'Localidad'} opciones={'localidad'}/>
                    </div>

                    <div className='link-politicas-container'>
                        <input name='politicas' id='politicas' type='checkbox' className='checkbox-politicas'></input>
                        <label id='politicas' className='link-politicas'>
                            Acepto las políticas de privacidad
                        </label>
                    </div>

                    <div className='inputs-seccion-registro'>
                        <Input type={'password'} placeholder={'Contraseña'} required={true}/>
                        <Input type={'password'} placeholder={'Repetir contraseña'} required={true}/>
                    </div>

                    <div className='btns1-seccion-registro'>
                        <Boton text={'Registrarse'} type={2}/>
                        <Boton text={'Registrarse con Google'} iconGoogle={true}/>
                    </div>
                </form>
            </div>
            <Link to={'/'} className='volver-registro'><ArrowBackIosNewIcon sx={{fontSize: '14px'}}/> <p>Volver</p></Link>
        </section>
    );
};

export default Registro;