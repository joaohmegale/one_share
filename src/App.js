import './App.css';

import { Provider } from 'react-redux';
import { store } from './app/store';
import Root from './Root';

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
