import {
  StyleSheet, Text, View,
} from 'react-native';
import React from 'react';
import { Searchbar } from 'react-native-paper';
import { ImageSlider } from 'react-native-image-slider-banner';
import { keranjang } from '../../assets';
import { windowHeight } from '../../utils/dimensions';
import { colors, fonts } from '../../utils';

function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ImageSlider
        data={[
          { img: 'https://play-lh.googleusercontent.com/Lp6uaNjoyjAcLRCgi0fA27h6A1dyaweJaVeu4Q4hDYx1WOSrOUEu_A2cNIz7Zz7YcsI' },
          { img: 'https://www.silviamigliorinimarketing.it/wp-content/uploads/2020/07/Post-E-facebook-Shops.jpg' },
          { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAj4WRHetwPQgeSBpN79dwejXWBSiDKjlbNjAuXLgK1uVeyXb0pKdlb8qjlC_VQb605JU&usqp=CAU' },
        ]}
        autoPlay
        onItemChanged={(item) => console.log('item', item)}
        closeIconColor="#fff"
      />

      <Searchbar
        style={styles.container}
        placeholder="Cari di Second chance"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <View>
        <Text style={styles.Telusuri}>Telusuri Kategori</Text>
      </View>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: 390,
    height: 50,
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 50,
    marginBottom: 20,
    fontFamily: fonts.Poppins.Bold,
    backgroundColor: colors.outlineInput,
    position: 'absolute',
  },
  Telusuri: {
    marginTop: 142,
    marginLeft: 8,
    fontSize: 18,
    fontFamily: fonts.Poppins.Bold,
  },
});
