import React from 'react';

import {
  Text,
  View,
} from 'react-native';
// import BottomSheet from './src/components/BottomSheet';
import BottomSheetV2 from './src/components/BottomSheetV2';
// import Example from './src/components/exampleCode';

const App = () => {

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* <BottomSheet /> */}
      {/* <Example /> */}
      <BottomSheetV2 />
    </View>
  );
};

export default App;
