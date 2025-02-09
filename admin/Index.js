import React from 'react';
import { HashRouter } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import App from './App';

const AppContainer = ({ mainEl }) => {
  return (
    <HashRouter>
      <App mainEl={mainEl} />
    </HashRouter>
  );
}

export default AppContainer;