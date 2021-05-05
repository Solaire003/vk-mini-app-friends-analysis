import fetchJsonp from 'fetch-jsonp';

const token = "eff401ce4b5eea2063bb2c863e5ea5d744cba76fa732123aef92de2800fd6f2c9332c48f492e9f99a9a0c";
const url = `https://api.vk.com/method/friends.get?fields=photo_100&order=name&access_token=${token}&v=5.130`;

export const getFriends = () => {
  return  fetchJsonp(url).then(res=>res.json())
}