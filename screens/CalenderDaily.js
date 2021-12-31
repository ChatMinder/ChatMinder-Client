import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const CalenderDaily = ({ route, navigation }) => {
  // useEffect(() => {
  //   navigation.setOptions({
  //     title: `상세 정보 ${route.params.date}`,
  //   });
  // }, [navigation, route.params.date]);
  return (
    <View>
      <Text>{route.params.planObj[0].memoID}</Text>
    </View>
  );
};

export default CalenderDaily;
