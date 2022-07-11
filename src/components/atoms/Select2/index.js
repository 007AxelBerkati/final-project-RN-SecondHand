import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import propTypes from 'prop-types';
import { colors, fonts, fontSize } from '../../../utils';

function Select2({
  data, setFieldValue, initialData, placeholder, multiple, schema, mode, name,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialData);
  const [items, setItems] = useState(data);

  return (
    <View style={{ flexDirection: 'row' }}>
      <DropDownPicker
        schema={schema}
        multiple={multiple}
        min={0}
        max={5}
        open={open}
        value={value}
        items={items}
        onChangeValue={() => setFieldValue(name, value, true)}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        searchable
        mode={mode}
        listMode="MODAL"
        badgeDotColors={['#e76f51', '#00b4d8', '#e9c46a', '#e76f51', '#8ac926', '#00b4d8', '#e9c46a']}
        placeholder={placeholder}
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        searchTextInputStyle={styles.searchTextInput}
        labelStyle={styles.label}
        listItemLabelStyle={styles.listItemLabel}
      />
    </View>
  );
}

export default Select2;

const styles = StyleSheet.create({
  placeholder: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: fontSize.small,
    color: colors.text.subtitle,

  },

  dropdown: {
    width: '100%',
    height: 60,
    backgroundColor: colors.background.grey,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border.secondary,
  },

});

Select2.propTypes = {
  data: propTypes.arrayOf(propTypes.oneOfType([propTypes.object])).isRequired,
  setFieldValue: propTypes.func.isRequired,
  initialData: propTypes.arrayOf(propTypes.oneOfType([propTypes.object,
  propTypes.number, propTypes.string])),
  placeholder: propTypes.string.isRequired,
  multiple: propTypes.bool.isRequired,
  schema: propTypes.shape({}).isRequired,
  mode: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};

Select2.defaultProps = {
  initialData: [],
};
