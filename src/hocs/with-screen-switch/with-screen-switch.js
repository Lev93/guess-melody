/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import ArtistQuestionScreen from '../../components/artist-question-screen/artist-question-screen.jsx';
import GenreQuestionScreen from '../../components/genre-question-screen/genre-question-screen.jsx';
import WelcomeScreen from '../../components/welcome-screen/welcome-screen.jsx';

import withActivePlayer from '../with-active-player/with-active-player';
import withTransformProps from '../with-transform-props/with-transform-props';
import withUserAnswer from '../with-user-answer/with-user-asnwer';
import { ActionCreator } from '../../reducer';

const transformPlayerToQuestion = (props) => {
  const newProps = { ...props, renderQuestion: props.renderPlayer };
  delete newProps.renderPlayer;
  return newProps;
};

const transformPlayerToAnswer = (props) => {
  const newProps = { ...props, renderAnswer: props.renderPlayer };
  delete newProps.renderPlayer;
  return newProps;
};

const ArtistQuestionScreenWrapped = withActivePlayer(
  withTransformProps(transformPlayerToQuestion)(ArtistQuestionScreen),
);
const GenreQuestionScreenWrapped = withUserAnswer(
  withActivePlayer(withTransformProps(transformPlayerToAnswer)(GenreQuestionScreen)),
);

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        renderScreen={this._getScreen}
      />;
    }

    _getScreen(question) {
      if (!question) {
        const { step, questions } = this.props;
        if (step > questions.length - 1) {
          // Временное решение, которое мы заменим в следущем модуле
          // eslint-disable-next-line
          window.alert(`Вы проиграли!`);
          return null;
        }
        const {
          maxMistakes,
          gameTime,
          onWelcomeScreenClick,
        } = this.props;

        return <WelcomeScreen
          errorCount={maxMistakes}
          gameTime={gameTime}
          onClick={onWelcomeScreenClick}
        />;
      }

      const {
        onUserAnswer,
        mistakes,
        maxMistakes,
        resetGame,
      } = this.props;

      if (mistakes >= maxMistakes) {
        // Временное решение, которое мы заменим в следущем модуле
        // eslint-disable-next-line
        if (window.confirm(`Вы проиграли!`)) {
          resetGame();
        }
        return null;
      }

      switch (question.type) {
        case 'genre': return <GenreQuestionScreenWrapped
          answers={question.answers}
          question={question}
          onAnswer={(userAnswer) => onUserAnswer(
            userAnswer,
            question,
          )}
        />;

        case 'artist': return <ArtistQuestionScreenWrapped
          question={question}
          onAnswer={(userAnswer) => onUserAnswer(
            userAnswer,
            question,
          )}
        />;
        default: return null;
      }
    }
  }

  WithScreenSwitch.propTypes = {
    gameTime: PropTypes.number.isRequired,
    // questionsLength: PropTypes.number.isRequired,
    maxMistakes: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired,
    onUserAnswer: PropTypes.func.isRequired,
    onWelcomeScreenClick: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    step: PropTypes.number.isRequired,
  };

  return WithScreenSwitch;
};

// export { withScreenSwitch };

const mapStateToProps = (state) => {
  const props = { step: state.step, mistakes: state.mistakes };
  return props;
};

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),

  onUserAnswer: (userAnswer, question) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(
      userAnswer,
      question,
    ));
  },

  resetGame: () => dispatch(ActionCreator.resetGame()),
});

const withScreenSwitchfunc = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withScreenSwitch,
);


export default withScreenSwitchfunc;
