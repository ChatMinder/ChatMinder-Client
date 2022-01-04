import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const FText = ({ children }) => <FontText>{children}</FontText>;

const FontText = styled.Text`
  font-family: 'NanumSquareOTF_ac';
  /* font-family: 'Gordita'; */
`;
export default FText;
