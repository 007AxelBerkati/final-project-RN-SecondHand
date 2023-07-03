import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Input2, LinkComponent, Select2} from '../../components';
import {colors, fonts, fontSize, windowHeight, windowWidth} from '../../utils';
import {kabupaten} from '../../assets';

function Filter({}) {
  const [inputCount, setInputCount] = useState(0);
  const [inputValues, setInputValues] = useState(['']);

  const [open, setOpen] = useState();
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const [openPembanding, setOpenPembanding] = useState(false);
  const [valuePembanding, setValuePembanding] = useState(null);

  const [pembanding, setPembanding] = useState([
    {label: '>', value: '>'},
    {label: '<', value: '<'},
    {label: '>=', value: '>='},
    {label: '<=', value: '<='},
    {label: '=', value: '='},
    {label: '!=', value: '!='},
  ]);

  const handleButtonPress = () => {
    setInputCount(inputCount + 1);
    setInputValues([...inputValues, '']);
  };

  const handleInputChange = (text, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
  };

  const renderInputs = () =>
    inputValues.map((value, index) => (
      <View key={index}>
        <Text style={styles.textFilter}>WHERE</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          searchable
          listMode="MODAL"
        />

        <DropDownPicker
          open={openPembanding}
          value={valuePembanding}
          items={pembanding}
          setOpen={setOpenPembanding}
          setValue={setValuePembanding}
          setItems={setPembanding}
          searchable
          listMode="MODAL"
        />

        {renderValueInput()}
      </View>
    ));

  const renderValueInput = () =>
    value === 'apple' ? (
      <Input2 />
    ) : (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        searchable
        listMode="MODAL"
      />
    );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <BottomSheetScrollView style={styles.contentContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.errorText}>*Please fill at least one filter</Text>
          <View>
            <Text style={styles.textFilter}>WHERE</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              searchable
              listMode="MODAL"
            />

            <DropDownPicker
              open={openPembanding}
              value={valuePembanding}
              items={pembanding}
              setOpen={setOpenPembanding}
              setValue={setValuePembanding}
              setItems={setPembanding}
              searchable
              listMode="MODAL"
            />

            {renderValueInput()}
          </View>
          {renderInputs()}
          <TouchableOpacity
            style={styles.addFilter}
            onPress={handleButtonPress}>
            <Icon name="plus" size={15} color={colors.background.black} />
            <Text style={styles.textAddFilter}>Add Filter</Text>
          </TouchableOpacity>
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
