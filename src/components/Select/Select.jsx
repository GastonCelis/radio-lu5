import React, { useEffect, useState } from 'react';
import './select.css'
import { useSelector, useDispatch } from 'react-redux';
import { setProvincia, setGenero, setOcupacion, setLocalidad, setAllLocalidades } from '../../app/silices/registro/registroSlice';

const Select = (props) => {
    const dispatch = useDispatch()
    const dataRegistro = useSelector(state => state.registroSlice)
    const { opciones, placeholder, width, genero, ocupacion, provincia, localidad } = props
    const [stylePlaceholder, setStylePlaceholder] = useState(true)

    useEffect(() =>{
        const findProvincia = dataRegistro.provincias.find(prov => prov === provincia)
        findProvincia !== undefined && dispatch(setProvincia(provincia))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (dataRegistro.provinciaSeleccionada !== '') {
            const provinciaSlect = dataRegistro.provincias.find(provincia => provincia === dataRegistro.provinciaSeleccionada)
            dispatch(setAllLocalidades(provinciaSlect))
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataRegistro.provinciaSeleccionada])

    const handlerOnChange = (event) => {
        if (opciones === 'genero') dispatch(setGenero(event.target.value))
        if (opciones === 'ocupacion') dispatch(setOcupacion(event.target.value))
        if (opciones === 'localidad') dispatch(setLocalidad(event.target.value))
        if (opciones === 'provincia') {
            if(event.target.value === 'Provincia'){
                dispatch(setProvincia(''))
            } else{
                dispatch(setProvincia(event.target.value))
            }
        }

        event.target.value === placeholder ? setStylePlaceholder(true) : setStylePlaceholder(false)
    }

    return (
        <select className={`main-input-select width${width} ${stylePlaceholder && 'placeholder-select'}`} onChange={handlerOnChange}>
            {placeholder && <option>{placeholder}</option>}

            {
                opciones === 'genero' &&
                dataRegistro.generos.map((opcion, index) =>
                    {
                        return (opcion === genero ?
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
                        return (opcion === ocupacion ?
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
                        return (opcion === localidad?.toUpperCase() ?
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
                        return (opcion === provincia ?
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