const initialState = {};

export default function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case "FRIENDS_CHANGE":
      return { ...action.payload, ...state };
    case "FRIENDS_RESET":
      return initialState;
    default:
      return state;
  }
}
