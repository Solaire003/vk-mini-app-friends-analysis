import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import {getFriends} from "./utils/getFrineds";

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  console.log('USER', fetchedUser);

  useEffect( () => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });

    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
      const { response } = await getFriends()
      setFriends(response.items)
    }
    fetchData();

  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };
  console.log('friends',friends)

  return (
    <View activePanel={activePanel} popout={popout}>
      <Home id="home" fetchedUser={fetchedUser} go={go} />
      <Persik id="persik" go={go} friends={friends} />
    </View>
  );
};

export default App;
