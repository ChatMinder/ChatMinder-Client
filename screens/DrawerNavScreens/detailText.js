import React from 'react';
import { Text, View } from 'react-native';

const detailText = ({ route }) => {
  console.log(route);

  // const { memoText } = route.params;

  return (
    <View>
      <Text>{route.params.memoText}</Text>
    </View>
  );
};

export default detailText;
