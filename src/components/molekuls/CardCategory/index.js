import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {
  colors, fonts, windowHeight,
} from '../../../utils';

function CardCategory({
  onPress, name, kategori, active,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(active)}>
      <Icon
        name={name}
        size={20}
        color={active ? colors.background.primary
          : colors.background.black}
      />
      <Text style={styles.text(active)}>{kategori}</Text>
    </TouchableOpacity>
  );
}

export default CardCategory;

const styles = StyleSheet.create({
  container: (active) => ({
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: windowHeight * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: active ? colors.background.secondary : colors.background.tertiary,
    borderRadius: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: active ? colors.background.primary : colors.background.tertiary,
  }),

  text: (active) => ({
    fontFamily: fonts.Poppins.Regular,
    color: active ? colors.text.secondary : colors.text.primary,
  }),

});
