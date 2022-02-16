export const LOGIN_DATA = 'LOGIN_DATA';
export const TOKEN = 'TOKEN';
export const DATA_QUESTION = 'DATA_QUESTION';

export const tokenLogin = (token) => ({ type: TOKEN, token });

export const dataLogin = (dados) => ({ type: LOGIN_DATA, dados });

export const dataQuestions = (payload) => ({ type: DATA_QUESTION, payload });
