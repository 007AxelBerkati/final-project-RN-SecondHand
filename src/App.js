import CodePush from 'react-native-code-push';
import FlashMessage from 'react-native-flash-message';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Router from '@router';
import React, { useEffect } from 'react';

import { LogBox, StatusBar } from 'react-native';
import { Loading } from './components';
import { Persistore, Store } from './redux';

const CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
  },
};

function MainApp() {
  const stateGlobal = useSelector((state) => state.dataGlobal);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Router />
      <FlashMessage position="top" />
      {stateGlobal.isLoading && <Loading />}
    </>
  );
}

function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistore}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
}

export default CodePush(CodePushOptions)(App);
