import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLogin } from '@redux';
import { showSuccess } from '../../utils';

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const dataLogin = useSelector((state) => state.dataLogin);

  const onSubmit = () => {
    dispatch(getLogin('johndoe@mail.com', '123456', navigation));
    if (dataLogin.isSuccess) {
      showSuccess('Login Success');
    } else {
      showSuccess(dataLogin.error);
    }
  };
  return (
    <View style={styles.pages}>
      <Button title="test login" onPress={onSubmit} />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
