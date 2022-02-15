export const LOGIN_DATA = 'LOGIN_DATA';
export const TOKEN = 'TOKEN';

export const tokenLogin = (token) => ({ type: TOKEN, token });

export const dataLogin = (dados) => ({ type: LOGIN_DATA, dados });
