import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import View from "@vkontakte/vkui/dist/components/View/View";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import FriendList from "./panels/FriendList";
import { getFriends } from "./utils/getFrineds";

const App = () => {
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  console.log("USER", fetchedUser);

  useEffect(() => {
    async function fetchData() {
      const token = await bridge.send("VKWebAppGetAuthToken", {
        app_id: 7648263,
        scope: "friends,status",
      });
      bridge.subscribe(({ detail: { type, data } }) => {
        if (type === "VKWebAppUpdateConfig") {
          const schemeAttribute = document.createAttribute("scheme");
          schemeAttribute.value = data.scheme ? data.scheme : "client_light";
          document.body.attributes.setNamedItem(schemeAttribute);
        }
      });

      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      const { response } = await getFriends(token);
      setFriends(response.items);
      setPopout(null);
    }

    fetchData();
  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  console.log("friends", friends);

  return (
    <View activePanel={activePanel} popout={popout}>
      <Home id="home" fetchedUser={fetchedUser} go={go} friends={friends} />
    </View>
  );
};

export default App;
