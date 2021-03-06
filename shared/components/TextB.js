import React from 'react';
import styled from 'styled-components/native';

const TextB = ({ children }) => <TextBold>{children}</TextBold>;

const TextBold = styled.Text`
  font-family: 'NanumSquareOTF_ac Bold';
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
  /* 12px 기준, 0.03em을 변환한 값은 0.03px */
  letter-spacing: -0.36px;
  /* font-family: 'Gordita'; */
`;
export default TextB;
