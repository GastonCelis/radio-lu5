import React, { useEffect, useState } from 'react';
import './admin.css'
import NavBarAdmin from '../../components/NavBarAdmin/NavBarAdmin';
import VistasAdmin from '../../components/VistasAdmin/VistasAdmin';

const Admin = () => {
    const [opcion, setOpcion] = useState('concursos')

    return (
        <main className='container-admin'>
            <section className='box-section-nav-admin'>
                <NavBarAdmin opcion={opcion} setOpcion={setOpcion}/>
            </section>

            <section className='box-section-vistas-admin'>
                <VistasAdmin opcion={opcion}/>
            </section>
        </main>
    );
};

export default Admin;