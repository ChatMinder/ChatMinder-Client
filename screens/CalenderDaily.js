import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import MemoDate from '../shared/components/MemoDate';
import moment from 'moment';

const CalenderDaily = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: `${moment.unix(route.params.planObj[0].memoID).format('ll')}`,
    });
  }, [navigation, route.params.planObj[0].memoID]);
  return (
    <View>
      <MemoDate memoID={route.params.planObj[0].memoID} />

      {route.params.planObj.map((plan) => (
        <Text key={plan.memoID}> {plan.memoText}</Text>
      ))}
    </View>
  );
};

export default CalenderDaily;
