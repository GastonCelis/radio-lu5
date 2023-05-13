import React from 'react';
import './vistasAdmin.css'
import VistaConcursos from './VistaConcursos/VistaConcursos';
import VistaUsuarios from './VistaUsuarios/VistaUsuarios';
import VistaEstadisticas from './VistaEstadisticas/VistaEstadisticas';
import VistaPerfil from './VistaPerfil/VistaPerfil';
import VistaBeneficios from './VistaBeneficios/VistaBeneficios';

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

            {
                opcion === 'beneficios' &&
                <VistaBeneficios/>
            }

            {
                opcion === 'perfil' &&
                <VistaPerfil/>
            }

        </section>
    );
};

export default VistasAdmin;