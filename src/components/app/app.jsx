import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }

  static getscreen(question, props, onUserAnswer) {
    if (question === -1) {
      const {
        errorCount,
        gameTime,
      } = props;

      return <WelcomeScreen
        errorsCount= { errorCount }
        time= { gameTime }
        onStartButtonClick= { onUserAnswer }
      />;
    }
    const { questions } = props;
    const currentQuestion = questions[question];
    if (currentQuestion.type === 'genre') {
      return <GenreQuestionScreen
        question={ currentQuestion }
        onAnswer={ onUserAnswer }
      />;
    }
    if (currentQuestion.type === 'artist') {
      return <ArtistQuestionScreen
        question={ currentQuestion }
        onAnswer={ onUserAnswer }
      />;
    }
    return null;
  }

  render() {
    const { questions } = this.props;
    const { question } = this.state;
    const onUserAnswer = () => {
      this.setState((prevState) => {
        const nextIndex = prevState.question + 1;
        const isEnd = nextIndex === questions.length;

        return {
          ...prevState,
          question: !isEnd ? nextIndex : -1,
        };
      });
    };
    return App.getscreen(question, this.props, onUserAnswer);
  }
}

App.propTypes = {
  errorCount: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
