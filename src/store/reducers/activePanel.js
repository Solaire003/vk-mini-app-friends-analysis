const initialState = "home";

export default function activePanelReducer(state = initialState, action) {
  switch (action.type) {
    case "ACTIVE_PANEL_CHANGE":
      return action.payload;
    case "ACTIVE_PANEL_RESET":
      return initialState;
    default:
      return state;
  }
}
