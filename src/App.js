import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, ScreenSpinner } from "@vkontakte/vkui";

import { Home, Dashboard } from "./panels";
import actions from "../src/store/actions";
import apiRequest from "./utils/ApiServiceVK";
import { initFaceapi } from "./utils/FaceApi";

import "@vkontakte/vkui/dist/vkui.css";

const App = () => {
  const activePanel = useSelector((state) => state.activePanel);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [friends, setFriends] = useState([]);
  const [chooseFriend, setChooseFriend] = useState(null);
  const [analise, setAnalise] = useState();

  useEffect(() => {
    function INIT() {
      actions.user.getUserInfo().then(() =>
        apiRequest
          .getFriends()
          .then((res) => setFriends(res.response.items))
          .then(() => initFaceapi())
          .then(() => setPopout(null))
      );
    }

    INIT();
  }, []);

  //Loading handler
  const setLoader = (isLoading = false) => {
    if (isLoading) {
      setPopout(<ScreenSpinner size="large" />);
      return;
    }

    setPopout(null);
  };

  return (
    <View activePanel={activePanel} popout={popout}>
      <Home
        id="home"
        setPopout={setLoader}
        friends={friends}
        setFriend={setChooseFriend}
        setAnalise={setAnalise}
      />
      <Dashboard
        id="dashboard"
        setPopout={setLoader}
        setFriend={setChooseFriend}
        currentFriend={chooseFriend}
        setAnalise={setAnalise}
        analiseData={analise}
      />
    </View>
  );
};

export default App;
