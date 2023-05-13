import React from 'react';
import './vistaPerfil.css'
import Input from '../../Input/Input'
import Select from '../../Select/Select'
import Boton from '../../Boton/Boton'

const VistaPerfil = () => {
    return (
        <div className='container-perfil-admin'>
            <h2 className='titulo-perfil-edit-administrador'>Perfil administrador</h2>

            <form className='container-box-perfil-admin'>
                <div className='box-inputs-perfil-admin'>
                    <Input type={'text'} placeholder={'Nombre y apellido'} defaultValue={'Admin 1'} valueInput={'Admin 1'} width={1} />
                    <Input type={'email'} placeholder={'Email'} defaultValue={'admin1@test.com'} valueInput={'admin1@test.com'} width={1} />
                    <Input type={'date'} placeholder={'Fecha de nacimiento'} defaultValue={'1990-10-20'} valueInput={'1990-10-20'}/>
                    <Select opciones={'genero'} genero={'Femenino'} />
                    <Select opciones={'ocupacion'} ocupacion={'Ingeniero'} />
                    <Input type={'number'} placeholder={'D.N.I'} defaultValue={'20123456'} valueInput={'20123456'}/>
                    <Select opciones={'provincia'} provincia={'Misiones'} />
                    <Select opciones={'localidad'} localidad={'azara'} />
                </div>

                <p className='texto-perfil-admin'>Modificar contraseña</p>

                <div className='box-inputs-perfil-admin'>
                    <Input type={'password'} placeholder={'Nueva contraseña'} />
                    <Input type={'password'} placeholder={'Confirmar contraseña'} />
                </div>

                <div className='botones-perfil-admin'>
                    <Boton type={2} text={'Confirma cambios'} />
                </div>
            </form>
        </div>
    );
};

export default VistaPerfil;