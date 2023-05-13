import { createBrowserRouter } from "react-router-dom";
import Sumate from '../pages/Sumate/Sumate'
import InicioSesion from "../pages/InicioSesion/InicioSesion";
import Registro from "../pages/Registro/Registro";
import Oyente from "../pages/Oyente/Oyente";
import Admin from "../pages/Admin/Admin";
import CambiarContraseña from "../pages/CambiarContraseña/CambiarContraseña";
import RegistroGoogle from "../pages/RegistroGoogle/RegistroGoogle";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Sumate/>,
    },
    {
        path: "/sesion",
        element: <InicioSesion/>,
    },
    {
        path: "/registro",
        element: <Registro/>,
    },
    {
        path: "/registroGoogle",
        element: <RegistroGoogle/>
    },
    {
        path: "/oyente",
        element: <Oyente/>,
    },
    {
        path: "/admin",
        element: <Admin/>,
    },
    {
        path: "/contraseña",
        element: <CambiarContraseña/>,
    },
]);