import {
  FlatList,
  ScrollView,
  StyleSheet, Text, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { ImageSlider } from 'react-native-image-slider-banner';
import { useSelector, useDispatch } from 'react-redux';
import { colors, fonts } from '../../utils';
import { CardCategory, CardProduct } from '../../components';
import { getCategoryProduct, getProduct } from '../../redux';

function HomeScreen() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const dataProduct = useSelector((state) => state.dataHome.data);
  const dataCategory = useSelector((state) => state.dataHome.category);
  const [active, setActive] = useState('');

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategoryProduct());
  }, []);

  const getProductByCategory = (categoryId) => {
    setActive(categoryId);
    dispatch(getProduct(`?category_id=${categoryId}`));
  };

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageSlider
          data={[
            { img: 'https://play-lh.googleusercontent.com/Lp6uaNjoyjAcLRCgi0fA27h6A1dyaweJaVeu4Q4hDYx1WOSrOUEu_A2cNIz7Zz7YcsI' },
            { img: 'https://www.silviamigliorinimarketing.it/wp-content/uploads/2020/07/Post-E-facebook-Shops.jpg' },
            { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAj4WRHetwPQgeSBpN79dwejXWBSiDKjlbNjAuXLgK1uVeyXb0pKdlb8qjlC_VQb605JU&usqp=CAU' },
          ]}
          autoPlay
          timer={5000}
          closeIconColor={colors.background.primary}
        />
        <Searchbar
          style={styles.container}
          placeholder="Cari di Second chance"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <View style={styles.content}>
          <Text style={styles.titleCategory}>Telusuri Kategori</Text>
          <FlatList
            data={dataCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardCategory name="search" active={active === item.id} kategori={item.name} onPress={() => getProductByCategory(item.id)} />
            )}
          />
          <FlatList
            data={dataProduct}
            numColumns={2}
            renderItem={({ item }) => (
              <CardProduct
                source={{ uri: item.image_url }}
                name={item.name}
                jenis={item.description}
                harga={item.base_price}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: null,
    borderWidth: 1,
    borderRadius: 16,
    marginTop: 38,
    marginHorizontal: 16,
    fontFamily: fonts.Poppins.Bold,
    backgroundColor: colors.border.primary,
    borderColor: colors.border.secondary,
    position: 'absolute',
  },

  titleCategory: {
    fontSize: 14,
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
});
