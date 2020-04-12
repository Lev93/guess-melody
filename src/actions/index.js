export const incrementStep = () => ({
  type: 'INCREMENT_STEP',
  payload: 1,
});

export const incrementMistake = (mistake) => ({
  type: 'INCREMENT_MISTAKES',
  payload: mistake,
});

export const incrementTime = () => ({
  type: 'INCREMENT_TIME',
  payload: 1,
});

export const resetGame = () => ({
  type: 'RESET',
});

export const openModal = () => ({
  type: 'OPEN_MODAL',
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});
