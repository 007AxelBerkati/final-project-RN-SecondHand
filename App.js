import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CodePush from 'react-native-code-push';

const CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    title: 'a new update is available!',
  },
};

function App() {
  return (
    <View>
      <Text>App</Text>

    </View>
  );
}

export default CodePush(CodePushOptions)(App);

const styles = StyleSheet.create({});
