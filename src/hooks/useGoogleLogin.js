/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { postLoginAsync } from '../app/silices/login/loginThunk'
import { useDispatch, useSelector } from 'react-redux';
import { getUserGoogleAsync } from '../app/silices/usuarios/usuarioThunk';
import { setRedirectGoogle } from '../app/silices/usuarios/usuarioGoogleSlice';
import { DATA_GOOGLE } from '../constants';

const useCustomGoogleLogin = () => {
    const dispatch = useDispatch()
    const { profileGoogle, redirect } = useSelector(state => state.usuarioGoogleSlice)
    const [ user, setUser ] = useState([]);

    useEffect(() => {
        if (user.length !== 0) {
            dispatch(getUserGoogleAsync({token: user.access_token}))
        }
    },[user]);

    useEffect(()=>{
        if(profileGoogle.email !== '' && redirect){
            dispatch(postLoginAsync({email: profileGoogle.email, password: DATA_GOOGLE}))
            dispatch(setRedirectGoogle(false))
        }
    }, [profileGoogle, redirect])

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const googleLogOut = () => {
        googleLogout();
    };

    return {googleLogin, googleLogOut}
};

export default useCustomGoogleLogin;