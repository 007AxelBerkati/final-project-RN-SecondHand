import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonComponent } from '../../atoms';
import { colors, fonts } from '../../../utils';

function FooterHome({
  dataHome, onHandlePrevious, onHandleNext, page,
}) {
  return (
    <View style={styles.footerContent}>

      <ButtonComponent
        disable={page === 1}
        title="Previous"
        type="secondary"
        onPress={() => onHandlePrevious()}
        style={styles.buttonPagination}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.textPagination}>{page}</Text>
      </View>
      <ButtonComponent
        disable={dataHome.length < 1}
        onPress={() => onHandleNext()}
        style={styles.buttonPagination}
        title="Next"
      />
    </View>
  );
}

export default FooterHome;

const styles = StyleSheet.create({
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    elevation: 4,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: colors.background.primary,

  },
  buttonPagination: {
    width: '30%',
  },

  textPagination: {
    fontSize: 20,
    fontFamily: fonts.Poppins.Regular,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});
