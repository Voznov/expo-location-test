import React from 'react';
import {SafeAreaView} from 'react-native';

import {PermissionsButton, StopLocationButton} from './PermissionsButton';

const App = () => (
  <SafeAreaView>
    <PermissionsButton />
    <StopLocationButton />
  </SafeAreaView>
);

export default App;
