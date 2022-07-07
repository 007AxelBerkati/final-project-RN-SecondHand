import {
  StyleSheet, View, FlatList,
} from 'react-native';
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Headers } from '../../components';

function NotifikasiScreen({ }) {
  // const dispatch = useDispatch();
  // const dataNotif = useSelector((state) => state.dataNotifikasi.notifikasi);
  return (
    <View style={styles.pages}>
      <Headers title="Notifikasi" />
      <FlatList />
    </View>
  );
}

export default NotifikasiScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    margin: 16,
  },
});
