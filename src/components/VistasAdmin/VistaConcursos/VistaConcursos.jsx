import React, { useState } from 'react';
import './vistaConcursos.css'
import NavBarConcursos from './NavBarConcursos/NavBarConcursos';
import TablaConcursos from './TablaConcursos/TablaConcursos';

const finalizados = [
    {
        infoColumna1: 'Concurso Nombre',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: 'Anunciante Nombre',
        infoColumna4: 'Ganador Nombre'
    },
    {
        infoColumna1: 'Concurso Nombre',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: 'Anunciante Nombre',
        infoColumna4: 'Ganador Nombre'
    },
    {
        infoColumna1: 'Concurso Nombre',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: 'Anunciante Nombre',
        infoColumna4: 'Ganador Nombre'
    },
    {
        infoColumna1: 'Concurso Nombre',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: 'Anunciante Nombre',
        infoColumna4: 'Ganador Nombre'
    },
    {
        infoColumna1: 'Concurso Nombre',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: 'Anunciante Nombre',
        infoColumna4: 'Ganador Nombre'
    },
    {
        infoColumna1: 'Concurso Nombre',
        infoColumna2: '18-04-2024 23:59hs',
        infoColumna3: 'Anunciante Nombre',
        infoColumna4: 'Ganador Nombre'
    }
]

const ganadores = [
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: 'Concurso Nombre',
        infoColumna3: '18-04-2024 23:59hs',
        infoColumna4: 'Pendiente'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: 'Concurso Nombre',
        infoColumna3: '18-04-2024 23:59hs',
        infoColumna4: 'Entregado'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: 'Concurso Nombre',
        infoColumna3: '18-04-2024 23:59hs',
        infoColumna4: 'Cancelado'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: 'Concurso Nombre',
        infoColumna3: '18-04-2024 23:59hs',
        infoColumna4: 'Pendiente'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: 'Concurso Nombre',
        infoColumna3: '18-04-2024 23:59hs',
        infoColumna4: 'Entregado'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: 'Concurso Nombre',
        infoColumna3: '18-04-2024 23:59hs',
        infoColumna4: 'Cancelado'
    },
    {
        infoColumna1: 'Nombre Apellido',
        infoColumna2: 'Concurso Nombre',
        infoColumna3: '18-04-2024 23:59hs',
        infoColumna4: 'Pendiente'
    }
]

const VistaConcursos = () => {
    const [opcionNav, setOpcionNav] = useState('vigentes')

    const handlerTitulo = () => {
        if (opcionNav === 'vigentes') return 'Concursos vigentes'
        if (opcionNav === 'finalizados') return 'Concursos finalizados'
        if (opcionNav === 'ganadores') return 'Ganadores'
    }

    return (
        <section>
            <NavBarConcursos opcion={opcionNav} setOpcion={setOpcionNav} />

            <h2 className='titulo-vista-concursos-admin'>{handlerTitulo()}</h2>

            {
                opcionNav === 'finalizados' &&
                <TablaConcursos columna1={'Título'} columna2={'Finalización'} columna3={'Anunciante'} columna4={'Ganador'} arrayInfo={finalizados} />
            }

            {
                opcionNav === 'ganadores' &&
                <TablaConcursos columna1={'Nombre y Apellido'} columna2={'Título'} columna3={'Finalización'} columna4={'Estado'} arrayInfo={ganadores} />
            }

        </section>
    );
};

export default VistaConcursos;