import React, { useState } from "react";
import "./tarjetaOyente.css";
import Boton from "../Boton/Boton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Modal from "../Modal/Modal";

const TarjetaOyente = (props) => {
    const { estadoSorteo, 
        tipo, 
        programaSorteo, 
        finalizacionConcurso, 
        titulo, 
        img, 
        estadoMiSorteo, 
        fechaParticipacion, 
        codigoParticipacion, 
        resultadoMiSorteo, 
        codigoDescuento, 
        fechaFinBeneficio, 
        usoBeneficio, 
        topeReintegro,
        infoModal,
        fechConcurso,
        nombrePrograma,
        parrafo,
        imgModalConcurso
    } = props
    const [codigo, setCodigo] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openModalConcurso, setOpenModalConcurso] = useState(false)

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);

        setCodigo(true);
        setTimeout(() => {
            setCodigo(false);
        }, 1000);
    };

    const handlerModalConcurso = () =>{
        setOpenModalConcurso(false)
        setOpenModal(true)
    }

    return (
        <>
            {tipo === "concursos" && (
                <div className="container-tarjeta-oyente">
                    <img src={img} alt="Concursos" className="img-tarjeta-oyente" />

                    <div className="box-tarjeta-oyente">
                        <h2 className="titulo-tarjeta-oyente">{titulo}</h2>

                        <div className="box-texto-tarjeta-oyente">
                            <div>
                                <p className="texto-tarjeta-oyente">Programa: {programaSorteo}</p>
                                <p className="texto-tarjeta-oyente">Finalización: {finalizacionConcurso}</p>
                            </div>

                            {estadoSorteo === "finalizado" ? (
                                <Boton text={"Sorteo finalizado"} type={3} />
                            ) : (
                                <Boton text={"Inscribirse"} type={2} onClick={() => setOpenModal(true)}/>
                            )}
                        </div>

                        <p className="ver-mas-tarjeta" onClick={() => setOpenModalConcurso(true)}>+ Ver más</p>
                    </div>
                    {
                        openModal &&
                        <Modal setOpenModal={setOpenModal} info={infoModal} titulo={titulo} iconOk={true}/>
                    }
                    {
                        openModalConcurso &&
                        <Modal setOpenModalConcurso={setOpenModalConcurso} onClick={handlerModalConcurso} titulo={titulo} concurso={true} fechConcurso={fechConcurso} nombrePrograma={nombrePrograma} parrafo={parrafo} imgConcurso={imgModalConcurso}/>
                    }
                </div>
            )}

            {tipo === "mis concursos" && (
                <div className="container-tarjeta-oyente">
                    <img src={img} alt="Mis concursos" className="img-tarjeta-oyente" />

                    <div className="box-tarjeta-oyente">
                        <h2 className="titulo-tarjeta-oyente">{titulo}</h2>

                        <div className="box-texto-tarjeta-oyente">
                            <div>
                                <p className="texto-tarjeta-oyente">Estado del sorteo: {estadoMiSorteo}</p>
                                <p className="texto-tarjeta-oyente">Participaste el: {fechaParticipacion}</p>
                                <p className="texto-tarjeta-oyente">Código de participación: {codigoParticipacion}</p>
                            </div>

                            {
                                resultadoMiSorteo === 'pendiente' &&
                                <>
                                    <div>
                                        <h2 className="info-tarjeta-oyente">Ten paciencia</h2>
                                        <h2 className="info-tarjeta-oyente">¡Todavía no sorteamos!</h2>
                                    </div>
                                </>
                            }

                            {
                                resultadoMiSorteo === 'ganado' &&
                                <>
                                    <div>
                                        <h2 className="info-tarjeta-oyente">¡Felicitaciones, ganaste!</h2>
                                        <p className="retiro-premio-tarjeta" onClick={() => setOpenModal(true)}>¿Cómo retiro mi premio?</p>
                                    </div>
                                </>
                            }

                            {
                                resultadoMiSorteo === 'perdido' &&
                                <>
                                    <div>
                                        <h2 className="info-tarjeta-oyente">¡Sigue intentando!</h2>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    {
                        openModal &&
                        <Modal setOpenModal={setOpenModal} info={infoModal} titulo={titulo} ganado={true}/>
                    }
                </div>
            )}

            {tipo === "beneficios" && (
                <div className="container-tarjeta-oyente">
                    <img src={img} alt="Mis concursos" className="img-tarjeta-oyente" />

                    <div className="box-tarjeta-oyente">
                        <h2 className="titulo-tarjeta-oyente">{titulo}</h2>

                        <div className="box-texto-tarjeta-oyente">
                            <div>
                                <p className="texto-tarjeta-oyente">Válido hasta el: {fechaFinBeneficio}</p>
                                <p className="texto-tarjeta-oyente">Para ser usado en {usoBeneficio}</p>
                                <p className="texto-tarjeta-oyente">Tope de reintegro: {topeReintegro}</p>
                            </div>

                            <div>
                                <h2 className="info-tarjeta-oyente">Código de descuento</h2>
                                {
                                    codigo ?
                                        <p className="info-descuento-tarjeta-oyente">¡Código copiado!</p>
                                        :
                                        <p className="info-descuento-tarjeta-oyente" onClick={() => handleCopy(codigoDescuento)}>{codigoDescuento} <ContentCopyIcon sx={{ fontSize: '12px' }} /></p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TarjetaOyente;
