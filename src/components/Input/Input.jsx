import React, { useState, useEffect } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './input.css'

const Input = (props) => {
    const {type, value, defaultValue, placeholder, required, width, onChange, valueInput, color} = props
    const [ icon, setIcon ] = useState(false)
    const [ typePswd, setTypePswd ] = useState('password')
    const [isScreenWidth600, setIsScreenWidth600] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth: width } = window;
            setIsScreenWidth600(width <= 600);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlerIconPswrd = () =>{
        setIcon(!icon)
        setTypePswd(icon ? 'password' : 'text')
    }

    return (
        <div className='input-pswd'>
            <input 
                type={type === 'password' ? typePswd : type} 
                value={value} 
                defaultValue={defaultValue} 
                placeholder={placeholder} 
                className={`main-input width${width} input-date ${(type === 'date' && valueInput === '') && 'input-date-placeholder'} ${(defaultValue === valueInput) && 'defaultValue'} ${color && 'defaultValueNone'} ${(type === 'date' && value !== '') && 'input-date-ok'} ${isScreenWidth600 === true && 'input-date-ok-mobile'}`} 
                onChange={onChange} 
                required={required}
            />
            {
                type === 'date' &&
                <span className={`span-date ${(type === 'date' && value !== '') && 'span-date-none'}`}>{placeholder}</span>
            }
            {
                type === 'password' &&
                <span className='icon-input'>
                    {   
                        icon 
                        ?
                        <RemoveRedEyeIcon sx={{width: '15px'}} onClick={handlerIconPswrd}/>
                        :
                        <VisibilityOffIcon sx={{width: '15px'}} onClick={handlerIconPswrd}/>
                    }
                </span>
            }
        </div>
    );
};

export default Input;