import { createBrowserRouter } from "react-router-dom";
import Sumate from '../pages/Sumate/Sumate'
import InicioSesion from "../pages/InicioSesion/InicioSesion";
import Registro from "../pages/Registro/Registro";
import Oyente from "../pages/Oyente/Oyente";
import Admin from "../pages/Admin/Admin";

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
        path: "/oyente",
        element: <Oyente/>,
    },
    {
        path: "/admin",
        element: <Admin/>,
    },
]);