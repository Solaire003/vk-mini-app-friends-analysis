import fetchJsonp from 'fetch-jsonp';

// const token = "2282d3cbd4945404f31f077870e6bddf011de8cd64ca3d63cb63783619f2457f110edb04e1b3d666e1d3e";
// const url = `https://api.vk.com/method/friends.get?fields=photo_100&order=name&access_token=${token}&v=5.130`;

export const getFriends = ({ access_token }) => {
  return fetchJsonp(
    `https://api.vk.com/method/friends.get?fields=photo_100&order=name&access_token=${access_token}&v=5.130`
  ).then((res) => res.json());
};