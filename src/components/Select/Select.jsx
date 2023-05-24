import React, { useEffect, useState } from 'react';
import './select.css'
import { useSelector, useDispatch } from 'react-redux';
import { setProvincia, setGenero, setOcupacion, setLocalidad, setAllLocalidades } from '../../app/silices/registro/registroSlice';

const Select = (props) => {
    const dispatch = useDispatch()
    const dataRegistro = useSelector(state => state.registroSlice)
    const { opciones, placeholder, width, genero, ocupacion, provincia, localidad, color } = props
    const [stylePlaceholder, setStylePlaceholder] = useState(true)

    useEffect(() =>{
        const findProvincia = dataRegistro.provincias.find(prov => prov.toUpperCase() === provincia?.toUpperCase())
        if(findProvincia !== undefined){
            dispatch(setProvincia(provincia))
            dispatch(setAllLocalidades(provincia))
        } 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlerOnChange = (event) => {
        if (opciones === 'genero') dispatch(setGenero(event.target.value))
        if (opciones === 'ocupacion') dispatch(setOcupacion(event.target.value))
        if (opciones === 'localidad') dispatch(setLocalidad(event.target.value))
        if (opciones === 'provincia') {
            if(event.target.value === 'Provincia'){
                dispatch(setProvincia(''))
            } else{
                dispatch(setProvincia(event.target.value))
                dispatch(setAllLocalidades(event.target.value))
            }
        }

        event.target.value === placeholder ? setStylePlaceholder(true) : setStylePlaceholder(false)
    }

    return (
        <select className={`main-input-select width${width} ${(stylePlaceholder && color !== true) && 'placeholder-select'}`} onChange={handlerOnChange}>
            {placeholder && <option>{placeholder}</option>}

            {
                opciones === 'genero' &&
                dataRegistro.generos.map((opcion, index) =>
                    {
                        return (opcion?.toUpperCase() === genero?.toUpperCase() ?
                        <option key={index} selected>{opcion.toUpperCase()}</option>
                        :
                        <option key={index}>{opcion.toUpperCase()}</option>)
                    }
                )
            }

            {
                opciones === 'ocupacion' &&
                dataRegistro.ocupaciones.map((opcion, index) =>
                    {
                        return (opcion?.toUpperCase() === ocupacion?.toUpperCase() ?
                        <option key={index} selected>{opcion.toUpperCase()}</option>
                        :
                        <option key={index}>{opcion.toUpperCase()}</option>)
                    }
                )
            }

            {
                opciones === 'localidad' &&
                dataRegistro.localidades.map((opcion, index) =>
                    {
                        return (opcion?.toUpperCase() === localidad?.toUpperCase() ?
                        <option key={index} selected>{opcion.toUpperCase()}</option>
                        :
                        <option key={index}>{opcion.toUpperCase()}</option>)
                    }
                )
            }

            {
                opciones === 'provincia' &&
                dataRegistro.provincias.map((opcion, index) =>
                    {
                        return (opcion?.toUpperCase() === provincia?.toUpperCase() ?
                        <option key={index} selected>{opcion.toUpperCase()}</option>
                        :
                        <option key={index}>{opcion.toUpperCase()}</option>)
                    }
                )
            }
        </select>
    );
};

export default Select;