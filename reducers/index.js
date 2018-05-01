import { RECEIVE_DECKS, RECEIVE_DECK, ADD_DECK, ADD_CARD } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
    const { title, card } = action
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: {
            ...state[title].questions,
            [state[title].numOfQuestions]: card
          }
        }
      }
    default:
      return state
  }
}

export default decks
