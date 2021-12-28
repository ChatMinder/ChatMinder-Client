import React from 'react';
import { Text } from 'react-native';

const MemoDate = ({ memoID }) => {
  const day = new Date().setTime(memoID);
  const thatday = day.toLocaleString();
  return <Text>{thatday}</Text>;
};

export default MemoDate;
