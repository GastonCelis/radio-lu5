/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import "./navBarOyente.css";
import useCustomGoogleLogin from "../../hooks/useGoogleLogin";
import { setRefreshState } from '../../app/silices/login/loginSlice';
import { useDispatch } from 'react-redux';
import { redirectToNewPage } from '../../utils/functions';
import { setProfileuUsuario, setRefreshStateUser } from "../../app/silices/usuarios/usuarioSlice";
import { setRefreshStateGoogle } from "../../app/silices/usuarios/usuarioGoogleSlice";

const NavBarOyente = (props) => {
    const { perfil, setPerfil, profile } = props
    const { googleLogOut } = useCustomGoogleLogin()
    const dispatch = useDispatch()

    const handleLogout = () => {
        setPerfil(false)
        googleLogOut()
        dispatch(setRefreshState())
        dispatch(setRefreshStateGoogle())
        dispatch(setRefreshStateUser())
        redirectToNewPage('/')
    }

    const hanlderChangeImage = async (event)=>{
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
        const base64String = reader.result;
        const data64Imagen = base64String.split(',')
        dispatch(setProfileuUsuario({profileImage: data64Imagen[1]}))
        };

        reader.readAsDataURL(file);
    }

    return (
        <nav className="container-nav-oyente">
            <div className="box1-nav-oyente">
                <img src={`data:image/jpg;base64,${profile.profileImage}`} alt="Oyente" className="img-nav-oyente" />

                <div className="hola-nav-oyente">
                    <h2>{`Hola ${profile.fullName}!`}</h2>
                    {
                        perfil &&
                        <div className="edit-foto-nav">
                            <div className="edit-foto-nav-p">
                                <EditIcon sx={{ fontSize: '12px' }} />
                                <span>Editar foto de perfil</span>
                                <input type="file" className="input-file-editar-perfil-oyente" onChange={hanlderChangeImage}/>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="box2-nav-oyente">
                <div className={`opcion-nav-oyente ${perfil && 'opcion-nav-oyente-selected'}`} onClick={() => setPerfil(true)}>
                    <SettingsIcon sx={{ fontSize: '18px' }} />
                    Mi perfil
                </div>

                <Link to={'/'} className="opcion-nav-oyente" onClick={handleLogout}>
                    <LogoutIcon sx={{ fontSize: '18px' }} />
                    Cerrar sesión
                </Link>
            </div>
        </nav>
    );
};

export default NavBarOyente;
