import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  image: {
    width: 240,
  },
});

export default () => (
  <View style={style.container}>
    <ActivityIndicator color="#00ff00" size="large" />
  </View>
);
