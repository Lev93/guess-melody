const initialState = {
  step: -1,
  mistakes: 0,
};


const isArtistAnswerCorrect = (userAnswer, question) => userAnswer.artist === question.song.artist;


const isGenreAnswerCorrect = (userAnswer, question) => userAnswer.every((it, i) => it === (
  question.answers[i].genre === question.genre
));


const ActionCreator = {
  incrementStep: () => ({
    type: 'INCREMENT_STEP',
    payload: 1,
  }),

  incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
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

    if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: 'RESET',
      };
    }

    return {
      type: 'INCREMENT_MISTAKES',
      payload: answerIsCorrect ? 0 : 1,
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
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer,
};
