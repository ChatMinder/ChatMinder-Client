import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import GoBack from '../shared/assets/GoBack.svg';
const MyPage = ({ navigation: { setOptions } }) => {
  useEffect(() => {
    setOptions({
      headerShown: true,
      headerTitle: ``,
      headerLeft: () => <GoBack />,
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

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  background: #f0f0f2;
`;

export default MyPage;
