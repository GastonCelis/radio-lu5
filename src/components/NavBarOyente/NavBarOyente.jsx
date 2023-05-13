import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ImgPerfil from "../../assets/foto-perfil.jpg";
import { Link } from "react-router-dom";
import "./navBarOyente.css";

const NavBarOyente = (props) => {
    const {perfil, setPerfil} = props

    return (
        <nav className="container-nav-oyente">
            <div className="box1-nav-oyente">
                <img src={ImgPerfil} alt="Oyente" className="img-nav-oyente" />

                <div className="hola-nav-oyente">
                    <h2>Hola Oyente 1!</h2>
                    {
                        perfil &&
                        <p className="edit-foto-nav">
                            <EditIcon sx={{fontSize: '12px'}}/>
                            Editar foto de perfil
                        </p>
                    }
                </div>
            </div>

            <div className="box2-nav-oyente">
                <div className={`opcion-nav-oyente ${perfil && 'opcion-nav-oyente-selected'}`} onClick={() => setPerfil(true)}>
                    <SettingsIcon sx={{fontSize: '18px'}}/>
                    Mi perfil
                </div>

                <Link to={'/'} className="opcion-nav-oyente" onClick={() => setPerfil(false)}>
                    <LogoutIcon sx={{fontSize: '18px'}}/>
                    Cerrar sesión
                </Link>
            </div>
        </nav>
    );
};

export default NavBarOyente;
