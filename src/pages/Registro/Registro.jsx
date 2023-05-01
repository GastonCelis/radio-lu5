import React from 'react';
import logo from '../../assets/logo.png'
import Boton from '../../components/Boton/Boton';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import './registro.css'

const Registro = () => {
    return (
        <section className='container-registro'>
            <div className='main-registro'>
                <div className='header-registro'>
                    <img src={logo} alt='Logo LU5' className='logo-registro'/>
                    <h1 className='titulo-registro'><span className='span-header-registro'>Club</span> de oyentes</h1>
                </div>

                <h2 className='titulo-seccion-registro'>Registrarse</h2>
                
                <form className='seccion-registro'>
                    <div className='inputs-seccion-registro'>
                        <Input type={'text'} placeholder={'Nombre y apellido'} required={true} width={2}/>
                        <Input type={'email'} placeholder={'Email'} required={true} width={2}/>
                        <Input type={'date'} placeholder={'Fecha de nacimiento'} required={true}/>
                        <Select placeholder={'Género'} opciones={'genero'}/>
                        <Select placeholder={'Ocupación'} opciones={'ocupacion'}/>
                        <Input type={'number'} placeholder={'D.N.I'} required={true}/>
                        <Select placeholder={'Provincia'} opciones={'provincia'}/>
                        <Input type={'text'} placeholder={'Localidad'} required={true}/>
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
        </section>
    );
};

export default Registro;