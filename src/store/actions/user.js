import apiRequest from "../../utils/ApiServiceVK";
import store from '../index'

const USER_CHANGE = 'USER_CHANGE';

const Actions = {
  getUserInfo: async () => {
    const { access_token } = await apiRequest.getAuthToken()
    const user = await apiRequest.getUserInfo()
    Actions.change({ access_token, ...user });
  },

  change: (payload) => {
    store.dispatch({
      type: USER_CHANGE,
      payload
    })
  }
}

export default Actions;