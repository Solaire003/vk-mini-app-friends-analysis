import apiRequest from "../../utils/ApiServiceVK";
import store from '../index'

const FRIENDS_CHANGE = 'FRIENDS_CHANGE';

const Actions = {
  getFriends: async () => {
    const { response } = await apiRequest.getFriends()
    Actions.change(response);
  },

  getUserWall: async (id) => {
    const { response } = await apiRequest.getUserWall(id)
    console.log(response)
    Actions.change({ wall: response });
  },

  // getUserPhotos: async (id) => {
  //   // const { response } = await apiRequest.getUserAlbums(id)
  //   const { response } = await apiRequest.getUserPhotos(id)
  //   console.log(response)
  //
  //   Actions.change({ photos: response });
  // },

  getAllPhotos: async (id) => {
    const { response } = await apiRequest.getAllPhotos(id)
    console.log(response)

    Actions.change({ photos: response });
  },

  change: (payload) => {
    store.dispatch({
      type: FRIENDS_CHANGE,
      payload
    })
  }
}

export default Actions;