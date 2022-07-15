import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import propTypes from 'prop-types';
import { colors, windowHeight, windowWidth } from '../../../utils';
import { IconRemovePhoto, ILNullPhoto } from '../../../assets';

function Profile({ isRemove, source, onPress }) {
  return (
    <View style={styles.photoSection}>
      {!isRemove && (
        <View style={styles.photo}>
          <FastImage source={source !== null ? source : ILNullPhoto} style={styles.avatar} />
          {isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </View>
      )}
      {isRemove && (
        <TouchableOpacity style={styles.photo} onPress={onPress}>
          <FastImage source={source || ILNullPhoto} style={styles.avatar} />
          {isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  photo: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.17,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.secondary,
  },

  photoSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.17,
    alignSelf: 'center',

  },
  removePhoto: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
});

Profile.propTypes = {
  isRemove: propTypes.bool,
  source: propTypes.shape({ uri: propTypes.string }),
  onPress: propTypes.func,
};

Profile.defaultProps = {
  isRemove: false,
  source: null,
  onPress: undefined,
};
