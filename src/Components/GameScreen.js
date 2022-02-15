import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestionsApi } from '../services/triviaApi';
import Loading from './Loading';

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getQuestionsApi();
  }

  getQuestionsApi = async () => {
    const { tokenState } = this.props;
    const questionsReturn = await fetchQuestionsApi(tokenState);
    this.setState({
      questions: questionsReturn.results,
      loading: false,
    });
  }

  render() {
    const { questions, loading } = this.state;
    return (
      <main>
        {loading ? <Loading /> : (
          <div>
            <h2 data-testid="question-category">{questions[0].category}</h2>
            <h1 data-testid="question-text">{questions[0].question}</h1>
            <section data-testid="answer-options">
              <button
                data-testid="correct-answer"
                type="button"
              >
                {questions[0].correct_answer}
              </button>
              {questions[0].incorrect_answers.map((answer, index) => (
                <button
                  type="button"
                  key={ answer }
                  data-testid={ `answer-${index}` }
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
