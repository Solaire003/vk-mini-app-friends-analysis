import apiRequest from "../../utils/ApiServiceVK";
import store from "../index";

const FRIENDS_CHANGE = "FRIENDS_CHANGE";

const Actions = {
  getFriends: async () => {
    const { response } = await apiRequest.getFriends();
    Actions.change(response);
  },

  getUserWall: async (id) => {
    const { response } = await apiRequest.getUserWall(id);
    Actions.change({ wall: response.items });
  },

  getFriendInfo: async (id) => {
    const { response } = await apiRequest.getFriendInfo(id);
    Actions.change({ currentFriend: response[0] });
  },

  getMutualFriends: async (id) => {
    const { response: mutualFriends } = await apiRequest.getMutualFriends(id);
    Actions.change({ mutualFriends });
  },

  // getUserPhotos: async (id) => {
  //   // const { response } = await apiRequest.getUserAlbums(id)
  //   const { response } = await apiRequest.getUserPhotos(id)
  //   console.log(response)
  //
  //   Actions.change({ photos: response });
  // },

  getAllPhotos: async (id) => {
    const { response } = await apiRequest.getAllPhotos(id);
    const photos = response.items.map(({ sizes }) => sizes);
    Actions.change({ photos });
  },

  change: (payload) => {
    store.dispatch({
      type: FRIENDS_CHANGE,
      payload,
    });
  },
};

export default Actions;
