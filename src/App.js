import React from 'react';
import { Provider } from 'react-redux';

import MapContainer from './containers/MapContainer';
import store from '~/store';

const App = props => (
  <Provider store={store}>
    <MapContainer />
  </Provider>
);

export default App;
