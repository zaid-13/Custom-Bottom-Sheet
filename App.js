import React from 'react';

import {
  Text,
  View,
} from 'react-native';
import BottomSheet from './src/components/BottomSheet';
// import BottomSheetV4 from './src/components/BottomSheetUpdated';

const App = () => {

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <BottomSheet />
      {/* <BottomSheetV4 /> */}
    </View>
  );
};

export default App;
