import React, { useState } from 'react';
import './vistaBeneficios.css'
import Beneficio from '../../Beneficio/Beneficio';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AgregarBeneficio from '../../AgregarBeneficio/AgregarBeneficio';
import imagen from '../../../assets/img-test-concurso.png'


const beneficios = [
    {
        img: imagen,
        titulo: 'Beneficio 1',
        codigoDescuento: '#1234',
        fechaFinalizacion: '15/04/2025 23:59hs',
        info: 'Info benficio número 1 cordigo #1234'
    },
    {
        img: imagen,
        titulo: 'Beneficio 2',
        codigoDescuento: '#1234',
        fechaFinalizacion: '15/04/2025 23:59hs',
        info: 'Info benficio número 2 cordigo #1234'
    },
    {
        img: imagen,
        titulo: 'Beneficio 3',
        codigoDescuento: '#1234',
        fechaFinalizacion: '15/04/2025 23:59hs',
        info: 'Info benficio número 3 cordigo #1234'
    },
    {
        img: imagen,
        titulo: 'Beneficio 4',
        codigoDescuento: '#1234',
        fechaFinalizacion: '15/04/2025 23:59hs',
        info: 'Info benficio número 4 cordigo #1234'
    },
    {
        img: imagen,
        titulo: 'Beneficio 5',
        codigoDescuento: '#1234',
        fechaFinalizacion: '15/04/2025 23:59hs',
        info: 'Info benficio número 5 cordigo #1234'
    }
]

const VistaBeneficios = (props) => {
    const [agregar, setAgregar] = useState(false)

    return (
        <section>
            <h2 className='titulo-vista-beneficios-admin'>Beneficios</h2>

            {
                !agregar &&
                <>
                    <div className='boton-agregar-concurso-admin'>
                        <button onClick={() => setAgregar(true)}>
                            <AddBoxIcon />
                            Agregar Beneficio
                        </button>
                    </div>

                    {
                        beneficios.map(beneficio =>
                            <Beneficio img={beneficio.img} titulo={beneficio.titulo} codigoDescuento={beneficio.codigoDescuento} fechaFinalizacion={beneficio.fechaFinalizacion} info={beneficio.info} />
                        )
                    }
                </>
            }

            {
                agregar &&
                <AgregarBeneficio setAgregar={setAgregar}/>
            }
        </section>
    )
};

export default VistaBeneficios;