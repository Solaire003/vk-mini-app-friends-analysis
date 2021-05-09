import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import store from "./store";
import App from "./App";

// Init VK  Mini App
const init = async () => {
  await bridge.send("VKWebAppInit");
};
init();

const Root = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)

ReactDOM.render(Root(), document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {
  }); //runtime download
}
