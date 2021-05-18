import bridge from "@vkontakte/vk-bridge";
import store from "../store";

const vkBridge = (method, options = {}) => {
  const { access_token } = store.getState().user;

  return bridge.send("VKWebAppCallAPIMethod", {
    method,
    params: {
      ...options,
      access_token,
      v: "5.130",
    },
  });
};

const apiRequest = {
  getAuthToken: () => {
    return bridge.send("VKWebAppGetAuthToken", {
      app_id: 7648263,
      scope: "friends, status, photos",
    });
  },
  getUserInfo: () => {
    return bridge.send("VKWebAppGetUserInfo");
  },
  getFriends: () => {
    return vkBridge("friends.get", { fields: "photo_100", order: "name" });
  },
  getUserWall: (userId) => {
    return vkBridge("wall.get", { owner_id: userId, count: 10 });
  },
  getFriendInfo: (userId) => {
    return vkBridge("users.get", {
      user_ids: userId,
      fields:
        "about, activities, bdate, city, country, education, last_seen, photo_100, followers_count",
    });
  },
  getMutualFriends: (userId) => {
    const { id } = store.getState().user;
    return vkBridge("friends.getMutual", {
      source_uid: id,
      target_uid: userId,
    }).then(({ response }) => {
      return vkBridge("users.get", {
        user_ids: response,
        fields: "photo_100",
      });
    });
  },
  // getUserPhotos: (userId) => {
  //   return vkBridge('photos.get', { owner_id: userId, album_id: -6 })
  // },
  // getUserAlbums: (userId) => {
  //   return vkBridge('photos.getAlbums', { owner_id: userId, need_system: 1 })
  // },
  getAllPhotos: (userId) => {
    return vkBridge("photos.getAll", { owner_id: userId, count: 10 });
  },
};

export default apiRequest;
