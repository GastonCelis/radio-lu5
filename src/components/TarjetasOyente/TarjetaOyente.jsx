import React, { useState, useEffect } from "react";
import "./tarjetaOyente.css";
import Boton from "../Boton/Boton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Modal from "../Modal/Modal";
import { postParticipanteConcursoAsync } from "../../app/silices/concurso/concursoThunk";
import { useDispatch } from "react-redux";

const TarjetaOyente = (props) => {
    const { estadoSorteo, 
        tipo, 
        programaSorteo, 
        finalizacionConcurso, 
        titulo, 
        img, 
        estadoMiSorteo, 
        fechaParticipacion, 
        resultadoMiSorteo, 
        codigoDescuento, 
        fechaFinBeneficio, 
        usoBeneficio, 
        infoModal,
        nombrePrograma,
        parrafo,
        imgModalConcurso,
        login,
        idConcurso,
        statusMessage
    } = props
    const [codigo, setCodigo] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openModalConcurso, setOpenModalConcurso] = useState(false)
    const [isScreenWidth600, setIsScreenWidth600] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth: width } = window;
            setIsScreenWidth600(width <= 600);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(()=>{
        if(statusMessage === 'fulfilledParticipanteConcurso'){
            setOpenModal(true)

            setTimeout(() => {
                setOpenModal(false)
                setOpenModalConcurso(false)
            }, 2500);
        }
    }, [statusMessage])

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);

        setCodigo(true);
        setTimeout(() => {
            setCodigo(false);
        }, 1000);
    };

    const handleInscription = () =>{
        const body = {
            member_id: login.id,
            contest_id: idConcurso,
        }
        dispatch(postParticipanteConcursoAsync({body, token: login.token}))
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

                            {estadoSorteo === "FINALIZADO" || estadoSorteo === 'ENTREGADO' ? (
                                <Boton text={"Sorteo finalizado"} type={3} hidden={isScreenWidth600}/>
                            ) : (
                                <Boton text={"Inscribirse"} type={2} onClick={handleInscription} hidden={isScreenWidth600}/>
                            )}
                        </div>
                        
                        <div className="mobile-botones-tarjetas">
                            <p className="ver-mas-tarjeta" onClick={() => setOpenModalConcurso(true)}>+ Ver más</p>
                            {estadoSorteo === "FINALIZADO" || estadoSorteo === 'ENTREGADO' ? (
                                <Boton text={"Sorteo finalizado"} type={5} hidden={!isScreenWidth600 && true}/>
                            ) : (
                                <Boton text={"Inscribirse"} type={4} onClick={handleInscription} hidden={!isScreenWidth600 && true}/>
                            )}
                        </div>
                    </div>
                    {
                        openModal &&
                        <Modal setOpenModal={setOpenModal} info={infoModal} titulo={titulo} iconOk={true}/>
                    }
                    {
                        openModalConcurso &&
                        <Modal setOpenModalConcurso={setOpenModalConcurso} onClick={handleInscription} titulo={titulo} concurso={true} fechConcurso={finalizacionConcurso} nombrePrograma={nombrePrograma} parrafo={parrafo} imgConcurso={imgModalConcurso}/>
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

                    <div className="box-tarjeta-oyente box-tarjeta-oyente-mobile">
                        <h2 className="titulo-tarjeta-oyente">{titulo}</h2>

                        <div className="box-texto-tarjeta-oyente box-tarjeta-oyente-mobile">
                            <div>
                                <p className="texto-tarjeta-oyente">Válido hasta el: {fechaFinBeneficio}</p>
                                <p className="texto-tarjeta-oyente">Para ser usado en {usoBeneficio}</p>
                            </div>

                            <div className="codigo-descuento-mobile">
                                <h2 className="info-tarjeta-oyente info-tarjeta-oyente-mobile">Código de descuento</h2>
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