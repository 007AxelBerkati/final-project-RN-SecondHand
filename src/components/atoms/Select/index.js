import { StyleSheet } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors, fonts } from '../../../utils';

function Select({ data, onSelect, defaultValue }) {
  return (
    <SelectDropdown
      data={data}
      defaultValue={defaultValue}
      onSelect={onSelect}
      defaultButtonText="Pilih Kota"
      buttonTextAfterSelection={(selectedItem) => selectedItem}
      rowTextForSelection={(item) => item}
      buttonStyle={styles.dropdown1BtnStyle}
      buttonTextStyle={styles.dropdown1BtnTxtStyle}
      renderDropdownIcon={(isOpened) => (
        <FontAwesome
          name={isOpened ? 'chevron-up' : 'chevron-down'}
          color="#444"
          size={18}
        />
      )}
      dropdownIconPosition="right"
      dropdownStyle={styles.dropdown1DropdownStyle}
      rowStyle={styles.dropdown1RowStyle}
      rowTextStyle={styles.dropdown1RowTxtStyle}
      selectedRowStyle={styles.dropdown1SelectedRowStyle}
      search
      searchInputStyle={styles.dropdown1searchInputStyleStyle}
      searchPlaceHolder="Search here"
      searchPlaceHolderColor="darkgrey"
      renderSearchInputLeftIcon={() => (
        <FontAwesome name="search" color="#444" size={18} />
      )}
    />
  );
}

export default Select;

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: null,
    height: 60,
    backgroundColor: colors.background.grey,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border.secondary,
    marginTop: 6,
  },
  dropdown1BtnTxtStyle: {
    color: colors.text.primary,
    textAlign: 'left',
    fontFamily: fonts.Poppins.Regular,
    fontSize: 16,
  },
  dropdown1DropdownStyle: {
    backgroundColor: colors.background.primary,
  },
  dropdown1RowStyle: {
    backgroundColor: colors.background.primary,
    borderBottomColor: colors.border,
  },
  dropdown1RowTxtStyle: {
    color: colors.text.primary,
    fontFamily: fonts.Poppins.Regular,
    textAlign: 'left',
  },
  dropdown1SelectedRowStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dropdown1searchInputStyleStyle: {
    backgroundColor: colors.background.primary,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
