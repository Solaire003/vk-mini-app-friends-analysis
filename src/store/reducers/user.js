const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_CHANGE":
      return { ...action.payload, ...state };
    case "USER_RESET":
      return initialState;
    default:
      return state;
  }
}
