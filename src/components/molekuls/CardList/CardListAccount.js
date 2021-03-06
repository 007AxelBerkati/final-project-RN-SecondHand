import {
  StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import propTypes from 'prop-types';
import { colors, fonts, fontSize } from '../../../utils';

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
    borderBottomColor: colors.border.primary,
    flexDirection: 'row',
  },

  text: {
    marginLeft: 20,
    fontSize: fontSize.small,
    fontFamily: fonts.Poppins.Medium,
    color: colors.text.primary,
  },
});

CardListAccount.propTypes = {
  onPress: propTypes.func,
  name: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
};

CardListAccount.defaultProps = {
  onPress: undefined,
};
