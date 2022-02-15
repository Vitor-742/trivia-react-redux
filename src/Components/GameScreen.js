import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestionsApi } from '../services/triviaApi';
import Loading from './Loading';

const NUMBER_RANDOM = 0.5;
const RESPONSE_CODE = 3;

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      Allquestions: [],
      numberQuestion: 0,
      answers: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getQuestionsApi();
  }

  getQuestionsApi = async () => {
    const { tokenState } = this.props;
    const questionsReturn = await fetchQuestionsApi(tokenState);
    if (questionsReturn.response_code !== RESPONSE_CODE) {
      // Coloca todas as respostas em um único Array;
      const allAnswers = [
        questionsReturn.results[0].correct_answer,
        ...questionsReturn.results[0].incorrect_answers];
      const answersWithDataTestId = [];
      // Coloca todas as respostas com seu respectivo DataTestId em um Array para criar o Random;
      allAnswers.map((answer, index) => {
        if (index === 0) {
          answersWithDataTestId.push({ answer, dataTestId: 'correct-answer' });
          return answersWithDataTestId;
        }
        answersWithDataTestId.push({ answer, dataTestId: `answer-${index}` });
        return answersWithDataTestId;
      });
      // Embaralha o conteúdo do array de respostas
      // Parte do código retirado de: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      const randomAnswers = answersWithDataTestId.sort(
        () => Math.random() - NUMBER_RANDOM,
      );
      this.setState({
        Allquestions: questionsReturn.results,
        answers: randomAnswers,
        loading: false,
      });
    } else {
      console.log('CHAMA NOVAMENTE A API PRA GERAR O TOKEN');
    }
  }

  render() {
    const { Allquestions, numberQuestion, loading, answers } = this.state;
    return (
      <main>
        {loading ? <Loading /> : (
          <div>
            <h2 data-testid="question-category">
              {Allquestions[numberQuestion].category}
            </h2>
            <h1 data-testid="question-text">{Allquestions[numberQuestion].question}</h1>
            <section data-testid="answer-options">
              {answers.map(({ answer, dataTestId }) => (
                <button
                  type="button"
                  key={ answer }
                  data-testid={ dataTestId }
                >
                  {answer}
                </button>))}
            </section>
          </div>
        )}
      </main>
    );
  }
}

GameScreen.propTypes = {
  tokenState: propTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  tokenState: state.token,
});

export default connect(mapStateToProps)(GameScreen);
