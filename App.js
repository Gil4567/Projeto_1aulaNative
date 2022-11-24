import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Title from './src/component/Title/index';
import Form from "./src/component/Form/index";

export default function App() {
  return (
    <View style={styles.container}>
      <Title/>
      <Form/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    paddingTop: 80,
  },
});
