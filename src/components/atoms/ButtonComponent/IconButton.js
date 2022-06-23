import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { colors } from '../../../utils';

function Icons({ label }) {
  if (label === 'BackButton') return <Icon name="arrow-back-circle-outline" size={25} color={colors.background.primary} />;
  return <Icon name="fingerprint" size={25} color={colors.background.secondary} />;
}
function IconButton({
  onPress, nonButton, iconHeight, iconWidth, label,
}) {
  return (
    <View>
      {nonButton ? (
        <View style={styles.iconNonButton}>
          <View style={styles.icon}>
            <Icons iconHeight={iconHeight} iconWidth={iconWidth} label={label} />
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.iconWrapper} onPress={onPress}>
          <View style={styles.icon}>
            <Icons iconHeight={iconHeight} iconWidth={iconWidth} label={label} />
          </View>
        </TouchableOpacity>
      )}
    </View>

  );
}

export default IconButton;

const styles = StyleSheet.create({
  iconWrapper: {
    width: 55,
    height: 55,
    borderRadius: 55 / 5,
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
    elevation: 6,
  },
  icon: {
    padding: 16,
    alignSelf: 'center',
    borderRadius: 8,
  },
  iconNonButton: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: colors.background.icon,
    opacity: 0.8,
    justifyContent: 'center',
  },

});
