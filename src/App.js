import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { View, ScreenSpinner } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import Home from "./panels/Home";
import actions from '../src/store/actions'

const App = () => {
  const [activePanel, setActivePanel] = useState("home");
  const [popout, setPopout] = useState(<ScreenSpinner size="large"/>);

  useEffect(() => {
    async function fetchData() {
      await actions.user.getUserInfo()
      await actions.friends.getFriends()
      bridge.subscribe(({ detail: { type, data } }) => {
        if (type === "VKWebAppUpdateConfig") {
          const schemeAttribute = document.createAttribute("scheme");
          schemeAttribute.value = data.scheme ? data.scheme : "client_light";
          document.body.attributes.setNamedItem(schemeAttribute);
        }
      });
    }

    fetchData().then(() => setPopout(null))
  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <View activePanel={activePanel} popout={popout}>
      <Home id="home" go={go}/>
    </View>
  );
};

export default App;
