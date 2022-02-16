import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchQuestionsApi, fetchTokenApi } from '../services/triviaApi';
import { tokenLogin, dataQuestions } from '../store/actions';
import AnswerScreen from './AnswerScreen';
// import Loading from './Loading';

const NUMBER_RANDOM = 0.5;
const RESPONSE_CODE = 3;
const POINTS_DIFFICULTY = { hard: 3, medium: 2, easy: 1 };
const CORRECT_ANSWER = 'correct-answer';
const NUMBER_TEN = 10;

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      Allquestions: [],
      numberQuestion: 0,
      answers: [],
      // loading: true,
      isFetching: false,
      isAnswer: false,
    };
  }

  componentDidMount() {
    this.getQuestionsApi();
  }

  getQuestionsApi = async () => {
    const { tokenState, inputQuestionsStore } = this.props;
    const { numberQuestion } = this.state;
    const questionsReturn = await fetchQuestionsApi(tokenState);
    // Se o TOKEN expirar, a API retorna um RESPONSE_CODE = 3 -> no else é solicitando um novo TOKEN
    if (questionsReturn.response_code !== RESPONSE_CODE) {
      // Coloca todas as respostas em um único Array;
      const allAnswers = [
        questionsReturn.results[numberQuestion].correct_answer,
        ...questionsReturn.results[numberQuestion].incorrect_answers];
      const answersWithDataTestId = [];
      // Coloca todas as respostas com seu respectivo DataTestId em um Array para criar o Random;
      allAnswers.map((answer, index) => {
        if (index === 0) {
          answersWithDataTestId.push({
            answer,
            dataTestId: CORRECT_ANSWER,
            className: CORRECT_ANSWER,
          });
          return answersWithDataTestId;
        }
        answersWithDataTestId.push({
          answer,
          dataTestId: `wrong-answer-${index - 1}`,
          className: 'wrong-answer',
        });
        return answersWithDataTestId;
      });
      // Embaralha o conteúdo do array de respostas
      // Parte do código retirado de: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      const randomAnswers = answersWithDataTestId.sort(
        () => Math.random() - NUMBER_RANDOM,
      );
      // Envia pra Store a pergunta, o número dela e as respostas desordenadas;
      inputQuestionsStore({
        question: questionsReturn.results[numberQuestion],
        number: numberQuestion,
        answers: randomAnswers,
      });
      this.setState({
        Allquestions: questionsReturn.results,
        answers: randomAnswers,
        isFetching: true,
      });
    } else {
      const tokenApi = await fetchTokenApi();
      const { loginToken } = this.props;
      localStorage.setItem('token', tokenApi.token);
      loginToken(tokenApi.token);
      this.getQuestionsApi();
    }
  }

  btnClickAnswer = ({ target }) => {
    // Simulação do Timer do Requisito 8;
    const setTimer = 17;
    // ^^^^^^^^^^^^^^^^^^
    const { question, login } = this.props;
    if (target.name === CORRECT_ANSWER) {
      const sumScore = NUMBER_TEN + (setTimer * POINTS_DIFFICULTY[question.difficulty]);
      const hash = md5(login.email).toString();
      const urlPhoto = `https://www.gravatar.com/avatar/${hash}`;
      const dataPlayer = JSON.stringify(
        [{ name: login.nome, score: sumScore, url: urlPhoto }],
      );
      localStorage.setItem('ranking', dataPlayer);
    }
    this.setState({
      isAnswer: true,
    });
  }

  render() {
    const { Allquestions, numberQuestion, isFetching, answers, isAnswer } = this.state;
    return (
      <main>
        {isFetching && (
          isAnswer ? <AnswerScreen /> : (
            <div>
              <h2 data-testid="question-category">
                {Allquestions[numberQuestion].category}
              </h2>
              <h1 data-testid="question-text">{Allquestions[numberQuestion].question}</h1>
              <div data-testid="answer-options">
                {answers.map(({ answer, dataTestId }, index) => (
                  <button
                    type="button"
                    key={ index }
                    name={ dataTestId }
                    data-testid={ dataTestId }
                    onClick={ this.btnClickAnswer }
                  >
                    {answer}
                  </button>))}
              </div>
            </div>
          ))}
      </main>
    );
  }
}

GameScreen.propTypes = {
  tokenState: propTypes.string,
  loginToken: propTypes.func,
  inputQuestionsStore: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  loginToken: (token) => dispatch(tokenLogin(token)),
  inputQuestionsStore: (questionsApi) => dispatch(dataQuestions(questionsApi)),
});

const mapStateToProps = (state) => ({
  tokenState: state.token,
  question: state.questionsReducer.question,
  // player: state.player,
  login: state.login,
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
