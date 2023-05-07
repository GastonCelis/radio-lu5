import React, { useState } from 'react';
import './homeOyente.css'
import TarjetaOyente from '../TarjetasOyente/TarjetaOyente';
import imgConcurso from '../../assets/img-test-concurso.png'
import imgCinemark from '../../assets/img-cinemark.png'

const HomeOyente = () => {
    const [opcion, setOpcion] = useState('concursos')

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
                    <>
                        <TarjetaOyente 
                            tipo={'concursos'} 
                            titulo={'Showcase | Entradas al cine'} 
                            img={imgConcurso} 
                            programaSorteo={'Número 1515'} 
                            finalizacionConcurso={'15/12/2025'}
                            infoModal={'El concurso se realizará el dd/mm/aaaa a las hh/mm durante el programa <programa 1>. Te enviaremos una notificación cuando el concurso haya sido finalizado.'}
                            fechConcurso={'20/03/2023 - 14:00hs'}
                            nombrePrograma={'Programa 1'}
                            parrafo={'Par de entradas para usar de lunes a viernes en cualquier funcion no estreno.'}
                            imgModalConcurso={imgCinemark}
                        />

                        <TarjetaOyente tipo={'concursos'} titulo={'Showcase | Entradas al cine'} img={imgConcurso} programaSorteo={'Número 1515'} finalizacionConcurso={'30/04/2023'} estadoSorteo={'finalizado'}/>
                    </>
                }

                {
                    opcion === 'mis concursos' &&
                    <>
                        <TarjetaOyente tipo={'mis concursos'} titulo={'Showcase | Entradas al cine'} img={imgConcurso} estadoMiSorteo={'pendiente'} fechaParticipacion={'10/04/2023'} codigoParticipacion={'123'} resultadoMiSorteo={'pendiente'}/>
                        <TarjetaOyente 
                            tipo={'mis concursos'} 
                            titulo={'Showcase | Entradas al cine'} 
                            img={imgConcurso} 
                            estadoMiSorteo={'finalizado'} 
                            fechaParticipacion={'05/03/2023'} 
                            codigoParticipacion={'789'} 
                            resultadoMiSorteo={'ganado'}
                            infoModal={'Para retirar tus entradas xxx'}
                            titulo1Modal={'¡Felicidades!'}
                            titulo2Modal={'Ganaste el concurso'}
                            titulo3Modal={'Showcase | Entradas para el cine'}
                        />
                        <TarjetaOyente tipo={'mis concursos'} titulo={'Showcase | Entradas al cine'} img={imgConcurso} estadoMiSorteo={'finalizado'} fechaParticipacion={'05/03/2023'} codigoParticipacion={'987'} resultadoMiSorteo={'perdido'}/>
                    </>
                }

                {
                    opcion === 'beneficios' &&
                    <>
                        <TarjetaOyente tipo={'beneficios'} titulo={'Cinemark | 20% de descuento en entradas'} img={imgConcurso} fechaFinBeneficio={'20/04/2024'} usoBeneficio={'cualquier Cinemark Hoyts del país.'} topeReintegro={'$300'} codigoDescuento={'00123'}/>
                        <TarjetaOyente tipo={'beneficios'} titulo={'Cinemark | 20% de descuento en entradas'} img={imgConcurso} fechaFinBeneficio={'20/04/2024'} usoBeneficio={'cualquier Cinemark Hoyts del país.'} topeReintegro={'$300'} codigoDescuento={'00456'}/>
                        <TarjetaOyente tipo={'beneficios'} titulo={'Cinemark | 20% de descuento en entradas'} img={imgConcurso} fechaFinBeneficio={'20/04/2024'} usoBeneficio={'cualquier Cinemark Hoyts del país.'} topeReintegro={'$300'} codigoDescuento={'00789'}/>
                        <TarjetaOyente tipo={'beneficios'} titulo={'Cinemark | 20% de descuento en entradas'} img={imgConcurso} fechaFinBeneficio={'20/04/2024'} usoBeneficio={'cualquier Cinemark Hoyts del país.'} topeReintegro={'$300'} codigoDescuento={'00987'}/>
                        <TarjetaOyente tipo={'beneficios'} titulo={'Cinemark | 20% de descuento en entradas'} img={imgConcurso} fechaFinBeneficio={'20/04/2024'} usoBeneficio={'cualquier Cinemark Hoyts del país.'} topeReintegro={'$300'} codigoDescuento={'00654'}/>
                    </>
                }
            </div>
        </section>
    );
};

export default HomeOyente;