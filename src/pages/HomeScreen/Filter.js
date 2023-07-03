import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';

import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { SelectList } from 'react-native-dropdown-select-list';
import { DatePickerModal } from 'react-native-paper-dates';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { IconButton } from 'react-native-paper';
import { kabupaten } from '../../assets';
import { ButtonComponent, Input2 } from '../../components';
import {
  colors, fontSize, fonts, windowHeight, windowWidth,
} from '../../utils';

function Filter({}) {
  const [inputCount, setInputCount] = useState(0);
  const [inputValues, setInputValues] = useState([
    {
      filter: '',
      pembanding: '',
      value: '',
      value2: null,
    },
  ]);
  const [open, setOpen] = useState(false);

  const [range, setRange] = React.useState({ startDate: new Date(), endDate: new Date() });

  const [dataKabupaten, setDataKabupaten] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);

  const { category } = useSelector((state) => state.dataHome);

  const [items] = useState([
    { key: 'Category', value: 'category' },
    { key: 'Name', value: 'name' },
    { key: 'Date Range', value: 'dateRange' },
    { key: 'Price Range', value: 'priceRange' },
    { key: 'Location', value: 'location' },
  ]);

  const [operator] = useState([
    { key: 'AND', value: 'AND' },
    { key: 'OR', value: 'OR' },
  ]);

  const [pembanding] = useState([
    { key: '>', value: '>' },
    { key: '<', value: '<' },
    { key: '>=', value: '>=' },
    { key: '<=', value: '<=' },
    { key: '=', value: '=' },
    { key: '!=', value: '!=' },
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

  const handleRemoveFilter = (index) => {
    setInputCount(inputCount - 1);
    const updatedValues = [...inputValues];
    updatedValues.splice(index, 1);
    setInputValues(updatedValues);
  };

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange],
  );

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const renderValueInput = (input, index) => {
    switch (input) {
      case 'category':
        return (
          <>
            <Text style={styles.inputTitle}>Category</Text>
            <SelectList
              setSelected={(val) => {
                handleInputChange(index, 'value', val);
              }}
              data={dataCategory}
              save="value"
              defaultOption={dataCategory[0]}
              boxStyles={{ marginBottom: 10 }}
            />
          </>
        );
      case 'name':
        return (
          <Input2
            value={input.value}
            onChangeText={(value) => {
              handleInputChange(index, 'value', value);
            }}
            placeholder="Value"
            label="Value"
            style={{ height: 50 }}
          />

        );
      case 'dateRange':
        return (
          <>
            <Text style={styles.inputTitle}>Range Date</Text>
            <ButtonComponent
              title={`${range.startDate?.toDateString()} - ${range.endDate?.toDateString()}`}
              onPress={() => setOpen(true)}
              style={{ marginBottom: 10 }}
            />
            <DatePickerModal
              locale="en"
              mode="range"
              visible={open}
              onDismiss={onDismiss}
              startDate={range.startDate}
              endDate={range.endDate}
              onConfirm={onConfirm}
              startYear={1960} // optional, default is 1800
              endYear={2100} // optional, default is 2200
              label="Pilih Range Tanggal Absen"
            />
          </>
        );

      case 'priceRange':
        return (
          <>
            <Text style={styles.inputTitle}>Price Range</Text>
            <View style={styles.rangePrice}>
              <Input2
                value={input.value}
                style={{ width: windowWidth * 0.35, height: 50 }}
                onChangeText={(value) => {
                  handleInputChange(index, 'value', value);
                }}
                placeholder="Min"
                label="Min"
              />
              <Text style={{ marginHorizontal: 10, alignSelf: 'center' }}>to</Text>
              <Input2
                value={input.value}
                style={{ width: windowWidth * 0.35, height: 50 }}
                onChangeText={(value) => {
                  handleInputChange(index, 'value2', value);
                }}
                placeholder="Max"
                label="Max"
              />
            </View>
          </>

        );
      case 'location':
        return (
          <SelectList
            setSelected={(val) => {
              handleInputChange(index, 'value', val);
            }}
            data={dataKabupaten}
            save="value"
          />
        );
      default:
        return null;
    }
  };

  const handleFilter = () => { };

  const conversionAttributeKabupaten = () => {
    const data = kabupaten.map((item) => ({
      key: item.id,
      value: item.name,
    }));
    setDataKabupaten(data);
  };

  const conversionAttributeCategory = () => {
    const data = category.map((item) => ({
      key: item.id,
      value: item.name,
    }));
    setDataCategory(data);
  };

  useEffect(() => {
    conversionAttributeKabupaten();
    conversionAttributeCategory();
  }, [inputCount]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <BottomSheetScrollView style={styles.contentContainer}>
        <View style={styles.itemContainer}>
          {inputValues.map((input, index) => (
            <View key={index}>
              <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              }}
              >
                <Text style={styles.title}>
                  Filter
                  {' '}
                  {index + 1}
                </Text>
                <IconButton
                  icon="delete"
                  color={colors.warning}
                  style={{ marginLeft: 10 }}
                  size={20}
                  onPress={() => handleRemoveFilter(index)}
                />
              </View>

              {
                index !== 0 ? (
                  <>
                    <Text style={styles.inputTitle}>Operator</Text>
                    <SelectList
                      setSelected={(val) => {
                        handleInputChange(index, 'operator', val);
                      }}
                      data={operator}
                      save="value"
                      defaultOption={operator[0]}
                      maxHeight={1000}
                      boxStyles={{ marginBottom: 10 }}
                    />
                  </>
                )
                  : null

              }

              <Text style={styles.inputTitle}>Filter</Text>
              <SelectList
                setSelected={(val) => {
                  handleInputChange(index, 'filter', val);
                }}
                data={items}
                save="value"
                boxStyles={{ marginBottom: 10 }}
              />
              <Text style={styles.inputTitle}>comparison</Text>

              <SelectList
                setSelected={(val) => {
                  handleInputChange(index, 'pembanding', val);
                }}
                data={pembanding}
                save="value"
                defaultOption={pembanding[0]}
                maxHeight={1000}
                boxStyles={{ marginBottom: 10 }}

              />
              {console.log(inputValues)}

              {renderValueInput(input.filter, index)}

            </View>
          ))}
          <TouchableOpacity
            style={styles.addFilter}
            onPress={handleAddFilter}
          >
            <Icon name="plus" size={15} color={colors.background.black} />
            <Text style={styles.textAddFilter}>Add Filter</Text>
          </TouchableOpacity>

          {
            inputValues.length > 0
            && (
              <ButtonComponent
                style={{ marginTop: 10 }}
                title="Filter"
                onPress={handleFilter}
              />
            )
         }

        </View>

      </BottomSheetScrollView>

    </TouchableWithoutFeedback>
  );
}
export default Filter;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginHorizontal: windowWidth * 0.05,
    marginVertical: windowHeight * 0.03,
  },

  itemContainer: {
    padding: 6,
    margin: 6,
  },

  addFilter: {
    flexDirection: 'row',
  },

  inputTitle: {
    fontFamily: fonts.Poppins.Medium,
    fontSize: fontSize.small,
    color: colors.text.subtitle,
  },

  title: {
    fontFamily: fonts.Poppins.Medium,
    fontSize: fontSize.medium,
    color: colors.text.primary,
    textAlign: 'center',

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

  rangePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,

  },
});
