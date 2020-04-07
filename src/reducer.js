/* eslint-disable arrow-body-style */
const initialState = {
  step: -1,
  mistakes: 0,
};

const ActionType = {
  INCREMENT_MISTAKES: 'INCREMENT_MISTAKES',
  INCREMENT_STEP: 'INCREMENT_STEP',
  RESET: 'RESET',
};

const isArtistAnswerCorrect = (userAnswer, question) => userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (userAnswer, question) => userAnswer.every((it, i) => it === (
  question.answers[i].genre === question.genre
));

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),

  incrementMistake: (userAnswer, question) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case 'artist':
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
      case 'genre':
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
      default: console.log('unknown question');
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },
  resetGame: () => {
    return {
      type: ActionType.RESET,
    };
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_STEP': {
      return { ...state, step: state.step + action.payload };
    }
    case 'INCREMENT_MISTAKES': {
      return { ...state, mistakes: state.mistakes + action.payload };
    }

    case 'RESET': return { ...initialState };
    default:
      return state;
  }
};


export {
  ActionCreator,
  ActionType,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer,
};
