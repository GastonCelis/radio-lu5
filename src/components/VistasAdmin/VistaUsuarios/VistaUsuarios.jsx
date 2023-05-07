import React from 'react';
import './vistaUsuarios.css'
import TablaConcursos from '../VistaConcursos/TablaConcursos/TablaConcursos';

const usuarios = [
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: '28-04-1992',
        infoColumna4: 'Córdoba'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: '28-04-1992',
        infoColumna4: 'Córdoba'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: '28-04-1992',
        infoColumna4: 'Córdoba'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: '28-04-1992',
        infoColumna4: 'Córdoba'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: '28-04-1992',
        infoColumna4: 'Córdoba'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: '28-04-1992',
        infoColumna4: 'Córdoba'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: '28-04-1992',
        infoColumna4: 'Córdoba'
    },

    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: '28-04-1992',
        infoColumna4: 'Córdoba'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: '28-04-1992',
        infoColumna4: 'Córdoba'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: '28-04-1992',
        infoColumna4: 'Córdoba'
    },

    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: '28-04-1992',
        infoColumna4: 'Córdoba'
    },
]

const VistaUsuarios = () => {
    return (
        <section>
            <h2 className='titulo-vista-usuarios-admin'>Usuarios</h2>

            <TablaConcursos columna1={'Nombre y Apellido'} columna2={'Última actividad'} columna3={'Fecha de nacimiento'} columna4={'Ciudad'} arrayInfo={usuarios}/>
        </section>
    );
};

export default VistaUsuarios;