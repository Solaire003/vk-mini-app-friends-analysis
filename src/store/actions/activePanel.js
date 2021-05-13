import store from "../index";

const ACTIVE_PANEL_CHANGE = "ACTIVE_PANEL_CHANGE";

const Actions = {
  change: (payload) => {
    store.dispatch({
      type: ACTIVE_PANEL_CHANGE,
      payload,
    });
  },
};

export default Actions;
