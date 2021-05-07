import fetchJsonp from 'fetch-jsonp';

export const getFriends = ({ access_token }) => {
  return fetchJsonp(
    `https://api.vk.com/method/friends.get?fields=photo_100&order=name&access_token=${access_token}&v=5.130`
  ).then((res) => res.json());
};