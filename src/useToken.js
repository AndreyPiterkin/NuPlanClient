import { useState } from 'react';
import Cookies from 'js-cookie';

export default function useToken() {
  const getToken = () => {
    const tokenString = Cookies.get('uid');
    const userToken = tokenString;;
    return userToken;
  };

  const [token, setToken] = useState(getToken());
  
  const saveToken = userToken => {
    Cookies.set('uid', userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}