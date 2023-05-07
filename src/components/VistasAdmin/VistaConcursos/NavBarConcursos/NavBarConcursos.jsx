import React from 'react';
import './navBarConcursos.css'

const NavBarConcursos = (props) => {
    const { opcion, setOpcion } = props

    return (
        <nav className='container-nav-concursos-admin'>
            <p className={`opciones-nav-admin-concursos ${opcion === 'vigentes' && 'opciones-nav-admin-concursos-select'}`} onClick={() => setOpcion('vigentes')}>Concursos Vigentes</p>
            <p className={`opciones-nav-admin-concursos ${opcion === 'finalizados' && 'opciones-nav-admin-concursos-select'}`} onClick={() => setOpcion('finalizados')}>Concursos Finalizados</p>
            <p className={`opciones-nav-admin-concursos ${opcion === 'ganadores' && 'opciones-nav-admin-concursos-select'}`} onClick={() => setOpcion('ganadores')}>Ganadores</p>
        </nav>
    );
};

export default NavBarConcursos;