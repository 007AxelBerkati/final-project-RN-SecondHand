import {
  StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors, fonts } from '../../../utils';

function CardListAccount({ onPress, name, title }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={name} size={25} color={colors.background.secondary} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default CardListAccount;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
  },

  text: {
    marginLeft: 20,
    fontSize: 14,
    fontFamily: fonts.Poppins.Medium,
    color: colors.text.primary,
  },
});
