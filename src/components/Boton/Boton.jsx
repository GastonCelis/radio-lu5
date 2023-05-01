import React from 'react';
import { Link } from "react-router-dom";
import logoGoogle from '../../assets/icon-google.png'
import './boton.css'

const Boton = (props) => {
    const {text, type, iconGoogle, path} = props

    const handlerStyles = () =>{
        if(type === 2) return 'red-boton'
        if(type === 3) return 'gray-boton'
        return 'main-boton'
    }

    return (
        <Link to={path} className={handlerStyles()}>
            {iconGoogle && <img src={logoGoogle} alt='Google Icon' className='icon-google'/>}
            {text}
        </Link>
    );
};

export default Boton;