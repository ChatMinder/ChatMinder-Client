import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const TextR = ({ children }) => <TextRegular>{children}</TextRegular>;

const TextRegular = styled.Text`
  font-family: 'NanumSquareOTF_ac';
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
  /* 12px 기준, 0.03em을 변환한 값은 0.03px */
  letter-spacing: -0.36px;
  /* font-family: 'Gordita'; */
`;
export default TextR;
