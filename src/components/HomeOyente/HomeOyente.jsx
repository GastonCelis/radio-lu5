/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import './homeOyente.css'
import TarjetaOyente from '../TarjetasOyente/TarjetaOyente';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const HomeOyente = (props) => {
    const { login } = props
    const [opcion, setOpcion] = useState('concursos')
    const { concursos, concursosOyente } = useSelector(state => state.concursoSlice)
    const { beneficios } = useSelector(state => state.beneficioSlice)

    const sortedConcursos = [...concursos].sort((a, b) => {
        if (a.contestState === 'ENTREGADO' && b.contestState !== 'ENTREGADO') {
            return 1;
        } else if (a.contestState !== 'ENTREGADO' && b.contestState === 'ENTREGADO') {
            return -1;
        } else {
            return 0;
        }
    });

    const handleResultConcurso = (isWinner, contestState) => {
        if (isWinner === false && contestState === 'ENTREGADO') {
            return 'perdido'
        }

        if (isWinner === false && contestState === 'PENDIENTE') {
            return 'pendiente'
        }

        if (isWinner === true && contestState === 'ENTREGADO') {
            return 'ganado'
        }
    }

    return (
        <section className='container-home-oyente'>
            <nav className='nav-home-oyente'>
                <p className={`opcion-nav-home-oyente ${opcion === 'concursos' && 'opcion-nav-home-oyente-selected'}`} onClick={() => setOpcion('concursos')}>Concursos</p>
                <p className={`opcion-nav-home-oyente ${opcion === 'mis concursos' && 'opcion-nav-home-oyente-selected'}`} onClick={() => setOpcion('mis concursos')}>Mis concursos</p>
                <p className={`opcion-nav-home-oyente ${opcion === 'beneficios' && 'opcion-nav-home-oyente-selected'}`} onClick={() => setOpcion('beneficios')}>Beneficios</p>
            </nav>

            <div className='box-home-oyente'>
                {
                    opcion === 'concursos' &&
                    sortedConcursos.map((concurso, index) =>
                        <TarjetaOyente
                            key={index}
                            tipo={'concursos'}
                            titulo={concurso.title}
                            img={`data:image/jpg;base64,${concurso.image}`}
                            programaSorteo={concurso.program}
                            finalizacionConcurso={format(new Date(concurso.endDate), 'dd-MM-yyyy')}
                            infoModal={concurso.aditionalInformation}
                            nombrePrograma={concurso.program}
                            parrafo={concurso.description}
                            imgModalConcurso={`data:image/jpg;base64,${concurso.bannerImage}`}
                            estadoSorteo={concurso.contestState}
                            login={login}
                            idConcurso={concurso.id}
                        />
                    )
                }

                {
                    opcion === 'mis concursos' &&
                    concursosOyente.map((concurso, index) =>
                        <TarjetaOyente
                            key={index}
                            tipo={'mis concursos'}
                            titulo={concurso.title}
                            img={`data:image/jpg;base64,${concurso.image}`}
                            estadoMiSorteo={concurso.contestState}
                            fechaParticipacion={format(new Date(concurso.participateDate), 'dd-MM-yyyy')}
                            resultadoMiSorteo={handleResultConcurso(concurso.isWinner, concurso.contestState)}
                            infoModal={concurso.description}
                        />
                    )
                }

                {
                    opcion === 'beneficios' &&
                    beneficios.map((beneficio, index) =>
                        <TarjetaOyente
                            key={index}
                            tipo={'beneficios'}
                            titulo={beneficio.title}
                            img={`data:image/jpg;base64,${beneficio.image}`}
                            fechaFinBeneficio={format(new Date(beneficio.endDate), 'dd-MM-yyyy')}
                            usoBeneficio={beneficio.benefitUse}
                            codigoDescuento={beneficio.discountCode}
                        />
                    )
                }
            </div>
        </section>
    );
};

export default HomeOyente;