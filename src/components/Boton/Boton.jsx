import React from 'react';
import { Link } from "react-router-dom";
import logoGoogle from '../../assets/icon-google.png'
import './boton.css'

const Boton = (props) => {
    const {text, type, iconGoogle, path, onClick, hidden} = props

    const handlerStyles = () =>{
        if(hidden === true) return 'hidden'
        if(type === 2) return 'red-boton'
        if(type === 3) return 'gray-boton'
        if(type === 4) return 'mobile-boton-red'
        if(type === 5) return 'mobile-boton-gray'
        return 'main-boton'
    }

    return (
        <Link to={path} className={handlerStyles()} onClick={onClick}>
            {iconGoogle && <img src={logoGoogle} alt='Google Icon' className='icon-google'/>}
            {text}
        </Link>
    );
};

export default Boton;