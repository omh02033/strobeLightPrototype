/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Torch from 'react-native-torch';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const timer = useRef<NodeJS.Timeout>();

  const [isLight, setIsLight] = useState<boolean>(false);

  useEffect(() => {
    // Torch.switchState(isLight);
    if (isLight) {
      let light = true;
      timer.current = setInterval(() => {
        Torch.switchState(light);
        light = !light
      }, 1000/60/2);
    } else if (timer.current) {
      Torch.switchState(false);
      clearInterval(timer.current);
    }
  }, [isLight]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button title='60hz light' onPress={() => setIsLight(!isLight)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
