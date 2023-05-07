import React from "react";
import "./modal.css";
import CloseIcon from "@mui/icons-material/Close";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Boton from "../Boton/Boton";

const Modal = (props) => {
    const { titulo, info, setOpenModal, setOpenModalConcurso, iconOk, concurso, onClick, fechConcurso, nombrePrograma, parrafo, imgConcurso, ganado, cambios } = props;

    return (
        <section className="container-modal">
            {
                concurso ?
                    <div className="box-modal-concurso">
                        <div className="box-close-modal">
                            <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => setOpenModalConcurso(false)} />
                        </div>

                        <div className="box-info-modal-concurso">
                            {titulo && <h2>{titulo}</h2>}

                            <div>
                                <p>{fechConcurso}</p>
                                <p>{nombrePrograma}</p>
                            </div>

                            <p>{parrafo}</p>

                            <img src={imgConcurso} alt="Concurso" className="img-modal-concurso" />

                            <Boton text={"Inscribirse"} type={2} onClick={onClick} />
                        </div>
                    </div>
                    :
                    <div className="box-modal">
                        <div className="box-close-modal">
                            <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => setOpenModal(false)} />
                        </div>

                        {
                            cambios ?
                            <div className="box-info-modal">
                                <div className="box-titulos-modal">
                                    <div>
                                        <h2 className="h2-info-modal">¡Tus cambios han sido</h2>
                                        <h2 className="h2-info-modal">guardados con éxito!</h2>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="box-info-modal">
                                <div className="box-titulos-modal">
                                    <div>
                                        {ganado && <h2 className="h2-info-modal">¡Felicidades!</h2>}
                                        <h2 className="h2-info-modal">{ganado ? 'Ganaste el concurso' : 'Tu inscripción al concurso'}</h2>
                                        <h2 className="h2-info-modal">{titulo}</h2>
                                        {!ganado && <h2 className="h2-info-modal">ha sido exitosa</h2>}
                                    </div>

                                    {iconOk && <TaskAltIcon sx={{ color: '#db0d15' }} />}
                                </div>

                                {info && <p className="p-info-modal">{info}</p>}
                            </div>
                        }
                    </div>
            }
        </section>
    );
};

export default Modal;
