import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/';
const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  console.log('heeey yaa');
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  console.log('useraaaa: ', user);
  const cookieToken = Cookie.get('token');

  const signInReady = async (email, password) => {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data: userA } = await axios.get(endPoints.auth.profile);

    console.log('cookie; ', cookieToken);
    console.log('userA; ', userA);
  };
  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-type': 'application/json',
      },
    };
    const cookieToken = Cookie.get('token');
    console.log('tokenCookiee; ', cookieToken);
    if (cookieToken) {
      axios.defaults.headers.Authorization = `Bearer ${cookieToken}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      setUser(user);
    }
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    if (access_token) {
      const token = access_token.access_token;
      Cookie.set('token', token, { expires: 5 });

      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      setUser(user);
    }
  };
  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = 'login';
  };
  return { user, signIn, signInReady, logout };
}
//AGREGAR BENEFICIARIOS PARA COBERTURA NO DEBE DE MOSTRARSE EN EL
//CUANDO ES TITULAR VALIDAR LA PANTALLA DE INFORMACION PERSONAL
//CUANDO ES DEPENDIENTE SE TIENE QUE VALIDAR LA EDAD INGRESADA AL INICIO CON LA FECHA DE LA SECCION DE DEPENDIENTE ECONOMICO
