import styled from 'styled-components/native';
import palette from '../palette';

export const CategoryItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3%;
  background-color: ${(props) => props.backgroundColor || `${palette.gray1}`};
  height: 60px;
  width: 100%;
  border-radius: 8px;
`;

export const TextBox = styled.TouchableOpacity`
  width: 80%;
`;

export const ImgBox = styled.View`
  flex-direction: row;
`;

export const ImgItem = styled.Image`
  width: ${(props) => props.width || '16'}px;
  height: ${(props) => props.height || '16'}px;
`;

export const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.width || '100%'};
`;
