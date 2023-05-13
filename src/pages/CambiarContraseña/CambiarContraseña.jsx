import React from 'react';
import './cambiarContraseña.css'
import Input from '../../components/Input/Input'
import Boton from '../../components/Boton/Boton'

const CambiarContraseña = () => {
    return (
        <section className='container-cambiar-clave'>
            <h2>Cambio de contraseña</h2>

            <div className='box-input-cambiar-clave'>
                <Input type={'password'} placeholder={'Nueva contraseña'} />
                <Input type={'password'} placeholder={'Confirmar contraseña'} />
            </div>

            <Boton type={2} text={'Confirma cambios'} />
        </section>
    );
};

export default CambiarContraseña;