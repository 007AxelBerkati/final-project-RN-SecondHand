import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet, Text, View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { ImageSlider } from 'react-native-image-slider-banner';
import { useSelector, useDispatch } from 'react-redux';
import {
  colors, fonts, fontSize,
} from '../../utils';
import { CardCategory, CardProduct } from '../../components';
import { getCategoryProduct, getProduct } from '../../redux';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const dataHome = useSelector((state) => state.dataHome);
  const [active, setActive] = useState('');
  const [btnAllActive, setBtnAllActive] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(getProduct(category));
    dispatch(getCategoryProduct());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductByCategory = (categoryId) => {
    setActive(categoryId);
    setBtnAllActive(false);
    setCategory(`?category_id=${categoryId}`);
    dispatch(getProduct(`?category_id=${categoryId}`));
  };

  const getAllProduct = () => {
    setBtnAllActive(true);
    setActive('');
    setCategory('');
    dispatch(getProduct(''));
  };

  const onChangeSearch = useCallback((query) => {
    setSearchQuery(query);
    dispatch(getProduct(`?search=${query}&&${category}`));
  }, [dispatch, category]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background.primary} />
        <ImageSlider
          data={[
            { img: 'https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg?w=1060&t=st=1655909482~exp=1655910082~hmac=17398ae027564d6d34625f5b83f8ab39616da2ea74d55677a11eb56ce8eb70bd' },
            { img: 'https://media.istockphoto.com/photos/male-outfit-set-on-white-background-closeup-top-view-picture-id1176614800?k=20&m=1176614800&s=612x612&w=0&h=uM0CkYhsM12_OYWhnO641tXqD3ZCOx61dyGZClkrv6k=' },
            { img: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' },
          ]}
          autoPlay
          timer={5000}
          closeIconColor={colors.background.primary}
        />
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
            <CardCategory name="search" active={btnAllActive} kategori="Semua" onPress={() => getAllProduct()} />
            {dataHome?.category?.map((item) => (
              <CardCategory key={item.id} name="search" active={active === item.id} kategori={item.name} onPress={() => getProductByCategory(item.id)} />
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
                columnWrapperStyle={{
                  flex: 1,
                  marginHorizontal: 5,
                  marginBottom: 10,
                  justifyContent: 'space-between',
                }}
                renderItem={({ item }) => (
                  <CardProduct
                    source={{ uri: item.image_url }}
                    name={item.name}
                    jenis={item.Categories}
                    harga={item.base_price}
                    onPress={() => navigation.navigate('DetailProductBuyerScreen', { id: item.id })}
                  />
                )}
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
    marginTop: 38,
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
