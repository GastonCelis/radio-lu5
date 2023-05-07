import React from 'react';
import './vistasAdmin.css'
import VistaConcursos from './VistaConcursos/VistaConcursos';
import VistaUsuarios from './VistaUsuarios/VistaUsuarios';
import VistaEstadisticas from './VistaEstadisticas/VistaEstadisticas';

const VistasAdmin = (props) => {
    const { opcion } = props

    return (
        <section>
            {
                opcion === 'concursos' &&
                <VistaConcursos />
            }

            {
                opcion === 'usuarios' &&
                <VistaUsuarios/>
            }

            {
                opcion === 'estadisticas' &&
                <VistaEstadisticas/>
            }

            {/* {
                opcion === 'beneficios' &&
            } */}

        </section>
    );
};

export default VistasAdmin;