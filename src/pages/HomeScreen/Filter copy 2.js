import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import DropDownPicker from 'react-native-dropdown-picker';
import {ButtonComponent, Input2} from '../../components';
import {colors, fontSize, fonts, windowHeight, windowWidth} from '../../utils';
import {SelectList} from 'react-native-dropdown-select-list';

function Filter({}) {
  const [inputCount, setInputCount] = useState(0);
  const [inputValues, setInputValues] = useState([
    {
      filter: '',
      pembanding: '',
      value: '',
    },
  ]);

  const [openFilter, setOpenFilter] = useState(false);
  const [openPembanding, setOpenPembanding] = useState(false);
  const [items, setItems] = useState([
    {label: 'Category', value: 'category'},
    {label: 'Name', value: 'name'},
    {label: 'Date Range', value: 'dateRange'},
    {label: 'Price Range', value: 'priceRange'},
    {label: 'Location', value: 'location'},
  ]);

  const [pembanding, setPembanding] = useState([
    {label: '>', value: '>'},
    {label: '<', value: '<'},
    {label: '>=', value: '>='},
    {label: '<=', value: '<='},
    {label: '=', value: '='},
    {label: '!=', value: '!='},
  ]);

  const handleAddFilter = () => {
    setInputCount(inputCount + 1);
    setInputValues([
      ...inputValues,
      {
        filter: '',
        pembanding: '',
        value: '',
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = {
      ...updatedValues[index],
      [field]: value,
    };
    setInputValues(updatedValues);
  };

  const handleRemoveFilter = index => {
    setInputCount(inputCount - 1);
    const updatedValues = [...inputValues];
    updatedValues.splice(index, 1);
    setInputValues(updatedValues);
  };

  const handleFilter = () => {};

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <BottomSheetScrollView style={styles.contentContainer}>
        <View style={styles.itemContainer}>
          {inputValues.map((input, index) => (
            <View key={index}>
              <DropDownPicker
                open={openFilter}
                value={input.filter}
                items={items}
                setItems={setItems}
                setOpen={setOpenFilter}
                searchable
                onSelectItem={item => {
                  handleInputChange(index, 'filter', item.value);
                }}
                listMode="MODAL"
              />

              <DropDownPicker
                open={openPembanding}
                value={input.pembanding}
                items={pembanding}
                setOpen={setOpenPembanding}
                setItems={setPembanding}
                searchable
                onSelectItem={item => {
                  handleInputChange(index, 'pembanding', item.value);
                }}
                listMode="MODAL"
              />

              <Input2
                value={input.value}
                onChangeText={value => {
                  handleInputChange(index, 'value', value);
                }}
                placeholder="Value"
              />

              <ButtonComponent
                style={{marginTop: 10}}
                title="Hapus"
                type="secondary"
                onPress={() => handleRemoveFilter(index)}
              />
            </View>
          ))}
          <ButtonComponent
            style={{marginTop: 10}}
            title="Tambah Filter"
            onPress={handleAddFilter}
          />
        </View>
      </BottomSheetScrollView>
    </TouchableWithoutFeedback>
  );
}

export default Filter;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginHorizontal: windowWidth * 0.09,
    marginVertical: windowHeight * 0.03,
  },

  itemContainer: {
    padding: 6,
    margin: 6,
  },

  addFilter: {
    flexDirection: 'row',
  },

  textAddFilter: {
    fontFamily: fonts.Poppins.Medium,
    fontSize: fontSize.medium,
    color: colors.text.subtitle,
    marginLeft: 5,
  },

  errorText: {
    fontFamily: fonts.Poppins.Medium,
    color: colors.warning,
    fontSize: fontSize.small,
  },
});
