import apiRequest from "../../utils/ApiServiceVK";
import store from '../index'

const FRIENDS_CHANGE = 'FRIENDS_CHANGE';

const Actions = {
  getFriends: async () => {
    const { response } = await apiRequest.getFriends()
    Actions.change(response);
  },

  change: (payload) => {
    store.dispatch({
      type: FRIENDS_CHANGE,
      payload
    })
  }
}

export default Actions;