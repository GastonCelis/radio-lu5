/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './vistaBeneficios.css'
import Beneficio from '../../Beneficio/Beneficio';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AgregarBeneficio from '../../AgregarBeneficio/AgregarBeneficio';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBeneficiosAsync } from '../../../app/silices/beneficio/beneficioThunk';
import { setStatusMessageBenefit } from '../../../app/silices/beneficio/beneficioSlice';
import { format } from 'date-fns';

const VistaBeneficios = (props) => {
    const { login } = props
    const [agregar, setAgregar] = useState(false)
    const dispatch = useDispatch()
    const { beneficios, nuevoBeneficio, statusMessageBenefit } = useSelector(state => state.beneficioSlice)

    useEffect(() => {
        dispatch(getAllBeneficiosAsync({ token: login.token }))
    }, [])

    useEffect(() => {
        if (statusMessageBenefit === 'fulfilledPostConcurso' || statusMessageBenefit === 'fulfilledPatchWinner') {
            setTimeout(() => {
                dispatch(getAllBeneficiosAsync({ token: login.token }))
                dispatch(setStatusMessageBenefit(''))
            }, 2500);
        }
    }, [statusMessageBenefit])

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
                        beneficios.map((beneficio, index) =>
                            <Beneficio 
                                key={index} 
                                img={`data:image/jpg;base64,${beneficio.image}`} 
                                titulo={beneficio.title} 
                                codigoDescuento={beneficio.discountCode} 
                                fechaFinalizacion={format(new Date(beneficio.endDate), 'dd-MM-yyyy')} 
                                info={beneficio.benefitUse} 
                                login={login}
                                idBeneficio={beneficio.id}
                            />
                        )
                    }
                </>
            }

            {
                agregar &&
                <AgregarBeneficio setAgregar={setAgregar} nuevoBeneficio={nuevoBeneficio} statusMessageBenefit={statusMessageBenefit} login={login}/>
            }
        </section>
    )
};

export default VistaBeneficios;