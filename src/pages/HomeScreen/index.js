/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet, Text, View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import FastImage from 'react-native-fast-image';
import {
  colors, fonts, fontSize, windowHeight,
} from '../../utils';
import { CardCategory, CardProduct } from '../../components';
import { getBannerSeller, getCategoryProduct, getProduct } from '../../redux';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const dataHome = useSelector((state) => state.dataHome);

  useEffect(() => {
    dispatch(getProduct({
      search: searchQuery,
      category_id: category !== 0 ? category : '',
      status: 'available',
      // page: '',
      // per_page: '',
    }));
    dispatch(getCategoryProduct());
    dispatch(getBannerSeller());
    setRefreshing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, searchQuery, refreshing]);

  const onChangeSearch = useCallback((query) => {
    setSearchQuery(query);
  }, [dispatch]);

  const getItemLayout = (data, index) => (
    { length: 200, offset: 200 * index, index }
  );

  const renderItem = useCallback(({ item }) => (
    <CardProduct
      source={item.image_url}
      name={item.name}
      jenis={item.Categories}
      harga={item.base_price}
      onPress={() => navigation.navigate('DetailProductScreen', { id: item.id })}
    />
  ), [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        )}
      >
        <StatusBar backgroundColor="transparent" translucent barStyle={useIsFocused() ? 'light-content' : null} />
        <PagerView style={{ height: windowHeight * 0.4 }} showPageIndicator initialPage={0}>
          {
            dataHome?.banner?.map((item) => (
              <View
                key={item.id}
              >
                <FastImage
                  source={{ uri: item.image_url }}
                  style={{ height: '100%', width: '100%' }}
                />
              </View>
            ))
          }
        </PagerView>
        <Searchbar
          style={styles.searchBar}
          placeholder="Cari di Second chance"
          onChangeText={onChangeSearch}
          value={searchQuery}
          inputStyle={{
            fontSize: fontSize.medium,
            fontFamily: fonts.Poppins.Regular,
            color: colors.text.subtitle,
          }}
        />
        <View style={styles.content}>
          <Text style={styles.titleCategory}>Telusuri Kategori</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            <CardCategory name="search" active={category === 0} kategori="Semua" onPress={() => setCategory(0)} />
            {dataHome?.category?.map((item) => (
              <CardCategory key={item.id} name="search" active={category === item?.id} kategori={item.name} onPress={() => setCategory(item?.id)} />
            ))}

          </ScrollView>
          {
            // eslint-disable-next-line no-nested-ternary
            dataHome.isLoading ? (
              <ActivityIndicator size="small" color={colors.background.secondary} />
            ) : (dataHome.data.length === 0 ? (
              <Text style={styles.textEmpty}>Tidak ada produk</Text>
            ) : (
              <FlatList
                data={dataHome.data}
                numColumns={2}
                maxToRenderPerBatch={5}
                initialNumToRender={5}
                removeClippedSubviews
                getItemLayout={getItemLayout}
                windowSize={10}
                columnWrapperStyle={{
                  flex: 1,
                  marginHorizontal: 5,
                  marginBottom: 10,
                  justifyContent: 'space-between',
                }}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            )
            )
          }

        </View>
      </ScrollView>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  searchBar: {
    width: null,
    borderWidth: 1,
    borderRadius: 16,
    marginTop: windowHeight * 0.1,
    marginHorizontal: 16,
    fontFamily: fonts.Poppins.Bold,
    backgroundColor: colors.background.primary,
    borderColor: colors.border.secondary,
    position: 'absolute',
  },

  titleCategory: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Poppins.Bold,
    color: colors.text.primary,
    marginBottom: 16,
  },

  content: {
    flex: 1,
    margin: 16,
  },
  category: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  textEmpty: {
    fontSize: fontSize.medium,
    fontFamily: fonts.Poppins.Regular,
    color: colors.text.subtitle,
    marginTop: 16,
    textAlign: 'center',
  },

  listProduct: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

});
