import { Text, View } from 'react-native';
import CodePush from 'react-native-code-push';
import React from 'react';

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

// const styles = StyleSheet.create({});
