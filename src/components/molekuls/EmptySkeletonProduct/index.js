import { View } from 'react-native';
import React from 'react';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import {
  borderRadius, colors, windowWidth, windowHeight,
} from '../../../utils';

function EmptySkeletonProduct() {
  return (
    <Placeholder Animation={Fade}>
      <View style={{
        overflow: 'hidden',
        height: windowHeight * 0.30,
        width: windowWidth * 0.43,
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.border.primary,
        backgroundColor: colors.background.primary,
        elevation: 4,
      }}
      >
        <View style={{ height: '65%', width: '100%' }}>
          <PlaceholderMedia
            style={{
              height: '100%',
              width: '100%',
              borderRadius: borderRadius.small,
              marginBottom: 5,
            }}
          />
          <PlaceholderLine width={windowWidth * 0.2} />
          <PlaceholderLine width={windowWidth * 0.1} />
          <PlaceholderLine width={windowWidth * 0.15} />
        </View>
      </View>
    </Placeholder>
  );
}

export default EmptySkeletonProduct;
