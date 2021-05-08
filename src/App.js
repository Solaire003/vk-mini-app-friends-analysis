import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import bridge from "@vkontakte/vk-bridge";
import View from "@vkontakte/vkui/dist/components/View/View";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import "@vkontakte/vkui/dist/vkui.css";
import Home from "./panels/Home";
import { apiRequest } from "./utils/ApiServiceVK";

const App = () => {
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [popout, setPopout] = useState(<ScreenSpinner size="large"/>);
  const store = useSelector(state => state.user)
  console.log("USER", fetchedUser);
  console.log("store", store);

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
      const { response } = await apiRequest.getFriends(token);
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
      <Home id="home" fetchedUser={fetchedUser} go={go} friends={friends}/>
    </View>
  );
};

export default App;
