const initialState = {}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "STATE_CHANGE":
      return action.payload;
    case "STATE_RESET":
      return initialState;
    default:
      return state
  }
}