const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_DATA':
    return {
      ...state,
      name: action.dados.usernameLogin,
      gravatarEmail: action.dados.emailLogin,
    };
  default:
    return state;
  }
};

export default player;
