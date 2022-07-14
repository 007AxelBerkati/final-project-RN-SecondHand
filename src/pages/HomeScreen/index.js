/* eslint-disable react-hooks/exhaustive-deps */
import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet, Text, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import PagerView from 'react-native-pager-view';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonComponent, CardCategory, CardProduct,
} from '../../components';
import {
  getBannerSeller, getCategoryProduct, getNotifikasi, getProduct,
} from '../../redux';
import {
  colors, fonts, fontSize, windowHeight,
} from '../../utils';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(0);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const dataHome = useSelector((state) => state.dataHome);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(getProduct({
      search: searchQuery,
      category_id: category !== 0 ? category : '',
      status: 'available',
      page,
      per_page: 20,
    }));

    setRefreshing(false);
  }, [category, searchQuery, refreshing, page]);

  useEffect(() => {
    dispatch(getCategoryProduct());
    dispatch(getBannerSeller());
    dispatch(getNotifikasi());
  }, []);

  const onChangeSearch = useCallback((query) => {
    setSearchQuery(query);
  }, [dispatch]);

  const getItemLayout = (data, index) => (
    { length: 200, offset: 200 * index, index }
  );
  const onHandlePrevious = () => {
    setPage(page - 1);
    setHasMore(true);
  };

  const onHandleNext = () => {
    setPage(page + 1);
  };

  const footerHome = () => (
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
        disable={!hasMore}
        onPress={() => onHandleNext()}
        style={styles.buttonPagination}
        title="Next"
      />
    </View>
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

  const emptyContent = () => {
    setHasMore(false);
    return (
      <Text style={styles.textEmpty}>Tidak ada produk</Text>
    );
  };

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
        <StatusBar backgroundColor="transparent" translucent barStyle={useIsFocused() ? 'dark-content' : null} />
        <PagerView
          style={{
            height: windowHeight * 0.2,
            marginTop: windowHeight * 0.1,
            marginHorizontal: 16,
          }}
          showPageIndicator
          initialPage={0}
        >
          {
            dataHome?.banner?.map((item) => (
              <View
                key={item.id}
              >
                <FastImage
                  source={{ uri: item.image_url }}
                  style={{ height: '100%', width: '100%', borderRadius: 10 }}
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
            <CardCategory
              name="search"
              active={category === 0}
              kategori="Semua"
              onPress={() => {
                setCategory(0);
                setPage(1);
              }}
            />
            {dataHome?.category?.map((item) => (
              <CardCategory
                key={item.id}
                name="search"
                active={category === item?.id}
                kategori={item.name}
                onPress={() => {
                  setCategory(item?.id);
                  setPage(1);
                }}
              />
            ))}

          </ScrollView>
          {
            dataHome.isLoading ? (
              <ActivityIndicator size="small" color={colors.background.secondary} />
            )
              : (
                <FlatList
                  data={dataHome?.data}
                  numColumns={2}
                  maxToRenderPerBatch={5}
                  initialNumToRender={5}
                  removeClippedSubviews
                  ListEmptyComponent={emptyContent}
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
                  ListFooterComponent={footerHome}
                />
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
    marginTop: windowHeight * 0.06,
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
