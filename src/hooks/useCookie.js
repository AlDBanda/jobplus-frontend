
import cookie from 'js-cookie';
const AUTH_KEY = 'jobplus-token';

export const useCookie = () => {
  //save authCookies
  const saveAuthCookie = (key,token, expires=4/24) => {
    cookie.set(AUTH_KEY,key, token, { expires: expires }); //expires in 4 hours
  };
  //deleteAuthCookie
  const deleteAuthCookie = () => {
    cookie.remove(AUTH_KEY);
  };
  //getAuthCookie
  const getAuthCookie = () => {
    cookie.get(AUTH_KEY);
  };
  //isAuthCookieExpired
  const isAuthCookieExpired = (key) => {
  };
  //hasValidAuthCookie
  const hasValidAuthCookie = (key) => {
  }

  return {
    saveAuthCookie,
    deleteAuthCookie,
    getAuthCookie,
    isAuthCookieExpired,
    hasValidAuthCookie,
 };
};