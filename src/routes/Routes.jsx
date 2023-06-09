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
import SolicitudContraseña from '../pages/CambiarContraseña/SolicitudContraseña';
import VerificarCuenta from '../pages/VerificarCuenta/VerificarCuenta';
import { Audio } from 'react-loader-spinner'

const Routes = () => {
    const { role } = useSelector(state => state.loginSlice)
    const {statusMessage, loading} = useSelector(state => state.usuarioGoogleSlice)
    const beneficioSlice = useSelector(state => state.beneficioSlice)
    const concursoSlice = useSelector(state => state.concursoSlice)
    const loginSlice = useSelector(state => state.loginSlice)
    const registroSlice = useSelector(state => state.registroSlice)
    const usuarioSlice = useSelector(state => state.usuarioSlice)

    const handleRdirect = (path)=>{
        if(loading || beneficioSlice.loading || concursoSlice.loading || loginSlice.loading || registroSlice.loading || usuarioSlice.loading){
            return (
                <div className='box-loader'>
                    <Audio
                        height="80"
                        width="80"
                        radius="9"
                        color="red"
                        ariaLabel="Cargando..."
                        wrapperStyle
                        wrapperClass
                    />
                    <p>Cargando...</p>
                </div>
            )
        }

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
                <Route exact path={`/verificarCuenta`} element={<VerificarCuenta />} />
                <Route exact path={`/solicitudClave`} element={<SolicitudContraseña />} />
                <Route exact path={`/cambioClave`} element={<CambiarContraseña />} />
                <Route exact path={`/oyente`} element={role === 'user' ? <Oyente /> : <Navigate to={'/sesion'}/>}/>
                <Route exact path={`/admin`} element={role === 'admin' ? <Admin /> : <Navigate to={'/sesion'}/>}/>
            </Switch>
        </Router>
    );
};

export default Routes;