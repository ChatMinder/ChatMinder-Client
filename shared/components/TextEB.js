import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const TextEB = ({ children }) => <TextBold>{children}</TextBold>;

const TextBold = styled.Text`
  font-family: 'NanumSquareOTF_acEB';
  font-size: 18px;
  font-weight: 800;
  line-height: 20px;
  letter-spacing: -0.36px;
`;
export default TextEB;
