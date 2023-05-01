import { createBrowserRouter } from "react-router-dom";
import Sumate from '../pages/Sumate/Sumate'
import InicioSesion from "../pages/InicioSesion/InicioSesion";
import Registro from "../pages/Registro/Registro";
import Inicio from "../pages/Inicio/Inicio";
import Oyente from "../pages/Oyente/Oyente";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Inicio/>,
    },
    {
        path: "/sumate",
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
]);