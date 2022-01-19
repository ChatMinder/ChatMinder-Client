import React from 'react';
import styled from 'styled-components/native';

const TextEB = ({ children }) => <TextExtraBold>{children}</TextExtraBold>;

const TextExtraBold = styled.Text`
  font-family: 'NanumSquareOTF_acEB';
  font-size: 18px;
  font-weight: bold;
  line-height: 20px;
  letter-spacing: -0.36px;
`;
export default TextEB;
