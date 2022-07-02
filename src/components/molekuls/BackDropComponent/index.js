import React from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

function BackDropComponent(props) {
  return (
    <BottomSheetBackdrop
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      appearsOnIndex={1}
      disappearsOnIndex={0}
    />
  );
}

export default BackDropComponent;
