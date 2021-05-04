import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import App from './App';

// Init VK  Mini App
const init = async () => {
  bridge.send('VKWebAppInit');
  const token = await bridge.send('VKWebAppGetAuthToken', {
    app_id: 7648263,
    scope: 'friends,status',
  });
  console.log('TOKEN',token);
};
init();

ReactDOM.render(<App />, document.getElementById('root'));
if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(({ default: eruda }) => {}); //runtime download
}
