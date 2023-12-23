
import cookie from 'js-cookie';
const AUTH_KEY = 'jobplus-token';
import jwt_decode from 'jwt-decode';

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
    return cookie.get(AUTH_KEY);
  };
  //isAuthCookieExpired
  const isAuthCookieExpired = () => {
    const token = getAuthCookie();
    if (!token) return true;
    const { exp } = jwt_decode(token);
    const currentTime  = Date.now() / 1000; //to get in millisecs
    return exp < currentTime; //will be true if expired
  };
  //hasValidAuthCookie
  const hasValidAuthCookie = () => {
    return !isAuthCookieExpired();
  }

  //get logged in user id
  const getLoggedInUserId = () => {
    const token = getAuthCookie();
    if (!token) return null;
    const { id } = jwt_decode(token);
    return id;
  };

  return {
    saveAuthCookie,
    deleteAuthCookie,
    getAuthCookie,
    isAuthCookieExpired,
    hasValidAuthCookie,
    getLoggedInUserId,
 };
};