import React from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import palette from '../palette/palette';
// import Search from './Search';

const InputBox = () => {
  return (
    <View>
      <TextInput placeholder="검색어를 입력해주세요" />
    </View>
  );
};

export default InputBox;
