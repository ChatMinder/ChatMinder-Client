import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Loader = () => (
  <Wrapper>
    <ActivityIndicator size="large" color="#ff7f6d" />
  </Wrapper>
);

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Loader;
