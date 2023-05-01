import React from 'react';
import './modal.css'
import CloseIcon from '@mui/icons-material/Close';

const Modal = (props) => {
    const { tipo, setOpenModal } = props

    return (
        <section className='container-modal'>
            <div className='box-modal'>
                <CloseIcon sx={{textAlign: 'end'}}/>

                <div>
                    {
                        tipo
                    }
                </div>
            </div>
        </section>
    );
};

export default Modal;