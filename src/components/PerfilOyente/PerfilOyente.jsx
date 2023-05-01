import React from 'react';
import './perfilOyente.css'
import Input from '../Input/Input';
import Select from '../Select/Select';
import Boton from '../Boton/Boton'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const PerfilOyente = (props) => {
    const {setPerfil} = props

    return (
        <div className='container-perfil-oyente'>
            <form>
                <div className='box-inputs-perfil-oyente'>
                    <Input type={'text'} placeholder={'Nombre y apellido'} defaultValue={'Oyente 1'} width={2}/>
                    <Input type={'email'} placeholder={'Email'} defaultValue={'oyente1@test.com'} width={2}/>
                    <Input type={'date'} placeholder={'Fecha de nacimiento'} defaultValue={'1990-10-20'}/>
                    <Select opciones={'genero'} seleccion={'Masculino'}/>
                    <Select opciones={'ocupacion'} seleccion={'Docente'}/>
                    <Input type={'number'} placeholder={'D.N.I'} defaultValue={'20123456'}/>
                    <Select opciones={'provincia'} seleccion={'Neuquén'}/>
                    <Select opciones={'ciudad'} seleccion={'Villa La Angostura'}/>
                </div>
                
                <p className='texto-perfil-oyente'>Modificar contraseña</p>

                <div className='box-inputs-perfil-oyente'>
                    <Input type={'password'} placeholder={'Nueva contraseña'}/>
                    <Input type={'password'} placeholder={'Confirmar contraseña'}/>
                </div>

                <div className='botones-perfil-oyente'>
                    <Boton type={2} text={'Confirma cambios'}/>
                    <div className='box-volver-perfil' onClick={() => setPerfil(false)}>
                        <NavigateBeforeIcon sx={{fontSize: '17px'}}/>
                        <p className='texto-volver-perfil'>
                            Volver a la página principal
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PerfilOyente;