import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, ScreenSpinner } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import Home from "./panels/Home";
import actions from "../src/store/actions";
import Dashboard from "./panels/Dashboard";

const App = () => {
  const activePanel = useSelector((state) => state.activePanel);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  useEffect(() => {
    actions.user
      .getUserInfo()
      .then(() => actions.friends.getFriends())
      .then(() => setPopout(null));
  }, []);

  return (
    <View activePanel={activePanel} popout={popout}>
      <Home id="home" />
      <Dashboard id="dashboard" />
    </View>
  );
};

export default App;
