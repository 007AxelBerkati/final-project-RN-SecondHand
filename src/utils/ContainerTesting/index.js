import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { Store, Persistore } from '../../redux/store';

export default function ContainerTesting(component) {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistore}>
        {component}
      </PersistGate>
    </Provider>
  );
}
