import React from 'react';
import './navBarAdmin.css'
import logo from '../../assets/logo-lu5.svg'
import avatar from '../../assets/foto-perfil.jpg'
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const NavBarAdmin = (props) => {
    const { opcion, setOpcion } = props

    return (
        <nav className='container-nav-admin'>
            <img src={logo} alt='Logo LU5' className='img-logo-nav-admin' />

            <section className="box1-nav-oyente">
                <img src={avatar} alt="Oyente" className="img-nav-oyente" />

                <div className="hola-nav-oyente">
                    <h2>Hola Admin 1!</h2>

                    <p className={`edit-foto-nav ${opcion === 'perfil' && "edit-foto-nav-select"}`} onClick={() => setOpcion('perfil')}>
                        <EditIcon sx={{ fontSize: '12px' }} />
                        Modificar mis datos
                    </p>
                </div>
            </section>

            <section>
                <p className={`opciones-nav-admin opciones-nav-admin1 ${opcion === 'concursos' && 'opciones-nav-admin-select'}`} onClick={() => setOpcion('concursos')}>Concursos</p>
                <p className={`opciones-nav-admin ${opcion === 'usuarios' && 'opciones-nav-admin-select'}`} onClick={() => setOpcion('usuarios')}>Usuarios</p>
                <p className={`opciones-nav-admin ${opcion === 'estadisticas' && 'opciones-nav-admin-select'}`} onClick={() => setOpcion('estadisticas')}>Estadísticas</p>
                <p className={`opciones-nav-admin ${opcion === 'beneficios' && 'opciones-nav-admin-select'}`} onClick={() => setOpcion('beneficios')}>Beneficios</p>
            </section>

            <Link to={'/'} className="opcion-nav-admin">
                <LogoutIcon sx={{ fontSize: '18px' }} />
                Cerrar sesión
            </Link>
        </nav>
    );
};

export default NavBarAdmin;