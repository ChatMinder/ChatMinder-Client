import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Search from '../components/Search';

const Home = ({ navigation: { setOptions } }) => {
  useEffect(() => {
    setOptions({
      headerRight: () => <Search />,
    });
  });
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
