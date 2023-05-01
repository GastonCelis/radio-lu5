import React, { useEffect, useState } from 'react';
import './select.css'
import { opcionesCiudades, opcionesGenero, opcionesOcupacion, opcionesProvincia } from '../../utils/constantes';


const Select = (props) => {
    const {opciones, placeholder, width, seleccion} = props
    const [ stylePlaceholder, setStylePlaceholder ] = useState(true)
    const [ valores, setValores ] = useState([])

    useEffect(()=>{
        if(opciones === 'ciudad') setValores(opcionesCiudades)
        if(opciones === 'genero') setValores(opcionesGenero)
        if(opciones === 'ocupacion') setValores(opcionesOcupacion)
        if(opciones === 'provincia') setValores(opcionesProvincia)
    }, [opciones])

    const handlerOnChange = (event)=>{
        event.target.value === placeholder ? setStylePlaceholder(true) : setStylePlaceholder(false)
    }

    return (
        <select className={`main-input-select width${width} ${stylePlaceholder && 'placeholder-select'}`} onChange={handlerOnChange} defaultValue={seleccion}>
            {placeholder && <option>{placeholder}</option>}
            {
                valores.map((opcion, index) =>
                    <option key={index} selected={seleccion === opcion}>{opcion}</option>
                )
            }
        </select>
    );
};

export default Select;