import React from 'react';
import './navBarAdmin.css'
import logo from '../../assets/logo-lu5.svg'
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import useCustomGoogleLogin from '../../hooks/useGoogleLogin';
import { setRefreshState } from '../../app/silices/login/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { redirectToNewPage } from '../../utils/functions';
import { setRefreshStateGoogle } from '../../app/silices/usuarios/usuarioGoogleSlice';
import { setProfileuUsuario, setRefreshStateUser } from '../../app/silices/usuarios/usuarioSlice';

const NavBarAdmin = (props) => {
    const { opcion, setOpcion } = props
    const { googleLogOut } = useCustomGoogleLogin()
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.usuarioSlice)

    const hanlderChangeImage = (event)=>{
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
        const base64String = reader.result;
        const data64Imagen = base64String.split(',')
        dispatch(setProfileuUsuario({profileImage: data64Imagen[1]}))
        };

        reader.readAsDataURL(file);
    }

    const handleLogout = () => {
        googleLogOut()
        dispatch(setRefreshState())
        dispatch(setRefreshStateGoogle())
        dispatch(setRefreshStateUser())
        redirectToNewPage('/')
    }

    return (
        <nav className='container-nav-admin'>
            <img src={logo} alt='Logo LU5' className='img-logo-nav-admin' />

            <section className="box1-nav-oyente">
                <img src={`data:image/jpg;base64,${profile.profileImage}`} alt="Admin" className="img-nav-oyente" />

                <div className="hola-nav-oyente">
                    <h2>Hola {profile.fullName}!</h2>

                    {
                        opcion === 'perfil' ?
                            <div className="edit-foto-nav">
                                <div className="edit-foto-nav-p">
                                    <EditIcon sx={{ fontSize: '12px' }} />
                                    <span>Editar foto de perfil</span>
                                    <input type="file" className="input-file-editar-perfil-oyente" onChange={hanlderChangeImage} />
                                </div>
                            </div>
                            :
                            <p className={`edit-foto-nav ${opcion === 'perfil' && "edit-foto-nav-select"}`} onClick={() => setOpcion('perfil')}>
                                <EditIcon sx={{ fontSize: '12px' }} />
                                Modificar mis datos
                            </p>
                    }

                </div>
            </section>

            <section>
                <p className={`opciones-nav-admin opciones-nav-admin1 ${opcion === 'concursos' && 'opciones-nav-admin-select'}`} onClick={() => setOpcion('concursos')}>Concursos</p>
                <p className={`opciones-nav-admin ${opcion === 'usuarios' && 'opciones-nav-admin-select'}`} onClick={() => setOpcion('usuarios')}>Usuarios</p>
                <p className={`opciones-nav-admin ${opcion === 'estadisticas' && 'opciones-nav-admin-select'}`} onClick={() => setOpcion('estadisticas')}>Estadísticas</p>
                <p className={`opciones-nav-admin ${opcion === 'beneficios' && 'opciones-nav-admin-select'}`} onClick={() => setOpcion('beneficios')}>Beneficios</p>
            </section>

            <Link to={'/'} onClick={handleLogout} className="opcion-nav-admin">
                <LogoutIcon sx={{ fontSize: '18px' }} />
                Cerrar sesión
            </Link>
        </nav>
    );
};

export default NavBarAdmin;