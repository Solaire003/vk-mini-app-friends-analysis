import bridge from "@vkontakte/vk-bridge";
import store from '../store'

const vkBridge = (method, options) => {
  const { access_token } = store.getState().user

  return bridge.send("VKWebAppCallAPIMethod", {
    method,
    params: {
      ...options,
      access_token,
      v: '5.130'
    }
  })
}

const apiRequest = {
  getAuthToken: () => {
    return bridge.send("VKWebAppGetAuthToken", {
      app_id: 7648263,
      scope: "friends,status",
    });
  },
  getUserInfo: () => {
    return bridge.send("VKWebAppGetUserInfo");
  },
  getFriends: () => {
    return vkBridge('friends.get', { fields: 'photo_100', order: 'name' })
  }
}

export default apiRequest