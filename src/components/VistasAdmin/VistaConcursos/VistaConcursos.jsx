import React, { useState } from 'react';
import './vistaConcursos.css'
import NavBarConcursos from './NavBarConcursos/NavBarConcursos';
import TablaConcursos from './TablaConcursos/TablaConcursos';
import Concurso from '../../Concurso/Concurso';
import img from '../../../assets/img-test-concurso.png'
import imgBanner from '../../../assets/img-cinemark.png'
import AddBoxIcon from '@mui/icons-material/AddBox';
import AgregarConcurso from '../../AgregarConcurso/AgregarConcurso';

const vigentes = [
    {
        titulo: 'Concurso 1',
        programa: "Programa 1",
        anunciante: "Anunciante 1",
        fechaFinalizacion: "18/04/2024 23:59hs",
        info: "Concurso X de entradas al cine.",
        img: img,
        imgBanner: imgBanner,
    },
    {
        titulo: 'Concurso 2',
        programa: "Programa 2",
        anunciante: "Anunciante 2",
        fechaFinalizacion: "18/04/2024 23:59hs",
        info: "Concurso X de entradas al cine.",
        img: img,
        imgBanner: imgBanner,
    },
    {
        titulo: 'Concurso 3',
        programa: "Programa 3",
        anunciante: "Anunciante 3",
        fechaFinalizacion: "18/04/2024 23:59hs",
        info: "Concurso X de entradas al cine.",
        img: img,
        imgBanner: imgBanner,
    },
    {
        titulo: 'Concurso 4',
        programa: "Programa 4",
        anunciante: "Anunciante 4",
        fechaFinalizacion: "18/04/2024 23:59hs",
        info: "Concurso X de entradas al cine.",
        img: img,
        imgBanner: imgBanner,
    },
    {
        titulo: 'Concurso 5',
        programa: "Programa 5",
        anunciante: "Anunciante 5",
        fechaFinalizacion: "18/04/2024 23:59hs",
        info: "Concurso X de entradas al cine.",
        img: img,
        imgBanner: imgBanner,
    },
    {
        titulo: 'Concurso 6',
        programa: "Programa 6",
        anunciante: "Anunciante 6",
        fechaFinalizacion: "18/04/2024 23:59hs",
        info: "Concurso X de entradas al cine.",
        img: img,
        imgBanner: imgBanner,
    },
]

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
    const [agregar, setAgregar] = useState(false)

    const handlerTitulo = () => {
        if (opcionNav === 'vigentes' || opcionNav === 'agregar') return 'Concursos vigentes'
        if (opcionNav === 'finalizados') return 'Concursos finalizados'
        if (opcionNav === 'ganadores') return 'Ganadores'
    }

    return (
        <section>
            <NavBarConcursos opcion={opcionNav} setOpcion={setOpcionNav} />

            <h2 className='titulo-vista-concursos-admin'>{handlerTitulo()}</h2>

            {
                (opcionNav === 'vigentes' && agregar === false) &&
                <>
                    <div className='boton-agregar-concurso-admin'>
                        <button onClick={() => setAgregar(true)}>
                            <AddBoxIcon />
                            Agregar Concurso
                        </button>
                    </div>

                    {
                        vigentes.map((concurso, index) =>
                            <Concurso key={index} img={concurso.img} titulo={concurso.titulo} programa={concurso.programa} fechaFinalizacion={concurso.fechaFinalizacion} info={concurso.info} anunciante={concurso.anunciante} imgBanner={concurso.imgBanner} tipo={'concurso'} />
                        )
                    }
                </>
            }

            {
                (opcionNav === 'vigentes' && agregar === true) &&
                <AgregarConcurso setAgregar={setAgregar}/>
            }

            {
                opcionNav === 'finalizados' &&
                <TablaConcursos columna1={'Título'} columna2={'Finalización'} columna3={'Anunciante'} columna4={'Ganador'} arrayInfo={finalizados} infoColumna4None={true} />
            }

            {
                opcionNav === 'ganadores' &&
                <TablaConcursos columna1={'Nombre y Apellido'} columna2={'Título'} columna3={'Finalización'} columna4={'Estado'} arrayInfo={ganadores} infoColumna4None={false} />
            }
        </section>
    );
};

export default VistaConcursos;