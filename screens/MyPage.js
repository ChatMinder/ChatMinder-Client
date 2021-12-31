import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const MyPage = ({ navigation: { setOptions } }) => {
  useEffect(() => {
    setOptions({
      headerShown: true,
      headerTitle: ``,
      headerBackImageSource: require('../shared/assets/GoBack.png'),
      headerShadowVisible: false,
      headerStyle: { backgroundColor: '#F0F0F2' },
    });
  });

  return (
    <Wrapper>
      <Text>MyPage</Text>
    </Wrapper>
  );
};

const GoBack = styled.Image``;

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  background: #f0f0f2;
`;

export default MyPage;
