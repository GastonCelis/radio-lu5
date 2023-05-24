/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './vistasAdmin.css'
import VistaConcursos from './VistaConcursos/VistaConcursos';
import VistaUsuarios from './VistaUsuarios/VistaUsuarios';
import VistaEstadisticas from './VistaEstadisticas/VistaEstadisticas';
import VistaPerfil from './VistaPerfil/VistaPerfil';
import VistaBeneficios from './VistaBeneficios/VistaBeneficios';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsersAsync } from '../../app/silices/usuarios/usuarioThunk';

const VistasAdmin = (props) => {
    const { opcion } = props
    const login = useSelector(state => state.loginSlice)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllUsersAsync({token: login.token}))
    }, [])

    return (
        <section>
            {
                opcion === 'concursos' &&
                <VistaConcursos login={login}/>
            }

            {
                opcion === 'usuarios' &&
                <VistaUsuarios/>
            }

            {
                opcion === 'estadisticas' &&
                <VistaEstadisticas login={login}/>
            }

            {
                opcion === 'beneficios' &&
                <VistaBeneficios login={login}/>
            }

            {
                opcion === 'perfil' &&
                <VistaPerfil/>
            }

        </section>
    );
};

export default VistasAdmin;