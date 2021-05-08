import bridge from "@vkontakte/vk-bridge";

const vkBridge = (method, access_token) => {
  return bridge.send("VKWebAppCallAPIMethod", {
    method: method,
    params: {
      fields: 'photo_100',
      order: 'name',
      access_token,
      v: '5.130'
    }
  })
}

export const apiRequest = {
  getFriends: ({ access_token }) => {
    return vkBridge('friends.get', access_token)
  }
}