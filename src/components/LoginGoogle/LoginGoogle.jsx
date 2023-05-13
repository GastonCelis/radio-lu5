import React from 'react';
import { GoogleLogin } from 'react-google-login';
import Boton from '../Boton/Boton';

const LoginGoogle = () => {
    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <>
            <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                render={renderProps => (
                    <Boton onClick={renderProps.onClick} disabled={renderProps.disabled} text={'Iniciar sesión con Google'} iconGoogle={true}/>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />,
        </>
    );
};

export default LoginGoogle;