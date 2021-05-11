import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import store from "./store";
import App from "./App";
import { ConfigProvider, AdaptivityProvider, AppRoot } from "@vkontakte/vkui";

// Init VK  Mini App
const init = async () => {
  await bridge.send("VKWebAppInit");
  bridge.subscribe(({ detail: { type, data } }) => {
    if (type === "VKWebAppUpdateConfig") {
      const schemeAttribute = document.createAttribute("scheme");
      schemeAttribute.value = data.scheme ? data.scheme : "client_light";
      document.body.attributes.setNamedItem(schemeAttribute);
    }
  });
};
init();

const Root = (
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <Provider store={store}>
          <App />
        </Provider>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>
);

ReactDOM.render(Root, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
