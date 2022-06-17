import CodePush from 'react-native-code-push';
import FlashMessage from 'react-native-flash-message';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import React from 'react';
import Router from '@router';

import { Persistore, Store } from './redux';
import { Loading } from './components';

const CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    title: 'a new update is available!',
  },
};

function MainApp() {
  const stateGlobal = useSelector((state) => state.dataGlobal);

  return (
    <>
      {/* <StatusBar barStyle="dark-content" backgroundColor={colors.background.secondary} /> */}
      <Router />
      <FlashMessage position="top" />
      {stateGlobal.isLoading && <Loading />}
    </>
  );
}

function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistore}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
}

export default CodePush(CodePushOptions)(App);
