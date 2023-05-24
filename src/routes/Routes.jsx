import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch, Navigate } from 'react-router-dom';
import Sumate from '../pages/Sumate/Sumate'
import InicioSesion from "../pages/InicioSesion/InicioSesion";
import Registro from "../pages/Registro/Registro";
import Oyente from "../pages/Oyente/Oyente";
import Admin from "../pages/Admin/Admin";
import CambiarContraseña from "../pages/CambiarContraseña/CambiarContraseña";
import RegistroGoogle from "../pages/RegistroGoogle/RegistroGoogle";
import { useSelector } from 'react-redux';

const Routes = () => {
    const { role } = useSelector(state => state.loginSlice)
    const {statusMessage} = useSelector(state => state.usuarioGoogleSlice)

    const handleRdirect = (path)=>{
        if(role !== 'user' && role !== 'admin'){
            if(path === '/'){
                return <Sumate />
            }

            if(path === '/registro'){
                return <Registro />
            }
            
            if(path === '/sesion'){
                return <InicioSesion />
            }

            if(path === '/registroGoogle' && statusMessage === 'fulfilled'){
                return <RegistroGoogle />
            } else{
                return <Navigate to={'/'}/>
            }
        }

        if(role === 'user'){
            return <Navigate to={'/oyente'}/>
        }

        if(role === 'admin'){
            return <Navigate to={'/admin'}/>
        }
    }

    return (
        <Router basename={'/'}>
            <Switch>
                <Route exact path={`/`} element={handleRdirect('/')}/>
                <Route exact path={`/sesion`} element={handleRdirect('/sesion')} />
                <Route exact path={`/registro`} element={handleRdirect('/registro')}/>
                <Route exact path={`/registroGoogle`} element={handleRdirect('/registroGoogle')}/>
                <Route exact path={`/cambioContraseña/:contraseñaId`} element={<CambiarContraseña />} />
                <Route exact path={`/oyente`} element={role === 'user' ? <Oyente /> : <Navigate to={'/sesion'}/>}/>
                <Route exact path={`/admin`} element={role === 'admin' ? <Admin /> : <Navigate to={'/sesion'}/>}/>
            </Switch>
        </Router>
    );
};

export default Routes;