import bridge from "@vkontakte/vk-bridge";
import store from '../store'
import user from "../store/reducers/user";

const vkBridge = (method, options = {}) => {
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
  },
  getUserWall: (userId) => {
    return vkBridge('wall.get', { owner_id: userId, count: 100 })
  },
  getUserPhotos: (userId) => {
    return vkBridge('photos.get', { owner_id: userId, album_id: -6 })
  },
  getUserAlbums: (userId) => {
    return vkBridge('photos.getAlbums', { owner_id: userId, need_system: 1 })
  }
}

export default apiRequest