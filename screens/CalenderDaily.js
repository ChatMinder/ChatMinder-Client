import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import MemoDate from '../shared/components/MemoDate';
import moment from 'moment';

const CalenderDaily = ({ route, navigation }) => {
  useEffect(() => {
    route.params.planObj.length === 0
      ? console.log('일정이 없음')
      : navigation.setOptions({
          title: `${moment.unix(route.params.planObj[0].memoID).format('ll')}`,
        });
  }, []);

  return (
    <View>
      {route.params.planObj.length === 0 ? (
        <Text>일정이 없습니다.</Text>
      ) : (
        <>
          <MemoDate memoID={route.params.planObj[0].memoID} />

          {route.params.planObj.map((plan) => (
            <Text key={plan.memoID}> {plan.memoText}</Text>
          ))}
        </>
      )}
    </View>
  );
};

export default CalenderDaily;
